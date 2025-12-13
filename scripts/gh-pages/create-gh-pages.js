/**
 * Create all files for a documentation derived from the markdown files in
 * './docs'. The generated files are send to './gh_pages'; that directory
 * is cleared before (re-) generating the html files.
 */

import { existsSync } from 'node:fs'
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import { Marked, Parser, Renderer } from 'marked'

const templatesNotInTarget = [path.normalize('scripts/gh-pages/template/template.html')]

const sourcePath = 'docs'
const targetPath = 'gh_pages'

const templatePath = new URL('./template/template.html', import.meta.url)
const templateHtml = await readFile(templatePath, { encoding: 'utf8' })

/**
 * Filter function for fs.cp.
 * Used to select files / folder to be copied
 * @param {string} source - source file to be copied
 * @param {string} _dest - destination for file to be copied
 * @returns true=copy file; false=don't copy file
 */
const filterCp = (source, _dest) => {
  if (templatesNotInTarget.includes(path.normalize(source))) {
    return false
  }
  return true
}

const capitalizeWord = (word) => `${word[0].toUpperCase()}${word.slice(1)}`

let currentPath = ''

/**
 * Create a web page from a markdown file
 * @param {string} fullSourcePath - full path to markdown file
 * @param {string} baseDirectory - name of directory that contains all markdown files
 * @param {string} templateHtml - template for html pages generated
 * @param {*} mdTransformer - marked instance to use for transformation
 * @returns web page generated from markdown as sanitized html string
 */
const transformMdToHtml = async (fullSourcePath, baseDirectory, templateHtml, mdTransformer) => {
  let html = ''

  try {
    const markdownData = await readFile(fullSourcePath, { encoding: 'utf8' })

    // convert markdown to html
    // 'currentPath' is required to adjust relative links in deeper folder levels
    currentPath = path.dirname(fullSourcePath)
    currentPath = path.relative(sourcePath, currentPath)

    const rawHtml = mdTransformer.parse(markdownData)

    // sanitize html (as someone could have corrupted the files in '/doc')
    const window = new JSDOM('').window
    const purify = DOMPurify(window)
    const mdAsHtml = purify.sanitize(rawHtml)

    // insert transformed markdown into web page template
    const templateValues = {
      'page-title': 'ESday',
      header: 'ESday',
      content: mdAsHtml,
    }
    const fileName = capitalizeWord(path.basename(fullSourcePath, '.md'))
    const lastFileDirectory = path.basename(path.dirname(fullSourcePath))
    const section = lastFileDirectory !== baseDirectory ? capitalizeWord(lastFileDirectory) : ''
    if (fileName !== 'Index') {
      templateValues.header = section.length > 0 ? `${section} - ${fileName}` : fileName
    } else {
      templateValues.header = section.length > 0 ? `ESday - ${section}` : 'ESday'
    }
    templateValues['page-title'] = templateValues.header

    html = templateHtml.slice(0)
    for (const key in templateValues) {
      if (Object.hasOwn(templateValues, key)) {
        html = html.replace(`{{${key}}}`, templateValues[key])
      }
    }
  } catch (err) {
    html = `<p>ESday</p><p>Error during transformation of markdown to html:<br>${err.message}</p>`
  }

  return html
}

/**
 * Set id of tags that act as target of page-internal links
 * @param {string} content - content of html page to transform
 * @param {object[]} localLinks - list of internal links (array of {content, target})
 * @returns updated web page
 */
const setInternalLinkTargets = (content, localLinks) => {
  localLinks.forEach((localLinkParams) => {
    const headerTag = new RegExp(`<h(\\d)>${localLinkParams.content}<\/h(\\d)>`, 'g')
    content = content.replace(
      headerTag,
      `<h$1 id="${localLinkParams.target}">${localLinkParams.content}</h$2>`,
    )
  })

  return content
}

/**
 * Add relative address of page to page-internal links in TOC.
 * This is required as github pages use html base tag.
 * @param {string} content - content of html page to transform
 * @param {object[]} localLinks - list of internal links (array of {content, target})
 * @param {string} pageAddress - relative address of this html page
 * @returns updated web page
 */
const updateTocLinkTargets = (content, localLinks, pageAddress) => {
  localLinks.forEach((localLinkParams) => {
    content = content.replaceAll(
      `<a href="#${localLinkParams.target}">`,
      `<a href="${pageAddress}#${localLinkParams.target}">`,
    )
  })
  return content
}

/**
 * Add the first h1 tag to the list of local link targets to be handled.
 * @param {string} content - content of html page to transform
 * @param {object[]} localLinks - list of internal links (array of {content, target})
 */
const addLinkTargetOfPageTitle = (content, localLinks) => {
  // get the content of the first h1 tag
  const startOfTitle = content.indexOf('<h1>') + 4
  const endOfTitle = content.indexOf('</h1>', startOfTitle)
  const title = content.substring(startOfTitle, endOfTitle)

  // create id from title
  const idOfTitle = title.trim().toLowerCase().replace(' ', '-')

  // add reference for first h1 tag
  localLinks.push({ content: title, target: idOfTitle })
}

const marked = new Marked()
const originalRenderer = new Renderer()
originalRenderer.parser = new Parser()

// list of anchor tags that target elements within the current page
// Format {content, target}
let localLinks = []

/**
 * make anchor tags that reference files in the docs directory (*.md)
 * reference files in the gh_pages directory (*.html)
 */
marked.use({
  breaks: true,
  useNewRenderer: true,
  renderer: {
    link({ _tokens, href, text }) {
      let hrefAsHtml = href
      // replace extension
      if (!hrefAsHtml.startsWith('http') && hrefAsHtml.endsWith('.md')) {
        if (currentPath.length > 0 && hrefAsHtml.startsWith('./')) {
          // replace './' with 'relative/path/to/folder/'
          hrefAsHtml = `${currentPath}${hrefAsHtml.slice(1)}`
        }

        if (currentPath.length > 0 && hrefAsHtml.startsWith('../')) {
          // remove '../'
          hrefAsHtml = `${hrefAsHtml.slice(3)}`
        }

        hrefAsHtml = `${hrefAsHtml.slice(0, -3)}.html`
      } else if (hrefAsHtml.startsWith('#') && text !== '&#8593; Goto top') {
        // 'Goto top' (by design) is not the content of the topmost header
        localLinks.push({ content: text, target: hrefAsHtml.slice(1) })
      }
      return `<a href="${hrefAsHtml}">${text}</a>`
    },
  },
})

// create target path, if not exists or clear target path
if (existsSync(targetPath)) {
  await rm(targetPath, { recursive: true, force: true })
  await mkdir(targetPath, { recursive: true })
} else {
  await mkdir(targetPath, { recursive: true })
}

// copy common files to target path
await cp('scripts/gh-pages/template', targetPath, {
  filter: filterCp,
  preserveTimestamps: true,
  recursive: true,
})

// transform all markdown files to web pages
const entries = await readdir(sourcePath, {
  withFileTypes: true,
  recursive: true,
})
for (const entry of entries) {
  if (entry.isFile()) {
    localLinks = []
    let content = ''
    const targetFilePath = entry.parentPath.replace(new RegExp(`^${sourcePath}`), targetPath)
    const fullSourcePath = path.join(entry.parentPath, entry.name)
    let targetFileName = entry.name

    if (targetFileName.endsWith('.md')) {
      // convert markdown to html
      targetFileName = `${targetFileName.slice(0, -3)}.html`
      content = await transformMdToHtml(fullSourcePath, sourcePath, templateHtml, marked)
      if (localLinks.length > 0) {
        // make page internal links to work with html
        addLinkTargetOfPageTitle(content, localLinks)
        content = setInternalLinkTargets(content, localLinks)
        const relativePath =
          currentPath.length > 0 ? `${currentPath}/${targetFileName}` : targetFileName
        content = updateTocLinkTargets(content, localLinks, relativePath)
      }
    } else {
      content = await readFile(fullSourcePath, { encoding: 'utf8' })
    }

    const fullTargetPath = path.join(targetFilePath, targetFileName)
    await mkdir(targetFilePath, { recursive: true })
    await writeFile(fullTargetPath, content)
  }
}

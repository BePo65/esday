'use strict'
const { execSync } = require('node:child_process')

const SKIP_FOLDERS = ['.changeset', '.github', '.vscode', '.husky', 'scripts/skipCI.cjs', 'docs']

async function main() {
  execSync('git fetch origin main')

  const changedFilesOutput = execSync('git diff origin/main... --name-only', {
    stdio: 'pipe',
  }).toString()
  const changedFiles = changedFilesOutput
    .split('\n')
    .map((file) => file?.trim())
    .filter(Boolean)

  const shouldNotSkipCI =
    !changedFiles.length ||
    changedFiles.some(
      (file) =>
        !SKIP_FOLDERS.some(
          (folder) => file.startsWith(`${folder}/`) || file === folder || file.endsWith('.md'),
        ),
    )

  // biome-ignore lint/suspicious/noConsole: required for report of CI action
  console.log(shouldNotSkipCI ? 'false' : 'true')
}

main().catch((err) => {
  // biome-ignore lint/suspicious/noConsole: required for report of CI action
  console.error('Failed to detect CI skip', err)

  process.exit(1)
})

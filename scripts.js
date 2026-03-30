function makeCopier(block, button, feedback) {
  const code = block.querySelector('code')

  async function copier() {
    await navigator.clipboard.writeText(code.innerText)
    button.classList.add('clicked')
    feedback.style.display = 'block'

    setTimeout(() => {
      button.classList.remove('clicked')
    }, 300)

    setTimeout(() => {
      feedback.style.display = 'none'
    }, 800)
  }

  return copier
}

function addMagicButtons() {
  const copyButton = document.getElementById('copyButtonTemplate').content.firstElementChild
  const copiedFeedback = document.getElementById('copiedFeedbackTemplate').content.firstElementChild

  document.querySelectorAll('pre:has(> code.language-typescript)').forEach((block) => {
    if (navigator.clipboard) {
      const div = document.createElement('div')
      div.classList.add('code-buttons')

      const feedback = copiedFeedback.cloneNode(true)
      feedback.style.display = 'none'

      const button = copyButton.cloneNode(true)
      button.addEventListener('click', makeCopier(block, button, feedback))

      div.appendChild(button)
      div.appendChild(feedback)

      block.style.marginTop = '0'
      block.style.paddingTop = '0'
      block.parentNode.insertBefore(div, block)
    }
  })
}

addMagicButtons()

const init = () => {
    document.removeEventListener('DOMContentLoaded', init)

    const readMoreBtn = document.getElementById('readMoreButton')
    const infoTextHidden = document.getElementById('infoTextHidden')

    readMoreBtn.addEventListener('click', () => {
        readMoreBtn.classList.add('link--destroyed')
        setTimeout(() => {
            readMoreBtn.parentNode.removeChild(readMoreBtn)
            infoTextHidden.classList.remove('info-text--hidden')
            infoTextHidden.classList.add('info-text--shown')
        }, 300)
    })
}

document.addEventListener('DOMContentLoaded', init)

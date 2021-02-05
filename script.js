const init = () => {
    document.removeEventListener('DOMContentLoaded', init)

    /*
        Читать дальше
     */
    const readMoreBtn = document.getElementById('readMoreButton')
    const infoTextHidden = document.getElementById('infoTextHidden')

    /*
        Попап
     */
    const popup = document.getElementById('popup')
    const popupClose = document.querySelector('.popup__close')
    const popupOpenButton = document.getElementById('popupOpenButton')

    /*
        Подробная информация о вилках
     */
    readMoreBtn.addEventListener('click', () => {
        readMoreBtn.classList.add('link--destroyed')
        setTimeout(() => {
            readMoreBtn.parentNode.removeChild(readMoreBtn)
            infoTextHidden.classList.remove('info-text--hidden')
            infoTextHidden.classList.add('info-text--shown')
        }, 300)
    })

    /*
        Открыть попап с формой, по нажатию кнопки "Подробнее"
     */
    popupOpenButton.addEventListener('click', () => {
        popup.classList.remove('popup--closed')
        document.addEventListener('keydown', escapeClosePopup)
    })

    /*
        Закрыть попап с формой, по нажатию на крестик
     */
    popupClose.addEventListener('click', () => {
        popup.classList.add('popup--closed')
    })

    /*
        Функция, которая закрывает попап по нажатию кнопки Escape
     */
    const escapeClosePopup = (e) => {
        if (e.key === 'Escape') {
            popup.classList.add('popup--closed')
            document.removeEventListener('keydown', escapeClosePopup)
        }
    }

    /*
        Боковая навигация
     */
    const navItems = document.querySelectorAll('.nav-item')
    const info = document.getElementById('info').offsetTop
    const testimonials = document.getElementById('testimonials').offsetTop
    const kit = document.getElementById('kit').offsetTop

    /*
        Назначение активного элемента навигации
     */
    const changeActiveNavItems = (item) => {
        navItems.forEach(elem => {
            elem.classList.remove('nav-item--active')
        })
        item.classList.add('nav-item--active')
    }

    /*
        Проверка позиции скролла
     */
    const checkScrollPosition = () => {
        console.log(window.scrollY + 200 - kit)
        if (window.scrollY + 200 - info <= 6 && window.scrollY + 200 - info > 0) {
            changeActiveNavItems(navItems[1])
        } else if (window.scrollY + 200 - testimonials <= 6 && window.scrollY + 200 - testimonials > 0) {
            changeActiveNavItems(navItems[2])
        } else if (window.scrollY + 200 - kit > 0) {
            changeActiveNavItems(navItems[3])
        } else if (window.scrollY < info / 2) {
            changeActiveNavItems(navItems[0])
        }
    }
    document.addEventListener('scroll', checkScrollPosition)
    checkScrollPosition()

    /*
        Переход по элементам навигации
     */
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            changeActiveNavItems(item)
        })
    })
}

document.addEventListener('DOMContentLoaded', init)

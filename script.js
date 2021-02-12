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
        document.body.classList.add('overflow-hidden')
    })

    /*
        Закрыть попап с формой, по нажатию на крестик
     */
    popupClose.addEventListener('click', () => {
        popup.classList.add('popup--closed')
        document.body.classList.remove('overflow-hidden')
    })

    /*
        Функция, которая закрывает попап по нажатию кнопки Escape
     */
    const escapeClosePopup = (e) => {
        if (e.key === 'Escape') {
            popup.classList.add('popup--closed')
            document.removeEventListener('keydown', escapeClosePopup)
            document.body.classList.remove('overflow-hidden')
        }
    }

    /*
        Боковая навигация
     */
    const navItems = document.querySelectorAll('.nav-item')
    const info = document.getElementById('info').offsetTop
    const testimonials = document.getElementById('testimonials').offsetTop
    const kit = document.getElementById('kit').offsetTop
    const Y_MARGIN = 200
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
        if (window.scrollY + Y_MARGIN - info <= 6 && window.scrollY + Y_MARGIN - info > 0) {
            changeActiveNavItems(navItems[1])
        } else if (window.scrollY + Y_MARGIN - testimonials <= 6 && window.scrollY + Y_MARGIN - testimonials > 0) {
            changeActiveNavItems(navItems[2])
        } else if (window.scrollY + Y_MARGIN - kit > 0) {
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
    const form = document.getElementById('footerForm')
    const popupForm = document.getElementById('popupForm')

    /*
        AJAX отправка формы
     */
    const formSend = async(form) => {
        let error = formValidate(form)

        let formData = new FormData(form)

        if (error === 0) {
            const response = await fetch('libs/mail/form.php', {
                method: 'POST',
                body: formData
            })

            if (response.ok) {
                Toast.add({
                    text: 'Вы успешно отправили заявку. Ожидайте ответа!',
                    color: '#28a745',
                    autohide: true,
                    delay: 5000
                });

                form.reset()
            } else {
                Toast.add({
                    text: 'Ошибка отправки данных. Повторите попытку позже.',
                    color: '#FFD654',
                    autohide: true,
                    delay: 5000
                });
            }
        } else {
            Toast.add({
                text: 'Заполните обязательные поля',
                color: '#FFD654',
                autohide: true,
                delay: 5000
            });
        }
    }

    /*
        Обработка отправки формы
     */
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        formSend(form)
    })
    popupForm.addEventListener('submit', (e) => {
        e.preventDefault()
        formSend(popupForm)
    })

    /*
        Валидация формы
     */
    const formValidate = (form) => {
        let error = 0
        let formReq = form.querySelectorAll('._req')
        console.log(formReq)
        for (let i = 0; i < formReq.length; i += 1) {
            const input = formReq[i];
            formRemoveError(input)

            if (input.classList.contains('_email')) {
                if (regEmail(input)) {
                    formAddError(input)
                    error += 1
                }
            } else {
                if (input.classList.contains('footer__form-check__input') && !input.checked) {
                    formAddError(input)
                    error += 1
                } else if (input.value === '') {
                    formAddError(input)
                    error += 1
                }
            }
        }
        return error
    }

    /*
        Добавляет ошибки валидации
     */
    const formAddError = (input) => {
        input.parentElement.classList.add('footer__form-group--error')
        input.classList.add('footer__form-input--error')
    }

    /*
        Убирает ошибку валидации
     */
    const formRemoveError = (input) => {
        input.parentElement.classList.remove('footer__form-group--error')
        input.classList.remove('footer__form-input--error')
    }

    /*
        Регулярное выражение для проверки Email
     */
    const regEmail = (input) => {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
    }
}

document.addEventListener('DOMContentLoaded', init)

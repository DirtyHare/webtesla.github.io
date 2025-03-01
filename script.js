document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Открытие/закрытие меню
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Анимация кнопок
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseover', () => {
            btn.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'scale(1)';
        });
    });

    // Логика конфигуратора
    const carImage = document.querySelector('#car-image');
    const colorButtons = document.querySelectorAll('.color-btn');
    const interiorButtons = document.querySelectorAll('.interior-btn');
    const totalPriceElement = document.querySelector('#total-price');

    if (carImage && colorButtons.length && interiorButtons.length && totalPriceElement) {
        // Базовая цена Model 3
        let basePrice = 39990;
        let colorCost = 0;
        let interiorCost = 0;

        // Обработка выбора цвета кузова
        colorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                colorButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const color = btn.getAttribute('data-color');
                colorCost = parseInt(btn.getAttribute('data-cost'));

                // Изменение изображения машины
                if (color === 'white') {
                    carImage.src = 'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY36,$PPSW,$WY19C,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&';
                } else if (color === 'black') {
                    carImage.src = 'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY36,$PN01,$WY19C,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&';
                } else if (color === 'red') {
                    carImage.src = 'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY36,$PR01,$WY19C,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&';
                }

                updatePrice();
            });
        });

        // Обработка выбора цвета салона
        interiorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                interiorButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                interiorCost = parseInt(btn.getAttribute('data-cost'));
                updatePrice();
            });
        });

        // Функция обновления стоимости
        function updatePrice() {
            const totalPrice = basePrice + colorCost + interiorCost;
            totalPriceElement.textContent = `$${totalPrice.toLocaleString()}`;
        }

        // Установка активного состояния по умолчанию
        colorButtons[0].classList.add('active');
        interiorButtons[0].classList.add('active');
        updatePrice();
    }
});
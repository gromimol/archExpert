
$(document).ready(function() {
    
    // ===== ВЫПАДАЮЩЕЕ МЕНЮ =====
    
    // Обработчик клика по ссылкам с подменю
    $('.header__nav li:has(ul) > a').on('click', function(e) {
        e.preventDefault(); // Блокируем переход по ссылке
        
        const $parentLi = $(this).parent();
        
        // Переключаем класс для анимации
        $parentLi.toggleClass('submenu-open');
        
        // Закрываем другие подменю (опционально)
        $('.header__nav li:has(ul)').not($parentLi).removeClass('submenu-open');
    });
    
    // Закрытие подменю при клике вне меню (опционально)
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.header__nav').length) {
            $('.header__nav li.submenu-open').removeClass('submenu-open');
        }
    });
    
    // ===== МОБИЛЬНОЕ МЕНЮ (если будет гамбургер) =====
    
    // Открытие/закрытие мобильного меню
    $('.menu-toggle').on('click', function() {
        $('.header__nav').toggleClass('nav-open');
        $('body').toggleClass('menu-open');
    });
    
    // Закрытие мобильного меню при клике на ссылку
    $('.header__nav a').on('click', function() {
        // Только если это не ссылка с подменю
        if (!$(this).parent().hasClass('submenu-open') && !$(this).parent().has('ul').length) {
            $('.header__nav').removeClass('nav-open');
            $('body').removeClass('menu-open');
        }
    });
    
    // ===== ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ =====

    // Если у вас есть якорные ссылки
    $('a[href^="#"]:not([href="#"])').on('click', function() {
        const target = $(this.getAttribute('href'));

        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 800);

            // Закрываем меню после клика
            $('.header__nav').removeClass('nav-open');
            $('body').removeClass('menu-open');
        }
    });

    // ===== HIDE-ON-SCROLL HEADER =====

    let lastScrollTop = 0;
    let scrollThreshold = 5; // Минимальное изменение скролла для срабатывания (в пикселях)
    let headerHeight = $('.header').outerHeight();
    let isScrolling;

    $(window).on('scroll', function() {
        // Очищаем таймер при каждом событии скролла
        window.clearTimeout(isScrolling);

        // Устанавливаем новый таймер (debounce для оптимизации)
        isScrolling = setTimeout(function() {
            let currentScrollTop = $(window).scrollTop();

            // Проверяем, достаточно ли изменилась позиция скролла
            if (Math.abs(currentScrollTop - lastScrollTop) < scrollThreshold) {
                return;
            }

            // Если скроллим вниз и прокрутили больше высоты шапки
            if (currentScrollTop > lastScrollTop && currentScrollTop > headerHeight) {
                // Скрываем шапку
                $('.header').addClass('header--hidden');
            } else {
                // Показываем шапку
                $('.header').removeClass('header--hidden');
            }

            lastScrollTop = currentScrollTop;
        }, 10); // Небольшая задержка для оптимизации
    });

    // ===== ПЕРЕКЛЮЧЕНИЕ ТАБОВ =====

    $('.tabs__btn').on('click', function() {
        const tabName = $(this).data('tab');

        // Убираем активный класс со всех кнопок
        $('.tabs__btn').removeClass('tabs__btn--active');

        // Добавляем активный класс на текущую кнопку
        $(this).addClass('tabs__btn--active');

        // Скрываем все панели
        $('.tabs__panel').removeClass('tabs__panel--active');

        // Показываем нужную панель
        $(`.tabs__panel[data-panel="${tabName}"]`).addClass('tabs__panel--active');
    });

    // ===== АНИМИРОВАННЫЕ ЗВЕЗДЫ ДЛЯ DE-RISK СЕКЦИИ =====

    function createStars() {
        const $starsContainer = $('.de-risk__stars');

        if ($starsContainer.length === 0) {
            console.log('Контейнер .de-risk__stars не найден');
            return;
        }

        // Количество звезд
        const starsCount = Math.floor(Math.random() * 20) + 30; // 30-50 звезд

        console.log('Создаем', starsCount, 'звезд');

        for (let i = 0; i < starsCount; i++) {
            const $star = $('<div class="de-risk__star"></div>');

            // Рандомный размер (от 3px до 8px)
            const size = Math.random() * 5 + 3;

            // Немного овальные (случайное соотношение сторон)
            const aspectRatio = 0.7 + Math.random() * 0.6; // от 0.7 до 1.3

            // Случайный угол для направления (в радианах)
            const angle = Math.random() * Math.PI * 2;

            // Случайная дистанция разлета (от 300 до 1200 пикселей)
            const distance = Math.random() * 900 + 300;

            // Вычисляем конечные координаты на основе угла и дистанции
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            // Рандомная длительность анимации (от 2 до 6 секунд)
            const duration = Math.random() * 4 + 2;

            // Рандомная задержка старта (от 0 до 3 секунд)
            const delay = Math.random() * 3;

            $star.css({
                '--tx': tx,
                '--ty': ty,
                width: size + 'px',
                height: (size * aspectRatio) + 'px',
                animationDuration: duration + 's',
                animationDelay: delay + 's'
            });

            $starsContainer.append($star);
        }

        console.log('Звезды созданы:', $('.de-risk__star').length);
    }

    // Создаем звезды при загрузке
    createStars();

});

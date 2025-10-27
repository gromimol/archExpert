
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
    
    // ===== МОБИЛЬНОЕ МЕНЮ =====

    // Открытие мобильного меню по клику на бургер
    $('.burger').on('click', function() {
        $('.header__nav').addClass('nav-open');
        $('body').addClass('menu-open');
    });

    // Закрытие мобильного меню по клику на крестик
    $('.close').on('click', function() {
        $('.header__nav').removeClass('nav-open');
        $('body').removeClass('menu-open');
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

    // ===== FLIP CARDS =====
    
    $('.case-card').on('click', function(e) {
        // Игнорируем клики на кнопки и ссылки
        if ($(e.target).closest('.btn, a').length) {
            return;
        }

        const $card = $(this);

        // Закрываем все остальные карточки
        $('.case-card').not($card).removeClass('flipped');

        // Переворачиваем текущую
        $card.toggleClass('flipped');
    });

    // Клик на кнопку "Read More" - переворачиваем карточку обратно
    $('.case-card__back .btn').on('click', function(e) {
        const $card = $(this).closest('.case-card');
        $card.removeClass('flipped');
    });

    // ===== ПЕРЕКЛЮЧЕНИЕ ТАБОВ SERVICES =====

    $('.services-tabs__btn').on('click', function() {
        const tabName = $(this).data('tab');

        // Убираем активный класс со всех кнопок
        $('.services-tabs__btn').removeClass('services-tabs__btn--active');

        // Добавляем активный класс на текущую кнопку
        $(this).addClass('services-tabs__btn--active');

        // Скрываем все панели
        $('.services-tabs__panel').removeClass('services-tabs__panel--active');

        // Показываем нужную панель
        $(`.services-tabs__panel[data-panel="${tabName}"]`).addClass('services-tabs__panel--active');
    });

    // ===== ACCORDION =====

    // Применяем фоны из data-bg при загрузке для всех аккордеонов
    $('.accordion__item').each(function() {
        const $item = $(this);
        const bgColor = $item.data('bg');
        if (bgColor) {
            $item.css('background-color', bgColor);
        }
    });

    // Анимация сдвига аккордеонов на десктопе
    function animateAccordionDesktop($activeItem) {
        const $allItems = $('.accordion__item');
        const activeIndex = $allItems.index($activeItem);
        
        // Анимация для всех элементов
        $allItems.each(function(index) {
            const $item = $(this);
            const basePosition = (3 - index) * 10; // Базовая позиция
            
            if (index < activeIndex) {
                // Элементы слева от активного - сдвигаем влево
                gsap.to($item, {
                    duration: 0.01,
                    ease: "power3.out",
                    right: (basePosition + 57) + 'rem'
                });
            } else {
                // Активный и правые элементы - остаются на базовых позициях
                gsap.to($item, {
                    duration: 0.01,
                    ease: "power3.out",
                    right: basePosition + 'rem'
                });
            }
        });
    }
    
    // Сброс позиций аккордеонов к базовым значениям
    function resetAccordionDesktop() {
        const $allItems = $('.accordion__item');
        
        $allItems.each(function(index) {
            const basePosition = (3 - index) * 10;
            gsap.to($(this), {
                duration: 0.01,
                ease: "power3.out",
                right: basePosition + 'rem'
            });
        });
    }
    
    // Функция переключения аккордеона
    function toggleAccordion($item) {
        const isActive = $item.hasClass('accordion__item--active');
        
        // Закрываем все аккордеоны
        $('.accordion__item').removeClass('accordion__item--active');
        
        // Если кликнутый аккордеон не был активным, открываем его
        if (!isActive) {
            $item.addClass('accordion__item--active');
            
            // Анимация сдвига для десктопа
            if ($(window).width() > 1200) {
                animateAccordionDesktop($item);
            }
        } else {
            // Если закрываем аккордеон, возвращаем все на место
            if ($(window).width() > 1200) {
                resetAccordionDesktop();
            }
        }
    }

    // Обработчик клика по заголовку (для мобильной версии)
    $('.accordion__header').on('click', function(e) {
        e.stopPropagation();
        const $item = $(this).closest('.accordion__item');
        toggleAccordion($item);
    });

    // Обработчик клика по всей карточке (для десктопной версии)
    $('.accordion__item').on('click', function() {
        // Проверяем ширину экрана
        if ($(window).width() > 1200) {
            toggleAccordion($(this));
        }
    });

    // ===== SCROLL TO TOP =====

    $('.footer__scroll-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    // ===== GSAP АНИМАЦИЯ ПУТИ И ШАРИКА (DE-RISK) =====

    function initDeRiskAnimation() {
        // Проверяем, что GSAP загружен
        if (typeof gsap === 'undefined') {
            console.warn('GSAP не загружен');
            return;
        }

        // Проверяем ширину экрана (только для десктопа)
        if ($(window).width() < 1200) {
            return;
        }

        const $items = $('.de-risk__item');
        const $svg = $('.de-risk__path-svg');
        const $path = $('#risk-path');
        const $ball = $('.de-risk__ball');
        const $progressElements = $('.de-risk__progress');

        if ($items.length < 4 || !$svg.length || !$ball.length) {
            return;
        }

        // Регистрируем MotionPath плагин
        gsap.registerPlugin(MotionPathPlugin);

        // Получаем размеры контейнера и заголовок секции
        const containerOffset = $('.de-risk .container').offset();
        const containerWidth = $('.de-risk .container').width();
        const containerHeight = $('.de-risk .container').height();

        // Находим высоту заголовка H2, чтобы начать линию ниже него
        const $h2 = $('.de-risk .h2');
        const h2Bottom = $h2.length ? ($h2.offset().top + $h2.outerHeight() - containerOffset.top + 40) : 0;

        // Устанавливаем размеры SVG
        $svg.attr({
            viewBox: `0 0 ${containerWidth} ${containerHeight}`,
            width: containerWidth,
            height: containerHeight
        });

        // Получаем точки НАД блоками (огибая их)
        const points = [];
        const offsetAbove = 80; // Отступ над блоком

        $items.each(function(index) {
            const $item = $(this);
            const offset = $item.offset();
            const width = $item.outerWidth();

            let x, y;
            let itemY = offset.top - containerOffset.top - offsetAbove;

            // Убеждаемся, что линия начинается НИЖЕ заголовка H2
            if (itemY < h2Bottom) {
                itemY = h2Bottom;
            }

            if (index === 0) {
                // Первый блок - верхний ЛЕВЫЙ угол
                x = offset.left - containerOffset.left;
                y = itemY;
            } else if (index === $items.length - 1) {
                // Последний блок - верхний ПРАВЫЙ угол
                x = offset.left - containerOffset.left + width;
                y = itemY;
            } else {
                // Промежуточные блоки - центр
                x = offset.left - containerOffset.left + width / 2;
                y = itemY;
            }

            points.push({ x, y, index });
        });

        // Строим SVG путь через кривые Безье (первоначальная версия - самая плавная)
        let pathD = `M ${points[0].x} ${points[0].y}`;

        for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1];
            const curr = points[i];

            // Контрольные точки для плавной S-кривой
            const dx = curr.x - prev.x;
            const dy = curr.y - prev.y;

            const cp1x = prev.x + dx * 0.5;
            const cp1y = prev.y;

            const cp2x = prev.x + dx * 0.5;
            const cp2y = curr.y;

            pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
        }

        // Применяем путь
        $path.attr('d', pathD);

        // Плашки позиционируются через CSS grid, здесь ничего не делаем

        // Создаем GSAP анимацию
        const tl = gsap.timeline({
            repeat: -1, // Бесконечный повтор
            repeatDelay: 2 // Задержка перед повтором
        });

        // Показываем шарик
        tl.to($ball[0], {
            opacity: 1,
            duration: 0.3
        });

        // Анимация шарика по пути
        tl.to($ball[0], {
            motionPath: {
                path: $path[0],
                align: $path[0],
                alignOrigin: [0.5, 0.5]
            },
            duration: 12, // 12 секунд на весь путь
            ease: 'none'
        }, 0);

        // Анимация появления меток - ТОЛЬКО ОДНА за раз (3 плашки)
        const progressCount = 3; // Только 3 плашки
        const segmentDuration = 12 / progressCount; // Время на каждый сегмент

        $progressElements.each(function(index) {
            if (index > 2) return; // Только 3 плашки

            const startTime = index * segmentDuration;
            const showDuration = 0.7; // Время появления
            const hideDuration = 0.5; // Время исчезновения
            const visibleTime = segmentDuration - showDuration - hideDuration; // Время показа

            // Появление метки
            tl.to(this, {
                opacity: 1,
                y: 0,
                duration: showDuration,
                ease: 'back.out(1.7)'
            }, startTime);

            // Скрытие метки перед следующей
            if (index < progressCount - 1) {
                tl.to(this, {
                    opacity: 0,
                    y: -20,
                    duration: hideDuration,
                    ease: 'power2.in'
                }, startTime + showDuration + visibleTime);
            }
        });

        // Скрываем последнюю (3-ю) метку и шарик в конце
        tl.to($progressElements.eq(2)[0], {
            opacity: 0,
            y: -20,
            duration: 0.5
        }, 11.5);

        tl.to($ball[0], {
            opacity: 0,
            duration: 0.3
        }, 11.7);
    }

    // Инициализация при загрузке
    initDeRiskAnimation();

    // Пересоздаем анимацию при изменении размера окна (с debounce)
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Останавливаем все анимации GSAP на элементах
            if (typeof gsap !== 'undefined') {
                gsap.killTweensOf('.de-risk__ball, .de-risk__progress');
            }
            initDeRiskAnimation();
        }, 250);
    });
    
    function create3DWaveCircles() {
        console.log('🎯 Создаем 3D волновые круги...');
        
        const container = document.querySelector('.wave-circles');
        if (!container) return;
        
        container.innerHTML = '';
        container.style.cssText = `
        position: absolute !important;
        bottom: 0 !important;
        left: 0 !important;
        transform:
               rotateX(70deg)
               rotateY(25deg)
               rotateZ(35deg) !important;
        transform-style: preserve-3d !important;
        width: 800px !important;
        height: 800px !important;
        perspective: 400px !important;
        z-index: 10000 !important;
    `;
        
        // Создаем 10 круга
        for (let i = 0; i < 10; i++) {
            const circle = document.createElement('div');
            const radius = 60 + (i * 30);
            const dotsCount = 35 + (i * 15);
            
            circle.style.cssText = `
            width: ${radius * 2}px !important;
            height: ${radius * 2}px !important;
            border-radius: 50% !important;
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            transform-style: preserve-3d !important;
        `;
            
            
            // Создаем точки
            for (let j = 0; j < dotsCount; j++) {
                const dot = document.createElement('div');
                const angle = (j / dotsCount) * 2 * Math.PI;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                dot.style.cssText = `
                width: 2px !important;
                height: 2px !important;
                background: #75D7B5 !important;
                border-radius: 50% !important;
                position: absolute !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate3d(${x}px, ${y}px, 0px) !important;
                opacity: 0.8 !important;
                transform-style: preserve-3d !important;
                z-index: 10001 !important;
            `;
                
                // Добавляем класс для легкого поиска
                dot.classList.add('wave-dot');
                
                // Сохраняем данные для 3D волны
                dot._baseX = x;
                dot._baseY = y;
                dot._angle = angle;
                dot._radius = radius;
                dot._circleIndex = i;
                
                circle.appendChild(dot);
            }
            
            container.appendChild(circle);
        }
        
        console.log('✅ 3D круги созданы, запускаем МЕДЛЕННУЮ волну...');
        startAdvanced3DWave();
    }
    
    function startAdvanced3DWave() {
        // Ищем точки по классу вместо стиля
        const dots = document.querySelectorAll('.wave-dot');
        console.log(`🎯 Найдено точек для анимации: ${dots.length}`);
        
        function advancedWave3D() {
            const time = Date.now() * 0.0006; // Уменьшили скорость в 2 раза
            
            dots.forEach(dot => {
                const angle = dot._angle;
                const circleIndex = dot._circleIndex;
                
                // УМЕНЬШЕННАЯ высота волны
                const mainWave = Math.sin(time * 1.2 + angle * 3) * (8 + circleIndex * 2); // Было 15
                const secondaryWave = Math.cos(time * 1.5 + angle * 4 + circleIndex) * (4 + circleIndex); // Было 8
                const slowWave = Math.sin(time * 0.5 + angle * 1.5) * (3 + circleIndex); // Было 5
                
                // Комбинируем волны (основная волна + второстепенные)
                const z = mainWave + secondaryWave * 0.3 + slowWave * 0.1;
                
                // Очень легкое движение по X,Y для естественности
                const xWobble = Math.cos(time * 0.8 + angle * 2) * 0.5; // Уменьшили
                const yWobble = Math.sin(time * 0.6 + angle * 2) * 0.5; // Уменьшили
                
                const finalX = dot._baseX + xWobble;
                const finalY = dot._baseY + yWobble;
                
                // 3D трансформация
                dot.style.transform = `translate3d(${finalX}px, ${finalY}px, ${z}px)`;
                
                // УМЕНЬШЕННЫЙ эффект глубины и размера
                const depth = (z + 12) / 24; // Нормализуем от -12 до +12 (было от -25 до +25)
                dot.style.opacity = 0.5 + depth * 0.4; // Меньше изменения прозрачности
                dot.style.width = (3 + depth * 1) + 'px'; // Меньше изменения размера
                dot.style.height = (3 + depth * 1) + 'px';
            });
            
            requestAnimationFrame(advancedWave3D);
        }
        
        advancedWave3D();
        
        // Более медленное вращение кругов
        const circles = document.querySelectorAll('.wave-circles > div');
        circles.forEach((circle, index) => {
            gsap.to(circle, {
                rotationZ: index % 2 === 0 ? 360 : -360,
                duration: 60 + (index * 20), // Увеличили длительность
                repeat: -1,
                ease: "none"
            });
        });
        
        // Более медленное покачивание всей сцены
        gsap.to('.wave-circles', {
            rotationX: '+=2',
            rotationY: '+=1',
            duration: 12, // Увеличили длительность
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
    
    // Запускаем
    create3DWaveCircles();
    
});

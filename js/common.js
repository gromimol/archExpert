
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
    let headerHeight = $('.header--fixed').outerHeight();
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
                dot.style.width = (3 + depth) + 'px'; // Меньше изменения размера
                dot.style.height = (3 + depth) + 'px';
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

    // ===== FINAL CTA ANIMATED LIGHT BEAM =====
    const $lightBeam = $('.final-cta__light');

    if ($lightBeam.length) {
        // Цвета для анимации градиента (07BC8A, 97F69D, 0C5350)
        const gradients = [
            'radial-gradient(circle at center, rgba(7, 188, 138, 0.8) 0%, rgba(151, 246, 157, 0.6) 25%, rgba(12, 83, 80, 0.4) 50%, rgba(151, 246, 157, 0.2) 70%, transparent 85%)',
            'radial-gradient(circle at center, rgba(151, 246, 157, 0.8) 0%, rgba(12, 83, 80, 0.6) 25%, rgba(7, 188, 138, 0.4) 50%, rgba(12, 83, 80, 0.2) 70%, transparent 85%)',
            'radial-gradient(circle at center, rgba(12, 83, 80, 0.8) 0%, rgba(7, 188, 138, 0.6) 25%, rgba(151, 246, 157, 0.4) 50%, rgba(7, 188, 138, 0.2) 70%, transparent 85%)',
            'radial-gradient(circle at center, rgba(151, 246, 157, 0.9) 0%, rgba(7, 188, 138, 0.6) 25%, rgba(12, 83, 80, 0.35) 50%, rgba(151, 246, 157, 0.15) 70%, transparent 85%)'
        ];

        // Устанавливаем начальное состояние
        gsap.set($lightBeam, {
            opacity: 0,
            x: 0,
            y: 0,
            scale: 1
        });

        // Функция создания рандомной анимации
        function createLightAnimation() {
            const tl = gsap.timeline();

            // Шаг 1: Плавное появление луча (рандомные значения)
            tl.to($lightBeam, {
                x: gsap.utils.random(-300, 300),
                y: gsap.utils.random(-200, 200),
                scale: gsap.utils.random(0.9, 1.3),
                opacity: gsap.utils.random(0.6, 0.8),
                background: gradients[0],
                duration: 3,
                ease: "sine.inOut"
            })
            // Шаг 2: Активное движение
            .to($lightBeam, {
                x: gsap.utils.random(-450, 450),
                y: gsap.utils.random(-250, 250),
                scale: gsap.utils.random(1.0, 1.6),
                opacity: gsap.utils.random(0.7, 0.9),
                background: gradients[1],
                duration: 3.5,
                ease: "sine.inOut"
            })
            // Шаг 3: Продолжение движения
            .to($lightBeam, {
                x: gsap.utils.random(-400, 400),
                y: gsap.utils.random(-280, 280),
                scale: gsap.utils.random(0.85, 1.4),
                opacity: gsap.utils.random(0.65, 0.85),
                background: gradients[2],
                duration: 4,
                ease: "sine.inOut"
            })
            // Шаг 4: Еще одно движение
            .to($lightBeam, {
                x: gsap.utils.random(-420, 420),
                y: gsap.utils.random(-260, 260),
                scale: gsap.utils.random(0.95, 1.4),
                opacity: gsap.utils.random(0.6, 0.8),
                background: gradients[3],
                duration: 3.5,
                ease: "sine.inOut"
            })
            // Шаг 5: Возврат к центру
            .to($lightBeam, {
                x: gsap.utils.random(-150, 150),
                y: gsap.utils.random(-100, 100),
                scale: gsap.utils.random(0.9, 1.1),
                opacity: gsap.utils.random(0.4, 0.6),
                background: gradients[0],
                duration: 2.5,
                ease: "sine.inOut"
            })
            // Шаг 6: Плавное исчезновение
            .to($lightBeam, {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 0,
                background: gradients[0],
                duration: 2,
                ease: "sine.inOut",
                onComplete: () => {
                    // После завершения - создаем новую рандомную анимацию
                    createLightAnimation();
                }
            });

            return tl;
        }

        // Запускаем первую анимацию
        createLightAnimation();
    }

    // ===== SOUNDTRACK AUDIO BARS ANIMATION =====
    function initSoundtrackAnimation() {
        const $bars = $('.soundtrack__bar');
        
        if ($bars.length === 0) return;

        // Анимируем каждую полоску изменением scaleY
        $bars.each(function(index) {
            const duration = gsap.utils.random(0.5, 1.9); // Скорость (меньше = быстрее)
            const delay = index * 0.08; // Волновой эффект
            
            // Бесконечная анимация scaleY
            gsap.timeline({
                repeat: -1,
                delay: delay
            })
            .to(this, {
                scaleY: gsap.utils.random(0.4, 0.7),
                duration: duration,
                ease: "power2.inOut"
            })
            .to(this, {
                scaleY: 1,
                duration: duration,
                ease: "power2.inOut"
            });
        });
    }

    // Инициализируем анимацию soundtrack
    initSoundtrackAnimation();
});

function initFinalCtaWebGL() {
    // Disable heavy WebGL animation on small screens to save resources
    if (window.innerWidth <= 1200) {
        // Do not initialize WebGL on tablets / mobiles
        return;
    }

    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded — final-cta WebGL background skipped');
        return;
    }

    const img = document.querySelector('.final-cta__bg');
    if (!img) return;

    const parent = img.closest('.final-cta') || img.parentElement;
    if (!parent) return;

    // Create container for renderer
    const webglContainer = document.createElement('div');
    webglContainer.className = 'final-cta__webgl';
    webglContainer.style.position = 'absolute';
    webglContainer.style.inset = '0';
    webglContainer.style.pointerEvents = 'none';
    webglContainer.style.zIndex = '1';
    parent.style.position = parent.style.position || 'relative';
    parent.insertBefore(webglContainer, parent.firstChild);

    // hide original image visually but keep for accessibility
    img.style.opacity = 0;
    img.style.visibility = 'hidden';

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    webglContainer.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Fullscreen quad
    const geometry = new THREE.PlaneGeometry(2, 2);

    const loader = new THREE.TextureLoader();
    const textureSrc = img.currentSrc || img.src;

    const uniforms = {
        uTime: { value: 0 },
        uTexture: { value: null },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uMouse: { value: new THREE.Vector2(0.0, 0.0) },
        uGlitch: { value: 0.0 },
        uSeed: { value: 0.0 }
    };

    const vertexShader = `
        varying vec2 vUv;
        void main(){
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        uniform float uTime;
        uniform float uGlitch;
        uniform float uSeed;
        uniform sampler2D uTexture;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        varying vec2 vUv;

        // basic hash / noise
        float hash(float n) { return fract(sin(n) * 43758.5453123); }
        float noise(vec2 x){
            vec2 p = floor(x);
            vec2 f = fract(x);
            f = f*f*(3.0-2.0*f);
            float n = p.x + p.y*57.0;
            float res = mix(mix(hash(n+0.0), hash(n+1.0), f.x), mix(hash(n+57.0), hash(n+58.0), f.x), f.y);
            return res;
        }

        void main(){
            vec2 uv = vUv;

                // base slight scanline wobble (sped up and a bit stronger for visibility)
                float t = uTime * 3.0;
                float scan = sin(uv.y * 200.0 + t * 3.5) * 0.005;

            // global glitch intensity
            float g = clamp(uGlitch, 0.0, 1.0);

            // blocky horizontal displacement bands (television glitch)
            float bands = noise(vec2(uv.y * 60.0 + uSeed, floor(t*1.2))) ;
            // lower threshold so bands appear slightly more often, making glitches more visible
            float bandMask = step(0.7, bands) * g;

            // color channel offsets depend on bandMask and small noise
            // increase max offset for more visible RGB splits
            float maxOffset = 0.05 * g;
            vec2 offR = vec2(maxOffset * (hash(uSeed+1.0)-0.5), 0.0);
            vec2 offG = vec2(maxOffset * (hash(uSeed+2.0)-0.5) * 0.6, 0.0);
            vec2 offB = vec2(maxOffset * (hash(uSeed+3.0)-0.5) * 0.4, 0.0);

            // sample with scanline wobble + band shifts
            vec2 uvR = uv + vec2(scan * 0.5 + bandMask * (hash(uv.y*100.0+uSeed)-0.5) * 0.02, 0.0) + offR;
            vec2 uvG = uv + vec2(scan * 0.5 + bandMask * (hash(uv.y*101.0+uSeed)-0.5) * 0.018, 0.0) + offG;
            vec2 uvB = uv + vec2(scan * 0.5 + bandMask * (hash(uv.y*102.0+uSeed)-0.5) * 0.015, 0.0) + offB;

            vec4 colR = texture2D(uTexture, uvR);
            vec4 colG = texture2D(uTexture, uvG);
            vec4 colB = texture2D(uTexture, uvB);

            // mix channels
            vec3 color = vec3(colR.r, colG.g, colB.b);

            // small noisy speckles when glitching (slightly stronger)
            float speck = noise(uv * vec2(800.0, 1200.0) + uSeed) * g * 0.09;
            color += speck;

            // vignette to make the effect look more TV-like
            float dist = distance(uv, vec2(0.5));
            color *= smoothstep(0.95, 0.6, dist);

            gl_FragColor = vec4(color, 1.0);
        }
    `;

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let start = performance.now();

    function onTextureLoad(tex) {
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        uniforms.uTexture.value = tex;
        resize();
        // start shader render loop
        animate();

        // schedule randomized glitch pulses
        let glitchTimeout;
        function scheduleGlitch(){
            const delay = 1500 + Math.random() * 2500;
            glitchTimeout = setTimeout(() => {
                uniforms.uGlitch.value = 1.0;
                uniforms.uSeed.value = Math.random() * 1000.0;
                // schedule next
                scheduleGlitch();
            }, delay);
        }
        scheduleGlitch();

        // ensure cleanup on unload
        window.addEventListener('beforeunload', function(){
            try { clearTimeout(glitchTimeout); } catch(e){}
        });
    }

    loader.load(textureSrc, onTextureLoad, undefined, function(err){
        console.warn('Failed to load final-cta texture', err);
    });

    function resize(){
        const rect = parent.getBoundingClientRect();
        const w = Math.max(1, Math.floor(rect.width));
        const h = Math.max(1, Math.floor(rect.height));
        renderer.setSize(w, h);
        uniforms.uResolution.value.set(w, h);
        renderer.domElement.style.width = w + 'px';
        renderer.domElement.style.height = h + 'px';
    }

    let mouseX = 0, mouseY = 0;
    function onMouseMove(e){
        const rect = parent.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        // center to -0.5..0.5
        mouseX = (x - 0.5);
        mouseY = (y - 0.5);
        // smooth update via uniform in render loop
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resize);

    let rafId;
    function animate(){
        const now = performance.now();
        uniforms.uTime.value = (now - start) / 1000;
        // lerp mouse uniform for smoothness
        uniforms.uMouse.value.x += (mouseX - uniforms.uMouse.value.x) * 0.08;
        uniforms.uMouse.value.y += (mouseY - uniforms.uMouse.value.y) * 0.08;
        // decay glitch value so pulses fade out (faster)
        uniforms.uGlitch.value *= 0.9;

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
    }

    // Cleanup on unload
    window.addEventListener('beforeunload', function(){
        if (rafId) cancelAnimationFrame(rafId);
        try { renderer.dispose(); } catch(e){}
    });
}

// Запуск WebGL-анимации только на десктопе (>1200px)
if (window.innerWidth > 1200) {
    // Функция ожидания загрузки Three.js
    function waitForThreeAndInit() {
        if (typeof THREE !== 'undefined') {
            // Three.js загружен, запускаем анимацию
            initFinalCtaWebGL();
        } else {
            // Three.js еще не загружен, проверяем снова через 100ms
            setTimeout(waitForThreeAndInit, 100);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(waitForThreeAndInit, 100);
        });
    } else {
        setTimeout(waitForThreeAndInit, 100);
    }
}

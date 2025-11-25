document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// ===== SMOOTH SCROLL TO SECTIONS =====
document.addEventListener('DOMContentLoaded', function() {
    // Регистрируем ScrollToPlugin
    gsap.registerPlugin(ScrollToPlugin);

    // Находим все ссылки с якорями
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Игнорируем пустые якори и якорь "#"
            if (href === '#' || href === '') {
                return;
            }

            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Закрываем мобильное меню если оно открыто
                const nav = document.querySelector('.header__nav');
                const body = document.body;
                if (nav && nav.classList.contains('nav-open')) {
                    nav.classList.remove('nav-open');
                    body.classList.remove('menu-open');
                }

                // Плавная прокрутка с кинематографичной анимацией (как в Apple)
                gsap.to(window, {
                    duration: 1.8,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80 // Отступ от верха для фиксированного хедера
                    },
                    ease: "expo.inOut"
                });
            }
        });
    });
});

// ===== CANVAS STARFIELD FOR OBJECTIVES SECTION =====
(function() {
    const canvas = document.getElementById("objectives-space");

    if (!canvas) {
        return;
    }

    const c = canvas.getContext("2d");

    const numStars = 1500;
    const radius = '0.' + Math.floor(Math.random() * 9) + 1;
    let focalLength = canvas.width * 2;
    let centerX, centerY;

    let stars = [], star;
    let i;

    let animationId;
    let rotation = 0; // Угол вращения

    function initializeStars() {
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;

        stars = [];
        for (i = 0; i < numStars; i++) {
            star = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random() * canvas.width,
                o: '0.' + Math.floor(Math.random() * 6) + 1
            };
            stars.push(star);
        }
    }

    function moveStars() {
        for (i = 0; i < numStars; i++) {
            star = stars[i];
            star.z -= 3; // Увеличена скорость с 1 до 3

            if (star.z <= 0) {
                star.z = canvas.width;
            }
        }
    }

    function drawStars() {
        let pixelX, pixelY, pixelRadius;

        // Resize to the screen
        if (canvas.width != window.innerWidth || canvas.height != window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            focalLength = canvas.width * 2;
            initializeStars();
        }

        // Clear with dark background
        c.fillStyle = "rgba(8, 6, 8, 0.25)";
        c.fillRect(0, 0, canvas.width, canvas.height);

        // Увеличиваем угол вращения (медленное вращение)
        rotation += 0.0015;

        // Draw stars as circles with mint green color
        for (i = 0; i < numStars; i++) {
            star = stars[i];

            // Применяем вращение к координатам звезды
            let rotatedX = star.x - centerX;
            let rotatedY = star.y - centerY;

            let tempX = rotatedX * Math.cos(rotation) - rotatedY * Math.sin(rotation);
            let tempY = rotatedX * Math.sin(rotation) + rotatedY * Math.cos(rotation);

            rotatedX = tempX + centerX;
            rotatedY = tempY + centerY;

            pixelX = (rotatedX - centerX) * (focalLength / star.z);
            pixelX += centerX;
            pixelY = (rotatedY - centerY) * (focalLength / star.z);
            pixelY += centerY;
            pixelRadius = 1 * (focalLength / star.z);

            // Рисуем круглые точки вместо квадратных
            c.fillStyle = "rgba(7, 180, 138, " + star.o + ")";
            c.beginPath();
            c.arc(pixelX, pixelY, pixelRadius / 2, 0, Math.PI * 2);
            c.fill();
        }
    }

    function executeFrame() {
        moveStars();
        drawStars();
        animationId = requestAnimationFrame(executeFrame);
    }

    // Initialize and start animation
    initializeStars();
    executeFrame();

    // Cleanup on window unload
    window.addEventListener('beforeunload', function() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
})();

// ===== FINAL CTA ANIMATED LIGHT BEAM =====
const lightBeam = document.querySelector('.final-cta__light');

if (lightBeam) {
    // Цвета для анимации градиента (07BC8A, 97F69D, 0C5350)
    const gradients = [
        'radial-gradient(circle at center, rgba(7, 188, 138, 0.8) 0%, rgba(151, 246, 157, 0.6) 25%, rgba(12, 83, 80, 0.4) 50%, rgba(151, 246, 157, 0.2) 70%, transparent 85%)',
        'radial-gradient(circle at center, rgba(151, 246, 157, 0.8) 0%, rgba(12, 83, 80, 0.6) 25%, rgba(7, 188, 138, 0.4) 50%, rgba(12, 83, 80, 0.2) 70%, transparent 85%)',
        'radial-gradient(circle at center, rgba(12, 83, 80, 0.8) 0%, rgba(7, 188, 138, 0.6) 25%, rgba(151, 246, 157, 0.4) 50%, rgba(7, 188, 138, 0.2) 70%, transparent 85%)',
        'radial-gradient(circle at center, rgba(151, 246, 157, 0.9) 0%, rgba(7, 188, 138, 0.6) 25%, rgba(12, 83, 80, 0.35) 50%, rgba(151, 246, 157, 0.15) 70%, transparent 85%)'
    ];

    // Устанавливаем начальное состояние
    gsap.set(lightBeam, {
        opacity: 0,
        x: 0,
        y: 0,
        scale: 1
    });

    // Функция создания рандомной анимации
    function createLightAnimation() {
        const tl = gsap.timeline();

        // Шаг 1: Плавное появление луча (рандомные значения)
        tl.to(lightBeam, {
            x: gsap.utils.random(-300, 300),
            y: gsap.utils.random(-200, 200),
            scale: gsap.utils.random(0.9, 1.3),
            opacity: gsap.utils.random(0.6, 0.8),
            background: gradients[0],
            duration: 3,
            ease: "sine.inOut"
        })
        // Шаг 2: Активное движение
        .to(lightBeam, {
            x: gsap.utils.random(-450, 450),
            y: gsap.utils.random(-250, 250),
            scale: gsap.utils.random(1.0, 1.6),
            opacity: gsap.utils.random(0.7, 0.9),
            background: gradients[1],
            duration: 3.5,
            ease: "sine.inOut"
        })
        // Шаг 3: Продолжение движения
        .to(lightBeam, {
            x: gsap.utils.random(-400, 400),
            y: gsap.utils.random(-280, 280),
            scale: gsap.utils.random(0.85, 1.4),
            opacity: gsap.utils.random(0.65, 0.85),
            background: gradients[2],
            duration: 4,
            ease: "sine.inOut"
        })
        // Шаг 4: Еще одно движение
        .to(lightBeam, {
            x: gsap.utils.random(-420, 420),
            y: gsap.utils.random(-260, 260),
            scale: gsap.utils.random(0.95, 1.4),
            opacity: gsap.utils.random(0.6, 0.8),
            background: gradients[3],
            duration: 3.5,
            ease: "sine.inOut"
        })
        // Шаг 5: Возврат к центру
        .to(lightBeam, {
            x: gsap.utils.random(-150, 150),
            y: gsap.utils.random(-100, 100),
            scale: gsap.utils.random(0.9, 1.1),
            opacity: gsap.utils.random(0.4, 0.6),
            background: gradients[0],
            duration: 2.5,
            ease: "sine.inOut"
        })
        // Шаг 6: Плавное исчезновение
        .to(lightBeam, {
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

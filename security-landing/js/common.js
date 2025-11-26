document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const closeBtn = document.querySelector('.close');
    const body = document.body;
    
    function isMobile() {
        return window.innerWidth <= 1200;
    }
    
    // Открытие меню
    if (burger) {
        burger.addEventListener('click', function() {
            if (isMobile()) {
                body.classList.add('menu-open');
            }
        });
    }
    
    // Закрытие меню
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            body.classList.remove('menu-open');
        });
    }
    
    // Закрытие при ресайзе больше 1200px
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1200) {
            body.classList.remove('menu-open');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');
        const toggle = item.querySelector('.faq__toggle');

        // Устанавливаем начальное состояние для GSAP
        if (!item.classList.contains('active')) {
            gsap.set(answer, { height: 0, opacity: 0, overflow: 'hidden' });
        }

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Закрываем все другие элементы с анимацией
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    const otherAnswer = otherItem.querySelector('.faq__answer');
                    const otherToggle = otherItem.querySelector('.faq__toggle');

                    gsap.to(otherAnswer, {
                        height: 0,
                        opacity: 0,
                        duration: 0.4,
                        ease: "power2.inOut",
                        onComplete: () => {
                            otherItem.classList.remove('active');
                        }
                    });

                    gsap.to(otherToggle, {
                        rotation: 0,
                        duration: 0.3,
                        ease: "power2.inOut"
                    });
                }
            });

            // Переключаем текущий элемент с анимацией
            if (!isActive) {
                // Открываем
                item.classList.add('active');

                // Получаем реальную высоту контента
                const contentHeight = answer.scrollHeight;

                gsap.to(answer, {
                    height: contentHeight,
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.inOut"
                });

                gsap.to(toggle, {
                    rotation: 45,
                    duration: 0.3,
                    ease: "power2.inOut"
                });
            } else {
                // Закрываем
                gsap.to(answer, {
                    height: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.inOut",
                    onComplete: () => {
                        item.classList.remove('active');
                    }
                });

                gsap.to(toggle, {
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.inOut"
                });
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
            
            document.body.classList.remove('menu-open');

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
    let rotation = 0.04; // Угол вращения

    function initializeStars() {
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;

        stars = [];
        for (i = 0; i < numStars; i++) {
            star = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random() * canvas.width,
                o: '0.3'
            };
            stars.push(star);
        }
    }

    function moveStars() {
        for (i = 0; i < numStars; i++) {
            star = stars[i];
            star.z -= 2; // Увеличена скорость с 1 до 3

            if (star.z <= 0) {
                star.z = canvas.width;
            }
        }
    }

    function drawStars() {
        let pixelX, pixelY, pixelRadius;

        // Resize to the screen
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            focalLength = canvas.width * 2;
            initializeStars();
        }

        // Clear with dark background
        c.fillStyle = "rgba(8, 6, 8, 0.25)";
        c.fillRect(0, 0, canvas.width, canvas.height);

        // Увеличиваем угол вращения (медленное вращение)
        rotation += 0.0001;

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
            pixelRadius = (focalLength / star.z);

            // Рисуем круглые точки вместо квадратных
            c.fillStyle = "rgba(7, 180, 138, 0.2)";
            c.beginPath();
            c.arc(pixelX, pixelY, pixelRadius / 2, 0, Math.PI);
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

// ===== CANVAS STARFIELD FOR RISKS-PROCESS WRAPPER WITH RIPPLE EFFECT =====
(function() {
    const canvas = document.getElementById("risks-process-space");

    if (!canvas) {
        return;
    }

    const c = canvas.getContext("2d");

    const numStars = 1500;
    let focalLength = canvas.width * 2;
    let centerX, centerY;

    let stars = [], star;
    let i;

    let animationId;
    let rotation = 0;

    // Массив для хранения активных волн (ripples)
    let ripples = [];

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
            star.z -= 3;

            if (star.z <= 0) {
                star.z = canvas.width;
            }
        }
    }

    function createRipple() {
        // Волна расходится от низа по центру
        // Вычисляем максимальный радиус - диагональ экрана с запасом
        const diagonal = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2));

        const ripple = {
            x: canvas.width / 2,      // По центру экрана по горизонтали
            y: canvas.height,         // От низа экрана
            radius: 0,
            maxRadius: diagonal * 1.5, // С запасом, чтобы точно покрыть весь экран
            speed: 2                   // Уменьшена скорость с 5 до 2
        };
        ripples.push(ripple);
    }

    function updateRipples() {
        for (let j = ripples.length - 1; j >= 0; j--) {
            const ripple = ripples[j];
            ripple.radius += ripple.speed;

            // Удаляем волну когда она ушла далеко за границы
            if (ripple.radius > ripple.maxRadius) {
                ripples.splice(j, 1);
            }
        }
    }

    function drawRipples() {
        ripples.forEach(ripple => {
            // ===== НАСТРОЙКА ЦВЕТА ВОЛНЫ =====
            // Здесь можно изменить цвета градиента волны:
            // rgba(R, G, B, прозрачность)
            // Пример: rgba(7, 188, 138, ...) - мятно-зеленый
            //         rgba(151, 246, 157, ...) - салатовый
            //         rgba(12, 83, 80, ...) - темно-зеленый

            // Внутренний радиус для эффекта кольца (не может быть отрицательным)
            const innerRadius = Math.max(0, ripple.radius - 150);

            const gradient = c.createRadialGradient(
                ripple.x, ripple.y, innerRadius,  // Внутренний радиус (начало кольца)
                ripple.x, ripple.y, ripple.radius  // Внешний радиус (конец кольца)
            );

            // Кольцо волны с плавным градиентом (без изменения прозрачности)
            gradient.addColorStop(0, `rgba(7, 188, 138, 0)`);
            gradient.addColorStop(0.5, `rgba(7, 188, 138, 0.002)`);
            gradient.addColorStop(0.1, `rgba(151, 246, 157, 0.005)`);
            gradient.addColorStop(0.6, `rgba(12, 83, 80, 0.03)`);
            gradient.addColorStop(1, `rgba(7, 188, 138, 0)`);

            c.fillStyle = gradient;
            c.beginPath();
            c.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            c.fill();
        });
    }

    function drawStars() {
        let pixelX, pixelY, pixelRadius;

        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            focalLength = canvas.width * 2;
            initializeStars();
        }

        c.fillStyle = "rgba(8, 6, 8, 0.8)";
        c.fillRect(0, 0, canvas.width, canvas.height);

        rotation += 0.0005;

        for (i = 0; i < numStars; i++) {
            star = stars[i];

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
            pixelRadius = (focalLength / star.z);

            c.fillStyle = "rgba(7, 180, 138, " + star.o + ")";
            c.beginPath();
            c.arc(pixelX, pixelY, pixelRadius / 2, 0, Math.PI * 2);
            c.fill();
        }

        // Рисуем волны поверх звезд
        drawRipples();
    }

    function executeFrame() {
        moveStars();
        updateRipples();
        drawStars();
        animationId = requestAnimationFrame(executeFrame);
    }

    // Создаем волны через случайные интервалы (от 8 до 15 секунд)
    function scheduleNextRipple() {
        const delay = 8000 + Math.random() * 7000;
        setTimeout(() => {
            createRipple();
            scheduleNextRipple();
        }, delay);
    }

    initializeStars();
    executeFrame();
    scheduleNextRipple();

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

// ===== THREE.JS PARTICLE SPHERE FOR ADVANTAGES SECTION =====
function initThreeJsParticles() {
    // Проверяем что THREE загружен
    if (typeof THREE === 'undefined') {
        console.warn('THREE.js не загружен');
        return;
    }

    const canvas = document.getElementById("advantages-particles");

    if (!canvas) {
        return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Прозрачный фон

    // Window resize handler
    window.addEventListener("resize", function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Create particle sphere
    const distance = Math.min(200, window.innerWidth / 4);
    const geometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < 1600; i++) {
        const theta = Math.acos(THREE.MathUtils.randFloatSpread(2));
        const phi = THREE.MathUtils.randFloatSpread(360);

        const x = distance * Math.sin(theta) * Math.cos(phi);
        const y = distance * Math.sin(theta) * Math.sin(phi);
        const z = distance * Math.cos(theta);

        positions.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    // Материал с круглыми точками цветом #0D3837
    const material = new THREE.PointsMaterial({
        color: 0x0D3837,
        size: 4,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
        map: createCircleTexture(), // Делаем точки круглыми
        alphaTest: 0.5
    });

    // Функция для создания круглой текстуры для точек
    function createCircleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);

        return new THREE.CanvasTexture(canvas);
    }

    const particles = new THREE.Points(geometry, material);

    const renderingParent = new THREE.Group();
    renderingParent.add(particles);

    const resizeContainer = new THREE.Group();
    resizeContainer.add(renderingParent);
    scene.add(resizeContainer);

    camera.position.z = 400;

    // Mouse move handler - медленное плавное вращение независимо от скорости мыши
    let targetRotationX = 0;
    let targetRotationY = 0;

    document.addEventListener('mousemove', function(event) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        // Целевая позиция вращения (уменьшенная амплитуда)
        targetRotationX = mouseY * -0.3;
        targetRotationY = mouseX * 0.3;
    }, false);

    // Плавное приближение к целевой позиции в каждом кадре
    function updateRotation() {
        particles.rotation.x += (targetRotationX - particles.rotation.x) * 0.02;
        particles.rotation.y += (targetRotationY - particles.rotation.y) * 0.02;
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        updateRotation(); // Обновляем вращение в каждом кадре
        renderer.render(scene, camera);
    }

    // Scaling animation
    if (typeof gsap !== 'undefined') {
        const animProps = { scale: 1, xRot: 0, yRot: 0 };

        gsap.to(animProps, {
            duration: 10,
            scale: 1.3,
            repeat: -1,
            yoyo: true,
            ease: "sine",
            onUpdate: function() {
                renderingParent.scale.set(animProps.scale, animProps.scale, animProps.scale);
            }
        });

        gsap.to(animProps, {
            duration: 120,
            xRot: Math.PI * 2,
            yRot: Math.PI * 4,
            repeat: -1,
            yoyo: true,
            ease: "none",
            onUpdate: function() {
                renderingParent.rotation.set(animProps.xRot, animProps.yRot, 0);
            }
        });
    }

    animate();
}

// Запускаем когда DOM и THREE.js загружены
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Даем время на загрузку Three.js
        setTimeout(initThreeJsParticles, 100);
    });
} else {
    // DOM уже загружен
    setTimeout(initThreeJsParticles, 100);
}

// ===== STACKING CARDS ANIMATION FOR CASES SECTION =====
document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }

    // Регистрируем ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".cases__card");
    const spacer = 20;
    const minScale = 0.8;

    const distributor = gsap.utils.distribute({ base: minScale, amount: 0.2 });

    cards.forEach((card, index) => {
        const scaleVal = distributor(index, cards[index], cards);

        // Анимация scale при скролле
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: `top top`,
                scrub: true,
                invalidateOnRefresh: true
            },
            ease: "none",
            scale: scaleVal
        });

        // Pin анимация
        ScrollTrigger.create({
            trigger: card,
            start: `top-=${index * spacer} top`,
            endTrigger: '.cases__list',
            end: `bottom top+=${200 + (cards.length * spacer)}`,
            pin: true,
            pinSpacing: false,
            id: 'pin',
            invalidateOnRefresh: true,
        });
    });
});

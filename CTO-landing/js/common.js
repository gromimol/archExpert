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

// ===== MODAL: open on .js--cta click, close on overlay / close button / ESC =====
document.addEventListener('DOMContentLoaded', function() {
    const ctas = document.querySelectorAll('.js--cta');
    const checklistCtas = document.querySelectorAll('.js--cta-checklist');
    const overlay = document.getElementById('overlay');
    const modal = document.querySelector('.modal');
    const modalClose = modal ? modal.querySelector('.modal__close') : null;
    const modalTitle = modal ? modal.querySelector('.modal__title') : null;
    const formTypeInput = modal ? modal.querySelector('#formType') : null;
    const submitBtn = modal ? modal.querySelector('input[type="submit"].btn--green') : null;

    if (!overlay || !modal) return;

    // Find first focusable inside modal
    const firstFocusable = modal.querySelector('input, button, textarea, select, a');

    // Store original title texts
    const titles = {
        meeting: 'Fill out the form to book<br /> <span class="text-green-dark">a free 30-minute meeting</span>',
        checklist: 'Fill out the form to <span class="text-green-dark">access materials that support your company’s</span> growth and scalability'
    };

    // Store button text variants
    const buttonTexts = {
        meeting: 'Book a Meeting',
        checklist: 'Get It'
    };

    function showModal(type = 'meeting') {
        // Update modal title and form type based on which CTA was clicked
        if (modalTitle) {
            modalTitle.innerHTML = titles[type] || titles.meeting;
        }
        if (formTypeInput) {
            formTypeInput.value = type;
        }
        if (submitBtn) {
            submitBtn.value = buttonTexts[type] || buttonTexts.meeting;
        }
        // make elements available for animation
        overlay.style.display = 'block';
        modal.style.display = 'block';
        // Use GSAP if available for a smooth animated entrance
        if (typeof gsap !== 'undefined') {
            // reset any inline styles
            gsap.killTweensOf([overlay, modal]);
            // overlay fade in
            gsap.set(overlay, {opacity: 0, visibility: 'visible', pointerEvents: 'auto'});
            gsap.to(overlay, {duration: 0.35, opacity: 1, onStart: () => overlay.classList.add('open')});

            // modal pop in
            gsap.set(modal, {opacity: 0, scale: 0.96, visibility: 'visible', pointerEvents: 'auto'});
            gsap.to(modal, {duration: 0.45, opacity: 1, scale: 1, ease: 'power3.out', onStart: () => modal.classList.add('open')});
        } else {
            // graceful fallback
            requestAnimationFrame(() => {
                overlay.classList.add('open');
                modal.classList.add('open');
            });
        }

        document.body.classList.add('modal-open');
        modal.setAttribute('aria-hidden', 'false');
        if (firstFocusable) firstFocusable.focus();
    }

    function hideModal() {
        if (typeof gsap !== 'undefined') {
            gsap.killTweensOf([overlay, modal]);
            // animate out
            gsap.to(modal, {duration: 0.35, opacity: 0, scale: 0.98, ease: 'power2.in', onComplete: () => {
                modal.classList.remove('open');
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            }});

            gsap.to(overlay, {duration: 0.28, opacity: 0, ease: 'power2.in', onComplete: () => {
                overlay.classList.remove('open');
                overlay.style.display = 'none';
            }});
        } else {
            overlay.classList.remove('open');
            modal.classList.remove('open');
            overlay.style.display = 'none';
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }

        document.body.classList.remove('modal-open');
    }

    ctas.forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('meeting');
        });
    });

    checklistCtas.forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('checklist');
        });
    });

    // Close when clicking overlay (but not when clicking inside modal content)
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) hideModal();
    });

    if (modalClose) {
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
            hideModal();
        });
    }

    // Close on ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            if (overlay.classList.contains('open') || modal.classList.contains('open')) {
                hideModal();
            }
        }
    });
});

// ===== CHECKBOX -> SUBMIT DISABLED TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const agreeCheckbox = document.getElementById('agree');
    if (!agreeCheckbox) return;

    // Scope to the form containing the checkbox (modal form)
    const form = agreeCheckbox.closest('form');
    if (!form) return;

    const submitBtn = form.querySelector('input[type="submit"].btn--green');
    if (!submitBtn) return;

    // Only the checkbox controls whether submit is enabled.
    function updateSubmitState() {
        const enabled = agreeCheckbox.checked;
        if (enabled) {
            submitBtn.classList.remove('disabled');
            submitBtn.removeAttribute('disabled');
        } else {
            submitBtn.classList.add('disabled');
            submitBtn.setAttribute('disabled', 'disabled');
        }
    }

    // Listen to changes on the checkbox only
    agreeCheckbox.addEventListener('change', updateSubmitState);
    // initialize state on load
    updateSubmitState();

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!agreeCheckbox.checked) {
            updateSubmitState();
            return;
        }

        // Collect form data
        const formType = form.querySelector('#formType') ? form.querySelector('#formType').value : 'meeting';
        const name = form.querySelector('#name') ? form.querySelector('#name').value : '';
        const phone = form.querySelector('#phone') ? form.querySelector('#phone').value : '';
        const email = form.querySelector('#Email') ? form.querySelector('#Email').value : '';

        // Save to sessionStorage for success page
        const formData = {
            type: formType,
            name: name,
            phone: phone,
            email: email
        };
        sessionStorage.setItem('formSubmission', JSON.stringify(formData));

        // Redirect based on form type
        if (formType === 'checklist') {
            window.location.href = 'page-success-lm.php';
        } else {
            window.location.href = 'success-page.html';
        }
    });
});

// ===== СКРЫТИЕ/ПОКАЗ ШАПКИ ПРИ СКРОЛЛЕ НА МОБИЛЬНЫХ =====
(function() {
    // Работает только на мобильных (≤767px)
    if (window.innerWidth > 767) return;

    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollTop = 0;
    let isScrolling = false;
    const scrollThreshold = 5; // Минимальное расстояние скролла для срабатывания

    function handleScroll() {
        if (isScrolling) return;

        isScrolling = true;
        requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            // Показываем шапку, если мы в самом верху страницы
            if (currentScroll <= 100) {
                header.classList.remove('header-hidden');
            }
            // Скрываем при скролле вниз
            else if (currentScroll > lastScrollTop + scrollThreshold) {
                header.classList.add('header-hidden');
            }
            // Показываем при скролле вверх
            else if (currentScroll < lastScrollTop - scrollThreshold) {
                header.classList.remove('header-hidden');
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
            isScrolling = false;
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
})();

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

// ===== УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ДЛЯ ЗВЕЗДНОГО НЕБА =====
function createStarfield(config) {
    const canvas = document.getElementById(config.canvasId);

    if (!canvas) {
        return;
    }

    const c = canvas.getContext("2d");

    const numStars = config.numStars || 1500;
    let focalLength = canvas.width * 2;
    let centerX, centerY;

    let stars = [], star;
    let i;

    let animationId;
    let rotation = config.initialRotation || 0;

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
                o: config.starOpacity || ('0.' + Math.floor(Math.random() * 6) + 1)
            };
            stars.push(star);
        }
    }

    function moveStars() {
        for (i = 0; i < numStars; i++) {
            star = stars[i];
            star.z -= config.starSpeed || 2;

            if (star.z <= 0) {
                star.z = canvas.width;
            }
        }
    }

    function createRipple() {
        const diagonal = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2));

        const ripple = {
            x: canvas.width / 2,
            y: canvas.height,
            radius: 0,
            maxRadius: diagonal * 1.5,
            speed: 2
        };
        ripples.push(ripple);
    }

    function updateRipples() {
        for (let j = ripples.length - 1; j >= 0; j--) {
            const ripple = ripples[j];
            ripple.radius += ripple.speed;

            if (ripple.radius > ripple.maxRadius) {
                ripples.splice(j, 1);
            }
        }
    }

    function drawRipples() {
        ripples.forEach(ripple => {
            const innerRadius = Math.max(0, ripple.radius - 150);

            const gradient = c.createRadialGradient(
                ripple.x, ripple.y, innerRadius,
                ripple.x, ripple.y, ripple.radius
            );

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

        // Если фон прозрачный, полностью очищаем canvas
        if (config.backgroundColor === 'rgba(8, 6, 8, 0)') {
            c.clearRect(0, 0, canvas.width, canvas.height);
        } else {
            c.fillStyle = config.backgroundColor || "rgba(8, 6, 8, 0.25)";
            c.fillRect(0, 0, canvas.width, canvas.height);
        }

        rotation += config.rotationSpeed || 0.0001;

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

            // Используем starColor с переменной прозрачностью если не задан фиксированный цвет
            if (config.starColor) {
                c.fillStyle = config.starColor;
            } else {
                c.fillStyle = "rgba(7, 180, 138, " + star.o + ")";
            }
            c.beginPath();
            // Размер точки: pixelRadius делится на starSizeRatio (по умолчанию 2)
            const starSize = pixelRadius / (config.starSizeRatio || 2);
            c.arc(pixelX, pixelY, starSize, 0, Math.PI * 2);
            c.fill();
        }

        if (config.enableRipples) {
            drawRipples();
        }
    }

    function executeFrame() {
        moveStars();
        if (config.enableRipples) {
            updateRipples();
        }
        drawStars();
        animationId = requestAnimationFrame(executeFrame);
    }

    function scheduleNextRipple() {
        const delay = 8000 + Math.random() * 7000;
        setTimeout(() => {
            createRipple();
            scheduleNextRipple();
        }, delay);
    }

    initializeStars();
    executeFrame();

    if (config.enableRipples) {
        scheduleNextRipple();
    }

    window.addEventListener('beforeunload', function() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
}

// ===== ИНИЦИАЛИЗАЦИЯ ЗВЕЗДНОГО НЕБА ДЛЯ OBJECTIVES =====
createStarfield({
    canvasId: 'objectives-space',
    numStars: 1500,
    starSpeed: 2,
    starOpacity: '0.3',
    backgroundColor: 'rgba(8, 6, 8, 0)', // Прозрачный фон - показывает фоновую картинку
    rotationSpeed: 0.0001,
    initialRotation: 0.04,
    starSizeRatio: 3, // Чем больше значение, тем меньше точки (по умолчанию 2)
    enableRipples: false
});

// ===== ИНИЦИАЛИЗАЦИЯ ЗВЕЗДНОГО НЕБА ДЛЯ RISKS-PROCESS =====
// Определяем параметры в зависимости от размера экрана
const isMobileRisks = window.innerWidth <= 1200;
createStarfield({
    canvasId: 'risks-process-space',
    numStars: isMobileRisks ? 800 : 1500, // Меньше звезд на мобильных
    starSpeed: isMobileRisks ? 1 : 3, // Медленнее движение на мобильных
    backgroundColor: 'rgba(8, 6, 8, 0)', // Прозрачный фон - показывает фоновую картинку
    rotationSpeed: isMobileRisks ? 0.0002 : 0.0005, // Медленнее вращение на мобильных
    initialRotation: 0,
    starSizeRatio: 2, // Стандартный размер
    enableRipples: false // Волны отключены
});

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

    // Материал с круглыми точками цветом #063032
    const material = new THREE.PointsMaterial({
        color: 0x063032,
        size: 4,
        sizeAttenuation: true,
        transparent: true,
        opacity: 1,
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

// ===== FINAL CTA WEBGL BACKGROUND FOR `.final-cta__bg` =====
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

// ===== GSAP ANIMATION FOR GRADIENT ELLIPSE =====
document.addEventListener('DOMContentLoaded', function() {
    // Respect reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Disable on smaller screens to save resources
    if (window.innerWidth <= 1200) return;

    const ellipse = document.querySelector('.gradient-ellipse');
    if (!ellipse) return;
    if (typeof gsap === 'undefined') return;

    // Only smooth, noticeable left-right motion — keep it simple and visible
    gsap.to(ellipse, {
        y: '40rem',
        duration: 5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
    });
});

// ===== STACKING CARDS ANIMATION FOR CASES SECTION =====
document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }

    // Отключаем анимацию для экранов 1200px и меньше
    if (window.innerWidth <= 1200) {
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

// ===== SCROLL COLOR REVEAL EFFECT =====
document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded for scroll color reveal');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Находим все элементы с классом scroll-color-reveal
    const revealElements = document.querySelectorAll('.scroll-color-reveal');

    revealElements.forEach((target) => {
        // Проверяем, находится ли элемент внутри first-screen
        const isInFirstScreen = target.closest('.first-screen');

        if (isInFirstScreen) {
            // Для first-screen: автоматическая анимация через 2 секунды после загрузки
            gsap.to(target, {
                backgroundPositionX: 0,
                ease: "power2.out",
                duration: 3.5,
                delay: 2
            });
        } else {
            // Для остальных секций: анимация при скролле
            gsap.to(target, {
                backgroundPositionX: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: target,
                    scrub: 1,
                    start: "top 80%",
                    end: "top 30%"
                }
            });
        }
    });
});

// Water Ripple Effect for First Screen
class WaterRipple {
    constructor(imageElement, options = {}) {
        this.image = imageElement;
        this.parent = imageElement.parentElement;

        // Настройки
        this.options = {
            dropRadius: options.dropRadius || 3,
            perturbance: options.perturbance || 0.03,
            resolution: options.resolution || 256,
            interactive: options.interactive || false,
            dropInterval: options.dropInterval || [1000, 3000], // мин и макс интервал
            onDrop: options.onDrop || null // ВАЖНО! Callback для пульсации
        };

        this.canvas = null;
        this.ctx = null;
        this.width = 0;
        this.height = 0;

        // Буферы для симуляции воды
        this.rippleMap = [];
        this.lastMap = [];

        this.running = false;
        this.dropTimer = null;

        this.init();
    }

    init() {
        // Создаем canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';

        // Вставляем canvas после картинки
        this.parent.style.position = '';
        this.parent.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.updateSize();

        // Инициализируем буферы
        const size = this.width * this.height;
        for (let i = 0; i < size; i++) {
            this.rippleMap[i] = 0;
            this.lastMap[i] = 0;
        }

        // Запускаем анимацию
        this.running = true;
        this.animate();

        // Запускаем таймер капель
        this.startDropping();

        console.log('Water ripple effect initialized');
    }

    updateSize() {
        const rect = this.image.getBoundingClientRect();
        this.width = this.options.resolution;
        this.height = Math.floor(rect.height / rect.width * this.width);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    disturb(x, y, radius, strength) {
        const maxX = this.width;
        const maxY = this.height;

        for (let i = y - radius; i < y + radius; i++) {
            for (let j = x - radius; j < x + radius; j++) {
                if (i >= 0 && i < maxY && j >= 0 && j < maxX) {
                    const distance = Math.sqrt((j - x) ** 2 + (i - y) ** 2);
                    if (distance < radius) {
                        const index = i * maxX + j;
                        this.rippleMap[index] += strength * (1 - distance / radius);
                    }
                }
            }
        }
    }

    dropAtRandom() {
        const x = Math.floor(Math.random() * this.width);
        const y = Math.floor(Math.random() * this.height);
        const strength = 512; // Сила капли

        this.disturb(x, y, this.options.dropRadius, strength);

        // Вызываем callback для пульсации
        if (this.options.onDrop) {
            this.options.onDrop();
        }
    }

    startDropping() {
        const drop = () => {
            this.dropAtRandom();

            // Случайный интервал между каплями
            const [min, max] = this.options.dropInterval;
            const nextDrop = min + Math.random() * (max - min);

            this.dropTimer = setTimeout(drop, nextDrop);
        };

        // Первая капля через 500ms
        setTimeout(drop, 1000);
    }

    update() {
        const width = this.width;
        const height = this.height;
        const rippleMap = this.rippleMap;
        const lastMap = this.lastMap;

        // Симуляция распространения волн
        for (let i = 1; i < height - 1; i++) {
            for (let j = 1; j < width - 1; j++) {
                const index = i * width + j;

                // Усреднение соседних пикселей
                const average = (
                    rippleMap[index - width] +
                    rippleMap[index + width] +
                    rippleMap[index - 1] +
                    rippleMap[index + 1]
                ) / 2;

                // Затухание
                lastMap[index] = average - lastMap[index];
                lastMap[index] *= 0.99; // Коэффициент затухания
            }
        }

        // Swap buffers
        const temp = this.rippleMap;
        this.rippleMap = this.lastMap;
        this.lastMap = temp;
    }

    render() {
        const width = this.width;
        const height = this.height;
        const imageData = this.ctx.createImageData(width, height);
        const data = imageData.data;
        const rippleMap = this.rippleMap;

        // Рендерим эффект ряби
        for (let i = 1; i < height - 1; i++) {
            for (let j = 1; j < width - 1; j++) {
                const index = i * width + j;
                const pixelIndex = index * 4;

                // Вычисляем смещение на основе градиента
                const dx = rippleMap[index - 1] - rippleMap[index + 1];
                const dy = rippleMap[index - width] - rippleMap[index + width];

                // Искажение (displacement)
                const displacement = dx * this.options.perturbance;

                // Используем displacement для создания эффекта
                const brightness = displacement * 30;
                const alpha = Math.abs(displacement) * 255;

                // Цвет волны RGB(13, 57, 56) - темно-зеленый
                data[pixelIndex] = 13 + brightness * 0.5;     // R
                data[pixelIndex + 1] = 57 + brightness * 0.5; // G
                data[pixelIndex + 2] = 56 + brightness * 0.5; // B
                data[pixelIndex + 3] = Math.min(alpha * 0.15, 30); // A (прозрачность - сильно уменьшена)
            }
        }

        this.ctx.putImageData(imageData, 0, 0);
    }

    animate() {
        if (!this.running) return;

        this.update();
        this.render();

        requestAnimationFrame(() => this.animate());
    }

    destroy() {
        this.running = false;
        if (this.dropTimer) {
            clearTimeout(this.dropTimer);
        }
        if (this.canvas && this.canvas.parentElement) {
            this.canvas.parentElement.removeChild(this.canvas);
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const bgImage = document.querySelector('.first-screen__bg img');

    if (bgImage) {
        // Ждем загрузки картинки
        if (bgImage.complete) {
            initRipple();
        } else {
            bgImage.addEventListener('load', initRipple);
        }
    }

    function initRipple() {
        // Устанавливаем transform origin для правильной трансформации
        if (typeof gsap !== 'undefined') {
            gsap.set(bgImage, {
                transformOrigin: "center center"
            });
        }

        const ripple = new WaterRipple(bgImage, {
            dropRadius: 4,
            perturbance: 0.04,
            resolution: 256,
            dropInterval: [3000, 10000], // капли каждые 3-10 секунд
            onDrop: function() {
                // Плавная пульсация при капле
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(bgImage,
                        {
                            scale: 1
                        },
                        {
                            scale: 0.98,
                            duration: 1,
                            ease: "sine.inOut",
                            yoyo: true,
                            repeat: 1,
                            overwrite: false
                        }
                    );
                }
            }
        });

        // Добавляем плавное бесконечное вращение
        if (typeof gsap !== 'undefined') {
            gsap.to(bgImage, {
                rotation: 360,
                duration: 120,
                ease: "none",
                repeat: -1,
                overwrite: false
            });
        }

        console.log('Water ripple effect started (rotation disabled)');
    }
});

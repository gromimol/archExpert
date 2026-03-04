        <footer class="footer" id="contacts">
            <div class="container">
                <div class="footer__top">
                    <div class="footer__brand">
                        <div class="h4">Arch Expert Consulting</div>
                        <div class="footer__slogan h4">
                            <span class="footer__slogan-gradient">Boosting revenue</span> through technical <br class="for-desctop" />excellence
                        </div>
                    </div>

                    <div class="footer__cta">
                        <div class="footer__cta__left">
                            <div class="h4">Want to Talk?</div>
                            <a href="#" class="footer__diagnostic js--cta">
                                <span class="footer__dot"></span>
                                Book a 30-min Diagnostic
                            </a>
                        </div>
                        <a href="#" class="footer__scroll-top icon-arrow-down for-mobile"></a>
                    </div>
                </div>

                <div class="footer__middle">
                    <nav class="footer__nav">
                        <ul>
                            <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a></li>
                            <li><a href="<?php echo esc_url( home_url( '/scale/' ) ); ?>">Technology Consulting for Secure Scaling</a></li>
                            <li><a href="<?php echo esc_url( home_url( '/security/' ) ); ?>">Cybersecurity Audit</a></li>
                        </ul>
                        <ul>
                            <li><a href="<?php echo esc_url( home_url( '/book/' ) ); ?>">Book</a></li>
                            <li><a href="<?php echo esc_url( home_url( '/podcast/' ) ); ?>">Podcast</a></li>
                            <li><a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>">Blog</a></li>
                        </ul>
                    </nav>

                    <div class="footer__contact">
                        <div class="h4">Contact</div>
                        <div class="footer__contact-info">
                            <p>Email: <a href="mailto:hello@arch-expert.com">hello@arch-expert.com</a></p>
                            <p>LinkedIn: <a href="#">Company Page</a></p>
                        </div>
                    </div>

                    <a href="#" class="footer__scroll-top icon-arrow-down for-desctop"></a>
                </div>

                <div class="footer__bottom">
                    <div class="footer__copyright">
                        <div class="footer__copyright__left">
                            © <?php echo date('Y'); ?> Arch Expert Consulting. All rights reserved.
                        </div>
                        <div class="footer__copyright__right">
                            <a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>">Privacy Policy</a> | <a href="<?php echo esc_url( home_url( '/terms-of-service/' ) ); ?>">Terms of Service</a>
                        </div>
                    </div>
                    <div class="footer__logo-big">
                        <img src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/logo.svg' ); ?>" alt="Arch Expert" loading="lazy">
                    </div>
                </div>
            </div>
        </footer>
    </div>

    <!-- Overlay for modal -->
    <div id="overlay"></div>

    <!-- Meeting Modal -->
    <div class="modal" id="meetingModal">
        <div class="modal__content">
            <div class="modal__close" id="modalClose">
                <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.799 21.9079L11.3137 13.4226L2.82844 21.9079L0.719525 19.799C4.03323 16.4853 5.8911 14.6274 9.20481 11.3137L1.23978e-05 2.10894L2.10893 2.10578e-05L11.3137 9.20482L20.5185 2.10578e-05L22.6274 2.10894L13.4226 11.3137L21.9079 19.799L19.799 21.9079Z" fill="currentColor"/>
                </svg>
            </div>
            <div class="modal__title">
                Fill out the form to book<br /> <span class="text-green-dark">a free 30-minute meeting</span>
            </div>
            <form id="modal-form">
                <input type="hidden" id="formType" name="type" value="meeting">
                <div class="input-wrapper">
                    <label for="name">name</label>
                    <input type="text" id="name" name="name" placeholder="Your name" required>
                </div>
                <div class="input-wrapper">
                    <label for="phone">phone</label>
                    <input type="text" id="phone" name="phone" placeholder="Your phone" required>
                </div>
                <div class="input-wrapper">
                    <label for="Email">Email</label>
                    <input type="email" id="Email" name="email" placeholder="Your Email" required>
                </div>

                <div class="agree">
                    <div class="checkbox">
                        <input type="checkbox" id="agree" checked required>
                        <label for="agree">
                            <span class="agree__text">
                                <span class="agree__action">By clicking Book a meeting you agree to</span> <a href="<?php echo esc_url(get_permalink(get_page_by_path('terms-of-use'))); ?>" target="_blank">Terms of Use</a> and <a href="<?php echo esc_url(get_permalink(get_page_by_path('privacy-policy'))); ?>" target="_blank">Privacy Policy</a>.
                                You consent to receive emails, phone calls and SMS messages from Arch Expert Consulting provide updates on your order and/or for marketing purposes.
                            </span>
                        </label>
                    </div>
                </div>

                <div class="btn-wrapper">
                    <input type="submit" value="Book a Meeting" class="btn btn--green">
                </div>
            </form>
        </div>
    </div>

    <script>
    (function() {
        const ctas = document.querySelectorAll('.js--cta');
        const modal = document.getElementById('meetingModal');
        const overlay = document.getElementById('overlay');
        const modalClose = document.getElementById('modalClose');
        const modalForm = document.getElementById('modal-form');

        if (!modal || !overlay) return;

        // Open modal
        ctas.forEach(cta => {
            cta.addEventListener('click', function(e) {
                e.preventDefault();
                modal.classList.add('open');
                overlay.classList.add('open');
                document.body.classList.add('modal-open');
            });
        });

        // Close modal
        function closeModal() {
            modal.classList.remove('open');
            overlay.classList.remove('open');
            document.body.classList.remove('modal-open');
        }

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        overlay.addEventListener('click', closeModal);

        // Form submission - save to sessionStorage and redirect
        if (modalForm) {
            modalForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const formData = {
                    type: document.getElementById('formType').value,
                    name: document.getElementById('name').value,
                    email: document.getElementById('Email').value,
                    phone: document.getElementById('phone').value
                };

                sessionStorage.setItem('formData', JSON.stringify(formData));
                window.location.href = '/success/';
            });
        }
    })();
    </script>

    <!-- jQuery -->
    <script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
        crossorigin="anonymous"
        defer>
    </script>

    <!-- GSAP библиотеки для анимаций -->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollToPlugin.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/MotionPathPlugin.min.js" defer></script>

    <?php if ( is_front_page() ) : ?>
        <!-- Three.js для WebGL анимации фона на главной (загружается для десктопа) -->
        <script>
            if (window.innerWidth > 1200) {
                var script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
                document.head.appendChild(script);
            }
        </script>
        <!-- Основной JS файл для главной -->
        <script src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/js/common.js?v=' . filemtime( get_stylesheet_directory() . '/assets/js/common.js' ) ); ?>" defer></script>
    <?php else : ?>
        <!-- Основной JS файл для внутренних страниц -->
        <script src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/js/inner-page/js/common.js' ); ?>" defer></script>
    <?php endif; ?>

    <?php wp_footer(); ?>
</body>
</html>

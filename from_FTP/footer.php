<footer class="footer">
            <div class="container">
                <?php 
                // Check if menu should be hidden (same as header)
                // To hide menu, set global $hide_menu = true; before get_header();
                global $hide_menu;
                if (!isset($hide_menu) || !$hide_menu) : 
                ?>
                <nav class="footer__nav">
                    <a href="#overview">Overview</a>
                    <a href="#objectives">Objectives</a>
                    <a href="#benefits">Benefits</a>
                    <a href="#risks">Risks</a>
                    <a href="#process">Process</a>
                    <a href="#advantages">Advantage</a>
                    <a href="#why-us">Why Us</a>
                    <a href="#cases">Cases</a>
                    <a href="#faq">FAQ</a>
                    <a href="#request-audit">Request Audit</a>
                </nav>
                <?php endif; // End menu visibility check ?>

                <div class="footer__logo">
                    <img src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/logo.svg' ); ?>" alt="Arch Expert">
                </div>

                <div class="footer__copyright">
                    © 2025 Arch Expert Consulting. All rights reserved.
                </div>
            </div>
        </footer>
    </div>

    <!-- Модалка -->
    <div id="overlay"></div>
    <div class="modal">
        <div class="modal__content">
            <div class="modal__close">
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
                        <input type="checkbox" id="agree" checked>
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

    <!-- GSAP библиотеки для анимаций -->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollToPlugin.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script>

    <!-- Условная загрузка Three.js только для десктопа (>1200px) -->
    <script>
        if (window.innerWidth > 1200) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
            script.async = true;
            document.body.appendChild(script);
        }
    </script>

    <!-- Water Ripple Effect: локальные скрипты подключаются через functions.php -->
    <?php wp_footer(); ?>
</body>
</html>
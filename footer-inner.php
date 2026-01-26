        <footer class="footer">
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
                            <a href="#" class="footer__diagnostic">
                                <span class="footer__dot"></span>
                                Book a 30-min Diagnostic
                            </a>
                        </div>
                        <a href="#" class="footer__scroll-top icon-arrow-down for-mobile"></a>
                    </div>
                </div>

                <div class="footer__middle">
                    <nav class="footer__nav temporarily-hidden">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Case Studies</a></li>
                        </ul>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Resources</a></li>
                            <li><a href="#">Contacts</a></li>
                        </ul>
                    </nav>

                    <div class="footer__contact">
                        <div class="h4">Contact</div>
                        <div class="footer__contact-info">
                            <p>Email: <a href="mailto:hello@arch-expert.com">hello@arch-expert.com</a></p>
                            <p>LinkedIn: <a href="#">Maxim Silaev</a> | <a href="#">Company Page</a></p>
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
                        <img src="<?php echo esc_url( set_url_scheme( get_stylesheet_directory_uri() . '/assets/images/logo.svg', 'https' ) ); ?>" alt="Arch Expert" loading="lazy">
                    </div>
                </div>
            </div>
        </footer>
    </div>

    <!-- jQuery -->
    <script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
        crossorigin="anonymous"
        defer>
    </script>

    <!-- GSAP библиотеки для анимаций -->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/MotionPathPlugin.min.js" defer></script>

    <!-- Основной JS файл -->
    <script src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/js/inner-page/js/common.js' ); ?>" defer></script>

    <?php wp_footer(); ?>
</body>
</html>

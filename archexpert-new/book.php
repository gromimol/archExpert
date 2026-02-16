<?php
/**
 * Template Name: Book Page
 * Description: Template for Book landing page
 */

// Подключаем header для внутренних страниц
get_header('inner');
?>

<main class="main">
    <div class="book inner-page">
        <div class="container">
            <div class="book__content">
                <div class="book__content__body">
                    <div class="book__name">
                        <div class="h4">Book</div>
                        <div class="h3">"Technical debt: Design, Risk and Beyond"</div>
                    </div>
                    <div class="description">
                        Technical debt: design, risk and beyond is a practical, experience-driven book about how technical decisions quietly turn into business risk. It is a practical guide to making the invisible visible, it shows how technical debt forms long before code smells appear, in early architectural anchors, delayed decisions, hype-driven experiments, fragile pipelines, poor onboarding, and silent process drift.
                    </div>
                    <div class="description description--highlighted">
                        It introduces concrete frameworks to measure and classify debt, translate it into financial and delivery risk, and distinguish deliberate trade-offs from accidental damage. Through real cases, from fintech and SaaS to gaming platforms and startups, the book explains how "temporary" choices accumulate interest, how delay quietly multiplies cost, and how documentation, modularity, and automation can either compound chaos or create leverage.
                    </div>
                    <a href="#" class="btn btn--green js--cta-book">Join the waitlist</a>
                </div>
                <div class="book__content__img">
                    <picture>
                        <source media="(min-width: 768px)" srcset="<?php echo esc_url( set_url_scheme( get_stylesheet_directory_uri() . '/assets/images/book/book_desctop.webp', 'https' ) ); ?>">
                        <img src="<?php echo esc_url( set_url_scheme( get_stylesheet_directory_uri() . '/assets/images/book/book_mobile.webp', 'https' ) ); ?>" alt="Book">
                    </picture>
                </div>
            </div>
        </div>
    </div>
    <!-- ./ book -->

    <section class="book-for">
        <div class="container">
            <div class="h3">This book is written for</div>

            <div class="book-for__cards">
                <div class="book-card">
                    founders
                </div>
                <div class="book-card">
                    CTOs
                </div>
                <div class="book-card">
                    architects
                </div>
                <div class="book-card">
                    tech leaders
                </div>
            </div>

            <div class="h4 book-for__decription">
                who must explain risk to business, sell fixes without panic, and keep systems evolvable as teams and markets change
            </div>
        </div>
    </section>

    <section class="book-features">
        <div class="container">
            <div class="book-features__row">
                <div class="key h4">
                    It provides tools the reader can use straight away:
                </div>
                <div class="value">
                    the Hype Test, Debt Heatmaps, Debt Registers, onboarding and living-docs checklists, pipeline reliability metrics, and the Technical Debt Index.
                </div>
            </div>
            <div class="book-features__row">
                <div class="key h4">More than a book about architecture and code, it is about leadership: </div>
                <div class="value">how to audit reality, align business and engineering, and build a shared language where decisions are explicit, risks are visible, and technical debt is managed as a strategy.</div>
            </div>
            <div class="btn-container">
                <a href="#" class="btn btn--green js--cta-book">Join the waitlist</a>
            </div>
        </div>
    </section>

    <!-- Book Waitlist Modal -->
    <div class="modal" id="bookModal">
        <div class="modal__content">
            <div class="modal__close" id="bookModalClose">
                <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.799 21.9079L11.3137 13.4226L2.82844 21.9079L0.719525 19.799C4.03323 16.4853 5.8911 14.6274 9.20481 11.3137L1.23978e-05 2.10894L2.10893 2.10578e-05L11.3137 9.20482L20.5185 2.10578e-05L22.6274 2.10894L13.4226 11.3137L21.9079 19.799L19.799 21.9079Z" fill="currentColor"/>
                </svg>
            </div>
            <div class="modal__title">
                Join the Waitlist for <br /> Technical Debt: Design, Risk and Beyond
            </div>
            <form id="bookWaitlistForm">
                <input type="hidden" name="type" value="book">
                <div class="input-wrapper">
                    <label for="book-name">name</label>
                    <input type="text" id="book-name" name="name" placeholder="Your name" required>
                </div>
                <div class="input-wrapper">
                    <label for="book-phone">phone</label>
                    <input type="text" id="book-phone" name="phone" placeholder="Your phone" required>
                </div>
                <div class="input-wrapper">
                    <label for="book-email">Email</label>
                    <input type="email" id="book-email" name="email" placeholder="Your Email" required>
                </div>

                <div class="agree">
                    <div class="checkbox">
                        <input type="checkbox" id="book-agree" checked required>
                        <label for="book-agree">
                            <span class="agree__text">
                                <span class="agree__action">By clicking Submit you agree to</span> <a href="<?php echo esc_url(get_permalink(get_page_by_path('terms-of-use'))); ?>" target="_blank">Terms of Use</a> and <a href="<?php echo esc_url(get_permalink(get_page_by_path('privacy-policy'))); ?>" target="_blank">Privacy Policy</a>.
                            </span>
                        </label>
                    </div>
                </div>

                <div class="btn-wrapper">
                    <input type="submit" value="Submit" class="btn btn--green">
                </div>
            </form>

            <div id="book-success-message" style="display: none;">
                <div class="modal__title">Thank you for joining the waitlist!</div>
                <p style="text-align: center; opacity: 0.7;">We'll notify you as soon as the book is available.</p>
            </div>
        </div>
    </div>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const bookCtas = document.querySelectorAll('.js--cta-book');
        const bookModal = document.getElementById('bookModal');
        const overlay = document.getElementById('overlay');
        const bookModalClose = document.getElementById('bookModalClose');
        const bookForm = document.getElementById('bookWaitlistForm');

        if (!bookModal || !overlay || !bookModalClose || !bookForm) return;

        // Open modal
        bookCtas.forEach(cta => {
            cta.addEventListener('click', function(e) {
                e.preventDefault();
                bookModal.classList.add('open');
                overlay.classList.add('open');
                document.body.classList.add('modal-open');
            });
        });

        // Close modal
        function closeModal() {
            bookModal.classList.remove('open');
            overlay.classList.remove('open');
            document.body.classList.remove('modal-open');
        }

        bookModalClose.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        // Form submission
        bookForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('input[type="submit"]');
            const formData = new FormData();

            formData.append('action', 'mailchimp_subscribe');
            formData.append('nonce', '<?php echo wp_create_nonce("mailchimp_subscribe_nonce"); ?>');
            formData.append('type', 'book');
            formData.append('name', document.getElementById('book-name').value);
            formData.append('email', document.getElementById('book-email').value);
            formData.append('phone', document.getElementById('book-phone').value);

            // Disable button
            submitBtn.disabled = true;
            submitBtn.value = 'Sending...';

            fetch('<?php echo admin_url("admin-ajax.php", "https"); ?>', {
                method: 'POST',
                credentials: 'same-origin',
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    // Hide form, show success
                    bookForm.style.display = 'none';
                    document.getElementById('book-success-message').style.display = 'block';
                } else {
                    alert('Something went wrong. Please try again.');
                    submitBtn.disabled = false;
                    submitBtn.value = 'Submit';
                }
            })
            .catch(error => {
                alert('Network error. Please try again.');
                submitBtn.disabled = false;
                submitBtn.value = 'Submit';
            });
        });
    });
    </script>

</main>

<?php
// Подключаем footer для внутренних страниц
get_footer('inner');
?>

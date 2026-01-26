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
                    <a href="#" class="btn btn--green">Join the waitlist</a>
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
                <a href="#" class="btn btn--green">Join the waitlist</a>
            </div>
        </div>
    </section>

</main>

<?php
// Подключаем footer для внутренних страниц
get_footer('inner');
?>

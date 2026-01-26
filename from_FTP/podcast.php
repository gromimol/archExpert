<?php
/**
 * Template Name: Podcast Page
 * Description: Template for Podcast landing page
 */

// Подключаем header для внутренних страниц
get_header('inner');
?>

<main class="main">
    <div class="podcast inner-page">
        <div class="container">
            <div class="inner-page__content">
                <div class="podcast__content__body">
                    <div class="podcast__name">
                        <div class="h4">Podcast</div>
                        <div class="h3">"Technical debt: Design, Risk and Beyond"</div>
                    </div>
                    <p>A podcast for:</p>
                    <div class="h4">
                        founders, CTOs, VPs of Engineering and Architecture, technology leaders, and architects 
                    </div>
                    <p>who are responsible for long-term technology decisions and their business consequences.</p>

                    <ul class="podcast-links">
                        <li><a href="https://open.spotify.com/show/4VODUSuJg85EvUfA3fjKcW" target="_blank"><img src="<?php echo esc_url( set_url_scheme( get_stylesheet_directory_uri() . '/assets/images/podcast/podcast_link_1.svg', 'https' ) ); ?>" alt=""></a></li>
                        <li><a href="https://podcasts.apple.com/podcast/id1821879503 " target="_blank"><img src="<?php echo esc_url( set_url_scheme( get_stylesheet_directory_uri() . '/assets/images/podcast/podcast_link_2.svg', 'https' ) ); ?>" alt=""></a></li>
                        <li><a href="https://podcastindex.org/podcast/7381782 " target="_blank"><img src="<?php echo esc_url( set_url_scheme( get_stylesheet_directory_uri() . '/assets/images/podcast/podcast_link_3.svg', 'https' ) ); ?>" alt=""></a></li>
                    </ul>
                </div>
                <div class="podcast__content__img">
                    <picture>
                        <source media="(min-width: 768px)" srcset="<?php echo esc_url( set_url_scheme( get_stylesheet_directory_uri() . '/assets/images/podcast/debt_desctop.webp', 'https' ) ); ?>">
                        <img src="<?php echo esc_url( set_url_scheme( get_stylesheet_directory_uri() . '/assets/images/podcast/debt_mobile.webp', 'https' ) ); ?>" alt="Podcast">
                    </picture>
                    <div class="soundtrack">
                        <div class="soundtrack__bar" style="height: 146px;"></div>
                        <div class="soundtrack__bar" style="height: 256px;"></div>
                        <div class="soundtrack__bar" style="height: 146px;"></div>
                        <div class="soundtrack__bar" style="height: 101px;"></div>
                        <div class="soundtrack__bar" style="height: 116px;"></div>
                        <div class="soundtrack__bar" style="height: 226px;"></div>
                        <div class="soundtrack__bar" style="height: 162px;"></div>
                        <div class="soundtrack__bar" style="height: 78px;"></div>
                        <div class="soundtrack__bar" style="height: 78px;"></div>
                        <div class="soundtrack__bar" style="height: 99px;"></div>
                        <div class="soundtrack__bar" style="height: 145px;"></div>
                        <div class="soundtrack__bar" style="height: 204px;"></div>
                        <div class="soundtrack__bar" style="height: 116px;"></div>
                        <div class="soundtrack__bar" style="height: 152px;"></div>
                        <div class="soundtrack__bar" style="height: 226px;"></div>
                        <div class="soundtrack__bar" style="height: 101px;"></div>
                        <div class="soundtrack__bar" style="height: 162px;"></div>
                        <div class="soundtrack__bar" style="height: 78px;"></div>
                        <div class="soundtrack__bar" style="height: 146px;"></div>
                        <div class="soundtrack__bar" style="height: 256px;"></div>
                        <div class="soundtrack__bar" style="height: 146px;"></div>
                        <div class="soundtrack__bar" style="height: 101px;"></div>
                        <div class="soundtrack__bar" style="height: 116px;"></div>
                        <div class="soundtrack__bar" style="height: 226px;"></div>
                        <div class="soundtrack__bar" style="height: 162px;"></div>
                        <div class="soundtrack__bar" style="height: 78px;"></div>
                        <div class="soundtrack__bar" style="height: 78px;"></div>
                        <div class="soundtrack__bar" style="height: 99px;"></div>
                        <div class="soundtrack__bar" style="height: 145px;"></div>
                        <div class="soundtrack__bar" style="height: 204px;"></div>
                        <div class="soundtrack__bar" style="height: 116px;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ./ book -->

    <section class="podcast-options bg-white">
        <div class="container">
            <div class="podcast-options__grid">
                <div class="podcast-options__item">
                    <div class="h3">We focus</div>
                    <p>
                        We focus on technical debt as a real and often underestimated business risk, which reside not only in code, but in product strategy, architecture, processes, organizational design and even communication. 
                    </p>
                    <p>
                        Each episode explores how accumulated technical decisions affect scalability, delivery speed, operational stability, security, company valuation, and reputation.
                    </p>
                </div>
                <div class="podcast-options__item">
                    <div class="h3">We analyze</div>
                    <p>
                        We analyze real cases from companies of different sizes, looking at how technical debt was created, how it remained invisible for years, and what triggered a moment when it turned into strategic or financial problems, to avoid similar cases for our listeners. 
                    </p>
                    <p>
                        The discussion is grounded in trade-offs, constraints, and decision-making done under pressure, tailored to each individual case.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section class="podcast-cards">
        <div class="container">
            <div class="h2">Technical debt: Design, Risk and Beyond</div>
            <div class="cards__grid">
                <div class="card card--1">
                    <div class="card__dots">
                        <span></span>
                    </div>
                    <p>
                        From the architecture, CTO's and sometimes business leader's perspectives, we talk about how to identify technical debt early, assess its impact, and manage it over time. A key part of the podcast is communication with the business: how to explain technical debt in executive language, justify remediation and architectural change, and "sell" technical decisions that will protect the company in the long term.
                    </p>
                </div>
                <div class="card card--2">
                    <div class="card__dots">
                        <span></span>
                        <span></span>
                    </div>
                    <p>
                        From time to time, we invite seasoned CTOs, architects, and business leaders to share candid stories of what went wrong, what signals were missed, and how they regained control and rebuilt systems designed not just to function, but to support sustainable growth without silently increasing risk.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section class="final-cta final-cta--visible">
        <div class="soundtrack">
            <div class="soundtrack__bar" style="height: 146px;"></div>
            <div class="soundtrack__bar" style="height: 256px;"></div>
            <div class="soundtrack__bar" style="height: 146px;"></div>
            <div class="soundtrack__bar" style="height: 101px;"></div>
            <div class="soundtrack__bar" style="height: 116px;"></div>
            <div class="soundtrack__bar" style="height: 226px;"></div>
            <div class="soundtrack__bar" style="height: 162px;"></div>
            <div class="soundtrack__bar" style="height: 78px;"></div>
            <div class="soundtrack__bar" style="height: 78px;"></div>
            <div class="soundtrack__bar" style="height: 99px;"></div>
            <div class="soundtrack__bar" style="height: 145px;"></div>
            <div class="soundtrack__bar" style="height: 204px;"></div>
            <div class="soundtrack__bar" style="height: 116px;"></div>
            <div class="soundtrack__bar" style="height: 152px;"></div>
            <div class="soundtrack__bar" style="height: 226px;"></div>
            <div class="soundtrack__bar" style="height: 101px;"></div>
            <div class="soundtrack__bar" style="height: 162px;"></div>
            <div class="soundtrack__bar" style="height: 78px;"></div>
            <div class="soundtrack__bar" style="height: 146px;"></div>
            <div class="soundtrack__bar" style="height: 256px;"></div>
            <div class="soundtrack__bar" style="height: 146px;"></div>
            <div class="soundtrack__bar" style="height: 101px;"></div>
            <div class="soundtrack__bar" style="height: 116px;"></div>
            <div class="soundtrack__bar" style="height: 226px;"></div>
            <div class="soundtrack__bar" style="height: 162px;"></div>
            <div class="soundtrack__bar" style="height: 78px;"></div>
            <div class="soundtrack__bar" style="height: 78px;"></div>
            <div class="soundtrack__bar" style="height: 99px;"></div>
            <div class="soundtrack__bar" style="height: 145px;"></div>
            <div class="soundtrack__bar" style="height: 204px;"></div>
            <div class="soundtrack__bar" style="height: 116px;"></div>
        </div>
        <div class="container">
            <div class="h3">Listen on your<br /> preferred platform</div>
            <ul class="podcast-links">
                <li><a href="https://open.spotify.com/show/4VODUSuJg85EvUfA3fjKcW" target="_blank" class="podcast-link"><img src="<?php echo esc_url( set_url_scheme( get_stylesheet_directory_uri() . '/assets/images/podcast/podcast_link_1.svg', 'https' ) ); ?>" alt=""> Apple Podcasts</a></li>
                <li><a href="https://podcasts.apple.com/podcast/id1821879503 " target="_blank" class="podcast-link"><img src="<?php echo esc_url( set_url_scheme( get_stylesheet_directory_uri() . '/assets/images/podcast/podcast_link_2.svg', 'https' ) ); ?>" alt="" >Sign in with Spotify</a></li>
                <li><a href="https://podcastindex.org/podcast/7381782 " target="_blank" class="podcast-link"><img src="<?php echo esc_url( set_url_scheme( get_stylesheet_directory_uri() . '/assets/images/podcast/podcast_link_3.svg', 'https' ) ); ?>" alt=""> Podcast Index </a></li>
            </ul>
         </div>
        <!-- bg image -->
        <img src="<?php echo esc_url( set_url_scheme( get_stylesheet_directory_uri() . '/assets/images/cta_bg.webp', 'https' ) ); ?>" alt="Красивый фон" class="final-cta__bg" loading="lazy">
    </section>

</main>

<?php
// Подключаем footer для внутренних страниц
get_footer('inner');
?>

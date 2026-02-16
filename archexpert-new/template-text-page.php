<?php
/*
Template Name: Text Page
Template Post Type: page
*/
// Hide menu for text pages (Privacy Policy, Terms of Use, etc.)
global $hide_menu;
$hide_menu = true;

get_header(); ?>

<style>
.text-page {
    padding: 120px 0 80px;
    background: linear-gradient(180deg, #080608 0%, #0a0a0a 100%);
    min-height: 100vh;
}

.text-page .container {
    max-width: 900px;
}

.text-page__content {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(7, 188, 138, 0.1);
    border-radius: 16px;
    padding: 60px;
}

.text-page__title {
    font-family: 'Geologica', sans-serif;
    font-size: 48px;
    font-weight: 600;
    line-height: 1.2;
    color: #07BC8A;
    margin-bottom: 40px;
}

.text-page__text {
    font-family: 'Geologica', sans-serif;
    font-size: 18px;
    line-height: 1.6;
    color: #E8E8E8;
}

.text-page__text h2 {
    font-size: 32px;
    font-weight: 600;
    color: #07BC8A;
    margin-top: 40px;
    margin-bottom: 20px;
}

.text-page__text h3 {
    font-size: 24px;
    font-weight: 500;
    color: #97F69D;
    margin-top: 30px;
    margin-bottom: 15px;
}

.text-page__text p {
    margin-bottom: 20px;
}

.text-page__text ul,
.text-page__text ol {
    margin: 20px 0;
    padding-left: 30px;
}

.text-page__text li {
    margin-bottom: 10px;
}

.text-page__text a {
    color: #07BC8A;
    text-decoration: underline;
    transition: color 0.3s;
}

.text-page__text a:hover {
    color: #97F69D;
}

.text-page__text strong {
    color: #fff;
    font-weight: 600;
}

@media (max-width: 768px) {
    .text-page {
        padding: 80px 0 60px;
    }
    
    .text-page__content {
        padding: 30px 20px;
    }
    
    .text-page__title {
        font-size: 32px;
        margin-bottom: 30px;
    }
    
    .text-page__text {
        font-size: 16px;
    }
    
    .text-page__text h2 {
        font-size: 24px;
    }
    
    .text-page__text h3 {
        font-size: 20px;
    }
}
</style>

<main class="text-page">
    <div class="container">
        <?php while (have_posts()) : the_post(); ?>
            <article class="text-page__content">
                <h1 class="text-page__title"><?php the_title(); ?></h1>
                <div class="text-page__text">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</main>

<?php get_footer(); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo get_the_title(); ?></title>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-M92X7GL4');</script>
    <!-- End Google Tag Manager -->
    
    <!-- Стили для внутренних страниц (book, podcast) -->
    <link rel="stylesheet" href="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/css/inner-page/css/style.css' ); ?>">
    <link rel="stylesheet" href="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/css/inner-page/css/media.css' ); ?>">
    
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M92X7GL4"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <div class="wrapper">
        <header class="header">
            <div class="container">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo">
                    <img src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/logo.svg' ); ?>" alt="arch expert">
                </a>
                <div class="header__right">
                    <!-- временно скрываем -->
                    <div class="header__nav temporarily-hidden">

                        <div class="header__nav__top">
                            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="menu-logo">
                                <img src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/logo.svg' ); ?>" alt="arch expert">
                            </a>
                            <div class="close">
                                <svg class="close-icon" width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="1.71582" y1="28.728" x2="28.5859" y2="1.85794" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                    <line x1="2.13003" y1="1.85791" x2="29.0001" y2="28.728" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </div>
                        </div>
                        <!--  меню  -->
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li>
                                <a href="#">services</a>
                                <ul>
                                    <li><a href="#">founders</a></li>
                                    <li><a href="#">investors</a></li>
                                </ul>
                            </li>
                            <li><a href="#">case studies</a></li>
                            <li><a href="#">about us</a></li>
                            <li>
                                <a href="#">resources</a>
                                <ul>
                                    <li><a href="<?php echo esc_url( home_url( '/book/' ) ); ?>">Book</a></li>
                                    <li><a href="<?php echo esc_url( home_url( '/podcast/' ) ); ?>">Podcast</a></li>
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">Free Tools</a></li>
                                </ul>
                            </li>
                            <li><a href="#">contacts</a></li>
                        </ul>
                    </div>
                    <a href="#" class="btn">Book a Call</a>
                    <!-- временно скрываем -->
                    <div class="burger temporarily-hidden">
                        <svg class="burger-icon" width="44" height="26" viewBox="0 0 44 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="1" y1="1" x2="43" y2="1" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round"/>
                            <line x1="1" y1="13" x2="43" y2="13" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round"/>
                            <line x1="1" y1="25" x2="43" y2="25" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        </header>
        <!--   end header     -->

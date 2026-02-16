<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php 
        if (is_front_page()) {
            echo 'Cybersecurity audit';
        } else {
            echo get_the_title();
        }
    ?></title>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-M92X7GL4');</script>
    <!-- End Google Tag Manager -->
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M92X7GL4"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <div class="wrapper">
        <div class="header">
            <div class="container">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo">
                    <img src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/logo.svg' ); ?>" alt="Arch Expert">
                </a>
                <?php 
                // Check if menu should be hidden
                // To hide menu, set global $hide_menu = true; before get_header();
                // Example in template: global $hide_menu; $hide_menu = true; get_header();
                global $hide_menu;
                if (!isset($hide_menu) || !$hide_menu) : 
                ?>
                <div class="header__right">
                    <nav class="header__nav">
                        <div class="header__nav__top">
                            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="menu-logo">
                                <img src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/logo.svg' ); ?>" alt="Arch Expert">
                            </a>
                            <div class="close">
                                <svg class="close-icon" width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="1.71582" y1="28.728" x2="28.5859" y2="1.85794" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                    <line x1="2.13003" y1="1.85791" x2="29.0001" y2="28.728" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </div>
                        </div>
                        <ul>
                            <li><a href="#overview">OVERVIEW</a></li>
                            <li><a href="#objectives">OBJECTIVES</a></li>
                            <li><a href="#benefits">BENEFITS</a></li>
                            <li><a href="#risks">RISKS</a></li>
                            <li><a href="#process">PROCESS</a></li>
                            <li><a href="#advantages">ADVANTAGES</a></li>
                            <li><a href="#why-us">WHY US</a></li>
                            <li><a href="#cases">CASES</a></li>
                            <li><a href="#faq">FAQ</a></li>
                        </ul>
                    </nav>
                    <div class="burger">
                        <svg class="burger-icon" width="44" height="26" viewBox="0 0 44 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="1" y1="1" x2="43" y2="1" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round"/>
                            <line x1="1" y1="13" x2="43" y2="13" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round"/>
                            <line x1="1" y1="25" x2="43" y2="25" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                <?php endif; // End menu visibility check ?>
            </div>
        </div>
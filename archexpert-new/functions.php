<?php
// Отключить emoji скрипты
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

// Flush rewrite rules on theme activation
function arch_expert_flush_rewrites() {
    flush_rewrite_rules();
}
add_action('after_switch_theme', 'arch_expert_flush_rewrites');

// Force flush rewrite rules once (remove after it works)
function arch_expert_force_flush_once() {
    if (!get_option('arch_expert_permalinks_flushed')) {
        flush_rewrite_rules(true);
        update_option('arch_expert_permalinks_flushed', '1');
    }
}
add_action('init', 'arch_expert_force_flush_once');

// Регистрация меню
function arch_expert_setup() {
    register_nav_menus(array(
        'header-menu' => 'Header Menu'
    ));
}
add_action('after_setup_theme', 'arch_expert_setup');

function arch_expert_styles() {
    // Проверяем, не используется ли шаблон внутренних страниц (book, podcast, blog)
    $is_inner_page = is_page_template('book.php')
                  || is_page_template('podcast.php')
                  || is_page_template('template-blogs.php')
                  || ( is_single() && get_post_type() === 'post' );

    // Проверяем, не это ли scale-landing
    $is_scale_landing = is_page_template('landing-scale.php');

    // Основной стиль темы (если у вас есть style.css в корне темы)
    // wp_enqueue_style('arch-expert-style', get_stylesheet_uri());

    // Scale landing: свои стили, НЕ нужны стили и скрипты из main
    if ( $is_scale_landing ) {
        // Стили scale-landing уже подключены в самом шаблоне через <link>
        // Подключаем только скрипты (свой отдельный common-scale.js)
        $js_dir = get_stylesheet_directory() . '/assets/js/';
        if ( file_exists( $js_dir . 'water-ripple.js' ) ) {
            wp_enqueue_script( 'arch-water-ripple', get_stylesheet_directory_uri() . '/assets/js/water-ripple.js', array('jquery'), filemtime( $js_dir . 'water-ripple.js' ), true );
        }
        if ( file_exists( $js_dir . 'common-scale.js' ) ) {
            wp_enqueue_script( 'arch-common-scale', get_stylesheet_directory_uri() . '/assets/js/common-scale.js', array('jquery'), filemtime( $js_dir . 'common-scale.js' ), true );
        }
        return; // Выходим, чтобы не подключать другие стили
    }

    // Кастомные стили из папки assets/css - НЕ подключаем для внутренних страниц
    if ( !$is_inner_page ) {
        $css_path = get_stylesheet_directory() . '/assets/css/style.css';
        $css_ver = file_exists( $css_path ) ? filemtime( $css_path ) : null;
        wp_enqueue_style( 'arch-expert-custom', get_stylesheet_directory_uri() . '/assets/css/style.css', array(), $css_ver );
    }

    // Определяем путь к JS директории
    $js_dir = get_stylesheet_directory() . '/assets/js/';

    // Скрипты из assets/js - НЕ подключаем для внутренних страниц
    if ( !$is_inner_page ) {
        if ( file_exists( $js_dir . 'water-ripple.js' ) ) {
            wp_enqueue_script( 'arch-water-ripple', get_stylesheet_directory_uri() . '/assets/js/water-ripple.js', array('jquery'), filemtime( $js_dir . 'water-ripple.js' ), true );
        }
        if ( file_exists( $js_dir . 'common.js' ) ) {
            wp_enqueue_script( 'arch-common', get_stylesheet_directory_uri() . '/assets/js/common.js', array('jquery'), filemtime( $js_dir . 'common.js' ), true );
        }
    }

    // Success page script for Mailchimp integration
    if ( ( is_page_template('page-success.php') || is_page_template('page-success-lm.php') ) && file_exists( $js_dir . 'success-page.js' ) ) {
        wp_enqueue_script( 'arch-success-page', get_stylesheet_directory_uri() . '/assets/js/success-page.js', array(), filemtime( $js_dir . 'success-page.js' ), true );

        // Add Mailchimp AJAX configuration
        wp_localize_script('arch-success-page', 'mailchimpAjax', array(
            'ajaxUrl' => admin_url('admin-ajax.php', 'https'),
            'nonce' => wp_create_nonce('mailchimp_subscribe_nonce')
        ));
    }
}
add_action( 'wp_enqueue_scripts', 'arch_expert_styles' );

/**
 * Register a custom post type `landing` for editable landing pages
 */
function arch_register_landing_cpt() {
    $labels = array(
        'name' => 'Landings',
        'singular_name' => 'Landing',
        'add_new_item' => 'Add New Landing',
        'edit_item' => 'Edit Landing',
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'show_in_menu' => true,
        'has_archive' => false,
        'publicly_queryable' => true,
        'rewrite' => array( 'slug' => 'landing', 'with_front' => false ),
        'supports' => array( 'title', 'thumbnail' ),
        'show_in_rest' => true,
    );

    register_post_type( 'landing', $args );
}
add_action( 'init', 'arch_register_landing_cpt' );


/**
 * Register ACF fields programmatically (runs only if ACF is active)
 * Field group covers main sections of the landing page. You can modify later via ACF UI.
 */
function arch_register_acf_landing_fields() {
    if ( function_exists( 'acf_add_local_field_group' ) ) {
        acf_add_local_field_group( array(
            'key' => 'group_arch_landing_fields',
            'title' => 'Landing Page Fields',
            'fields' => array(
                // Risks footer — keep animation and highlighted parts configurable
                array(
                    'key' => 'field_risks__footer__text_main',
                    'label' => 'Risks footer — main text (before highlight)',
                    'name' => 'risks__footer__text_main',
                    'type' => 'text',
                ),
                array(
                    'key' => 'field_risks__footer__text_green',
                    'label' => 'Risks footer — highlighted (text-green)',
                    'name' => 'risks__footer__text_green',
                    'type' => 'text',
                ),
                array(
                    'key' => 'field_risks__footer__text_reveal',
                    'label' => 'Risks footer — reveal animated (scroll-color-reveal)',
                    'name' => 'risks__footer__text_reveal',
                    'type' => 'textarea',
                ),

                // Why-us title split (to preserve <br /> placement)
                array(
                    'key' => 'field_why_us__title_part1',
                    'label' => 'Why-us title — part 1 (before break)',
                    'name' => 'why_us__title_part1',
                    'type' => 'text',
                ),
                array(
                    'key' => 'field_why_us__title_part2',
                    'label' => 'Why-us title — part 2 (after break)',
                    'name' => 'why_us__title_part2',
                    'type' => 'text',
                ),
                // First screen
                array(
                    'key' => 'field_first_screen_title',
                    'label' => 'First screen title',
                    'name' => 'first_screen_title',
                    'type' => 'text',
                ),
                array(
                    'key' => 'field_first_screen_subtitle',
                    'label' => 'First screen subtitle',
                    'name' => 'first_screen_subtitle',
                    'type' => 'text',
                ),
                // Intuitive fields that map to classes in the markup:
                // pattern: [block]__[element]__[class], hyphens -> underscores
                array(
                    'key' => 'field_first_screen__subtitle__text',
                    'label' => 'First screen subtitle — main text (first_screen__subtitle__text)',
                    'name' => 'first_screen__subtitle__text',
                    'type' => 'text',
                ),
                array(
                    'key' => 'field_first_screen__subtitle__text_green',
                    'label' => 'First screen subtitle — highlighted (text-green)',
                    'name' => 'first_screen__subtitle__text_green',
                    'type' => 'text',
                ),
                array(
                    'key' => 'field_first_screen__subtitle__text_after',
                    'label' => 'First screen subtitle — text after highlight (first_screen__subtitle__text_after)',
                    'name' => 'first_screen__subtitle__text_after',
                    'type' => 'text',
                ),
                array(
                    'key' => 'field_first_screen__subtitle__scroll_color_reveal',
                    'label' => 'First screen subtitle — reveal animated (scroll-color-reveal)',
                    'name' => 'first_screen__subtitle__scroll_color_reveal',
                    'type' => 'text',
                ),
                array(
                    'key' => 'field_first_screen_text1',
                    'label' => 'First screen text (line 1)',
                    'name' => 'first_screen_text1',
                    'type' => 'text',
                ),
                array(
                    'key' => 'field_first_screen_text2',
                    'label' => 'First screen text (line 2)',
                    'name' => 'first_screen_text2',
                    'type' => 'text',
                ),
                array(
                    'key' => 'field_first_screen_image',
                    'label' => 'First screen image',
                    'name' => 'first_screen_image',
                    'type' => 'image',
                    'return_format' => 'id',
                ),

                // Overview
                array('key'=>'field_overview_label','label'=>'Overview label','name'=>'overview_label','type'=>'text'),
                array('key'=>'field_overview_title','label'=>'Overview title','name'=>'overview_title','type'=>'text'),
                array('key'=>'field_overview_subtitle','label'=>'Overview subtitle','name'=>'overview_subtitle','type'=>'text'),
                array('key'=>'field_overview_text','label'=>'Overview text','name'=>'overview_text','type'=>'textarea'),
                // Fields matching inline classes in overview markup
                array(
                    'key' => 'field_overview__subtitle__text_green',
                    'label' => 'Overview subtitle — highlighted (text-green)',
                    'name' => 'overview__subtitle__text_green',
                    'type' => 'text',
                ),
                array(
                    'key' => 'field_overview__text__scroll_color_reveal',
                    'label' => 'Overview text — reveal animated (scroll-color-reveal)',
                    'name' => 'overview__text__scroll_color_reveal',
                    'type' => 'textarea',
                ),

                // Objectives (3)
                array('key'=>'field_objective_1_title','label'=>'Objective 1 title','name'=>'objective_1_title','type'=>'text'),
                array('key'=>'field_objective_1_image','label'=>'Objective 1 image','name'=>'objective_1_image','type'=>'image','return_format'=>'id'),
                array('key'=>'field_objective_1_text','label'=>'Objective 1 text','name'=>'objective_1_text','type'=>'text'),
                array('key'=>'field_objective_2_title','label'=>'Objective 2 title','name'=>'objective_2_title','type'=>'text'),
                array('key'=>'field_objective_2_image','label'=>'Objective 2 image','name'=>'objective_2_image','type'=>'image','return_format'=>'id'),
                array('key'=>'field_objective_2_text','label'=>'Objective 2 text','name'=>'objective_2_text','type'=>'text'),
                array('key'=>'field_objective_3_title','label'=>'Objective 3 title','name'=>'objective_3_title','type'=>'text'),
                array('key'=>'field_objective_3_image','label'=>'Objective 3 image','name'=>'objective_3_image','type'=>'image','return_format'=>'id'),
                array('key'=>'field_objective_3_text','label'=>'Objective 3 text','name'=>'objective_3_text','type'=>'text'),

                // Benefits (4 cards) - simple text per card
                array('key'=>'field_benefit_1_text','label'=>'Benefit 1 text','name'=>'benefit_1_text','type'=>'text'),
                array('key'=>'field_benefit_2_text','label'=>'Benefit 2 text','name'=>'benefit_2_text','type'=>'text'),
                array('key'=>'field_benefit_3_text','label'=>'Benefit 3 text','name'=>'benefit_3_text','type'=>'text'),
                array('key'=>'field_benefit_4_text','label'=>'Benefit 4 text','name'=>'benefit_4_text','type'=>'text'),

                // Risks - 6 titles (icons can reuse same image)
                array('key'=>'field_risk_icon','label'=>'Risk icon (shared)','name'=>'risk_icon','type'=>'image','return_format'=>'id'),
                array('key'=>'field_risk_1_title','label'=>'Risk 1 title','name'=>'risk_1_title','type'=>'text'),
                array('key'=>'field_risk_2_title','label'=>'Risk 2 title','name'=>'risk_2_title','type'=>'text'),
                array('key'=>'field_risk_3_title','label'=>'Risk 3 title','name'=>'risk_3_title','type'=>'text'),
                array('key'=>'field_risk_4_title','label'=>'Risk 4 title','name'=>'risk_4_title','type'=>'text'),
                array('key'=>'field_risk_5_title','label'=>'Risk 5 title','name'=>'risk_5_title','type'=>'text'),
                array('key'=>'field_risk_6_title','label'=>'Risk 6 title','name'=>'risk_6_title','type'=>'text'),

                // Process - 4 cards (title, text, image)
                array('key'=>'field_proc_1_title','label'=>'Process 1 title','name'=>'proc_1_title','type'=>'text'),
                array('key'=>'field_proc_1_text','label'=>'Process 1 text','name'=>'proc_1_text','type'=>'textarea'),
                array('key'=>'field_proc_1_image','label'=>'Process 1 image','name'=>'proc_1_image','type'=>'image','return_format'=>'id'),
                array('key'=>'field_proc_2_title','label'=>'Process 2 title','name'=>'proc_2_title','type'=>'text'),
                array('key'=>'field_proc_2_text','label'=>'Process 2 text','name'=>'proc_2_text','type'=>'textarea'),
                array('key'=>'field_proc_2_image','label'=>'Process 2 image','name'=>'proc_2_image','type'=>'image','return_format'=>'id'),
                array('key'=>'field_proc_3_title','label'=>'Process 3 title','name'=>'proc_3_title','type'=>'text'),
                array('key'=>'field_proc_3_text','label'=>'Process 3 text','name'=>'proc_3_text','type'=>'textarea'),
                array('key'=>'field_proc_3_image','label'=>'Process 3 image','name'=>'proc_3_image','type'=>'image','return_format'=>'id'),
                array('key'=>'field_proc_4_title','label'=>'Process 4 title','name'=>'proc_4_title','type'=>'text'),
                array('key'=>'field_proc_4_text','label'=>'Process 4 text','name'=>'proc_4_text','type'=>'textarea'),
                array('key'=>'field_proc_4_image','label'=>'Process 4 image','name'=>'proc_4_image','type'=>'image','return_format'=>'id'),

                // Why us
                array('key'=>'field_why_us_image','label'=>'Why us image','name'=>'why_us_image','type'=>'image','return_format'=>'id'),
                array('key'=>'field_why_us_item_1','label'=>'Why us item 1 text','name'=>'why_us_item_1','type'=>'text'),
                array('key'=>'field_why_us_item_2','label'=>'Why us item 2 text','name'=>'why_us_item_2','type'=>'text'),
                array('key'=>'field_why_us_item_3','label'=>'Why us item 3 text','name'=>'why_us_item_3','type'=>'text'),

                // Cases - images for the three illustrative icons (warn, lighting, bril)
                array('key'=>'field_case_warn','label'=>'Case warn image','name'=>'case_warn','type'=>'image','return_format'=>'id'),
                array('key'=>'field_case_lighting','label'=>'Case lighting image','name'=>'case_lighting','type'=>'image','return_format'=>'id'),
                array('key'=>'field_case_bril','label'=>'Case bril image','name'=>'case_bril','type'=>'image','return_format'=>'id'),

                // Final CTA
                array('key'=>'field_final_cta_title','label'=>'Final CTA title','name'=>'final_cta_title','type'=>'text'),
                array('key'=>'field_final_cta_text','label'=>'Final CTA text','name'=>'final_cta_text','type'=>'textarea'),

                // FAQ - 6 question/answer pairs (ACF Free compatible)
                array('key'=>'field_faq_1_question','label'=>'FAQ Question 1','name'=>'faq_1_question','type'=>'text','instructions'=>'Leave empty to hide this question'),
                array('key'=>'field_faq_1_answer','label'=>'FAQ Answer 1','name'=>'faq_1_answer','type'=>'textarea'),
                array('key'=>'field_faq_2_question','label'=>'FAQ Question 2','name'=>'faq_2_question','type'=>'text','instructions'=>'Leave empty to hide this question'),
                array('key'=>'field_faq_2_answer','label'=>'FAQ Answer 2','name'=>'faq_2_answer','type'=>'textarea'),
                array('key'=>'field_faq_3_question','label'=>'FAQ Question 3','name'=>'faq_3_question','type'=>'text','instructions'=>'Leave empty to hide this question'),
                array('key'=>'field_faq_3_answer','label'=>'FAQ Answer 3','name'=>'faq_3_answer','type'=>'textarea'),
                array('key'=>'field_faq_4_question','label'=>'FAQ Question 4','name'=>'faq_4_question','type'=>'text','instructions'=>'Leave empty to hide this question'),
                array('key'=>'field_faq_4_answer','label'=>'FAQ Answer 4','name'=>'faq_4_answer','type'=>'textarea'),
                array('key'=>'field_faq_5_question','label'=>'FAQ Question 5','name'=>'faq_5_question','type'=>'text','instructions'=>'Leave empty to hide this question'),
                array('key'=>'field_faq_5_answer','label'=>'FAQ Answer 5','name'=>'faq_5_answer','type'=>'textarea'),
                array('key'=>'field_faq_6_question','label'=>'FAQ Question 6','name'=>'faq_6_question','type'=>'text','instructions'=>'Leave empty to hide this question'),
                array('key'=>'field_faq_6_answer','label'=>'FAQ Answer 6','name'=>'faq_6_answer','type'=>'textarea'),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'landing',
                    ),
                ),
            ),
        ) );
    }
}
add_action( 'acf/init', 'arch_register_acf_landing_fields' );

/**
 * Parse simple placeholders in text and replace with safe HTML.
 * Supported placeholders: [green]...[/green], [reveal]...[/reveal], [br]
 * Input is escaped first, then placeholders are replaced with allowed tags.
 */
function arch_format_placeholders( $text ) {
    if ( $text === null || $text === false || $text === '' ) {
        return '';
    }

    // Escape user input to prevent injection
    $escaped = esc_html( $text );

    $search = array(
        '[green]',
        '[/green]',
        '[reveal]',
        '[/reveal]',
        '[br]',
    );

    $replace = array(
        '<span class="text-green">',
        '</span>',
        '<span class="scroll-color-reveal">',
        '</span>',
        '<br />',
    );

    $replaced = str_replace( $search, $replace, $escaped );

    // Allow only span[class] and br tags inserted by us
    $allowed = array(
        'span' => array( 'class' => true ),
        'br'   => array(),
    );

    return wp_kses( $replaced, $allowed );
}

/**
 * One-time migration: copy values from old ACF field names to new intuitive names.
 * Runs only in admin, only once (sets option 'arch_acf_migrated_v1').
 */
function arch_migrate_acf_old_to_new() {
    if ( ! is_admin() ) {
        return;
    }
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }
    if ( get_option( 'arch_acf_migrated_v1' ) ) {
        return;
    }
    if ( ! function_exists( 'get_posts' ) ) {
        return;
    }

    $posts = get_posts( array( 'post_type' => 'landing', 'numberposts' => -1, 'post_status' => 'any' ) );
    if ( empty( $posts ) ) {
        update_option( 'arch_acf_migrated_v1', time() );
        return;
    }

    foreach ( $posts as $post ) {
        $pid = $post->ID;

        // helper getters/setters (ACF-aware)
        $g = function( $key ) use ( $pid ) {
            if ( function_exists( 'get_field' ) ) {
                return get_field( $key, $pid );
            }
            return get_post_meta( $pid, $key, true );
        };
        $s = function( $key, $val ) use ( $pid ) {
            if ( function_exists( 'update_field' ) ) {
                return update_field( $key, $val, $pid );
            }
            return update_post_meta( $pid, $key, $val );
        };

        // Mapping: new_field => old_field(s)
        $mappings = array(
            'first_screen__subtitle__text' => array( 'first_screen__subtitle__text', 'first_screen_subtitle_part1', 'first_screen_subtitle' ),
            'first_screen__subtitle__text_green' => array( 'first_screen__subtitle__text_green', 'first_screen_subtitle_highlight' ),
            'first_screen__subtitle__text_after' => array( 'first_screen__subtitle__text_after', 'first_screen_subtitle_part2' ),
            'first_screen__subtitle__scroll_color_reveal' => array( 'first_screen__subtitle__scroll_color_reveal', 'first_screen_subtitle_reveal' ),

            'overview__subtitle__text_green' => array( 'overview__subtitle__text_green', 'overview_subtitle' ),
            'overview__text__scroll_color_reveal' => array( 'overview__text__scroll_color_reveal', 'overview_text' ),

            'objectives_title_part1' => array( 'objectives_title' ),
            'objectives_title_part2' => array( 'objectives_title' ),

            'why_us__title_part1' => array( 'why_us__title', 'why_us_title' ),
            'why_us__title_part2' => array( 'why_us__title', 'why_us_title' ),
            // Process (proc_) mappings: try common legacy variants
            'proc_1_title' => array( 'proc_1_title', 'process_1_title', 'proc1_title', 'proc_1' ),
            'proc_1_text' => array( 'proc_1_text', 'process_1_text', 'proc1_text' ),
            'proc_1_image' => array( 'proc_1_image', 'process_1_image', 'proc1_image', 'proc_1_img' ),

            'proc_2_title' => array( 'proc_2_title', 'process_2_title', 'proc2_title', 'proc_2' ),
            'proc_2_text' => array( 'proc_2_text', 'process_2_text', 'proc2_text' ),
            'proc_2_image' => array( 'proc_2_image', 'process_2_image', 'proc2_image', 'proc_2_img' ),

            'proc_3_title' => array( 'proc_3_title', 'process_3_title', 'proc3_title', 'proc_3' ),
            'proc_3_text' => array( 'proc_3_text', 'process_3_text', 'proc3_text' ),
            'proc_3_image' => array( 'proc_3_image', 'process_3_image', 'proc3_image', 'proc_3_img' ),

            'proc_4_title' => array( 'proc_4_title', 'process_4_title', 'proc4_title', 'proc_4' ),
            'proc_4_text' => array( 'proc_4_text', 'process_4_text', 'proc4_text' ),
            'proc_4_image' => array( 'proc_4_image', 'process_4_image', 'proc4_image', 'proc_4_img' ),

            // Benefits / advantages mapping (legacy 'advantage_*' variants)
            'benefit_1_text' => array( 'benefit_1_text', 'advantage_1_text', 'adv_1_text', 'advantage_1' ),
            'benefit_2_text' => array( 'benefit_2_text', 'advantage_2_text', 'adv_2_text', 'advantage_2' ),
            'benefit_3_text' => array( 'benefit_3_text', 'advantage_3_text', 'adv_3_text', 'advantage_3' ),
            'benefit_4_text' => array( 'benefit_4_text', 'advantage_4_text', 'adv_4_text', 'advantage_4' ),

            // Cases mapping (legacy variations)
            'case_warn' => array( 'case_warn', 'case_warning', 'case_warn_image', 'case_warn_img' ),
            'case_lighting' => array( 'case_lighting', 'case_light', 'case_lighting_image', 'case_lighting_img' ),
            'case_bril' => array( 'case_bril', 'case_brill', 'case_bril_image', 'case_bril_img' ),
        );

        // Run simple copy for straightforward fields
        foreach ( $mappings as $new => $olds ) {
            // skip if new already has value
            $cur = $g( $new );
            if ( ! empty( $cur ) ) {
                continue;
            }

            // try old candidates
            $found = null;
            foreach ( $olds as $old ) {
                $val = $g( $old );
                if ( $val !== null && $val !== false && $val !== '' ) {
                    $found = $val;
                    break;
                }
            }
            if ( $found !== null ) {
                // special handling for objectives and why-us splitting
                if ( in_array( $new, array( 'objectives_title_part1', 'objectives_title_part2' ), true ) ) {
                    // split on <br> or newline
                    $parts = preg_split( '/<br\s*\/?\>|\r\n|\n/u', $found );
                    $p1 = isset( $parts[0] ) ? wp_strip_all_tags( $parts[0] ) : '';
                    $p2 = isset( $parts[1] ) ? wp_strip_all_tags( $parts[1] ) : '';
                    if ( $new === 'objectives_title_part1' ) {
                        $s( $new, $p1 );
                    } else {
                        $s( $new, $p2 );
                    }
                } elseif ( in_array( $new, array( 'why_us__title_part1', 'why_us__title_part2' ), true ) ) {
                    // split why-us similar to objectives
                    $parts = preg_split( '/<br\s*\/?\>|\r\n|\n/u', $found );
                    $p1 = isset( $parts[0] ) ? wp_strip_all_tags( $parts[0] ) : '';
                    $p2 = isset( $parts[1] ) ? wp_strip_all_tags( $parts[1] ) : '';
                    if ( $new === 'why_us__title_part1' ) {
                        $s( $new, $p1 );
                    } else {
                        $s( $new, $p2 );
                    }
                } else {
                    // for overview highlight extraction: if old contains span.text-green, extract content
                    if ( $new === 'overview__subtitle__text_green' ) {
                        if ( preg_match( '/<span[^>]*class=["\']?[^"\']*text-green[^"\']*["\']?[^>]*>(.*?)<\/span>/is', $found, $m ) ) {
                            $ex = wp_strip_all_tags( $m[1] );
                            $s( $new, $ex );
                        } else {
                            // if not present, do not populate preview highlight automatically
                        }
                    } elseif ( $new === 'overview__text__scroll_color_reveal' ) {
                        if ( preg_match( '/<span[^>]*class=["\']?[^"\']*scroll-color-reveal[^"\']*["\']?[^>]*>(.*?)<\/span>/is', $found, $m ) ) {
                            $ex = wp_strip_all_tags( $m[1] );
                            $s( $new, $ex );
                        } else {
                            // fallback: copy whole overview_text into reveal field
                            $s( $new, wp_strip_all_tags( $found ) );
                        }
                    } else {
                        $s( $new, $found );
                    }
                }
            }
        }
    }

    // mark as done
    update_option( 'arch_acf_migrated_v1', time() );
}
add_action( 'admin_init', 'arch_migrate_acf_old_to_new' );

// Debug code removed. Production-ready theme: no debug output here.

/**
 * ============================================
 * MAILCHIMP INTEGRATION
 * ============================================
 * Handles form submissions and sends data to Mailchimp API
 * Two form types: 'meeting' and 'checklist'
 */

// Mailchimp AJAX configuration moved to arch_expert_styles() function above
// to ensure proper order of wp_enqueue_script and wp_localize_script

// AJAX handler for logged-in users
add_action('wp_ajax_mailchimp_subscribe', 'arch_mailchimp_subscribe_handler');
// AJAX handler for non-logged-in users
add_action('wp_ajax_nopriv_mailchimp_subscribe', 'arch_mailchimp_subscribe_handler');

/**
 * Mailchimp subscription handler
 * Processes form data and sends to Mailchimp API
 */
function arch_mailchimp_subscribe_handler() {
    // Verify nonce
    check_ajax_referer('mailchimp_subscribe_nonce', 'nonce');

    // Get form data
    $type = isset($_POST['type']) ? sanitize_text_field($_POST['type']) : 'meeting';
    $email = isset($_POST['email']) ? sanitize_email($_POST['email']) : '';
    $name = isset($_POST['name']) ? sanitize_text_field($_POST['name']) : '';
    $phone = isset($_POST['phone']) ? sanitize_text_field($_POST['phone']) : '';

    // Validate required fields
    if (empty($email) || !is_email($email)) {
        wp_send_json_error(array('message' => 'Invalid email address'));
        return;
    }

    // Mailchimp API credentials
    $mailchimp_api_key = 'MAILCHIMP_API_KEY_REMOVED';
    $mailchimp_list_id = 'a5bc63ac6c';
    $mailchimp_server = 'us18';

    // If credentials are not set yet, log the data and return success
    if (empty($mailchimp_api_key) || empty($mailchimp_list_id)) {
        error_log('Mailchimp form submission (credentials not configured):');
        error_log('Type: ' . $type);
        error_log('Email: ' . $email);
        error_log('Name: ' . $name);
        error_log('Phone: ' . $phone);
        
        wp_send_json_success(array(
            'message' => 'Form data received (Mailchimp integration pending)',
            'type' => $type
        ));
        return;
    }

    // Extract server prefix from API key if not provided
    if (empty($mailchimp_server) && strpos($mailchimp_api_key, '-') !== false) {
        $parts = explode('-', $mailchimp_api_key);
        $mailchimp_server = end($parts);
    }

    // Prepare API endpoint
    // Use subscriber hash for PUT/PATCH (allows updating existing members)
    $subscriber_hash = md5(strtolower($email));
    $api_url = "https://{$mailchimp_server}.api.mailchimp.com/3.0/lists/{$mailchimp_list_id}/members/{$subscriber_hash}";

    // Split name into first and last
    $name_parts = explode(' ', $name, 2);
    $first_name = $name_parts[0];
    $last_name = isset($name_parts[1]) ? $name_parts[1] : '';

    // Map form type to Mailchimp tags
    // meeting -> lead tag
    // checklist -> funnel tag
    // book -> book tag
    if ($type === 'checklist') {
        $tag = 'funnel';
    } elseif ($type === 'book') {
        $tag = 'book';
    } else {
        $tag = 'lead';
    }

    // Prepare subscriber data
    // Use status_if_new to set status only for new subscribers
    $data = array(
        'email_address' => $email,
        'status_if_new' => 'subscribed',
        'merge_fields' => array(
            'FNAME' => $first_name,
            'LNAME' => $last_name,
            'PHONE' => $phone,
            'FORMTYPE' => $type // Custom field to track form type (meeting/checklist/book)
        ),
        'tags' => array($tag) // Tag: 'lead' for meeting, 'funnel' for checklist, 'book' for book
    );

    // Make API request to Mailchimp using PUT (creates or updates)
    $response = wp_remote_request($api_url, array(
        'method' => 'PUT',
        'headers' => array(
            'Authorization' => 'Basic ' . base64_encode('anystring:' . $mailchimp_api_key),
            'Content-Type' => 'application/json'
        ),
        'body' => json_encode($data),
        'timeout' => 15
    ));

    // Check for errors
    if (is_wp_error($response)) {
        error_log('Mailchimp API error: ' . $response->get_error_message());
        wp_send_json_error(array('message' => 'Failed to connect to Mailchimp'));
        return;
    }

    $response_code = wp_remote_retrieve_response_code($response);
    $response_body = json_decode(wp_remote_retrieve_body($response), true);

    // Handle response
    // PUT returns 200 for both new and updated subscribers
    if ($response_code === 200) {
        wp_send_json_success(array(
            'message' => 'Successfully subscribed to Mailchimp',
            'type' => $type,
            'tag' => $tag
        ));
    } else {
        error_log('Mailchimp API error response: ' . print_r($response_body, true));
        wp_send_json_error(array(
            'message' => 'Mailchimp error: ' . ($response_body['detail'] ?? 'Unknown error')
        ));
    }
}

/**
 * ============================================
 * BLOG SUPPORT
 * ============================================
 */

// Enable featured image (post thumbnails) support for posts
add_theme_support( 'post-thumbnails', array( 'post' ) );

// Add custom image sizes for blog
add_image_size( 'blog-grid-thumb', 800, 600, true ); // For grid thumbnails
add_image_size( 'blog-single-image', 1200, 800, false ); // For single post images

/**
 * Add 'body--white' class to body_class for blog pages
 * This enables the dark header (dark logo) for blog pages
 */
function arch_blog_body_class( $classes ) {
    // Add body--white class for blog listing page (template-blogs.php)
    if ( is_page_template( 'template-blogs.php' ) ) {
        $classes[] = 'body--white';
    }

    // Add body--white class for single blog post pages
    if ( is_single() && get_post_type() === 'post' ) {
        $classes[] = 'body--white';
    }

    return $classes;
}
add_filter( 'body_class', 'arch_blog_body_class' );

/**
 * Customize excerpt length
 */
function arch_custom_excerpt_length( $length ) {
    return 20; // Number of words
}
add_filter( 'excerpt_length', 'arch_custom_excerpt_length' );

/**
 * Customize excerpt "more" string
 */
function arch_custom_excerpt_more( $more ) {
    return '...';
}
add_filter( 'excerpt_more', 'arch_custom_excerpt_more' );

?>
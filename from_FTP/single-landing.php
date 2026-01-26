<?php
/**
 * Template for single Landing CPT (post type: landing)
 */
get_header();

// Helper to output image from ACF or fallback to theme asset
function arch_landing_image_or_asset( $field_name, $fallback_path ) {
    $post_id = get_queried_object_id();
    $img = function_exists('get_field') ? get_field( $field_name, $post_id ) : false;
    if ( $img ) {
        // $img may be ID
        if ( is_numeric( $img ) ) {
            return wp_get_attachment_image( $img, 'full' );
        }
        // or array
        if ( is_array( $img ) && ! empty( $img['url'] ) ) {
            return '<img src="' . esc_url( $img['url'] ) . '" alt="' . esc_attr( $img['alt'] ?? '' ) . '">';
        }
    }
    // fallback
    return '<img src="' . esc_url( get_stylesheet_directory_uri() . $fallback_path ) . '" alt="">';
}

// Helper to reliably fetch ACF field for the current queried object
function arch_get_field( $name, $default = false ) {
    $post_id = get_queried_object_id();
    if ( function_exists( 'get_field' ) ) {
        $val = get_field( $name, $post_id );
        if ( $val !== null && $val !== false && $val !== '' ) {
            return $val;
        }

    }
    return $default;
}

?>

    <main class="main">
        <section class="first-screen">
            <div class="container">
                <div class="first-screen__content">
                    <div class="h1 first-screen__title"><?php echo esc_html( arch_get_field('first_screen_title', 'Worried about a possible cyberattack?') ); ?></div>

                    <div class="h4 first-screen__subtitle">
                        <?php
                        // Prefer new intuitive field names (map to classes). Fall back to older part fields if needed.
                        $ss_main = arch_get_field('first_screen__subtitle__text', arch_get_field('first_screen_subtitle_part1'));
                        $ss_hl = arch_get_field('first_screen__subtitle__text_green', arch_get_field('first_screen_subtitle_highlight'));
                        $ss_after = arch_get_field('first_screen__subtitle__text_after', arch_get_field('first_screen_subtitle_part2'));
                        $ss_rev = arch_get_field('first_screen__subtitle__scroll_color_reveal', arch_get_field('first_screen_subtitle_reveal'));

                        // If none of the editable fields are provided, show the original hardcoded markup
                        if ( empty( $ss_main ) && empty( $ss_hl ) && empty( $ss_after ) && empty( $ss_rev ) ) {
                            echo 'We <span class="text-green">identify and help</span> eliminate critical<br /> vulnerabilities <span class="scroll-color-reveal">in your IT infrastructure before they lead to financial or reputational losses</span>';
                        } else {
                            echo esc_html( $ss_main );
                            if ( $ss_hl ) {
                                echo ' <span class="text-green">' . esc_html( $ss_hl ) . '</span>';
                            }
                            if ( $ss_after ) {
                                echo ' ' . esc_html( $ss_after );
                            }
                            if ( $ss_rev ) {
                                echo '<br /><span class="scroll-color-reveal">' . esc_html( $ss_rev ) . '</span>';
                            }
                        }
                        ?>
                    </div>

                    <div class="h5 first-screen__text"><?php echo esc_html( arch_get_field('first_screen_text1', 'Gain a competitive advantage and protect your business from cyber incidents') ); ?></div>

                    <div class="h5 first-screen__text"><?php echo esc_html( arch_get_field('first_screen_text2', 'Book your cybersecurity audit today!') ); ?></div>

                    <div class="first-screen__cta">
                        <div class="first-screen__buttons">
                            <div class="first-screen__buttons__item">
                                <div class="cta">
                                    <a href="#" class="btn js--cta"><?php echo esc_html( arch_get_field('first_screen_cta_text', 'Book a meeting') ); ?></a>
                                    <div class="cta__notice"><?php echo esc_html( arch_get_field('first_screen_cta_notice', '30 minutes | Free of charge') ); ?></div>
                                </div>
                            </div>
                            <a href="#" class="first-screen__link js--cta-checklist"><?php echo esc_html( arch_get_field('first_screen_link_text', 'Get the Cybersecurity Checklist') ); ?></a>
                        </div>
                    </div>
                </div>

                <div class="first-screen__bottom">
                    <div class="h5 first-screen__footer"><?php echo esc_html( arch_get_field('first_screen_footer', '22 years in IT | 100+ technology projects completed') ); ?></div>
                    <div class="first-screen__bg">
                        <?php echo arch_landing_image_or_asset( 'first_screen_image', '/assets/images/first-screen-decor.webp' ); ?>
                    </div>
                </div>
            </div>
        </section>

        <section class="overview" id="overview">
            <div class="container">
                <div class="section-label"><span><?php echo esc_html( arch_get_field('overview_label') ?: 'OVERVIEW' ); ?></span></div>
                <div class="h2 overview__title"><?php echo esc_html( arch_get_field('overview_title') ?: 'What is a cybersecurity audit?' ); ?></div>
                <div class="h4 overview__subtitle">
                    <?php
                    // Use explicit fields matching classes: overview__subtitle__text_green
                    $ov_main = arch_get_field('overview_subtitle');
                    $ov_hl = arch_get_field('overview__subtitle__text_green');
                    $ov_text = arch_get_field('overview_text');

                    // If editor didn't fill overview fields, output original hardcoded markup
                    if ( empty( $ov_main ) && empty( $ov_hl ) && empty( $ov_text ) ) {
                        echo 'A cybersecurity audit is a <span class="text-green">comprehensive assessment of your company\'s</span> <span class="scroll-color-reveal">IT infrastructure and processes.</span>';
                    } else {
                        if ( $ov_main ) {
                            // If highlighted part provided separately, prefer that
                            if ( $ov_hl ) {
                                // Try to remove highlight substring from main if present
                                $before = str_replace( $ov_hl, '', $ov_main );
                                echo esc_html( $before );
                                echo ' <span class="text-green">' . esc_html( $ov_hl ) . '</span>';
                            } else {
                                echo esc_html( $ov_main );
                            }
                        }
                    }
                    ?>
                </div>
                <div class="h4 overview__text">
                    <?php
                    // animated reveal part
                    $ov_reveal = arch_get_field('overview__text__scroll_color_reveal', arch_get_field('overview_text'));

                    if ( empty( $ov_main ) && empty( $ov_hl ) && empty( $ov_text ) && empty( $ov_reveal ) ) {
                        echo '<span class="scroll-color-reveal">Its goal is to identify vulnerabilities, evaluate risks, and ensure compliance with regulatory requirements.</span>';
                    } else {
                        if ( $ov_reveal ) {
                            echo '<span class="scroll-color-reveal">' . esc_html( $ov_reveal ) . '</span>';
                        } elseif ( $ov_text ) {
                            echo '<span class="scroll-color-reveal">' . esc_html( $ov_text ) . '</span>';
                        }
                    }
                    ?>
                </div>
            </div>
        </section>

        <section class="objectives" id="objectives">
            <canvas id="objectives-space"></canvas>
            <div class="container">
                <div class="section-label section-label--white"><span><?php echo esc_html( get_field('objectives_label') ?: 'OBJECTIVES' ); ?></span></div>
                <div class="h2 objectives__title">
                    <?php
                    $obj_title = arch_get_field('objectives_title');
                    // If no custom title provided, fall back to original markup
                    if ( empty( $obj_title ) ) {
                        echo 'Objectives of<br />a cybersecurity audit';
                    } else {
                        echo arch_format_placeholders( $obj_title );
                    }
                    ?>
                </div>

                <div class="objectives__grid">
                    <div class="objectives__item">
                        <?php echo arch_landing_image_or_asset( 'objective_1_image', '/assets/images/1.webp' ); ?>
                        <div class="objectives__item__content">
                            <div class="h4 objectives__item-title"><?php echo esc_html( get_field('objective_1_title') ?: 'Increase business resilience and control' ); ?></div>
                            <div class="objectives__item-text"><?php echo esc_html( get_field('objective_1_text') ?: 'Identify weak points to prevent critical failures, data leaks, and business interruptions.' ); ?></div>
                        </div>
                    </div>

                    <div class="objectives__item">
                        <?php echo arch_landing_image_or_asset( 'objective_2_image', '/assets/images/2.webp' ); ?>
                        <div class="objectives__item__content">
                            <div class="h4 objectives__item-title"><?php echo esc_html( get_field('objective_2_title') ?: 'Turn security into a business asset' ); ?></div>
                            <div class="objectives__item-text"><?php echo esc_html( get_field('objective_2_text') ?: 'Make protection part of your growth strategy and a driver of customer and investor trust.' ); ?></div>
                        </div>
                    </div>

                    <div class="objectives__item">
                        <?php echo arch_landing_image_or_asset( 'objective_3_image', '/assets/images/3.webp' ); ?>
                        <div class="objectives__item__content">
                            <div class="h4 objectives__item-title"><?php echo esc_html( get_field('objective_3_title') ?: 'Gain a competitive advantage' ); ?></div>
                            <div class="objectives__item-text"><?php echo esc_html( get_field('objective_3_text') ?: 'Get an objective view of your security risks and minimize them before incidents occur.' ); ?></div>
                        </div>
                    </div>
                </div>

                <div class="objectives__cta">
                    <div class="h3 objectives__cta-title">Want to find out if your company<br /> needs a cybersecurity audit?</div>
                    <div class="objectives__cta-text">Let's discuss it in a free 30-minute session.</div>
                    <div class="cta">
                        <a href="#" class="btn js--cta">Book a meeting</a>
                        <div class="cta__notice">30 minutes | Free of charge</div>
                    </div>
                </div>
            </div>
        </section>

        <section class="benefits" id="benefits">
            <div class="container">
                <div class="section-label"><span><?php echo esc_html( get_field('benefits_label') ?: 'BENEFITS' ); ?></span></div>
                <div class="h2 benefits__title"><?php echo esc_html( get_field('benefits_title') ?: 'Discover vulnerabilities before they become a problem!' ); ?></div>

                <div class="benefits__cards">
                    <div class="benefits__card benefits__card--1"><div class="benefits__card-dots"><span></span></div><p><?php echo esc_html( get_field('benefit_1_text') ?: 'Are you unsure about the reliability of your current security setup?' ); ?></p></div>
                    <div class="benefits__card benefits__card--2"><div class="benefits__card-dots"><span></span><span></span></div><p><?php echo esc_html( get_field('benefit_2_text') ?: 'Do you plan to scale your business and want to be confident your security system can handle it?' ); ?></p></div>
                    <div class="benefits__card benefits__card--3"><div class="benefits__card-dots"><span></span><span></span><span></span></div><p><?php echo esc_html( get_field('benefit_3_text') ?: 'Have you experienced a security incident and want to prevent it from happening again?' ); ?></p></div>
                    <div class="benefits__card benefits__card--4"><div class="benefits__card-dots"><span></span><span></span><span></span><span></span></div><p><?php echo esc_html( get_field('benefit_4_text') ?: 'Are you concerned about data leaks and want to protect your reputation?' ); ?></p></div>
                </div>
            </div>
        </section>

        <div class="risks-process-wrapper">
            <canvas id="risks-process-space"></canvas>
            <section class="risks" id="risks">
                <div class="container">
                    <div class="section-label section-label--white"><span><?php echo esc_html( get_field('risks_label') ?: 'RISKS' ); ?></span></div>
                    <?php
                    // Risks: if specific risk titles or icon exist, render dynamic grid; otherwise show original markup
                    $risk_icon = arch_get_field('risk_icon');
                    $risk_present = false;
                    for ( $ri = 1; $ri <= 6; $ri++ ) {
                        if ( arch_get_field('risk_' . $ri . '_title') ) {
                            $risk_present = true;
                            break;
                        }
                    }

                    if ( ! $risk_present && empty( $risk_icon ) ) :
                    ?>
                    <div class="h2 risks__title">What your business risks without a security audit</div>
                    <div class="risks__grid">
                        <div class="risks__card">
                            <div class="risks__icon">
                                <?php echo arch_landing_image_or_asset( 'risk_icon', '/assets/images/shield.webp' ); ?>
                                <span>1</span>
                            </div>
                            <div class="h5 risks__card-title">Data leaks and customer information exposure</div>
                        </div>

                        <div class="risks__card">
                            <div class="risks__icon">
                                <?php echo arch_landing_image_or_asset( 'risk_icon', '/assets/images/shield.webp' ); ?>
                                <span>2</span>
                            </div>
                            <div class="h5 risks__card-title">Service disruptions and downtime</div>
                        </div>

                        <div class="risks__card">
                            <div class="risks__icon">
                                <?php echo arch_landing_image_or_asset( 'risk_icon', '/assets/images/shield.webp' ); ?>
                                <span>3</span>
                            </div>
                            <div class="h5 risks__card-title">Fines and lost contracts</div>
                        </div>

                        <div class="risks__card">
                            <div class="risks__icon">
                                <?php echo arch_landing_image_or_asset( 'risk_icon', '/assets/images/shield.webp' ); ?>
                                <span>4</span>
                            </div>
                            <div class="h5 risks__card-title">Reputational damage and loss of trust</div>
                        </div>

                        <div class="risks__card">
                            <div class="risks__icon">
                                <?php echo arch_landing_image_or_asset( 'risk_icon', '/assets/images/shield.webp' ); ?>
                                <span>5</span>
                            </div>
                            <div class="h5 risks__card-title">Overspending on ineffective security measures</div>
                        </div>

                        <div class="risks__card">
                            <div class="risks__icon">
                                <?php echo arch_landing_image_or_asset( 'risk_icon', '/assets/images/shield.webp' ); ?>
                                <span>6</span>
                            </div>
                            <div class="h5 risks__card-title">Managing blindly without understanding real risk levels</div>
                        </div>
                    </div>
                    <?php else : ?>
                    <div class="h2 risks__title"><?php echo esc_html( arch_get_field('risks_title', 'What your business risks without a security audit') ); ?></div>
                    <div class="risks__grid">
                        <?php for ( $i = 1; $i <= 6; $i++ ) :
                            $title = arch_get_field('risk_' . $i . '_title') ?: ("Risk {$i}");
                        ?>
                        <div class="risks__card">
                            <div class="risks__icon">
                                <?php echo arch_landing_image_or_asset( 'risk_icon', '/assets/images/shield.webp' ); ?>
                                <span><?php echo esc_html( $i ); ?></span>
                            </div>
                            <div class="h5 risks__card-title"><?php echo esc_html( $title ); ?></div>
                        </div>
                        <?php endfor; ?>
                    </div>
                    <?php endif; ?>
                    <div class="risks__footer">
                        <div class="h3 risks__footer-title">
                            <?php
                            // Use intuitive fields for risks footer; fallback to hardcoded original markup
                            $rf_main = arch_get_field('risks__footer__text_main');
                            $rf_green = arch_get_field('risks__footer__text_green');
                            $rf_reveal = arch_get_field('risks__footer__text_reveal');

                            if ( empty( $rf_main ) && empty( $rf_green ) && empty( $rf_reveal ) ) {
                                echo 'A cybersecurity audit <span class="text-green">helps prevent all of this:</span><br />';
                                echo '<span class="scroll-color-reveal font-400">It reveals vulnerabilities, reduces risks, saves money, and builds trust</span>';
                            } else {
                                if ( $rf_main ) {
                                    echo esc_html( $rf_main );
                                }
                                if ( $rf_green ) {
                                    echo ' <span class="text-green">' . esc_html( $rf_green ) . '</span>';
                                }
                                if ( $rf_reveal ) {
                                    echo '<br /><span class="scroll-color-reveal font-400">' . esc_html( $rf_reveal ) . '</span>';
                                }
                            }
                            ?>
                        </div>
                        
                        <div class="risks__footer__cta">
                            <div class="cta">
                                <a href="#" class="btn btn--green js--cta"><?php echo esc_html( arch_get_field('risks__footer__cta_text', 'Book a meeting') ); ?></a>
                                <div class="cta__notice"><?php echo esc_html( arch_get_field('risks__footer__cta_notice', '30 minutes | Free of charge') ); ?></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="process" id="process">
                <div class="container">
                    <div class="section-label section-label--white"><span><?php echo esc_html( get_field('process_label') ?: 'PROCESS' ); ?></span></div>
                    <?php
                    // Process block: if no process fields are filled, print original markup from index.php
                    $proc_title = arch_get_field('process_title');
                    $proc_sub = arch_get_field('process_subtitle');
                    $proc_any = false;
                    for ( $ip = 1; $ip <= 4; $ip++ ) {
                        if ( arch_get_field('proc_' . $ip . '_title') || arch_get_field('proc_' . $ip . '_text') || arch_get_field('proc_' . $ip . '_image') ) {
                            $proc_any = true;
                            break;
                        }
                    }

                    if ( empty( $proc_title ) && empty( $proc_sub ) && ! $proc_any ) :
                    ?>
                    <div class="process__content">
                        <div class="process__left">
                            <div class="h2 process__title">How a cybersecurity audit works</div>
                            <p class="process__subtitle">
                                We identify vulnerabilities and help you understand how to eliminate them in ways that strengthen your business.
                            </p>
                        </div>

                        <div class="process__right">
                            <div class="process__cards">
                                <div class="process__card">
                                    <div class="process__card-icon"><?php echo arch_landing_image_or_asset( 'proc_1_image', '/assets/images/report_1.webp' ); ?></div>
                                    <div class="process__card-content">
                                        <div class="h4 process__card-title">Preparation</div>
                                        <p class="process__card-text">We clarify the audit goals and expected outcomes. This ensures the audit meets your expectations and covers every critical detail. You will receive a clear list of objectives, criteria, and deliverables.</p>
                                    </div>
                                </div>

                                <div class="process__card">
                                    <div class="process__card-icon"><?php echo arch_landing_image_or_asset( 'proc_2_image', '/assets/images/audit.webp' ); ?></div>
                                    <div class="process__card-content">
                                        <div class="h4 process__card-title">Analysis and audit</div>
                                        <p class="process__card-text">At this stage, we assess risks, architecture, and infrastructure. If needed, we test system resilience and vulnerabilities. You'll receive an interim report highlighting problem areas and gaps.</p>
                                    </div>
                                </div>

                                <div class="process__card">
                                    <div class="process__card-icon"><?php echo arch_landing_image_or_asset( 'proc_3_image', '/assets/images/report_1.webp' ); ?></div>
                                    <div class="process__card-content">
                                        <div class="h4 process__card-title">Final report</div>
                                        <p class="process__card-text">We deliver a clear report detailing what's critical, why it matters, and what can be improved, along with actionable recommendations to address the findings.</p>
                                    </div>
                                </div>

                                <div class="process__card">
                                    <div class="process__card-icon"><?php echo arch_landing_image_or_asset( 'proc_4_image', '/assets/images/support_1.webp' ); ?></div>
                                    <div class="process__card-content">
                                        <div class="h4 process__card-title">Implementation support</div>
                                        <p class="process__card-text">We understand that change can take effort. If needed, we guide you through implementing improvements so the audit leads to real business growth, not just a report.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php else : ?>
                    <div class="process__content">
                        <div class="process__left"><div class="h2 process__title"><?php echo esc_html( arch_get_field('process_title', 'How a cybersecurity audit works') ); ?></div><p class="process__subtitle"><?php echo esc_html( arch_get_field('process_subtitle', 'We identify vulnerabilities and help you understand how to eliminate them in ways that strengthen your business.') ); ?></p></div>
                        <div class="process__right">
                            <div class="process__cards">
                                <?php 
                                $proc_defaults = array(
                                    1 => array('title' => 'Preparation', 'text' => 'We clarify the audit goals and expected outcomes. This ensures the audit meets your expectations and covers every critical detail. You will receive a clear list of objectives, criteria, and deliverables.', 'image' => '/assets/images/report_1.webp'),
                                    2 => array('title' => 'Analysis and audit', 'text' => 'At this stage, we assess risks, architecture, and infrastructure. If needed, we test system resilience and vulnerabilities. You\'ll receive an interim report highlighting problem areas and gaps.', 'image' => '/assets/images/audit.webp'),
                                    3 => array('title' => 'Final report', 'text' => 'We deliver a clear report detailing what\'s critical, why it matters, and what can be improved, along with actionable recommendations to address the findings.', 'image' => '/assets/images/report_1.webp'),
                                    4 => array('title' => 'Implementation support', 'text' => 'We understand that change can take effort. If needed, we guide you through implementing improvements so the audit leads to real business growth, not just a report.', 'image' => '/assets/images/support_1.webp'),
                                );
                                for ( $p = 1; $p <= 4; $p++ ) : 
                                    $def = isset($proc_defaults[$p]) ? $proc_defaults[$p] : array('title' => "Step {$p}", 'text' => '', 'image' => '/assets/images/report_1.webp');
                                ?>
                                <div class="process__card">
                                    <div class="process__card-icon"><?php echo arch_landing_image_or_asset( 'proc_' . $p . '_image', $def['image'] ); ?></div>
                                    <div class="process__card-content">
                                        <div class="h4 process__card-title"><?php echo esc_html( arch_get_field('proc_' . $p . '_title', $def['title'] ) ); ?></div>
                                        <p class="process__card-text"><?php echo esc_html( arch_get_field('proc_' . $p . '_text', $def['text'] ) ); ?></p>
                                    </div>
                                </div>
                                <?php endfor; ?>
                            </div>
                        </div>
                    </div>
                    <?php endif; ?>

                    <div class="process__footer">
                        <div class="h3 process__footer-title">Want to gain a competitive advantage and prevent reputational damage?</div>
                        <div class="process__footer-text">Book a meeting today.</div>
                        <div class="cta">
                            <a href="#" class="btn js--cta">Book a meeting</a>
                            <div class="cta__notice">30 minutes | Free of charge</div>
                        </div>
                    </div>
                </div>
                <!-- градиентный эллипс -->
                <div class="gradient-ellipse" aria-hidden="true"></div>
            </section>
        </div>

        <section class="advantages" id="advantages">
            <canvas id="advantages-particles"></canvas>
            <div class="container">
                <div class="advantages__wrapper">
                    <?php
                    // Check if any advantage fields are filled
                    $adv_any = false;
                    for ( $ia = 1; $ia <= 5; $ia++ ) {
                        if ( arch_get_field('advantage_' . $ia . '_title') || arch_get_field('advantage_' . $ia . '_text') ) {
                            $adv_any = true;
                            break;
                        }
                    }

                    if ( ! $adv_any ) :
                    ?>
                    <div class="advantages__header">
                        <div class="section-label section-label--white">
                            <span>ADVANTAGE</span>
                        </div>

                        <div class="h2 advantages__title">Turn security into your competitive advantage</div>

                        <div class="h5 advantages__subtitle">
                            Here is what you will gain after the cybersecurity audit:
                        </div>
                    </div>

                    <div class="advantages__grid">
                        <div class="advantages__card advantages__card--1">
                            <div class="h5 advantages__card-title">Action plan</div>
                            <p class="advantages__card-text">
                                with the option of our support throughout the implementation process.
                            </p>
                        </div>

                        <div class="advantages__card advantages__card--2">
                            <div class="h5 advantages__card-title">Clear understanding of risks and vulnerabilities</div>
                            <p class="advantages__card-text">
                                You will know exactly where your system may fail.
                            </p>
                        </div>

                        <div class="advantages__card advantages__card--3">
                            <div class="h5 advantages__card-title">Compliance overview</div>
                            <p class="advantages__card-text">
                                Which components meet modern security and architecture standards, and which need improvement.
                            </p>
                        </div>

                        <div class="advantages__card advantages__card--4">
                            <div class="h5 advantages__card-title">Optimization recommendations</div>
                            <p class="advantages__card-text">
                                Practical ways to strengthen control, simplify processes, and reduce costs.
                            </p>
                        </div>

                        <div class="advantages__card advantages__card--5">
                            <div class="h5 advantages__card-title">Security development strategy</div>
                            <p class="advantages__card-text">
                                A clear roadmap with required time and resources for long-term growth.
                            </p>
                        </div>
                    </div>

                    <div class="advantages__footer">
                        <div class="cta">
                            <a href="#" class="btn js--cta">Book a meeting</a>
                            <div class="cta__notice">30 minutes | Free of charge</div>
                        </div>
                    </div>
                    <?php else : ?>
                    <div class="advantages__header"><div class="section-label section-label--white"><span><?php echo esc_html( arch_get_field('advantages_label', 'ADVANTAGE') ); ?></span></div><div class="h2 advantages__title"><?php echo esc_html( arch_get_field('advantages_title', 'Turn security into your competitive advantage') ); ?></div></div>
                    <div class="advantages__grid">
                        <?php 
                        $adv_defaults = array(
                            1 => array('title' => 'Action plan', 'text' => 'with the option of our support throughout the implementation process.'),
                            2 => array('title' => 'Clear understanding of risks and vulnerabilities', 'text' => 'You will know exactly where your system may fail.'),
                            3 => array('title' => 'Compliance overview', 'text' => 'Which components meet modern security and architecture standards, and which need improvement.'),
                            4 => array('title' => 'Optimization recommendations', 'text' => 'Practical ways to strengthen control, simplify processes, and reduce costs.'),
                            5 => array('title' => 'Security development strategy', 'text' => 'A clear roadmap with required time and resources for long-term growth.'),
                        );
                        for ( $a = 1; $a <= 5; $a++ ) : 
                            $def = isset($adv_defaults[$a]) ? $adv_defaults[$a] : array('title' => '', 'text' => '');
                        ?>
                        <div class="advantages__card advantages__card--<?php echo $a; ?>">
                            <div class="h5 advantages__card-title"><?php echo esc_html( arch_get_field('advantage_' . $a . '_title', $def['title']) ); ?></div>
                            <p class="advantages__card-text"><?php echo esc_html( arch_get_field('advantage_' . $a . '_text', $def['text']) ); ?></p>
                        </div>
                        <?php endfor; ?>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
        </section>

        <section class="why-us" id="why-us">
            <div class="container">
                <div class="why-us__wrapper">
                    <?php
                    // Check if any why-us fields are filled
                    $why_any = false;
                    if ( arch_get_field('why_us__title_part1') || arch_get_field('why_us__title_part2') || get_field('why_us_title') ) {
                        $why_any = true;
                    }
                    for ( $iw = 1; $iw <= 6; $iw++ ) {
                        if ( arch_get_field('why_us_item_' . $iw) ) {
                            $why_any = true;
                            break;
                        }
                    }
                    if ( arch_get_field('why_us_image') ) {
                        $why_any = true;
                    }

                    if ( ! $why_any ) :
                    ?>
                    <div class="section-label">
                        <span>WHY US</span>
                    </div>
                    <div class="why-us__content">
                        <div class="why-us__left">
                            <div class="h2 why-us__title">Why you can<br /> rely on us</div>

                            <div class="why-us__list">
                                <div class="why-us__item">
                                    <div class="h4 why-us__item-title">22 years in IT and security</div>
                                    <p class="why-us__item-text">
                                        Deep expertise in architecture, infrastructure, and technology-driven risk management.
                                    </p>
                                </div>

                                <div class="why-us__item">
                                    <div class="h4 why-us__item-title">100+ security audits for IT companies</div>
                                    <p class="why-us__item-text">
                                        We've worked with startups and large enterprises across SaaS, fintech, telecom, and mobile.
                                    </p>
                                </div>

                                <div class="why-us__item">
                                    <div class="h4 why-us__item-title">No jargon</div>
                                    <p class="why-us__item-text">
                                        We explain everything in plain language, even if you're not deep into technical details.
                                    </p>
                                </div>

                                <div class="why-us__item">
                                    <div class="h4 why-us__item-title">Strict confidentiality</div>
                                    <p class="why-us__item-text">
                                        All projects are under NDA with no exceptions.
                                    </p>
                                </div>

                                <div class="why-us__item">
                                    <div class="h4 why-us__item-title">Experienced and dedicated team</div>
                                    <p class="why-us__item-text">
                                        Technical and product backgrounds, certifications, and a fresh perspective.
                                    </p>
                                </div>

                                <div class="why-us__item">
                                    <div class="h4 why-us__item-title">Flexible approach</div>
                                    <p class="why-us__item-text">
                                        No templates: we tailor the process to your business specifics and goals.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="why-us__right">
                            <?php echo arch_landing_image_or_asset( 'why_us_image', '/assets/images/why_us.jpg' ); ?>
                        </div>
                    </div>

                    <div class="why-us__footer">
                        <div class="h3 why-us__footer-title">Let's discuss how a cybersecurity audit can benefit your company</div>
                        <div class="cta">
                            <a href="#" class="btn btn--green js--cta">Book a meeting</a>
                            <div class="cta__notice">30 minutes | Free of charge</div>
                        </div>
                    </div>
                    <?php else : ?>
                    <div class="section-label"><span><?php echo esc_html( arch_get_field('why_us_label', 'WHY US') ); ?></span></div>
                    <div class="why-us__content">
                        <div class="why-us__left">
                            <div class="h2 why-us__title">
                                <?php
                                // Prefer split fields (part1/part2) to preserve explicit <br /> placement
                                $why1 = arch_get_field('why_us__title_part1');
                                $why2 = arch_get_field('why_us__title_part2');
                                if ( $why1 || $why2 ) {
                                    echo esc_html( $why1 );
                                    if ( $why2 ) {
                                        echo '<br />' . esc_html( $why2 );
                                    }
                                } else {
                                    // Fallback to older single field; allow only <br> tags if present
                                    $old = get_field('why_us_title');
                                    if ( $old ) {
                                        // keep only <br> tags from old value
                                        $safe = wp_kses( $old, array( 'br' => array() ) );
                                        echo $safe;
                                    } else {
                                        echo 'Why you can<br /> rely on us';
                                    }
                                }
                                ?>
                            </div>
                            <div class="why-us__list">
                                <?php
                                $why_defaults = array(
                                    1 => array('title' => '22 years in IT and security', 'text' => 'Deep expertise in architecture, infrastructure, and technology-driven risk management.'),
                                    2 => array('title' => '100+ security audits for IT companies', 'text' => 'We\'ve worked with startups and large enterprises across SaaS, fintech, telecom, and mobile.'),
                                    3 => array('title' => 'No jargon', 'text' => 'We explain everything in plain language, even if you\'re not deep into technical details.'),
                                    4 => array('title' => 'Strict confidentiality', 'text' => 'All projects are under NDA with no exceptions.'),
                                    5 => array('title' => 'Experienced and dedicated team', 'text' => 'Technical and product backgrounds, certifications, and a fresh perspective.'),
                                    6 => array('title' => 'Flexible approach', 'text' => 'No templates: we tailor the process to your business specifics and goals.'),
                                );
                                for ( $wi = 1; $wi <= 6; $wi++ ) :
                                    $def = isset($why_defaults[$wi]) ? $why_defaults[$wi] : array('title' => '', 'text' => '');
                                    $item_title = arch_get_field('why_us_item_' . $wi, $def['title']);
                                    if ( empty($item_title) ) continue; // skip if no title
                                ?>
                                <div class="why-us__item">
                                    <div class="h4 why-us__item-title"><?php echo esc_html( $item_title ); ?></div>
                                    <?php if ( ! empty( $def['text'] ) ) : ?>
                                    <p class="why-us__item-text"><?php echo esc_html( $def['text'] ); ?></p>
                                    <?php endif; ?>
                                </div>
                                <?php endfor; ?>
                            </div>
                        </div>
                        <div class="why-us__right"><?php echo arch_landing_image_or_asset( 'why_us_image', '/assets/images/why_us.jpg' ); ?></div>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
        </section>

        <section class="cases" id="cases">
            <div class="container">
                <?php
                // Check if any case fields are filled
                $cases_any = false;
                for ( $ic = 1; $ic <= 3; $ic++ ) {
                    if ( arch_get_field('case_' . $ic . '_title') || arch_get_field('case_' . $ic . '_tag') ) {
                        $cases_any = true;
                        break;
                    }
                }
                if ( arch_get_field('case_warn') || arch_get_field('case_lighting') || arch_get_field('case_bril') ) {
                    $cases_any = true;
                }

                if ( ! $cases_any ) :
                ?>
                <div class="section-label">
                    <span>CASES</span>
                </div>

                <div class="h2 cases__title">Case studies</div>

                <div class="h3 cases__subtitle">Security strategy development</div>

                <div class="cases__list">
                    <div class="cases__card">
                        <div class="cases__card-left">
                            <div class="h3 cases__card-title">Security strategy development for a fintech platform</div>
                            <div class="cases__card-tag">Security strategy development</div>
                        </div>

                        <div class="cases__card-right">
                            <div class="cases__card-item">
                                <div class="cases__card-icon">
                                    <?php echo arch_landing_image_or_asset( 'case_warn', '/assets/images/warn.webp' ); ?>
                                </div>
                                <div class="cases__card-item-content">
                                    <div class="cases__card-item-label">Before</div>
                                    <div class="cases__card-item-text">
                                        Security was treated as an operational cost, managed reactively after incidents. This created compliance gaps and unpredictable downtime with rising recovery costs.
                                    </div>
                                </div>
                            </div>

                            <div class="cases__card-item">
                                <div class="cases__card-icon">
                                    <?php echo arch_landing_image_or_asset( 'case_lighting', '/assets/images/lighting.webp' ); ?>
                                </div>
                                <div class="cases__card-item-content">
                                    <div class="cases__card-item-label">After</div>
                                    <div class="cases__card-item-text">
                                        Conducted a full risk analysis procedure, built a 12-month prioritized security roadmap aligned with business goals.
                                    </div>
                                </div>
                            </div>

                            <div class="cases__card-item">
                                <div class="cases__card-icon">
                                    <?php echo arch_landing_image_or_asset( 'case_bril', '/assets/images/bril.webp' ); ?>
                                </div>
                                <div class="cases__card-item-content">
                                    <div class="cases__card-item-label">Business value</div>
                                    <div class="cases__card-item-text">
                                        Critical risks were eliminated and updating of security strategy became an integrated part of business planning and growth.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="cases__card">
                        <div class="cases__card-left">
                            <div class="h3 cases__card-title">SOC and monitoring setup</div>
                            <div class="cases__card-tag">Audits & incident prevention</div>
                        </div>

                        <div class="cases__card-right">
                            <div class="cases__card-item">
                                <div class="cases__card-icon">
                                    <?php echo arch_landing_image_or_asset( 'case_warn', '/assets/images/warn.webp' ); ?>
                                </div>
                                <div class="cases__card-item-content">
                                    <div class="cases__card-item-label">Before</div>
                                    <div class="cases__card-item-text">
                                        Security was treated as an operational cost, managed reactively after incidents. This created compliance gaps and unpredictable downtime with rising recovery costs.
                                    </div>
                                </div>
                            </div>

                            <div class="cases__card-item">
                                <div class="cases__card-icon">
                                    <?php echo arch_landing_image_or_asset( 'case_lighting', '/assets/images/lighting.webp' ); ?>
                                </div>
                                <div class="cases__card-item-content">
                                    <div class="cases__card-item-label">After</div>
                                    <div class="cases__card-item-text">
                                        Conducted a full risk analysis procedure, built a 12-month prioritized security roadmap aligned with business goals.
                                    </div>
                                </div>
                            </div>

                            <div class="cases__card-item">
                                <div class="cases__card-icon">
                                    <?php echo arch_landing_image_or_asset( 'case_bril', '/assets/images/bril.webp' ); ?>
                                </div>
                                <div class="cases__card-item-content">
                                    <div class="cases__card-item-label">Business value</div>
                                    <div class="cases__card-item-text">
                                        Critical risks were eliminated and updating of security strategy became an integrated part of business planning and growth.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="cases__card">
                        <div class="cases__card-left">
                            <div class="h3 cases__card-title">Personal data leak prevention for a financial app</div>
                            <div class="cases__card-tag">Data protection & leak prevention</div>
                        </div>

                        <div class="cases__card-right">
                            <div class="cases__card-item">
                                <div class="cases__card-icon">
                                    <?php echo arch_landing_image_or_asset( 'case_warn', '/assets/images/warn.webp' ); ?>
                                </div>
                                <div class="cases__card-item-content">
                                    <div class="cases__card-item-label">Before</div>
                                    <div class="cases__card-item-text">
                                        Security was treated as an operational cost, managed reactively after incidents. This created compliance gaps and unpredictable downtime with rising recovery costs.
                                    </div>
                                </div>
                            </div>

                            <div class="cases__card-item">
                                <div class="cases__card-icon">
                                    <?php echo arch_landing_image_or_asset( 'case_lighting', '/assets/images/lighting.webp' ); ?>
                                </div>
                                <div class="cases__card-item-content">
                                    <div class="cases__card-item-label">After</div>
                                    <div class="cases__card-item-text">
                                        Conducted a full risk analysis procedure, built a 12-month prioritized security roadmap aligned with business goals.
                                    </div>
                                </div>
                            </div>

                            <div class="cases__card-item">
                                <div class="cases__card-icon">
                                    <?php echo arch_landing_image_or_asset( 'case_bril', '/assets/images/bril.webp' ); ?>
                                </div>
                                <div class="cases__card-item-content">
                                    <div class="cases__card-item-label">Business value</div>
                                    <div class="cases__card-item-text">
                                        Critical risks were eliminated and updating of security strategy became an integrated part of business planning and growth.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php else : ?>
                <div class="section-label"><span><?php echo esc_html( arch_get_field('cases_label', 'CASES') ); ?></span></div>
                <div class="h2 cases__title"><?php echo esc_html( arch_get_field('cases_title', 'Case studies') ); ?></div>
                <?php if ( arch_get_field('cases_subtitle') ) : ?>
                <div class="h3 cases__subtitle"><?php echo esc_html( arch_get_field('cases_subtitle') ); ?></div>
                <?php endif; ?>
                <div class="cases__list">
                    <?php 
                    $case_defaults = array(
                        1 => array('title' => 'Security strategy development for a fintech platform', 'tag' => 'Security strategy development'),
                        2 => array('title' => 'SOC and monitoring setup', 'tag' => 'Audits & incident prevention'),
                        3 => array('title' => 'Personal data leak prevention for a financial app', 'tag' => 'Data protection & leak prevention'),
                    );
                    for ( $c = 1; $c <= 3; $c++ ) : 
                        $def = isset($case_defaults[$c]) ? $case_defaults[$c] : array('title' => '', 'tag' => '');
                        $case_title = arch_get_field('case_' . $c . '_title', $def['title']);
                        $case_tag = arch_get_field('case_' . $c . '_tag', $def['tag']);
                    ?>
                    <div class="cases__card">
                        <div class="cases__card-left">
                            <div class="h3 cases__card-title"><?php echo esc_html( $case_title ); ?></div>
                            <?php if ( $case_tag ) : ?>
                            <div class="cases__card-tag"><?php echo esc_html( $case_tag ); ?></div>
                            <?php endif; ?>
                        </div>
                        <div class="cases__card-right">
                            <div class="cases__card-item">
                                <div class="cases__card-icon"><?php echo arch_landing_image_or_asset( 'case_warn', '/assets/images/warn.webp' ); ?></div>
                                <div class="cases__card-item-content">
                                    <div class="cases__card-item-label">Before</div>
                                    <div class="cases__card-item-text">
                                        Security was treated as an operational cost, managed reactively after incidents. This created compliance gaps and unpredictable downtime with rising recovery costs.
                                    </div>
                                </div>
                            </div>
                            <div class="cases__card-item">
                                <div class="cases__card-icon"><?php echo arch_landing_image_or_asset( 'case_lighting', '/assets/images/lighting.webp' ); ?></div>
                                <div class="cases__card-item-content">
                                    <div class="cases__card-item-label">After</div>
                                    <div class="cases__card-item-text">
                                        Conducted a full risk analysis procedure, built a 12-month prioritized security roadmap aligned with business goals.
                                    </div>
                                </div>
                            </div>
                            <div class="cases__card-item">
                                <div class="cases__card-icon"><?php echo arch_landing_image_or_asset( 'case_bril', '/assets/images/bril.webp' ); ?></div>
                                <div class="cases__card-item-content">
                                    <div class="cases__card-item-label">Business value</div>
                                    <div class="cases__card-item-text">
                                        Critical risks were eliminated and updating of security strategy became an integrated part of business planning and growth.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php endfor; ?>
                </div>
                <?php endif; ?>
            </div>
        </section>

        <section class="faq" id="faq">
            <div class="container">
                <?php
                // Check if any FAQ questions are filled
                $faq_any = false;
                for ( $if = 1; $if <= 6; $if++ ) {
                    if ( arch_get_field('faq_' . $if . '_question') ) {
                        $faq_any = true;
                        break;
                    }
                }

                if ( ! $faq_any ) :
                ?>
                <div class="section-label">
                    <span>FAQ</span>
                </div>

                <div class="h2 faq__title">Frequently asked questions</div>

                <div class="faq__list">
                    <div class="faq__item">
                        <div class="faq__question">
                            <div class="h4 faq__question-title">How long does the audit take?</div>
                            <div class="faq__toggle"></div>
                        </div>
                        <div class="faq__answer">
                            <div class="faq__answer-content">
                                <p>Usually between 2 and 8 weeks, depending on the size and complexity of your infrastructure. We agree on the plan and timeline in advance.</p>
                            </div>
                        </div>
                    </div>

                    <div class="faq__item">
                        <div class="faq__question">
                            <div class="h4 faq__question-title">Will our team need to be involved?</div>
                            <div class="faq__toggle"></div>
                        </div>
                        <div class="faq__answer">
                            <div class="faq__answer-content">
                                <p>Yes, minimal involvement is required: at the start to provide inputs and access, and at the end to discuss the report and recommendations.</p>
                            </div>
                        </div>
                    </div>

                    <div class="faq__item">
                        <div class="faq__question">
                            <div class="h4 faq__question-title">What do we get as a result?</div>
                            <div class="faq__toggle"></div>
                        </div>
                        <div class="faq__answer">
                            <div class="faq__answer-content">
                                <p>Beyond minimizing reputational, financial, and operational risks, you will receive a full report on your current state, a vulnerability map, a corrective action plan, and strategic recommendations.</p>
                            </div>
                        </div>
                    </div>

                    <div class="faq__item">
                        <div class="faq__question">
                            <div class="h4 faq__question-title">Does this apply if everything is outsourced?</div>
                            <div class="faq__toggle"></div>
                        </div>
                        <div class="faq__answer">
                            <div class="faq__answer-content">
                                <p>Yes. We assess both internal processes and external contractors to identify weak points and ways to fix them.</p>
                            </div>
                        </div>
                    </div>

                    <div class="faq__item">
                        <div class="faq__question">
                            <div class="h4 faq__question-title">How confidential is the process?</div>
                            <div class="faq__toggle"></div>
                        </div>
                        <div class="faq__answer">
                            <div class="faq__answer-content">
                                <p>All work is done strictly under NDA. Your security and our reputation are equally important: we follow the highest confidentiality standards.</p>
                            </div>
                        </div>
                    </div>

                    <div class="faq__item">
                        <div class="faq__question">
                            <div class="h4 faq__question-title">Do you provide specific recommendations?</div>
                            <div class="faq__toggle"></div>
                        </div>
                        <div class="faq__answer">
                            <div class="faq__answer-content">
                                <p>Yes. We explain what to do, why it matters, and in what order: tailored to your business context and available resources.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <?php else : ?>
                <div class="section-label"><span><?php echo esc_html( arch_get_field('faq_label', 'FAQ') ); ?></span></div>
                <div class="h2 faq__title"><?php echo esc_html( arch_get_field('faq_title', 'Frequently asked questions') ); ?></div>

                <div class="faq__list">
                    <?php 
                    $faq_defaults = array(
                        1 => array('q' => 'How long does the audit take?', 'a' => 'Usually between 2 and 8 weeks, depending on the size and complexity of your infrastructure. We agree on the plan and timeline in advance.'),
                        2 => array('q' => 'Will our team need to be involved?', 'a' => 'Yes, minimal involvement is required: at the start to provide inputs and access, and at the end to discuss the report and recommendations.'),
                        3 => array('q' => 'What do we get as a result?', 'a' => 'Beyond minimizing reputational, financial, and operational risks, you will receive a full report on your current state, a vulnerability map, a corrective action plan, and strategic recommendations.'),
                        4 => array('q' => 'Does this apply if everything is outsourced?', 'a' => 'Yes. We assess both internal processes and external contractors to identify weak points and ways to fix them.'),
                        5 => array('q' => 'How confidential is the process?', 'a' => 'All work is done strictly under NDA. Your security and our reputation are equally important: we follow the highest confidentiality standards.'),
                        6 => array('q' => 'Do you provide specific recommendations?', 'a' => 'Yes. We explain what to do, why it matters, and in what order: tailored to your business context and available resources.'),
                    );
                    for ( $fi = 1; $fi <= 6; $fi++ ) :
                        $def = isset($faq_defaults[$fi]) ? $faq_defaults[$fi] : array('q' => '', 'a' => '');
                        $question = arch_get_field('faq_' . $fi . '_question', $def['q']);
                        $answer = arch_get_field('faq_' . $fi . '_answer', $def['a']);
                        if ( empty($question) ) continue;
                    ?>
                    <div class="faq__item">
                        <div class="faq__question">
                            <div class="h4 faq__question-title"><?php echo esc_html( $question ); ?></div>
                            <div class="faq__toggle"></div>
                        </div>
                        <div class="faq__answer">
                            <div class="faq__answer-content">
                                <p><?php echo esc_html( $answer ); ?></p>
                            </div>
                        </div>
                    </div>
                    <?php endfor; ?>
                </div>
                <?php endif; ?>
            </div>
        </section>

        <section class="final-cta">
            <div class="final-cta__light"></div>
            <div class="container">
                <div class="h2"><?php echo esc_html( get_field('final_cta_title') ?: 'Want to find out where your system is vulnerable and how to strengthen security to benefit your business?' ); ?></div>
                <p><?php echo esc_html( get_field('final_cta_text') ?: 'Book a meeting, where we will discuss your case, show how a cybersecurity audit can help, and suggest where to start.' ); ?></p>
                <div class="cta"><a href="#" class="btn js--cta"><?php echo esc_html( get_field('final_cta_button') ?: 'Book a Meeting' ); ?></a><a href="#" class="cta__notice"><?php echo esc_html( get_field('final_cta_notice') ?: '30 minutes | Free of charge' ); ?></a></div>
            </div>
            <!-- bg image -->
            <img src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/cta_bg.webp' ); ?>" alt="Красивый фон" class="final-cta__bg" loading="lazy">
        </section>
    </main>

<?php get_footer(); ?>

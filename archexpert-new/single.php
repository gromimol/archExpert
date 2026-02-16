<?php
/**
 * Template for single blog post
 */

// Подключаем header для внутренних страниц
get_header('inner');
?>

<main class="main">
    <?php while ( have_posts() ) : the_post(); ?>
        <div class="blog-inner-page">
            <div class="container">
                <div class="blog-content">
                    <div class="date-badge"><?php echo get_the_date( 'd M Y' ); ?></div>

                    <div class="page-title">
                        <?php the_title(); ?>
                    </div>

                    <?php if ( has_post_thumbnail() ) : ?>
                        <div class="blog-content__img">
                            <?php the_post_thumbnail( 'full', array( 'alt' => get_the_title() ) ); ?>
                        </div>
                    <?php endif; ?>

                    <?php the_content(); ?>
                </div>

                <?php
                // "What to read next" - последние 3 статьи, исключая текущую
                $related_posts = new WP_Query( array(
                    'post_type'      => 'post',
                    'post_status'    => 'publish',
                    'posts_per_page' => 3,
                    'post__not_in'   => array( get_the_ID() ),
                    'orderby'        => 'date',
                    'order'          => 'DESC'
                ) );

                if ( $related_posts->have_posts() ) :
                ?>
                    <div class="blog-grid-wrapper">
                        <div class="blog-grid-wrapper__title h3">What to read next</div>
                        <div class="blog-grid">
                            <?php while ( $related_posts->have_posts() ) : $related_posts->the_post(); ?>
                                <div class="blog-grid__item">
                                    <a href="<?php the_permalink(); ?>" class="blog-grid__item__img">
                                        <?php
                                        if ( has_post_thumbnail() ) {
                                            the_post_thumbnail( 'large', array( 'alt' => get_the_title() ) );
                                        } else {
                                            echo '<img src="' . esc_url( get_stylesheet_directory_uri() . '/assets/images/podcast/debt_desctop.webp' ) . '" alt="' . esc_attr( get_the_title() ) . '">';
                                        }
                                        ?>
                                    </a>
                                    <div class="blog-grid__item__content">
                                        <a href="<?php the_permalink(); ?>" class="blog-grid__item__title">
                                            <?php the_title(); ?>
                                        </a>
                                        <div class="blog-grid__item__description">
                                            <?php
                                            if ( has_excerpt() ) {
                                                echo wp_trim_words( get_the_excerpt(), 20, '...' );
                                            } else {
                                                echo wp_trim_words( get_the_content(), 20, '...' );
                                            }
                                            ?>
                                        </div>
                                        <div class="date-badge"><?php echo get_the_date( 'd M Y' ); ?></div>
                                    </div>
                                </div>
                            <?php endwhile; ?>
                        </div>
                    </div>
                <?php
                endif;
                wp_reset_postdata();
                ?>
            </div>
        </div>
    <?php endwhile; ?>
</main>

<?php
// Подключаем footer для внутренних страниц
get_footer('inner');
?>
<?php
/**
 * Template Name: Blogs Page
 * Description: Template for Blog listing page
 */

// Подключаем header для внутренних страниц
get_header('inner');

// Настройки пагинации
$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
$posts_per_page = 9; // Количество постов на странице

// Запрос постов
$blog_query = new WP_Query( array(
    'post_type'      => 'post',
    'post_status'    => 'publish',
    'posts_per_page' => $posts_per_page,
    'paged'          => $paged,
    'orderby'        => 'date',
    'order'          => 'DESC'
) );
?>

<main class="main">
    <div class="blog-page">
        <div class="container">
            <div class="page-title">
                arch expert BLOG
            </div>

            <div class="h1">Knowledge to help you grow</div>

            <?php if ( $blog_query->have_posts() ) : ?>
                <div class="blog-grid">
                    <?php while ( $blog_query->have_posts() ) : $blog_query->the_post(); ?>
                        <div class="blog-grid__item">
                            <a href="<?php the_permalink(); ?>" class="blog-grid__item__img">
                                <?php
                                if ( has_post_thumbnail() ) {
                                    the_post_thumbnail( 'large', array( 'alt' => get_the_title() ) );
                                } else {
                                    // Заглушка, если нет изображения
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
                                    // Получаем краткое описание из excerpt или первых 20 слов контента
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

                <?php
                // Пагинация
                $total_pages = $blog_query->max_num_pages;
                if ( $total_pages > 1 ) :
                    ?>
                    <div class="pagination" style="margin-top: 5rem; text-align: center;">
                        <?php
                        echo paginate_links( array(
                            'total'     => $total_pages,
                            'current'   => $paged,
                            'prev_text' => '&laquo; Previous',
                            'next_text' => 'Next &raquo;',
                        ) );
                        ?>
                    </div>
                <?php endif; ?>

            <?php else : ?>
                <p style="text-align: center; margin: 5rem 0;">No blog posts found.</p>
            <?php endif; ?>

            <?php wp_reset_postdata(); ?>
        </div>
    </div>
</main>

<?php
// Подключаем footer для внутренних страниц
get_footer('inner');
?>
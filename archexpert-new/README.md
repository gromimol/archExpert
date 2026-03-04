# ArchExpert WordPress Theme

Полнофункциональная WordPress тема для проекта Arch Expert с поддержкой лендингов, внутренних страниц и блога.

**Версия:** 1.1.0
**Дата обновления:** 2026-02-16
**Требования:** WordPress 5.0+, PHP 7.4+

---

## 🚀 Быстрый старт

### Что готово:
- ✅ Security Landing (главная страница)
- ✅ Scale Landing (редактируемый через ACF)
- ✅ Страницы Book и Podcast
- ✅ **БЛОГ** (список статей + отдельные статьи)
- ✅ Формы с интеграцией Mailchimp
- ✅ Success страницы
- ✅ Полная документация

### Установка за 4 шага:

**1. Загрузить на сервер:**
```
FTP → wp-content/themes/ → загрузить папку archexpert-new
```

**2. Установить плагин ACF:**
```
Админка WP → Плагины → Добавить новый → "Advanced Custom Fields" → Установить
```

**3. Активировать тему:**
```
Внешний вид → Темы → "Arch Expert" → Активировать
```

**4. Создать страницу блога:**
```
Страницы → Добавить новую → Название: "Blog" → Шаблон: "Blogs Page" → Опубликовать
```

---

## 📁 Структура темы

```
archexpert-new/
├── style.css                     # Метаданные темы (обязателен для WP)
├── functions.php                 # Основной функционал темы
│
├── ШАБЛОНЫ СТРАНИЦ:
├── index.php                     # Главная страница (security-landing)
├── landing-scale.php             # Scale landing
├── book.php                      # Страница книги
├── podcast.php                   # Страница подкаста
├── template-blogs.php            # 🆕 Список блогов
├── single.php                    # 🆕 Отдельная статья блога
├── single-landing.php            # Шаблон для CPT Landing
├── template-text-page.php        # Шаблон для текстовых страниц
├── page-success.php              # Success страница (meeting)
├── page-success-lm.php           # Success страница (checklist)
│
├── HEADERS & FOOTERS:
├── header.php                    # Шапка для лендингов
├── header-inner.php              # Шапка для внутренних страниц (book, podcast, blog)
├── footer.php                    # Подвал для лендингов
├── footer-inner.php              # Подвал для внутренних страниц
│
├── assets/
│   ├── css/
│   │   ├── style.css            # Стили для security-landing
│   │   ├── landing-scale.css    # Стили для scale-landing
│   │   └── inner-page/css/
│   │       ├── style.css        # 🆕 Стили для book/podcast/blog
│   │       └── media.css        # 🆕 Адаптив для book/podcast/blog
│   │
│   ├── js/
│   │   ├── common.js            # Скрипты для security-landing
│   │   ├── common-scale.js      # Скрипты для scale-landing
│   │   ├── water-ripple.js      # Эффект воды
│   │   └── success-page.js      # Mailchimp интеграция
│   │
│   ├── images/
│   │   ├── logo.svg             # Светлый логотип (для лендингов)
│   │   ├── logo_dark.svg        # 🆕 Темный логотип (для блога)
│   │   ├── landing-scale/       # Картинки для scale-landing
│   │   ├── book/                # Картинки для book
│   │   └── podcast/             # Картинки для podcast
│   │
│   └── fonts/                   # Шрифты Geologica и Montserrat
│
└── README.md                    # Этот файл
```

---

## ⚙️ Что работает

### 1. Лендинги

**Security Landing (главная страница)**
- Файл: `index.php`
- URL: `/`
- Стили: `/assets/css/style.css`
- Скрипты: `common.js`, `water-ripple.js`
- Редактирование: ❌ Пока статичный HTML

**Scale Landing**
- Файл: `landing-scale.php`
- URL: `/scale/` (создать страницу в админке)
- Стили: `/assets/css/landing-scale.css`
- Скрипты: `common-scale.js`, `water-ripple.js`
- Редактирование: ✅ Через ACF (частично)
- Особенности: Автоскролл benefits cards

### 2. Внутренние страницы

**Book (Страница книги)**
- Файл: `book.php`
- URL: `/book/`
- Редактирование: ❌ Статичный HTML

**Podcast (Страница подкаста)**
- Файл: `podcast.php`
- URL: `/podcast/`
- Редактирование: ❌ Статичный HTML

### 3. 🆕 Блог

**Список блогов**
- Файл: `template-blogs.php`
- URL: `/blog/` (или любой URL страницы)
- Функционал:
  - Вывод всех опубликованных постов
  - Сетка из 3 колонок на десктопе
  - Автоматическое создание краткого описания (первые 20 слов)
  - Пагинация (9 постов на странице)
  - Класс `body--white` для темного логотипа

**Отдельная статья блога**
- Файл: `single.php`
- URL: `/название-статьи/`
- Функционал:
  - Вывод полного контента статьи
  - Поддержка заголовков h1-h4, списков, ссылок
  - Блок "What to read next" с 3 последними статьями
  - Класс `body--white` для темного логотипа

**Как создавать статьи:**
1. Записи → Добавить новую
2. Заполнить:
   - Заголовок статьи
   - Контент (текст + заголовки + списки + ссылки)
   - Изображение записи (Featured Image) - главная картинка
3. Опубликовать

**Краткое описание:**
- Автоматически берется из первых 20 слов контента
- Можно задать вручную через "Цитата" (Excerpt)

### 4. Формы и Mailchimp

**Две формы:**
- **Meeting** (`js--cta`) → редирект на `/success/` → тег "lead"
- **Checklist** (`js--cta-checklist`) → редирект на `/page-success-lm/` → тег "funnel"
- **Book Waitlist** (`js--cta-book`) → модалка на странице book → тег "book"

**Mailchimp credentials** задаются через константы в `wp-config.php`:
```php
define('MAILCHIMP_API_KEY', 'ваш-api-ключ');
define('MAILCHIMP_LIST_ID', 'ваш-list-id');
define('MAILCHIMP_SERVER', 'us18');
```

**Механизм работы:**
1. Форма открывается в модалке
2. `common.js` сохраняет данные в `sessionStorage`
3. Редирект на success страницу
4. `success-page.js` читает данные и отправляет в Mailchimp
5. Очищает `sessionStorage` после успеха

### 5. Success страницы

**Success (meeting)**
- Файл: `page-success.php`
- URL: `/success/`
- Шаблон: "Success Page"

**Success (checklist)**
- Файл: `page-success-lm.php`
- URL: `/page-success-lm/`
- Шаблон: "Success Page - Lead Magnet"

---

## 🔧 Технические детали

### Подключение стилей и скриптов

WordPress тема умно подключает стили через `functions.php`:

```php
function arch_expert_styles() {
    $is_inner_page = is_page_template('book.php') || is_page_template('podcast.php');
    $is_scale_landing = is_page_template('landing-scale.php');

    // Scale landing: свои стили + common-scale.js
    if ( $is_scale_landing ) {
        wp_enqueue_script('arch-common-scale', ...);
        return;
    }

    // Security landing: style.css + common.js
    if ( !$is_inner_page ) {
        wp_enqueue_style('arch-expert-custom', '/assets/css/style.css');
        wp_enqueue_script('arch-common', '/assets/js/common.js');
    }

    // Success страницы: success-page.js + mailchimpAjax
    if ( is_page_template('page-success.php') || is_page_template('page-success-lm.php') ) {
        wp_enqueue_script('arch-success-page', ...);
        wp_localize_script('arch-success-page', 'mailchimpAjax', [...]);
    }
}
```

**Важно:**
- Для внутренних страниц (book, podcast, blog) используются стили из `/assets/css/inner-page/css/`
- Эти стили подключаются напрямую в `header-inner.php` через `<link>`
- Scale-landing использует отдельный `common-scale.js` с автоскроллом
- Security-landing использует `common.js` без автоскролла

### 🆕 Блог - body--white класс

Для страниц блога автоматически добавляется класс `body--white` к тегу `<body>`:

```php
function arch_blog_body_class( $classes ) {
    // Для страницы списка блогов
    if ( is_page_template( 'template-blogs.php' ) ) {
        $classes[] = 'body--white';
    }

    // Для отдельной статьи
    if ( is_single() && get_post_type() === 'post' ) {
        $classes[] = 'body--white';
    }

    return $classes;
}
add_filter( 'body_class', 'arch_blog_body_class' );
```

Это переключает логотип с светлого на темный в `header-inner.php`.

### ACF поля

Поля регистрируются программно в `functions.php` для CPT "Landing".
После активации темы они появятся в админке автоматически.

---

## 📦 Установка

### Шаг 1: Загрузка на сервер

**Через FTP:**
1. Подключитесь к серверу через FTP клиент
2. Перейдите в `wp-content/themes/`
3. Загрузите папку `archexpert-new` целиком
4. Можете переименовать в `archexpert`

**Через админку WordPress:**
1. Зайдите в админку: `yoursite.com/wp-admin`
2. Внешний вид → Темы → Добавить новую → Загрузить тему
3. Выберите ZIP архив с темой
4. Установить

### Шаг 2: Установка плагина ACF

**ВАЖНО:** Тема требует плагин Advanced Custom Fields!

**Через админку (рекомендуется):**
1. Плагины → Добавить новый
2. Найти "Advanced Custom Fields"
3. Установить и активировать (бесплатная версия)

**Вручную:**
1. Скачать: https://wordpress.org/plugins/advanced-custom-fields/
2. Загрузить в `wp-content/plugins/`
3. Активировать в админке

### Шаг 3: Активация темы

1. Внешний вид → Темы
2. Найдите "Arch Expert"
3. Нажмите "Активировать"

### Шаг 4: Настройка постоянных ссылок

1. Настройки → Постоянные ссылки
2. Выберите "Название записи" (`/%postname%/`)
3. Сохранить изменения

### Шаг 5: Создание страниц

**Страница Book:**
1. Страницы → Добавить новую
2. Название: "Book"
3. URL: `book`
4. Шаблон: "Book Page"
5. Опубликовать

**Страница Podcast:**
1. Страницы → Добавить новую
2. Название: "Podcast"
3. URL: `podcast`
4. Шаблон: "Podcast Page"
5. Опубликовать

**🆕 Страница Blog:**
1. Страницы → Добавить новую
2. Название: "Blog"
3. URL: `blog`
4. Шаблон: "Blogs Page"
5. Опубликовать

**Success страницы:**

Создать две страницы:
1. "Success" с шаблоном "Success Page" (URL: `/success/`)
2. "Page Success LM" с шаблоном "Success Page - Lead Magnet" (URL: `/page-success-lm/`)

### Шаг 6: 🆕 Создание тестовых статей блога

1. Записи → Добавить новую
2. Заполнить:
   - **Заголовок** - название статьи
   - **Контент** - текст (можно использовать h2, h3, списки, ссылки)
   - **Изображение записи** - загрузить главную картинку (справа в панели)
3. Опубликовать
4. Повторить для 3-5 статей

---

## ✅ Проверка работоспособности

### Проверьте главную страницу:
- Откройте `yoursite.com`
- Должен отобразиться security-landing
- Проверьте что стили загружаются
- Нажмите "Book a meeting" - форма должна открыться

### Проверьте внутренние страницы:
- `/book` - страница книги
- `/podcast` - страница подкаста
- `/blog` - список блогов (должны отобразиться опубликованные статьи)

### 🆕 Проверьте блог:
- Откройте `/blog` - должен отобразиться список статей
- Кликните на любую статью - откроется отдельная страница
- Внизу статьи должен быть блок "What to read next" с 3 статьями
- Логотип должен быть темным (не белым)

### Проверьте формы:
1. Откройте главную страницу
2. Нажмите "Book a meeting"
3. Заполните форму
4. Должно перенаправить на `/success/`
5. Проверьте Mailchimp - должен появиться контакт с тегом "lead"

---

## ⚠️ Возможные проблемы

### Проблема: Не загружаются стили
**Решение:**
- Очистите кэш сайта
- Проверьте что папка `assets` загружена на сервер
- Проверьте права доступа (755)

### Проблема: 404 на /book, /podcast, /blog
**Решение:**
- Пересохраните постоянные ссылки (Настройки → Постоянные ссылки → Сохранить)
- Проверьте что создали страницы в админке
- Проверьте что назначили правильные шаблоны

### Проблема: Не работают формы
**Решение:**
- Откройте Console (F12)
- Проверьте ошибки JavaScript
- Убедитесь что `assets/js/common.js` загружен

### Проблема: Mailchimp не получает данные
**Решение:**
1. Проверьте Console на success странице
2. Проверьте есть ли переменная `mailchimpAjax` (в Console: `console.log(mailchimpAjax)`)
3. Проверьте credentials в `functions.php` (строки 550-552)

### 🆕 Проблема: В блоге нет картинок
**Решение:**
- При создании статьи загрузите "Изображение записи" (Featured Image)
- Оно находится в правой панели в редакторе статьи

### 🆕 Проблема: Блог показывает белый логотип
**Решение:**
- Проверьте что файл `assets/images/logo_dark.svg` загружен на сервер
- Проверьте что класс `body--white` добавляется (Inspect Element → `<body>`)

---

## 📝 История изменений

### Версия 1.1.0 (2026-02-16)

**🆕 Добавлен блог:**

**Созданные файлы:**
- `template-blogs.php` - шаблон страницы списка блогов
- `single.php` - шаблон отдельной статьи блога
- `assets/images/logo_dark.svg` - темный логотип для блога

**Измененные файлы:**
- `functions.php` - добавлена поддержка блога
- `header-inner.php` - переключение логотипа, меню, кнопка с btn--green
- `footer-inner.php` - убран temporarily-hidden
- `assets/css/inner-page/css/style.css` - добавлены стили блога + модалки
- `assets/css/inner-page/css/media.css` - адаптив для блога
- `README.md` - обновлена документация

**Детали реализации:**

1. **functions.php (строки 29-34, 649-689):**
   - Добавлен блог в проверку `$is_inner_page` для корректного подключения стилей
   - Включена поддержка миниатюр: `add_theme_support('post-thumbnails')`
   - Добавлен фильтр `body_class` для автоматического добавления класса `body--white`
   - Настроены размеры изображений: `blog-grid-thumb`, `blog-single-image`
   - Настроен excerpt: 20 слов + "..."

2. **header-inner.php:**
   - Добавлена логика переключения логотипа (строки 30-36): темный для блога, светлый для book/podcast
   - Добавлен класс `header-fixed` к body (строка 21)
   - Убран класс `temporarily-hidden` с меню и бургера
   - Добавлена логика для класса `btn--green` на кнопке (только для блога, строки 74-79)
   - Исправлена ссылка Blog в меню (строка 68): `/blog/`

3. **footer-inner.php:**
   - Убран класс `temporarily-hidden` с навигации футера (строка 23)

4. **template-blogs.php:**
   - Использует `get_header('inner')` для header-inner.php
   - WP_Query с параметрами: 9 постов на странице, сортировка по дате
   - Автоматическое создание описания: `wp_trim_words()` - первые 20 слов
   - Поддержка excerpt или автоматическое из контента
   - Пагинация с `paginate_links()`
   - Featured Image: `the_post_thumbnail('large')`
   - Заглушка изображения если нет миниатюры

5. **single.php:**
   - Использует `get_header('inner')` и `get_footer('inner')`
   - Дата публикации: `get_the_date('d M Y')`
   - Featured Image в блоке `blog-content__img`
   - Полный контент: `the_content()`
   - Блок "What to read next": WP_Query с 3 последними статьями (исключая текущую)

6. **Стили:**
   - Добавлен класс `.body--white` для светлого фона и темного текста
   - Стили блога: `.blog-page`, `.blog-grid`, `.blog-inner-page`, `.blog-content`
   - Адаптив: 1 колонка на мобильном, 2 на планшете, 3 на десктопе
   - Добавлены стили модалок (для book.php): `.modal`, `.input-wrapper`, `.agree`, `#overlay`
   - Исправлен баг с `.footer .container` в media.css (убран SCSS синтаксис)

**Как добавлять статьи в админке:**
1. Posts → Add New
2. Заполнить Title (заголовок)
3. Написать Content (текст с h2, h3, списками, ссылками)
4. Загрузить Featured Image (справа в панели) - главная картинка
5. Publish

**Важные моменты:**
- Featured Image обязательно должно быть загружено через панель справа, а не в контент
- Краткое описание берется автоматически из первых 20 слов контента
- Класс `body--white` добавляется автоматически через фильтр `body_class`
- Логотип переключается автоматически (темный для блога, светлый для book/podcast)
- Кнопка "Book a Call" получает класс `btn--green` только на страницах блога

### Версия 1.0.0 (2026-01-13)

**Улучшения структуры:**
- Исправлен баг с `$js_dir` в `functions.php`
- Объединены папки шрифтов (`font` → `fonts`)
- Улучшен `style.css` с полными метаданными
- Добавлена полная документация

**Функционал:**
- Security Landing (главная)
- Scale Landing с ACF
- Book и Podcast страницы
- Формы с Mailchimp интеграцией
- Success страницы
- Custom Post Type "Landing"

---

## 🎯 Что дальше

### Ближайшие задачи:
1. ✅ Блог готов и работает
2. ⏳ Добавить кнопку "Load More" для блога (AJAX подгрузка)
3. ⏳ Сделать book и podcast редактируемыми через ACF
4. ⏳ Создать редактируемую главную страницу
5. ⏳ Добавить категории и теги для блога (если понадобится)

### Долгосрочные планы:
- Оптимизация изображений (WebP, ленивая загрузка)
- Минификация CSS/JS
- SEO оптимизация
- Многоязычность

---

## 📞 Поддержка

**Проблемы?** Проверьте:
- Chrome DevTools (F12) → Console - есть ли ошибки JS
- Chrome DevTools → Network - загружаются ли стили
- WordPress → Инструменты → Здоровье сайта

**Нужна помощь с отладкой?**
1. Включите режим отладки в `wp-config.php`:
   ```php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   ```
2. Проверьте файл `wp-content/debug.log`

---

## 📊 Требуемые плагины

- **Advanced Custom Fields (ACF)** - ОБЯЗАТЕЛЕН
  - Скачать: https://wordpress.org/plugins/advanced-custom-fields/
  - После установки поля автоматически создадутся

---

## 📄 Лицензия

Проприетарная лицензия. Все права защищены.

---

**Автор:** Claude + Grom
**Контакты:** hello@arch-expert.com
**Сайт:** https://arch-expert.com
DuckPDR — SEO starter pack

Содержимое архива:
- index.html — более точный title, описание, canonical URL и метаданные для предпросмотра;
- robots.txt — разрешает сканирование и указывает на sitemap;
- sitemap.xml — сообщает Google основной URL сайта;
- .github/workflows/deploy.yml — публикация сайта вместе с SEO-файлами и HTML-файлом Google-подтверждения, если он лежит в корне репозитория и называется google*.html.

Как установить:
1. Распакуйте архив.
2. В репозитории DuckPDR замените index.html.
3. Добавьте robots.txt и sitemap.xml в корень репозитория.
4. Замените .github/workflows/deploy.yml файлом из архива.
5. Не заменяйте app.js, data.js, style.css, CNAME или папку images/.
6. Если Google выдал файл вида googleXXXXXXXX.html для проверки, загрузите его в корень репозитория. Workflow перенесёт его в публикацию автоматически.
7. Сделайте Commit changes и дождитесь успешного GitHub Actions.

После публикации проверьте в браузере:
https://duckpdr.pp.ua/robots.txt
https://duckpdr.pp.ua/sitemap.xml

Затем в Google Search Console:
- проверьте URL https://duckpdr.pp.ua/ через «Проверка URL»;
- запустите «Проверить опубликованный URL»;
- нажмите «Запросить индексирование», если кнопка доступна;
- откройте раздел «Файлы Sitemap» и отправьте sitemap.xml.

Важно: sitemap и запрос индексирования помогают Google обнаружить сайт, но не гарантируют мгновенное появление в результатах. Google может обрабатывать запрос от нескольких дней до нескольких недель.

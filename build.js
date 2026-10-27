'use strict';

// DuckPDR SEO page generator. Node.js 20+, no external packages required.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = __dirname;
const OUT = path.join(ROOT, '_site');
const ORIGIN = 'https://duckpdr.pp.ua';
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const REQUIRED = ['template.html', 'data.js', 'topics.js', 'app.js', 'style.css', 'images', 'CNAME'];

function fail(message) {
  console.error(`[DuckPDR build] ERROR: ${message}`);
  process.exit(1);
}

for (const entry of REQUIRED) {
  if (!fs.existsSync(path.join(ROOT, entry))) fail(`Не знайдено обов’язковий файл або папку: ${entry}`);
}

function readJsonFromWindowScript(filename, property) {
  const code = fs.readFileSync(path.join(ROOT, filename), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox, { filename, timeout: 10000 });
  const value = sandbox.window[property];
  if (!Array.isArray(value)) fail(`${filename} не задає window.${property} як масив.`);
  return value;
}

const questions = readJsonFromWindowScript('data.js', 'PDR_QUESTIONS');
const topics = readJsonFromWindowScript('topics.js', 'PDR_TOPICS');
if (questions.length !== 2332) {
  console.warn(`[DuckPDR build] Увага: очікувалося 2332 питання, знайдено ${questions.length}. Генерація продовжується з фактичними даними.`);
}

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
const escapeJsonForHtml = (value) => JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
const cleanText = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
const topicSlug = (section) => String(section).replace(/\./g, '-');
const topicPath = (section, part = 1) => `/tema/${topicSlug(section)}/${part > 1 ? `${part}/` : ''}`;
const ticketPath = (number) => `/bilet/${number}/`;

// Read width/height from JPEG files to reserve layout space and avoid layout shifts.
function jpegDimensions(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return { width: 640, height: 360 };
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) { offset += 1; continue; }
      const marker = buffer[offset + 1];
      const size = buffer.readUInt16BE(offset + 2);
      if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      }
      if (!size || size < 2) break;
      offset += 2 + size;
    }
  } catch (_) {}
  return { width: 640, height: 360 };
}

function imageMarkup(question, pagePosition) {
  const raw = Array.isArray(question.image) ? question.image : (typeof question.image === 'string' ? [question.image] : []);
  return raw.filter((src) => typeof src === 'string' && src.trim()).map((src, index) => {
    const cleaned = src.trim().replace(/\\/g, '/').replace(/^\.\//, '').replace(/^\/+/, '');
    const rootRelative = cleaned.startsWith('images/') ? `/${cleaned}` : `/images/${path.basename(cleaned)}`;
    const localPath = path.join(ROOT, rootRelative.replace(/^\//, ''));
    const { width, height } = jpegDimensions(localPath);
    const alt = `Ілюстрація до питання №${escapeHtml(question.number ?? pagePosition)}${index ? `, зображення ${index + 1}` : ''} з ПДР України`;
    return `<img class="seo-question-image" src="${escapeHtml(rootRelative)}" alt="${alt}" loading="lazy" decoding="async" width="${width}" height="${height}">`;
  }).join('\n');
}

function questionMarkup(question, pagePosition) {
  const questionNumber = question.number ?? pagePosition;
  const options = Array.isArray(question.options) ? question.options : [];
  const optionMarkup = options.map((option) => `<li>${escapeHtml(cleanText(option))}</li>`).join('');
  return `<article class="seo-question"><h3>Питання ${escapeHtml(questionNumber)}</h3><p class="seo-question-text">${escapeHtml(String(question.question ?? ''))}</p>${imageMarkup(question, pagePosition)}<ol class="seo-options" type="A">${optionMarkup}</ol></article>`;
}

function fitDescription(input) {
  let value = cleanText(input);
  if (value.length >= 140 && value.length <= 160) return value;
  const padding = [
    ' Зручно та онлайн.',
    ' Для майбутніх водіїв.',
    ' Навчайся у власному темпі.',
    ' Перевіряй знання регулярно.'
  ];
  for (const extra of padding) {
    if (value.length >= 140) break;
    if (value.length + extra.length <= 160) value += extra;
  }
  if (value.length > 160) {
    let shortened = value.slice(0, 160);
    const lastSpace = shortened.lastIndexOf(' ');
    if (lastSpace >= 140) shortened = shortened.slice(0, lastSpace);
    value = shortened.replace(/[\s,;:—-]+$/g, '').replace(/[.!?]+$/g, '') + '.';
  }
  return value;
}

const HOME_FAQ = [
  {
    q: 'Що таке DuckPDR?',
    a: 'DuckPDR — безкоштовний онлайн-тренажер для практики теоретичних питань з Правил дорожнього руху України. Він допомагає навчатися за білетами, тематичними розділами та в режимі іспиту.'
  },
  {
    q: 'Чи можна проходити тести безкоштовно?',
    a: 'Так. Основні режими тренажера доступні без оплати та реєстрації. Відкрий білет або тему й починай відповідати на питання.'
  },
  {
    q: 'Скільки питань у білеті DuckPDR?',
    a: 'У тренажері білети сформовані блоками по 20 питань; останній білет може містити менше питань, бо формується з решти банку.'
  },
  {
    q: 'Як працює режим «Іспит»?',
    a: 'За замовчуванням тренажер пропонує 20 питань на 20 хвилин і дозволяє до двох помилок. У параметрах режиму можна змінити кількість питань, час і допустимі помилки.'
  },
  {
    q: 'Що таке «Робота над помилками»?',
    a: 'Після завершення тесту можна повторно пройти питання, на які спочатку було дано неправильні відповіді, та закріпити матеріал.'
  },
  {
    q: 'Чи є питання актуальними?',
    a: 'Банк DuckPDR побудований на основі відкритих екзаменаційних питань Головного сервісного центру МВС. Оскільки офіційні питання можуть оновлюватися, перед реальним іспитом звіряйте їх з актуальною публікацією ГСЦ МВС.'
  }
];

const HOME_SEO_HTML = `
<section id="seoLanding" class="seo-landing home-seo-content" aria-labelledby="homeSeoTitle">
  <div class="seo-content-inner">
    <h2 id="homeSeoTitle">Безкоштовні тести ПДР України онлайн</h2>
    <p>DuckPDR — тренажер для тих, хто вивчає Правила дорожнього руху України та готується до теоретичного іспиту. Тут можна практикуватися за білетами, повторювати окремі тематичні розділи й перевіряти себе в режимі іспиту. Сайт працює в браузері та підходить для коротких занять у зручний час.</p>
    <h3>Навчання за білетами</h3>
    <p>Режим «Тести по білетам» допомагає послідовно опрацьовувати блоки питань. Обери потрібний білет, уважно прочитай формулювання, переглянь дорожню ситуацію або знак, якщо до питання додано зображення, і вибери один із варіантів. Після відповіді тренажер повідомляє результат, а навігація за номерами дозволяє орієнтуватися у проходженні. Посилання на кожен білет є нижче в каталозі та відкриває окрему сторінку з питаннями.</p>
    <h3>Підготовка за темами</h3>
    <p>Якщо певний розділ дається складніше, скористайся режимом «Тести за темами». Він групує питання за напрямами, серед яких дорожні знаки, розмітка, проїзд перехресть, маневрування та безпека руху. Великі розділи поділено на окремі частини, щоб зручніше було працювати з матеріалом. Коли потрібно повторити конкретний блок, відкрий відповідну тему та вибери потрібний діапазон питань.</p>
    <h3>Режим іспиту, налаштування та повторення</h3>
    <p>Режим «Іспит» у DuckPDR імітує обмежений за часом тест. За замовчуванням доступно 20 питань, 20 хвилин і до двох помилок; кількість питань, тривалість і допустиму кількість помилок можна налаштувати перед початком. Це параметри тренажера, а не заміна офіційних правил: актуальні вимоги до реального теоретичного іспиту перевіряй на сайті Головного сервісного центру МВС.</p>
    <p>Після завершення тренувального тесту скористайся функцією «Робота над помилками», щоб ще раз відповісти на питання, де була помилка. Такий повтор допомагає виявити теми, які потрібно опрацювати уважніше, замість того щоб щоразу проходити весь тест. За виконання завдань можна отримувати досвід і відкривати досягнення; рівень, досвід і нагороди зберігаються в браузері на цьому пристрої.</p>
    <h3>Звідки беруться питання</h3>
    <p>Банк DuckPDR сформований на основі відкритих екзаменаційних питань Головного сервісного центру МВС України. Офіційний перелік і зміни до нього публікуються на сторінці <a href="https://hsc.gov.ua/index/poslugi/vidacha-posvidchennya-vodiya/pitannya-ta-ispit-z-pdr/" target="_blank" rel="noopener">«Питання та іспит з ПДР» ГСЦ МВС</a>. Оскільки формулювання й банк можуть оновлюватися, перед складанням іспиту радимо звіряти навчальні матеріали з актуальним офіційним джерелом. DuckPDR — незалежний навчальний тренажер і не є офіційним сервісом МВС.</p>
    <h3>Поширені запитання</h3>
    <div class="seo-faq">${HOME_FAQ.map(({q,a}) => `<details class="seo-faq-item"><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join('\n')}</div>
  </div>
</section>`;

function makeHomeLinkLists() {
  const ticketLinks = [];
  const ticketCount = Math.ceil(questions.length / 20);
  for (let i = 1; i <= ticketCount; i += 1) {
    const start = (i - 1) * 20;
    const count = Math.min(20, questions.length - start);
    ticketLinks.push(`<a class="test-card" href="${ticketPath(i)}"><b>Білет ${i}</b><span>${count} питань · питання ${start + 1}–${start + count}</span></a>`);
  }

  const topicCards = [];
  for (const topic of topics) {
    const group = questions.filter((q) => String(q.section) === String(topic.section));
    if (!group.length) continue;
    const ranges = [];
    for (let start = 0; start < group.length; start += 20) {
      const end = Math.min(start + 20, group.length);
      const part = group.length > 100 ? Math.floor(start / 50) + 1 : 1;
      ranges.push(`<a class="topic-range" href="${topicPath(topic.section, part)}">${start + 1}–${end}</a>`);
    }
    topicCards.push(`<article class="topic-card"><div class="topic-heading"><a class="topic-number" href="${topicPath(topic.section,1)}">Тема №${escapeHtml(topic.section)}</a><h3>${escapeHtml(topic.title)}</h3><span>${group.length} питань</span></div><div class="topic-ranges">${ranges.join('')}</div></article>`);
  }
  return { ticketLinks: ticketLinks.join('\n'), topicLinks: topicCards.join('\n') };
}

function seoHead({ title, description, url }) {
  const descriptionText = fitDescription(description);
  const titleEsc = escapeHtml(title);
  const descEsc = escapeHtml(descriptionText);
  const urlEsc = escapeHtml(url);
  // TODO: замінити og:image на окрему PNG/JPG-картинку 1200x630 для кращого прев’ю в соцмережах.
  return `<title>${titleEsc}</title>
<meta name="description" content="${descEsc}">
<link rel="canonical" href="${urlEsc}">
<meta property="og:title" content="${titleEsc}">
<meta property="og:description" content="${descEsc}">
<meta property="og:image" content="${ORIGIN}/images/mascot-home.webp">
<meta property="og:url" content="${urlEsc}">
<meta property="og:type" content="website">
<meta property="og:locale" content="uk_UA">
<meta property="og:site_name" content="DuckPDR">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${titleEsc}">
<meta name="twitter:description" content="${descEsc}">
<meta name="twitter:image" content="${ORIGIN}/images/mascot-home.webp">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="manifest" href="/site.webmanifest">`;
}

function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', name: 'DuckPDR', alternateName: 'Duck PDR', url: `${ORIGIN}/`, inLanguage: 'uk-UA' },
      { '@type': 'Organization', name: 'DuckPDR', url: `${ORIGIN}/`, logo: `${ORIGIN}/images/mascot-home.webp` },
      { '@type': 'FAQPage', mainEntity: HOME_FAQ.map(({q,a}) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }
    ]
  };
}

function breadcrumbJsonLd(items) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({
    '@type': 'ListItem', position: index + 1, name: item.name, item: `${ORIGIN}${item.path}`
  })) };
}

function applyTemplate({ page, title, description, url, bodyAttributes, jsonLd, landing, staticTicketLinks = '', staticTopicLinks = '', isSubpage = false }) {
  let html = fs.readFileSync(path.join(ROOT, 'template.html'), 'utf8');
  html = html.replace('<!-- SEO_HEAD -->', seoHead({ title, description, url }));
  html = html.replace('<!-- SEO_JSONLD -->', `<script type="application/ld+json">${escapeJsonForHtml(jsonLd)}</script>`);
  html = html.replace('<body data-page="home">', `<body ${bodyAttributes}>`);
  html = html.replace('<!-- STATIC_TICKET_LINKS -->', staticTicketLinks);
  html = html.replace('<!-- STATIC_TOPIC_LINKS -->', staticTopicLinks);
  html = html.replace('<!-- SEO_LANDING -->', landing);
  if (isSubpage) {
    html = html.replace('<h1>DuckPDR — <span>2332 питання ПДР</span><br>у форматі зручних тестів</h1>', '<h2>DuckPDR — <span>2332 питання ПДР</span><br>у форматі зручних тестів</h2>');
  }
  return html;
}

function homepageContent() {
  const crumbs = '';
  return `${crumbs}${HOME_SEO_HTML}`;
}

function ticketLanding(ticketNo, ticketQuestions, allQuestions) {
  const firstQuestion = (ticketNo - 1) * 20 + 1;
  const lastQuestion = firstQuestion + ticketQuestions.length - 1;
  const title = `Білет ${ticketNo} ПДР України — тест онлайн безкоштовно | DuckPDR`;
  const description = `Білет ${ticketNo} ПДР України: пройди онлайн-тест із ${ticketQuestions.length} питаннями та варіантами відповідей. Перевір знання правил, повторюй складне й готуйся з DuckPDR.`;
  const url = `${ORIGIN}${ticketPath(ticketNo)}`;
  const breadcrumbs = `<nav class="seo-breadcrumbs" aria-label="Навігаційний ланцюжок"><a href="/">Головна</a><span>›</span><a href="/#tickets">Тести по білетам</a><span>›</span><span aria-current="page">Білет ${ticketNo}</span></nav>`;
  const intro = `<p class="seo-intro">Білет ${ticketNo} містить ${ticketQuestions.length} питань для тренування знань Правил дорожнього руху України. Пройди тест онлайн безкоштовно, обирай варіанти відповідей і повертайся до складних завдань у власному темпі.</p><p class="seo-intro">У цьому білеті розміщені питання в тому самому порядку, що й у навчальній базі DuckPDR. Правильні варіанти не позначені в списку — спробуй відповісти самостійно, а потім запусти інтерактивний тест для перевірки.</p>`;
  const prev = ticketNo > 1 ? `<a class="btn light" href="${ticketPath(ticketNo - 1)}">← Попередній білет</a>` : '<span class="btn light is-disabled" aria-disabled="true">← Попередній білет</span>';
  const next = ticketNo < Math.ceil(allQuestions.length / 20) ? `<a class="btn light" href="${ticketPath(ticketNo + 1)}">Наступний білет →</a>` : '<span class="btn light is-disabled" aria-disabled="true">Наступний білет →</span>';
  const list = ticketQuestions.map((q, index) => questionMarkup(q, firstQuestion + index)).join('\n');
  const content = `${breadcrumbs}<section id="seoLanding" class="seo-landing content-subpage" aria-labelledby="seoPageTitle"><div class="seo-content-inner"><h1 id="seoPageTitle">Білет ${ticketNo} — тест ПДР України онлайн</h1>${intro}<div class="seo-action-row"><button class="btn primary" id="seoStartTest" type="button">Почати тест</button><a class="btn light" href="/">До всіх тестів</a></div><nav class="seo-page-pagination" aria-label="Навігація між білетами">${prev}${next}</nav><details class="static-question-details" open><summary>Усі питання білета ${ticketNo}</summary><div class="seo-question-list">${list}</div></details></div></section>`;
  return { title, description, url, content, jsonLd: breadcrumbJsonLd([{name:'Головна',path:'/'},{name:'Тести по білетам',path:'/#tickets'},{name:`Білет ${ticketNo}`,path:ticketPath(ticketNo)}]) };
}

function topicLanding(topic, topicQuestions, part, partCount, groupOffset, allQuestions) {
  const totalCount = topicQuestions.length;
  const isSplit = totalCount > 100;
  const pageQuestions = isSplit ? topicQuestions.slice(groupOffset, groupOffset + 50) : topicQuestions;
  const slug = topicSlug(topic.section);
  const pathHere = topicPath(topic.section, part);
  const partSuffix = isSplit ? ` — частина ${part} з ${partCount}` : '';
  const title = `Тема ${topic.section} «${cleanText(topic.title)}»${partSuffix} — тести ПДР онлайн | DuckPDR`;
  const description = `Тема ${topic.section} «${cleanText(topic.title)}»${partSuffix}: тренувальні питання ПДР України, варіанти відповідей та ілюстрації. Перевір знання онлайн і безкоштовно на DuckPDR.`;
  const url = `${ORIGIN}${pathHere}`;
  const partLabel = isSplit ? ` — частина ${part} з ${partCount}` : '';
  const breadcrumbs = `<nav class="seo-breadcrumbs" aria-label="Навігаційний ланцюжок"><a href="/">Головна</a><span>›</span><a href="/#topics">Тести за темами</a><span>›</span><span aria-current="page">Тема ${escapeHtml(topic.section)}</span></nav>`;
  const intro = `<p class="seo-intro">Тема ${escapeHtml(topic.section)} «${escapeHtml(cleanText(topic.title))}» охоплює ${totalCount} питань з відповідного розділу Правил дорожнього руху України${partLabel}. Опрацьовуй матеріал послідовно, звертай увагу на формулювання та ілюстрації до запитань.</p><p class="seo-intro">На сторінці наведено текст питань і варіанти відповідей без позначення правильного варіанта. Натисни «Почати тест», щоб перейти до інтерактивного блоку й перевірити свої знання в тренажері DuckPDR.</p>`;
  const prev = isSplit && part > 1 ? `<a class="btn light" href="${topicPath(topic.section, part - 1)}">← Попередня частина</a>` : '<span></span>';
  const next = isSplit && part < partCount ? `<a class="btn light" href="${topicPath(topic.section, part + 1)}">Наступна частина →</a>` : '<span></span>';
  const list = pageQuestions.map((q, index) => questionMarkup(q, groupOffset + index + 1)).join('\n');
  const content = `${breadcrumbs}<section id="seoLanding" class="seo-landing content-subpage" aria-labelledby="seoPageTitle"><div class="seo-content-inner"><h1 id="seoPageTitle">Тема ${escapeHtml(topic.section)} — ${escapeHtml(cleanText(topic.title))}</h1>${intro}<div class="seo-action-row"><button class="btn primary" id="seoStartTest" type="button">Почати тест</button><a class="btn light" href="/">До всіх тестів</a></div>${isSplit ? `<nav class="seo-page-pagination" aria-label="Частини теми">${prev}${next}</nav>` : ''}<details class="static-question-details" open><summary>Усі питання теми ${escapeHtml(topic.section)}${isSplit ? `, частина ${part}` : ''}</summary><div class="seo-question-list">${list}</div></details>${isSplit ? `<nav class="seo-page-pagination" aria-label="Частини теми">${prev}${next}</nav>` : ''}</div></section>`;
  const jsonLd = breadcrumbJsonLd([{name:'Головна',path:'/'},{name:'Тести за темами',path:'/#topics'},{name:`Тема ${topic.section}`,path:pathHere}]);
  return { title, description, url, content, jsonLd, bodyAttributes:`data-page="topic" data-section="${escapeHtml(topic.section)}" data-part="${part}"` };
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const linkLists = makeHomeLinkLists();

const homeTitle = 'DuckPDR — безкоштовні тести ПДР України онлайн: білети й теми';
const homeDescription = 'DuckPDR — безкоштовні тести ПДР України онлайн: 2332 питання, 117 білетів, 65 тем, режим іспиту та повторення помилок. Практикуйся щодня. Для майбутніх водіїв.';
let homeHtml = applyTemplate({
  page: 'home', title: homeTitle, description: homeDescription, url: `${ORIGIN}/`, bodyAttributes: 'data-page="home"',
  jsonLd: homeJsonLd(), landing: homepageContent(), staticTicketLinks: linkLists.ticketLinks, staticTopicLinks: linkLists.topicLinks
});
writeFile(path.join(OUT, 'index.html'), homeHtml);

const ticketCount = Math.ceil(questions.length / 20);
for (let ticketNo = 1; ticketNo <= ticketCount; ticketNo += 1) {
  const ticketQuestions = questions.slice((ticketNo - 1) * 20, ticketNo * 20);
  const meta = ticketLanding(ticketNo, ticketQuestions, questions);
  const pageHtml = applyTemplate({ page: 'ticket', title: meta.title, description: meta.description, url: meta.url,
    bodyAttributes: `data-page="ticket" data-ticket="${ticketNo}"`, jsonLd: meta.jsonLd,
    landing: meta.content, isSubpage: true });
  writeFile(path.join(OUT, 'bilet', String(ticketNo), 'index.html'), pageHtml);
}

const sitemapPaths = ['/'];
for (let ticketNo = 1; ticketNo <= ticketCount; ticketNo += 1) sitemapPaths.push(ticketPath(ticketNo));
for (const topic of topics) {
  const group = questions.filter((q) => String(q.section) === String(topic.section));
  if (!group.length) continue;
  const isSplit = group.length > 100;
  const partCount = isSplit ? Math.ceil(group.length / 50) : 1;
  for (let part = 1; part <= partCount; part += 1) {
    const offset = isSplit ? (part - 1) * 50 : 0;
    const meta = topicLanding(topic, group, part, partCount, offset, questions);
    const pageHtml = applyTemplate({ page: 'topic', title: meta.title, description: meta.description, url: meta.url,
      bodyAttributes: meta.bodyAttributes, jsonLd: meta.jsonLd, landing: meta.content, isSubpage: true });
    writeFile(path.join(OUT, 'tema', topicSlug(topic.section), ...(part > 1 ? [String(part)] : []), 'index.html'), pageHtml);
    sitemapPaths.push(topicPath(topic.section, part));
  }
}

// Copy runtime files and assets required by every generated page. The similarly named "images 2" folder is deliberately never copied.
for (const file of ['app.js', 'data.js', 'topics.js', 'style.css', 'CNAME', 'robots.txt', 'favicon.svg', 'site.webmanifest']) {
  const from = path.join(ROOT, file);
  if (!fs.existsSync(from)) {
    if (['favicon.svg', 'site.webmanifest'].includes(file)) continue;
    fail(`Не знайдено потрібний для публікації файл: ${file}`);
  }
  fs.copyFileSync(from, path.join(OUT, file));
}
fs.cpSync(path.join(ROOT, 'images'), path.join(OUT, 'images'), { recursive: true });
for (const file of fs.readdirSync(ROOT)) {
  if (/^google.*\.html$/i.test(file) && fs.statSync(path.join(ROOT, file)).isFile()) {
    fs.copyFileSync(path.join(ROOT, file), path.join(OUT, file));
  }
}

const notFound = `<!doctype html><html lang="uk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Сторінку не знайдено | DuckPDR</title><meta name="robots" content="noindex"><link rel="stylesheet" href="/style.css"></head><body><main><section class="seo-landing"><div class="seo-content-inner"><h1>Сторінку не знайдено</h1><p>Можливо, адресу змінено або сторінка більше не існує.</p><a class="btn primary" href="/">Повернутися на головну DuckPDR</a></div></section></main></body></html>`;
writeFile(path.join(OUT, '404.html'), notFound);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPaths.map((urlPath) => `  <url><loc>${ORIGIN}${urlPath}</loc><lastmod>${BUILD_DATE}</lastmod></url>`).join('\n')}\n</urlset>\n`;
writeFile(path.join(OUT, 'sitemap.xml'), sitemap);

const outputPages = [];
for (const dir of [path.join(OUT, 'bilet'), path.join(OUT, 'tema')]) {
  if (!fs.existsSync(dir)) continue;
  const walk = (folder) => {
    for (const item of fs.readdirSync(folder, { withFileTypes: true })) {
      const target = path.join(folder, item.name);
      if (item.isDirectory()) walk(target);
      else if (item.name === 'index.html') outputPages.push(target);
    }
  };
  walk(dir);
}

console.log(`[DuckPDR build] Усього питань: ${questions.length}`);
console.log(`[DuckPDR build] Тем у topics.js: ${topics.length}`);
console.log(`[DuckPDR build] Створено білетів: ${ticketCount}`);
console.log(`[DuckPDR build] Створено сторінок тем: ${sitemapPaths.length - 1 - ticketCount}`);
console.log(`[DuckPDR build] Усього URL у sitemap.xml: ${sitemapPaths.length}`);
console.log(`[DuckPDR build] Готовий сайт: ${OUT}`);

/* DuckPDR — dark theme, mistake review, configurable exam and gentle gradient interactions. Build: 20261014-ui-no-seo */
(() => {
  'use strict';

  const QUESTIONS = Array.isArray(window.PDR_QUESTIONS) ? window.PDR_QUESTIONS : [];
  const BUILD_ID = '20261015-hover-modal-mascot-fix';
  const byId = (id) => document.getElementById(id);

  // Failed-attempt mascots rotate in a fixed sequence across tickets, topics, and exam mode.
  // The last image is the site's existing fail mascot, retained as the fifth variation.
  const FAILURE_MASCOTS = [
    { src: 'images/duck-fail-01.webp', alt: 'Маскот DuckPDR — невдала спроба' },
    { src: 'images/duck-fail-02.webp', alt: 'Маскот DuckPDR — невдала спроба' },
    { src: 'images/duck-fail-03.webp', alt: 'Маскот DuckPDR — невдала спроба' },
    { src: 'images/duck-fail-04.webp', alt: 'Маскот DuckPDR — невдала спроба' },
    { src: 'images/mascot-fail.webp', alt: 'Маскот DuckPDR — тест не складено' }
  ];
  const FAILURE_MASCOT_STORAGE_KEY = 'duckpdr-failure-mascot-next';
  let failureMascotCursor = 0;

  function nextFailureMascot() {
    let index = failureMascotCursor;
    try {
      const stored = window.localStorage.getItem(FAILURE_MASCOT_STORAGE_KEY);
      if (stored !== null && stored.trim() !== '' && Number.isFinite(Number(stored))) {
        index = Math.abs(Math.trunc(Number(stored))) % FAILURE_MASCOTS.length;
      }
    } catch (_) {
      // Private browsing or storage restrictions: continue the sequence in memory.
    }
    const mascot = FAILURE_MASCOTS[index];
    const nextIndex = (index + 1) % FAILURE_MASCOTS.length;
    failureMascotCursor = nextIndex;
    try {
      window.localStorage.setItem(FAILURE_MASCOT_STORAGE_KEY, String(nextIndex));
    } catch (_) {
      // A failed localStorage write should never block showing the result.
    }
    return mascot;
  }
  const TOPICS = [{"section":"1","title":"ЗАГАЛЬНІ ПОЛОЖЕННЯ"},{"section":"2","title":"ОБОВ'ЯЗКИ І ПРАВА ВОДІЇВ МЕХАНІЧНИХ ТРАНСПОРТНИХ ЗАСОБІВ"},{"section":"3","title":"РУХ ТРАНСПОРТНИХ ЗАСОБІВ ІЗ СПЕЦІАЛЬНИМИ СИГНАЛАМИ"},{"section":"4","title":"ОБОВ'ЯЗКИ І ПРАВА ПІШОХОДІВ"},{"section":"5","title":"ОБОВ'ЯЗКИ І ПРАВА ПАСАЖИРІВ"},{"section":"6","title":"ВИМОГИ ДО ВЕЛОСИПЕДИСТІВ"},{"section":"7","title":"ВИМОГИ ДО ОСІБ, ЯКІ КЕРУЮТЬ ГУЖОВИМ ТРАНСПОРТОМ, І ПОГОНИЧІВ ТВАРИН"},{"section":"8.1","title":"РЕГУЛЮВАННЯ ДОРОЖНЬОГО РУХУ (РЕГУЛЬОВАНІ ПЕРЕХРЕСТЯ)"},{"section":"8.2","title":"РЕГУЛЮВАННЯ ДОРОЖНЬОГО РУХУ (НЕРЕГУЛЬОВАНІ ПЕРЕХРЕСТЯ)"},{"section":"9","title":"ПОПЕРЕДЖУВАЛЬНІ СИГНАЛИ"},{"section":"10","title":"ПОЧАТОК РУХУ ТА ЗМІНА ЙОГО НАПРЯМКУ"},{"section":"11","title":"РОЗТАШУВАННЯ ТРАНСПОРТНИХ ЗАСОБІВ НА ДОРОЗІ"},{"section":"12","title":"ШВИДКІСТЬ РУХУ"},{"section":"13","title":"ДИСТАНЦІЯ, ІНТЕРВАЛ, ЗУСТРІЧНИЙ РОЗ'ЇЗД"},{"section":"14","title":"ОБГІН"},{"section":"15","title":"ЗУПИНКА І СТОЯНКА"},{"section":"16.1","title":"ПРОЇЗД ПЕРЕХРЕСТЬ (РЕГУЛЬОВАНІ ПЕРЕХРЕСТЯ)"},{"section":"16.2","title":"ПРОЇЗД ПЕРЕХРЕСТЬ (НЕРЕГУЛЬОВАНІ ПЕРЕХРЕСТЯ)"},{"section":"17","title":"ПЕРЕВАГИ МАРШРУТНИХ ТРАНСПОРТНИХ ЗАСОБІВ"},{"section":"18","title":"ПРОЇЗД ПІШОХІДНИХ ПЕРЕХОДІВ І ЗУПИНОК ТРАНСПОРТНИХ ЗАСОБІВ"},{"section":"19","title":"КОРИСТУВАННЯ ЗОВНІШНІМИ СВІТЛОВИМИ ПРИЛАДАМИ"},{"section":"20","title":"РУХ ЧЕРЕЗ ЗАЛІЗНИЧНІ ПЕРЕЇЗДИ"},{"section":"21","title":"ПЕРЕВЕЗЕННЯ ПАСАЖИРІВ"},{"section":"22","title":"ПЕРЕВЕЗЕННЯ ВАНТАЖУ"},{"section":"23","title":"БУКСИРУВАННЯ ТА ЕКСПЛУАТАЦІЯ ТРАНСПОРТНИХ СОСТАВІВ"},{"section":"24","title":"НАВЧАЛЬНА ЇЗДА"},{"section":"25","title":"РУХ ТРАНСПОРТНИХ ЗАСОБІВ У КОЛОНАХ"},{"section":"26","title":"РУХ У ЖИТЛОВІЙ ТА ПІШОХІДНІЙ ЗОНІ"},{"section":"27","title":"РУХ ПО АВТОМАГІСТРАЛЯХ"},{"section":"28","title":"РУХ ПО ГІРСЬКИХ ДОРОГАХ І НА КРУТИХ СПУСКАХ"},{"section":"29","title":"МІЖНАРОДНИЙ РУХ"},{"section":"30","title":"НОМЕРНІ, РОЗПІЗНАВАЛЬНІ ЗНАКИ, НАПИСИ І ПОЗНАЧЕННЯ"},{"section":"31","title":"ТЕХНІЧНИЙ СТАН ТРАНСПОРТНИХ ЗАСОБІВ ТА ЇХ ОБЛАДНАННЯ"},{"section":"32","title":"ОКРЕМІ ПИТАННЯ ДОРОЖНЬОГО РУХУ, ЩО ПОТРЕБУЮТЬ УЗГОДЖЕННЯ"},{"section":"33","title":"ДОРОЖНІ ЗНАКИ"},{"section":"34","title":"ДОРОЖНЯ РОЗМІТКА"},{"section":"35","title":"ОСНОВИ БЕЗПЕЧНОГО ВОДІННЯ"},{"section":"36","title":"ОСНОВИ ПРАВА В ОБЛАСТІ ДОРОЖНЬОГО РУХУ"},{"section":"37","title":"НАДАННЯ ДОМЕДИЧНОЇ ДОПОМОГИ"},{"section":"38","title":"ЕТИКА ВОДІННЯ, КУЛЬТУРА ТА ВІДПОЧИНОК ВОДІЯ"},{"section":"39","title":"ЄВРОПРОТОКОЛ"},{"section":"40","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ А1, А (ЗАГАЛЬНІ)"},{"section":"41","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ А1, А (БУДОВА І ТЕРМІНИ)"},{"section":"42","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ А1, А (ЮРИДИЧНА ВІДПОВІДАЛЬНІСТЬ)"},{"section":"43","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ А1, А (БЕЗПЕКА)"},{"section":"44","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ В1, В (ЗАГАЛЬНІ)"},{"section":"45","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ В1, В (БУДОВА І ТЕРМІНИ)"},{"section":"46","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ В1, В (ЮРИДИЧНА ВІДПОВІДАЛЬНІСТЬ)"},{"section":"47","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ В1, В (БЕЗПЕКА)"},{"section":"48","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ C1,C (ЗАГАЛЬНІ)"},{"section":"49","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ C1,C (БУДОВА І ТЕРМІНИ)"},{"section":"50","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ C1,C (ЮРИДИЧНА ВІДПОВІДАЛЬНІСТЬ)"},{"section":"51","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ C1,C (БЕЗПЕКА)"},{"section":"52","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ D1, D (ЗАГАЛЬНІ)"},{"section":"53","title":"ДОДАТКОВІ ПИТАННЯ ЩОДОКАТЕГОРІЙD1, D (БУДОВА І ТЕРМІНИ)"},{"section":"54","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ D1, D (ЮРИДИЧНА ВІДПОВІДАЛЬНІСТЬ)"},{"section":"55","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ D1, D (БЕЗПЕКА)"},{"section":"56","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ BE, C1E, CE, D1E, DE (ЗАГАЛЬНІ)"},{"section":"57","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ BE, C1E, CE, D1E, DE (БУДОВА И ТЕРМІНИ)"},{"section":"58","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ BE, C1E, CE, D1E, DE (ЮРИДИЧНА ВІДПОВІЛЬНІСТЬ)"},{"section":"59","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ BE, C1E, CE, D1E, DE (БЕЗПЕКА)"},{"section":"60","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЇ T (ЗАГАЛЬНІ)"},{"section":"61","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЇ Т (БУДОВА І ТЕРМІНИ)"},{"section":"62","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЇ Т (ЮРИДИЧНА ВІДПОВІЛЬНІСТЬ)"},{"section":"63","title":"ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЇ Т (БЕЗПЕКА)"}];

  // Resolve image paths from the deployed app.js location. This supports both
  // duckpdr.pp.ua (custom domain) and /DuckPDR/ project Pages URLs.
  const APP_BASE = (() => {
    const script = Array.from(document.scripts).reverse().find((item) => /(?:^|\/)app\.js(?:[?#]|$)/i.test(item.src));
    try { return new URL('.', script ? script.src : window.location.href); }
    catch (_) { return new URL('.', window.location.href); }
  })();

  const state = {
    questions: [],
    position: 0,
    answers: Object.create(null),
    testNo: 0,
    timerId: null,
    secondsLeft: 20 * 60,
    finished: false,
    mode: 'practice',
    examWrong: 0,
    homeView: 'tickets',
    topicSection: '',
    topicStart: 0,
    autoAdvanceId: null,
    transitionId: null,
    examSettings: { questionCount: 20, timeMinutes: 20, allowedErrors: 2 },
    mistakeQuestions: [],
    reviewQuestions: [],
    reviewOrigin: null
  };

  const THEME_STORAGE_KEY = 'duckpdr-theme';
  const EXAM_SETTINGS_STORAGE_KEY = 'duckpdr-exam-settings';
  const DEFAULT_EXAM_SETTINGS = Object.freeze({ questionCount: 20, timeMinutes: 20, allowedErrors: 2 });

  function clampInteger(value, min, max, fallback) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.min(max, Math.max(min, Math.trunc(number)));
  }

  function loadExamSettings() {
    let stored = null;
    try {
      stored = JSON.parse(window.localStorage.getItem(EXAM_SETTINGS_STORAGE_KEY) || 'null');
    } catch (_) {
      stored = null;
    }
    const maxQuestions = Math.max(1, QUESTIONS.length);
    const questionCount = clampInteger(stored?.questionCount, 1, maxQuestions, DEFAULT_EXAM_SETTINGS.questionCount);
    return {
      questionCount,
      timeMinutes: clampInteger(stored?.timeMinutes, 1, 180, DEFAULT_EXAM_SETTINGS.timeMinutes),
      allowedErrors: clampInteger(stored?.allowedErrors, 0, questionCount, DEFAULT_EXAM_SETTINGS.allowedErrors)
    };
  }

  function saveExamSettings() {
    try { window.localStorage.setItem(EXAM_SETTINGS_STORAGE_KEY, JSON.stringify(state.examSettings)); }
    catch (_) { /* Settings still apply for the current session when storage is unavailable. */ }
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('theme-dark', isDark);
    const toggle = byId('themeToggle');
    if (toggle) {
      toggle.setAttribute('aria-label', isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему');
      toggle.setAttribute('title', isDark ? 'Світла тема' : 'Темна тема');
      toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    }
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', isDark ? '#202b25' : '#f2c94c');
  }

  function initializeTheme() {
    let theme = document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light';
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') theme = stored;
    } catch (_) { /* Use the theme already applied by the tiny early bootstrap. */ }
    applyTheme(theme);
    byId('themeToggle')?.addEventListener('click', () => {
      const nextTheme = document.documentElement.classList.contains('theme-dark') ? 'light' : 'dark';
      applyTheme(nextTheme);
      try { window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme); }
      catch (_) { /* Theme switch still works for this page view. */ }
    });
  }

  function ukPlural(value, forms) {
    const absolute = Math.abs(value) % 100;
    const last = absolute % 10;
    if (absolute > 10 && absolute < 20) return forms[2];
    if (last === 1) return forms[0];
    if (last >= 2 && last <= 4) return forms[1];
    return forms[2];
  }

  function updateExamSettingsControls() {
    const count = byId('examQuestionCount');
    const errors = byId('examAllowedErrors');
    const minutes = byId('examTimeMinutes');
    if (count) { count.max = String(Math.max(1, QUESTIONS.length)); count.value = String(state.examSettings.questionCount); }
    if (errors) { errors.max = String(state.examSettings.questionCount); errors.value = String(state.examSettings.allowedErrors); }
    if (minutes) minutes.value = String(state.examSettings.timeMinutes);
    const error = byId('examSettingsError');
    if (error) error.classList.add('hidden');
    [count, errors, minutes].forEach((input) => input?.removeAttribute('aria-invalid'));
    updateExamSettingsSummary();
  }

  function updateExamSettingsSummary() {
    const summary = byId('examDetails');
    if (!summary) return;
    const { questionCount, timeMinutes, allowedErrors } = state.examSettings;
    const questionWord = ukPlural(questionCount, ['питання', 'питання', 'питань']);
    const minuteWord = ukPlural(timeMinutes, ['хвилина', 'хвилини', 'хвилин']);
    const errorWord = ukPlural(allowedErrors, ['помилка', 'помилки', 'помилок']);
    summary.textContent = `Зараз розпочнеться тестування у форматі реального іспиту: ${questionCount} ${questionWord} у випадковому порядку, ${timeMinutes} ${minuteWord} на їх вирішення. Допускається не більше ніж ${allowedErrors} ${errorWord}. Після перевищення дозволеної кількості помилок тест буде автоматично завершено.`;
  }

  function setExamSettingsPanel(open) {
    const panel = byId('examSettingsPanel');
    const button = byId('examSettingsToggle');
    if (panel) panel.classList.toggle('hidden', !open);
    if (button) button.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) updateExamSettingsControls();
  }

  function applyExamSettingsFromInputs() {
    const countEl = byId('examQuestionCount');
    const errorsEl = byId('examAllowedErrors');
    const minutesEl = byId('examTimeMinutes');
    const error = byId('examSettingsError');
    const count = Number(countEl?.value);
    const errors = Number(errorsEl?.value);
    const minutes = Number(minutesEl?.value);
    const validCount = Number.isInteger(count) && count >= 1 && count <= QUESTIONS.length;
    const validMinutes = Number.isInteger(minutes) && minutes >= 1 && minutes <= 180;
    const validErrors = Number.isInteger(errors) && errors >= 0 && errors <= count;
    if (!validCount || !validMinutes || !validErrors) {
      if (error) {
        error.textContent = `Укажи від 1 до ${QUESTIONS.length} питань, від 1 до 180 хвилин і від 0 до кількості питань для ліміту помилок.`;
        error.classList.remove('hidden');
      }
      if (!validCount) countEl?.setAttribute('aria-invalid', 'true');
      if (!validMinutes) minutesEl?.setAttribute('aria-invalid', 'true');
      if (!validErrors) errorsEl?.setAttribute('aria-invalid', 'true');
      return false;
    }
    state.examSettings = { questionCount: count, timeMinutes: minutes, allowedErrors: errors };
    saveExamSettings();
    updateExamSettingsControls();
    setExamSettingsPanel(false);
    return true;
  }

  function resetExamSettings() {
    state.examSettings = { ...DEFAULT_EXAM_SETTINGS };
    saveExamSettings();
    updateExamSettingsControls();
    setExamSettingsPanel(false);
  }

  function clearReviewState() {
    state.mistakeQuestions = [];
    state.reviewQuestions = [];
    state.reviewOrigin = null;
    byId('reviewMistakes')?.classList.add('hidden');
  }

  function startMistakeReview() {
    if (state.mode !== 'review') {
      if (!state.mistakeQuestions.length) return;
      state.reviewOrigin = {
        mode: state.mode,
        testNo: state.testNo,
        topicSection: state.topicSection,
        topicStart: state.topicStart,
        homeView: state.homeView
      };
      state.reviewQuestions = state.mistakeQuestions.slice();
    }
    if (!state.reviewQuestions.length) return;
    state.mode = 'review';
    state.questions = state.reviewQuestions.slice();
    beginQuiz();
  }

  function assetCandidates(source) {
    const raw = String(source == null ? '' : source).trim().replace(/\\/g, '/');
    if (!raw) return [];
    if (/^(?:https?:|data:|blob:|\/\/)/i.test(raw)) return [raw];

    const clean = raw.replace(/^(?:\.\/)+/, '').replace(/^\/+/, '');
    const bases = [APP_BASE];
    try { bases.push(new URL('.', document.baseURI)); } catch (_) {}
    try { bases.push(new URL('/', window.location.origin)); } catch (_) {}

    // Try the path relative to this deployed site first.
    const output = [];
    try { bases.push(new URL('/DuckPDR/', window.location.origin)); } catch (_) {}
    for (const base of bases) {
      try {
        const url = new URL(clean, base);
        url.searchParams.set('duckpdr_v', BUILD_ID);
        if (!output.includes(url.href)) output.push(url.href);
      } catch (_) {}
    }

    // Fallback: if Pages is missing the image in its published artifact,
    // fetch the same file directly from the public repository branch.
    // This does not change image order or the data mapping.
    try {
      const rawBase = new URL(clean, 'https://raw.githubusercontent.com/den38012-hue/DuckPDR/main/');
      rawBase.searchParams.set('duckpdr_v', BUILD_ID);
      if (!output.includes(rawBase.href)) output.push(rawBase.href);
    } catch (_) {}
    return output;
  }

  function setImageSource(img, source, label) {
    const candidates = assetCandidates(source);
    if (!candidates.length) return false;
    let candidateIndex = 0;
    img.alt = label || 'Ілюстрація до питання';
    img.decoding = 'async';
    img.loading = 'eager';
    img.onerror = () => {
      candidateIndex += 1;
      if (candidateIndex < candidates.length) {
        img.src = candidates[candidateIndex];
        return;
      }
      console.error('[DuckPDR] Не вдалося завантажити зображення.', {
        originalPath: source,
        tried: candidates,
        page: window.location.href
      });
      const warning = document.createElement('div');
      warning.className = 'question-image-error';
      warning.textContent = `Не вдалося завантажити зображення: ${source}. Перевір, чи доступний файл у репозиторії GitHub.`;
      warning.style.cssText = 'margin:10px 0;padding:10px 12px;border:1px solid #d9b7a1;border-radius:10px;background:#fff8f2;color:#75472d;font-size:13px;overflow-wrap:anywhere;';
      img.replaceWith(warning);
    };
    img.src = candidates[0];
    return true;
  }

  // Preload hero mascots once and only swap the visible image after the next
  // mascot has loaded. This prevents the ticket duck flashing briefly on topics.
  const homeMascotPromises = new Map();
  function preloadHomeMascot(source) {
    if (homeMascotPromises.has(source)) return homeMascotPromises.get(source);
    const candidates = assetCandidates(source);
    const promise = new Promise((resolve, reject) => {
      const tryCandidate = (index) => {
        if (index >= candidates.length) {
          reject(new Error(`Не вдалося попередньо завантажити маскот: ${source}`));
          return;
        }
        const probe = new Image();
        probe.decoding = 'async';
        probe.onload = () => {
          const finish = () => resolve(probe.currentSrc || probe.src);
          if (typeof probe.decode === 'function') probe.decode().catch(() => {}).then(finish);
          else finish();
        };
        probe.onerror = () => tryCandidate(index + 1);
        probe.src = candidates[index];
      };
      tryCandidate(0);
    });
    homeMascotPromises.set(source, promise);
    promise.catch(() => homeMascotPromises.delete(source));
    return promise;
  }

  function warmHomeMascots() {
    preloadHomeMascot('images/mascot-home.webp').catch(() => {});
    preloadHomeMascot('images/duck-topics-mascot.webp').catch(() => {});
  }

  function setHomeMascot(img, key, source, label) {
    if (!img || img.dataset.homeMascot === key) return;
    img.dataset.homeMascot = key;
    const token = String((Number(img.dataset.homeMascotRequest) || 0) + 1);
    img.dataset.homeMascotRequest = token;
    img.classList.add('mascot-loading');

    preloadHomeMascot(source).then((loadedSource) => {
      if (img.dataset.homeMascot !== key || img.dataset.homeMascotRequest !== token) return;
      img.alt = label;
      img.onerror = null;
      img.onload = () => {
        if (img.dataset.homeMascot === key && img.dataset.homeMascotRequest === token) {
          img.classList.remove('mascot-loading');
        }
      };
      img.src = loadedSource;
      if (img.complete && img.naturalWidth > 0) {
        window.requestAnimationFrame(() => {
          if (img.dataset.homeMascot === key && img.dataset.homeMascotRequest === token) {
            img.classList.remove('mascot-loading');
          }
        });
      }
    }).catch(() => {
      // Use the normal fallback loader if preload candidates were unavailable.
      if (img.dataset.homeMascot !== key || img.dataset.homeMascotRequest !== token) return;
      img.alt = label;
      img.onload = () => img.classList.remove('mascot-loading');
      if (!setImageSource(img, source, label)) img.classList.remove('mascot-loading');
      if (img.complete && img.naturalWidth > 0) img.classList.remove('mascot-loading');
    });
  }

  function normalizeImageSources(question) {
    if (!question) return [];
    const value = question.image;
    if (Array.isArray(value)) return value.filter((src) => typeof src === 'string' && src.trim());
    if (typeof value === 'string' && value.trim()) return [value];
    return [];
  }

  function renderQuestionImages(question) {
    const container = byId('questionImages');
    if (!container) return;
    container.replaceChildren();
    for (const source of normalizeImageSources(question)) {
      const img = document.createElement('img');
      img.className = 'question-image';
      if (setImageSource(img, source, 'Ілюстрація до питання')) container.appendChild(img);
    }
  }

  function stopTimers() {
    if (state.timerId !== null) window.clearInterval(state.timerId);
    if (state.autoAdvanceId !== null) window.clearTimeout(state.autoAdvanceId);
    if (state.transitionId !== null) window.clearTimeout(state.transitionId);
    state.timerId = null;
    state.autoAdvanceId = null;
    state.transitionId = null;
  }

  function show(view) {
    ['home', 'quiz', 'result'].forEach((id) => {
      const el = byId(id);
      if (el) el.classList.toggle('hidden', id !== view);
    });
    if (byId('homeBtn')) byId('homeBtn').classList.toggle('hidden', view === 'home');
    if (byId('testsTab')) byId('testsTab').classList.toggle('active', view === 'home' && state.homeView === 'tickets');
    if (byId('topicsTab')) byId('topicsTab').classList.toggle('active', view === 'home' && state.homeView === 'topics');
    if (byId('examTab')) byId('examTab').classList.toggle('active', view === 'home' && state.homeView === 'exam');
    const home = byId('home');
    const onTicketsHome = view === 'home' && state.homeView === 'tickets';
    const onTopicsHome = view === 'home' && state.homeView === 'topics';

    // One hero mascot per tab. The destination image is preloaded before it is
    // assigned, so the previous mascot never flashes during a slow image request.
    const heroMascot = document.querySelector('#home .duck-illustration img');
    const heroMascotKey = state.homeView === 'topics' ? 'topics' : 'tickets';
    if (heroMascotKey === 'topics') {
      setHomeMascot(heroMascot, 'topics', 'images/duck-topics-mascot.webp', 'Зелений селезень DuckPDR — тести за темами');
    } else {
      setHomeMascot(heroMascot, 'tickets', 'images/mascot-home.webp', 'Маскот DuckPDR — тести за білетами');
    }

    if (home) {
      home.classList.toggle('home-tickets', onTicketsHome);
      home.classList.toggle('home-topics', onTopicsHome);
      home.classList.toggle('home-exam', view === 'home' && state.homeView === 'exam');
    }
    if (document.body) {
      document.body.classList.toggle('page-tickets', onTicketsHome);
      document.body.classList.toggle('page-topics', onTopicsHome);
    }
    if (view === 'home') {
      byId('ticketsView')?.classList.toggle('hidden', state.homeView !== 'tickets');
      byId('topicsView')?.classList.toggle('hidden', state.homeView !== 'topics');
    } else {
      byId('ticketsView')?.classList.add('hidden');
      byId('topicsView')?.classList.add('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderTests() {
    const container = byId('tests');
    if (!container) return;
    container.replaceChildren();
    const testCount = Math.ceil(QUESTIONS.length / 20);
    for (let i = 0; i < testCount; i += 1) {
      const first = i * 20 + 1;
      const count = Math.min(20, QUESTIONS.length - i * 20);
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'test-card';
      card.dataset.test = String(i + 1);
      const heading = document.createElement('b');
      heading.textContent = `Тест №${i + 1}`;
      const detail = document.createElement('span');
      detail.textContent = `${count} питань · питання ${first}–${first + count - 1}`;
      card.append(heading, detail);
      card.addEventListener('click', () => startTest(i + 1));
      container.appendChild(card);
    }
    if (byId('qCount')) byId('qCount').textContent = String(QUESTIONS.length);
    if (byId('testCount')) byId('testCount').textContent = String(testCount);
  }

  function renderTopics() {
    const container = byId('topics');
    if (!container) return;
    container.replaceChildren();
    for (const topic of TOPICS) {
      const topicQuestions = QUESTIONS.filter((question) => String(question.section) === String(topic.section));
      if (!topicQuestions.length) continue;

      const card = document.createElement('article');
      card.className = 'topic-card';
      const heading = document.createElement('div');
      heading.className = 'topic-heading';
      const number = document.createElement('div');
      number.className = 'topic-number';
      number.textContent = `Тема №${topic.section}`;
      const title = document.createElement('h3');
      title.textContent = topic.title;
      const count = document.createElement('span');
      count.textContent = `${topicQuestions.length} ${topicQuestions.length === 1 ? 'питання' : 'питань'}`;
      heading.append(number, title, count);
      const ranges = document.createElement('div');
      ranges.className = 'topic-ranges';
      for (let start = 0; start < topicQuestions.length; start += 20) {
        const end = Math.min(start + 20, topicQuestions.length);
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'topic-range';
        button.textContent = `${start + 1}–${end}`;
        button.addEventListener('click', () => startTopic(topic.section, start));
        ranges.appendChild(button);
      }
      card.append(heading, ranges);
      container.appendChild(card);
    }
  }

  function shuffleCopy(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function startTest(number) {
    clearReviewState();
    state.homeView = 'tickets';
    state.mode = 'practice';
    state.testNo = number;
    state.questions = QUESTIONS.slice((number - 1) * 20, number * 20);
    beginQuiz();
  }

  function startTopic(section, start) {
    clearReviewState();
    state.homeView = 'topics';
    state.mode = 'topic';
    state.topicSection = String(section);
    state.topicStart = start;
    const questions = QUESTIONS.filter((question) => String(question.section) === String(section));
    state.questions = questions.slice(start, start + 20);
    beginQuiz();
  }

  function startExam() {
    closeExamModal();
    clearReviewState();
    state.homeView = 'exam';
    state.mode = 'exam';
    state.testNo = 0;
    state.examWrong = 0;
    state.questions = shuffleCopy(QUESTIONS).slice(0, state.examSettings.questionCount);
    beginQuiz();
  }

  function beginQuiz() {
    stopTimers();
    state.position = 0;
    state.answers = Object.create(null);
    state.finished = false;
    state.secondsLeft = state.mode === 'exam' ? state.examSettings.timeMinutes * 60 : 20 * 60;
    const quizCard = document.querySelector('.quizcard');
    quizCard?.classList.remove('question-exit', 'question-enter');
    show('quiz');
    drawQuestion();
    state.timerId = window.setInterval(() => {
      state.secondsLeft -= 1;
      drawTimer();
      if (state.secondsLeft <= 0) {
        stopTimers();
        finishTest(false, true);
      }
    }, 1000);
  }

  function drawTimer() {
    const minutes = Math.floor(state.secondsLeft / 60);
    const seconds = state.secondsLeft % 60;
    const text = `${minutes}:${String(seconds).padStart(2, '0')}`;
    if (byId('timer')) {
      byId('timer').textContent = text;
      byId('timer').classList.toggle('warn', state.secondsLeft <= 120);
    }
    if (byId('timer2')) byId('timer2').textContent = text;
  }

  function currentTopicTitle(question) {
    const section = String(question.section);
    return TOPICS.find((topic) => String(topic.section) === section);
  }

  function renderAnswers(question, selected) {
    const container = byId('answers');
    container.replaceChildren();
    const letters = 'ABCDE';
    (Array.isArray(question.options) ? question.options : []).forEach((option, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'answer';
      button.dataset.i = String(index);
      const letter = document.createElement('span');
      letter.className = 'letter';
      letter.textContent = letters[index] || String(index + 1);
      const text = document.createElement('span');
      text.textContent = String(option);
      button.append(letter, text);

      if (selected !== undefined) {
        button.classList.add('locked');
        if (index === Number(question.correct)) button.classList.add('correct');
        if (index === selected && selected !== Number(question.correct)) button.classList.add('wrong');
      }
      button.disabled = selected !== undefined;
      button.addEventListener('click', () => chooseAnswer(index));
      container.appendChild(button);
    });
  }

  function renderQuestionNavigator() {
    const wrap = byId('questionNavWrap');
    const container = byId('questionNav');
    if (!wrap || !container) return;

    // Practice and topic modes allow learners to revisit any question.
    // The real-exam mode keeps its original navigation rules.
    const enabled = state.mode !== 'exam';
    wrap.classList.toggle('hidden', !enabled);
    container.replaceChildren();
    if (!enabled) return;

    state.questions.forEach((question, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'question-jump';
      button.textContent = String(index + 1);
      const selected = state.answers[index];
      if (selected !== undefined) {
        const isCorrect = selected === Number(question.correct);
        button.classList.add(isCorrect ? 'answered-correct' : 'answered-wrong');
        button.setAttribute('aria-label', `Питання ${index + 1}: ${isCorrect ? 'правильна відповідь' : 'є помилка'}`);
      } else {
        button.setAttribute('aria-label', `Перейти до питання ${index + 1}`);
      }
      if (index === state.position) {
        button.classList.add('current');
        button.setAttribute('aria-current', 'step');
      }
      button.addEventListener('click', () => goToQuestion(index));
      container.appendChild(button);
    });
    const navCount = byId('questionNavCount');
    if (navCount) navCount.textContent = `${state.questions.length} питань`;
  }

  function drawQuestion() {
    const question = state.questions[state.position];
    if (!question) return;
    const selected = state.answers[state.position];
    const topic = currentTopicTitle(question);
    renderQuestionNavigator();

    if (byId('quizTitle')) {
      if (state.mode === 'exam') byId('quizTitle').textContent = 'Іспит';
      else if (state.mode === 'review') {
        const origin = state.reviewOrigin;
        const sourceLabel = origin?.mode === 'topic'
          ? `Тема №${origin.topicSection}`
          : origin?.mode === 'exam' ? 'Іспит' : `Тест №${origin?.testNo || state.testNo}`;
        byId('quizTitle').textContent = `Робота над помилками · ${sourceLabel}`;
      }
      else if (state.mode === 'topic') byId('quizTitle').textContent = `Тема №${topic?.section || question.section} — ${topic?.title || ''}`;
      else byId('quizTitle').textContent = `Тест №${state.testNo}`;
    }
    if (byId('counter')) byId('counter').textContent = `Питання ${state.position + 1} з ${state.questions.length}`;
    if (byId('num')) byId('num').textContent = `Питання №${question.id}`;
    if (byId('qtext')) byId('qtext').textContent = question.question || '';
    if (byId('bar')) byId('bar').style.width = `${((state.position + 1) / state.questions.length) * 100}%`;

    renderQuestionImages(question);
    renderAnswers(question, selected);
    drawTimer();

    const feedback = byId('feedback');
    feedback.replaceChildren();
    let feedbackText = '';
    let feedbackClass = '';
    if ((state.mode === 'practice' || state.mode === 'topic' || state.mode === 'review') && selected !== undefined) {
      feedbackText = selected === Number(question.correct)
        ? '✓ Правильно! Відповідь зарахована.'
        : 'Неправильно. Правильний варіант виділено зеленим; можна перейти до іншого питання зверху.';
      feedbackClass = selected === Number(question.correct) ? 'status ok' : 'status bad';
    } else if (state.mode === 'exam' && selected !== undefined) {
      feedbackText = selected === Number(question.correct)
        ? '✓ Правильно! Переходимо до наступного питання…'
        : '✕ Неправильно. Правильний варіант виділено зеленим. Перейдіть далі вручну.';
      feedbackClass = selected === Number(question.correct) ? 'status ok' : 'status bad';
    }
    if (feedbackText) {
      const notice = document.createElement('div');
      notice.className = feedbackClass;
      notice.textContent = feedbackText;
      feedback.appendChild(notice);
    }
    feedback.classList.toggle('hidden', !feedbackText);

    byId('prev')?.classList.toggle('hidden', state.mode === 'exam');
    const hideNext = state.mode === 'exam' && (selected === undefined || selected === Number(question.correct));
    byId('next')?.classList.toggle('hidden', hideNext);
    if (byId('next')) byId('next').textContent = state.position === state.questions.length - 1 ? 'Завершити' : 'Наступне питання →';
  }

  function chooseAnswer(index) {
    if (state.finished || state.answers[state.position] !== undefined) return;
    const question = state.questions[state.position];
    if (!question) return;
    state.answers[state.position] = index;
    const correct = index === Number(question.correct);
    if (state.mode === 'exam') {
      if (!correct) state.examWrong += 1;
      drawQuestion();
      if (state.examWrong > state.examSettings.allowedErrors) {
        state.autoAdvanceId = window.setTimeout(() => finishTest(true, false), 700);
      } else if (correct) {
        state.autoAdvanceId = window.setTimeout(() => {
          state.autoAdvanceId = null;
          if (state.finished) return;
          if (state.position < state.questions.length - 1) {
            state.position += 1;
            transitionToNext();
          } else finishTest(false, false);
        }, 700);
      }
    } else {
      drawQuestion();
      // Correct answers receive a short green confirmation; incorrect answers
      // remain on the current question until the learner chooses to move on.
      if (correct) {
        state.autoAdvanceId = window.setTimeout(() => {
          state.autoAdvanceId = null;
          if (!state.finished) nextQuestion();
        }, 720);
      }
    }
  }

  function transitionToNext() {
    const card = document.querySelector('.quizcard');
    if (!card) { drawQuestion(); return; }
    if (state.transitionId !== null) window.clearTimeout(state.transitionId);
    card.classList.remove('question-enter');
    card.classList.add('question-exit');
    state.transitionId = window.setTimeout(() => {
      state.transitionId = null;
      card.classList.remove('question-exit');
      card.classList.add('question-enter');
      drawQuestion();
      window.requestAnimationFrame(() => card.classList.remove('question-enter'));
    }, 150);
  }

  function clearAutoAdvance() {
    if (state.autoAdvanceId !== null) window.clearTimeout(state.autoAdvanceId);
    state.autoAdvanceId = null;
  }

  function nextQuestion() {
    if (state.finished) return;
    clearAutoAdvance();
    if (state.position < state.questions.length - 1) {
      state.position += 1;
      transitionToNext();
    } else finishTest(false, false);
  }

  function previousQuestion() {
    if (state.position > 0 && !state.finished) {
      clearAutoAdvance();
      state.position -= 1;
      transitionToNext();
    }
  }

  function goToQuestion(index) {
    if (state.finished || state.mode === 'exam' || index < 0 || index >= state.questions.length || index === state.position) return;
    clearAutoAdvance();
    state.position = index;
    transitionToNext();
  }

  function finishTest(examFailed = false, timedOut = false) {
    if (state.finished) return;
    state.finished = true;
    stopTimers();

    const correct = state.questions.reduce((sum, question, index) => sum + (state.answers[index] === Number(question.correct) ? 1 : 0), 0);
    const wrong = state.questions.length - correct;
    const perfect = wrong === 0 && (state.questions.length === 20 || (state.mode === 'exam' && state.questions.length === state.examSettings.questionCount));
    if (state.mode !== 'review') {
      state.mistakeQuestions = state.questions.filter((question, index) =>
        state.answers[index] !== undefined && state.answers[index] !== Number(question.correct)
      );
    }
    const examAllAnswered = state.questions.every((question, index) => state.answers[index] !== undefined);
    const examPassed = state.mode === 'exam' && !examFailed && !timedOut && wrong <= state.examSettings.allowedErrors && examAllAnswered;
    const didFail = state.mode === 'exam' ? !examPassed : wrong > 2;
    const special = byId('resultSpecial');
    const specialImage = byId('resultSpecialImage');
    const specialMessage = byId('resultSpecialMessage');
    special.classList.add('hidden');
    special.classList.remove('fail', 'perfect');
    if (specialImage) { specialImage.removeAttribute('src'); specialImage.alt = ''; }
    if (specialMessage) specialMessage.textContent = '';

    if (state.mode === 'exam') {
      const allAnswered = state.questions.every((question, index) => state.answers[index] !== undefined);
      const passed = !examFailed && !timedOut && wrong <= state.examSettings.allowedErrors && allAnswered;
      byId('resultTitle').textContent = passed ? 'Іспит складено' : 'Іспит не складено';
      byId('resultText').textContent = examFailed
        ? 'Перевищено дозволену кількість неправильних відповідей. Іспит автоматично завершено.'
        : timedOut
          ? 'Час вичерпано. Іспит не складено.'
          : passed
            ? `Неправильних відповідей: ${wrong}. Ви вклалися у встановлений ліміт помилок.`
            : `Неправильних відповідей: ${wrong}. Для складання іспиту потрібно вкластися у встановлений ліміт помилок.`;
    } else if (state.mode === 'review') {
      byId('resultTitle').textContent = 'Робота над помилками';
      byId('resultText').textContent = wrong === 0
        ? 'Чудово! Ти правильно відповів на всі питання, які повторював.'
        : `У повторенні залишилося помилок: ${wrong}. Можеш пройти цей блок ще раз.`;
    } else if (state.mode === 'topic') {
      const topic = TOPICS.find((item) => String(item.section) === state.topicSection);
      const from = state.topicStart + 1;
      const to = state.topicStart + state.questions.length;
      byId('resultTitle').textContent = `Тема №${state.topicSection} · ${from}–${to}`;
      byId('resultText').textContent = wrong === 0 ? 'Усі відповіді правильні!' : `Помилок: ${wrong}. Правильні відповіді позначено після кожного питання.`;
    } else {
      byId('resultTitle').textContent = `Тест №${state.testNo}`;
      byId('resultText').textContent = wrong === 0 ? 'Усі відповіді правильні!' : `Помилок: ${wrong}. Для реального іспиту важливо мати не більше 2 помилок.`;
    }
    byId('resultScore').textContent = `${correct} / ${state.questions.length}`;

    if (didFail || perfect) {
      special.classList.remove('hidden');
      if (didFail) {
        special.classList.add('fail');
        const failureMascot = nextFailureMascot();
        if (specialImage) setImageSource(specialImage, failureMascot.src, failureMascot.alt);
        specialMessage.textContent = 'Спробуй ще раз! Наступного разу точно вийде!';
      } else {
        special.classList.add('perfect');
        if (specialImage) setImageSource(specialImage, 'images/mascot-perfect.webp', 'Маскот DuckPDR — ідеальний результат');
        specialMessage.textContent = 'Ти пройшов тест ідеально! Посвідчення водія вже не за горами!';
      }
    }

    const mistakes = byId('mistakes');
    mistakes.replaceChildren();
    state.questions.forEach((question, index) => {
      if (state.answers[index] === Number(question.correct)) return;
      const item = document.createElement('div');
      item.className = 'mistake';
      const title = document.createElement('b');
      title.textContent = `Питання ${index + 1}: `;
      const questionText = document.createTextNode(question.question || '');
      const line = document.createElement('br');
      const correctAnswer = document.createElement('span');
      correctAnswer.textContent = `Правильна відповідь: ${question.options?.[Number(question.correct)] ?? 'не вказана'}`;
      item.append(title, questionText, line, correctAnswer);
      mistakes.appendChild(item);
    });
    if (!mistakes.childElementCount) {
      const note = document.createElement('p');
      note.textContent = 'Помилок немає.';
      mistakes.appendChild(note);
    }
    byId('again').textContent = state.mode === 'exam' ? 'Пройти іспит ще раз' : state.mode === 'review' ? 'Повторити ще раз' : 'Пройти ще раз';
    const reviewButton = byId('reviewMistakes');
    if (reviewButton) {
      reviewButton.classList.toggle('hidden', state.mode === 'review' || state.mistakeQuestions.length === 0);
      reviewButton.textContent = `Робота над помилками (${state.mistakeQuestions.length})`;
    }
    show('result');
  }

  function openExamModal() {
    state.homeView = 'exam';
    show('home');
    setExamSettingsPanel(false);
    updateExamSettingsControls();
    const modal = byId('examModal');
    modal?.classList.remove('hidden');
    modal?.setAttribute('aria-hidden', 'false');
  }

  function closeExamModal() {
    setExamSettingsPanel(false);
    const modal = byId('examModal');
    modal?.classList.add('hidden');
    modal?.setAttribute('aria-hidden', 'true');
  }

  function cancelExamModal() {
    closeExamModal();
    openTickets();
  }

  function openTickets() {
    state.homeView = 'tickets';
    state.mode = 'practice';
    show('home');
  }

  function openTopics() {
    state.homeView = 'topics';
    state.mode = 'topic';
    show('home');
  }

  function filterTests(search) {
    const term = String(search || '').trim().toLocaleLowerCase('uk');
    document.querySelectorAll('.test-card').forEach((card) => {
      card.classList.toggle('hidden', Boolean(term) && !card.textContent.toLocaleLowerCase('uk').includes(term));
    });
  }

  function initialize() {
    initializeTheme();
    warmHomeMascots();
    state.examSettings = loadExamSettings();
    updateExamSettingsControls();
    if (!QUESTIONS.length) {
      const error = byId('loadError');
      if (error) {
        error.replaceChildren();
        const message = document.createElement('p');
        message.textContent = 'Не вдалося завантажити питання. Оновіть сторінку.';
        const retry = document.createElement('button');
        retry.type = 'button';
        retry.className = 'btn light load-error-retry';
        retry.textContent = 'Спробувати ще раз';
        retry.addEventListener('click', () => window.location.reload());
        error.append(message, retry);
        error.classList.remove('hidden');
      }
      console.error('[DuckPDR] window.PDR_QUESTIONS is empty. The data script may not have loaded.');
      return;
    }

    // Use the same robust image loader for the home-page mascot too.
    document.querySelectorAll('img[src^="images/"]').forEach((img) => {
      const src = img.getAttribute('src');
      if (src) setImageSource(img, src, img.alt || 'Зображення DuckPDR');
    });

    renderTests();
    renderTopics();
    byId('next')?.addEventListener('click', nextQuestion);
    byId('prev')?.addEventListener('click', previousQuestion);
    byId('homeBtn')?.addEventListener('click', () => {
      stopTimers();
      if (state.homeView === 'exam') openTickets();
      else show('home');
    });
    byId('again')?.addEventListener('click', () => {
      if (state.mode === 'review') startMistakeReview();
      else if (state.mode === 'exam') openExamModal();
      else if (state.mode === 'topic') startTopic(state.topicSection, state.topicStart);
      else startTest(state.testNo);
    });
    byId('reviewMistakes')?.addEventListener('click', startMistakeReview);
    byId('back')?.addEventListener('click', () => {
      if (state.homeView === 'exam') openTickets();
      else show('home');
    });
    byId('allBtn')?.addEventListener('click', () => { byId('search').value = ''; filterTests(''); });
    byId('search')?.addEventListener('input', (event) => filterTests(event.target.value));
    byId('testsTab')?.addEventListener('click', openTickets);
    byId('topicsTab')?.addEventListener('click', openTopics);
    byId('examTab')?.addEventListener('click', openExamModal);
    byId('examCancel')?.addEventListener('click', cancelExamModal);
    byId('examStart')?.addEventListener('click', startExam);
    byId('examSettingsToggle')?.addEventListener('click', () => {
      setExamSettingsPanel(byId('examSettingsPanel')?.classList.contains('hidden'));
    });
    byId('examSettingsApply')?.addEventListener('click', applyExamSettingsFromInputs);
    byId('examSettingsReset')?.addEventListener('click', resetExamSettings);
    byId('examQuestionCount')?.addEventListener('input', () => {
      const errors = byId('examAllowedErrors');
      const count = Number(byId('examQuestionCount')?.value);
      if (errors && Number.isInteger(count) && count >= 1) errors.max = String(count);
    });
    byId('examModal')?.addEventListener('click', (event) => {
      if (event.target.classList.contains('modal-backdrop')) cancelExamModal();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !byId('examModal')?.classList.contains('hidden')) cancelExamModal();
    });
    show('home');
  }

  initialize();
})();

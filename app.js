/* DuckPDR — rewritten quiz controller. Build: 20261009-3 */
(() => {
  'use strict';

  const QUESTIONS = Array.isArray(window.PDR_QUESTIONS) ? window.PDR_QUESTIONS : [];
  const BUILD_ID = '20261009-3';
  const byId = (id) => document.getElementById(id);
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
    autoAdvanceId: null
  };

  function assetCandidates(source) {
    const raw = String(source == null ? '' : source).trim().replace(/\\/g, '/');
    if (!raw) return [];
    if (/^(?:https?:|data:|blob:|\/\/)/i.test(raw)) return [raw];

    const clean = raw.replace(/^(?:\.\/)+/, '').replace(/^\/+/, '');
    const bases = [APP_BASE];
    try { bases.push(new URL('.', document.baseURI)); } catch (_) {}
    try { bases.push(new URL('/', window.location.origin)); } catch (_) {}

    const output = [];
    for (const base of bases) {
      try {
        const url = new URL(clean, base);
        url.searchParams.set('duckpdr_v', BUILD_ID);
        if (!output.includes(url.href)) output.push(url.href);
      } catch (_) {}
    }
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
      warning.textContent = `Не вдалося завантажити зображення: ${source}`;
      warning.style.cssText = 'margin:10px 0;padding:10px 12px;border:1px solid #d9b7a1;border-radius:10px;background:#fff8f2;color:#75472d;font-size:13px;overflow-wrap:anywhere;';
      img.replaceWith(warning);
    };
    img.src = candidates[0];
    return true;
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
    state.timerId = null;
    state.autoAdvanceId = null;
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
    state.homeView = 'tickets';
    state.mode = 'practice';
    state.testNo = number;
    state.questions = QUESTIONS.slice((number - 1) * 20, number * 20);
    beginQuiz();
  }

  function startTopic(section, start) {
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
    state.homeView = 'exam';
    state.mode = 'exam';
    state.testNo = 0;
    state.examWrong = 0;
    state.questions = shuffleCopy(QUESTIONS).slice(0, 20);
    beginQuiz();
  }

  function beginQuiz() {
    stopTimers();
    state.position = 0;
    state.answers = Object.create(null);
    state.finished = false;
    state.secondsLeft = 20 * 60;
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

  function drawQuestion() {
    const question = state.questions[state.position];
    if (!question) return;
    const selected = state.answers[state.position];
    const topic = currentTopicTitle(question);

    if (byId('quizTitle')) {
      if (state.mode === 'exam') byId('quizTitle').textContent = 'Іспит';
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
    if ((state.mode === 'practice' || state.mode === 'topic') && selected !== undefined) {
      feedbackText = selected === Number(question.correct)
        ? '✓ Правильно! Відповідь зарахована.'
        : '✕ Неправильно. Правильний варіант виділено зеленим.';
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
    if (state.mode === 'exam') {
      const correct = index === Number(question.correct);
      if (!correct) state.examWrong += 1;
      drawQuestion();
      if (state.examWrong >= 3) {
        state.autoAdvanceId = window.setTimeout(() => finishTest(true, false), 700);
      } else if (correct) {
        state.autoAdvanceId = window.setTimeout(() => {
          if (state.finished) return;
          if (state.position < state.questions.length - 1) {
            state.position += 1;
            transitionToNext();
          } else finishTest(false, false);
        }, 700);
      }
    } else drawQuestion();
  }

  function transitionToNext() {
    const card = document.querySelector('.quizcard');
    if (!card) { drawQuestion(); return; }
    card.classList.add('question-exit');
    window.setTimeout(() => {
      card.classList.remove('question-exit');
      card.classList.add('question-enter');
      drawQuestion();
      window.requestAnimationFrame(() => card.classList.remove('question-enter'));
    }, 180);
  }

  function nextQuestion() {
    if (state.position < state.questions.length - 1) {
      state.position += 1;
      transitionToNext();
    } else finishTest(false, false);
  }

  function previousQuestion() {
    if (state.position > 0) {
      state.position -= 1;
      drawQuestion();
    }
  }

  function finishTest(examFailed = false, timedOut = false) {
    if (state.finished) return;
    state.finished = true;
    stopTimers();

    const correct = state.questions.reduce((sum, question, index) => sum + (state.answers[index] === Number(question.correct) ? 1 : 0), 0);
    const wrong = state.questions.length - correct;
    const perfect = correct === 20 && state.questions.length === 20 && wrong === 0;
    const failed = wrong > 2;
    const special = byId('resultSpecial');
    const specialImage = byId('resultSpecialImage');
    const specialMessage = byId('resultSpecialMessage');
    special.classList.add('hidden');
    special.classList.remove('fail', 'perfect');
    if (specialImage) { specialImage.removeAttribute('src'); specialImage.alt = ''; }
    if (specialMessage) specialMessage.textContent = '';

    if (state.mode === 'exam') {
      const allAnswered = state.questions.every((question, index) => state.answers[index] !== undefined);
      const passed = !examFailed && !timedOut && wrong <= 2 && allAnswered;
      byId('resultTitle').textContent = passed ? 'Іспит складено' : 'Іспит не складено';
      byId('resultText').textContent = examFailed
        ? 'Допущено 3 неправильні відповіді. Іспит автоматично завершено.'
        : timedOut
          ? 'Час вичерпано. Іспит не складено.'
          : passed
            ? `Неправильних відповідей: ${wrong}. Ви допустили не більше 2 помилок.`
            : `Неправильних відповідей: ${wrong}. Для складання іспиту потрібно не більше 2 помилок.`;
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

    if (failed || perfect) {
      special.classList.remove('hidden');
      if (failed) {
        special.classList.add('fail');
        if (specialImage) setImageSource(specialImage, 'images/mascot-fail.webp', 'Маскот DuckPDR — тест не складено');
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
    byId('again').textContent = state.mode === 'exam' ? 'Пройти іспит ще раз' : 'Пройти ще раз';
    show('result');
  }

  function openExamModal() {
    state.homeView = 'exam';
    show('home');
    const modal = byId('examModal');
    modal?.classList.remove('hidden');
    modal?.setAttribute('aria-hidden', 'false');
  }

  function closeExamModal() {
    const modal = byId('examModal');
    modal?.classList.add('hidden');
    modal?.setAttribute('aria-hidden', 'true');
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
    if (!QUESTIONS.length) {
      const error = byId('loadError');
      if (error) {
        error.classList.remove('hidden');
        error.textContent = 'Не вдалося завантажити базу питань. Перевір наявність data.js у корені сайту.';
      }
      console.error('[DuckPDR] window.PDR_QUESTIONS is empty. data.js should load before app.js.');
      return;
    }

    renderTests();
    renderTopics();
    byId('next')?.addEventListener('click', nextQuestion);
    byId('prev')?.addEventListener('click', previousQuestion);
    byId('homeBtn')?.addEventListener('click', () => { stopTimers(); show('home'); });
    byId('again')?.addEventListener('click', () => {
      if (state.mode === 'exam') openExamModal();
      else if (state.mode === 'topic') startTopic(state.topicSection, state.topicStart);
      else startTest(state.testNo);
    });
    byId('back')?.addEventListener('click', () => show('home'));
    byId('allBtn')?.addEventListener('click', () => { byId('search').value = ''; filterTests(''); });
    byId('search')?.addEventListener('input', (event) => filterTests(event.target.value));
    byId('testsTab')?.addEventListener('click', openTickets);
    byId('topicsTab')?.addEventListener('click', openTopics);
    byId('examTab')?.addEventListener('click', openExamModal);
    byId('examCancel')?.addEventListener('click', () => { closeExamModal(); openTickets(); });
    byId('examStart')?.addEventListener('click', startExam);
    byId('examModal')?.addEventListener('click', (event) => {
      if (event.target.classList.contains('modal-backdrop')) closeExamModal();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeExamModal();
    });
    show('home');
  }

  initialize();
})();

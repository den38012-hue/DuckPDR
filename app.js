const Q=window.PDR_QUESTIONS||[];
const $=id=>document.getElementById(id);
const TOPICS=[{"section": "1", "title": "ЗАГАЛЬНІ ПОЛОЖЕННЯ"}, {"section": "2", "title": "ОБОВ'ЯЗКИ І ПРАВА ВОДІЇВ МЕХАНІЧНИХ ТРАНСПОРТНИХ ЗАСОБІВ"}, {"section": "3", "title": "РУХ ТРАНСПОРТНИХ ЗАСОБІВ ІЗ СПЕЦІАЛЬНИМИ СИГНАЛАМИ"}, {"section": "4", "title": "ОБОВ'ЯЗКИ І ПРАВА ПІШОХОДІВ"}, {"section": "5", "title": "ОБОВ'ЯЗКИ І ПРАВА ПАСАЖИРІВ"}, {"section": "6", "title": "ВИМОГИ ДО ВЕЛОСИПЕДИСТІВ"}, {"section": "7", "title": "ВИМОГИ ДО ОСІБ, ЯКІ КЕРУЮТЬ ГУЖОВИМ ТРАНСПОРТОМ, І ПОГОНИЧІВ ТВАРИН"}, {"section": "8.1", "title": "РЕГУЛЮВАННЯ ДОРОЖНЬОГО РУХУ (РЕГУЛЬОВАНІ ПЕРЕХРЕСТЯ)"}, {"section": "8.2", "title": "РЕГУЛЮВАННЯ ДОРОЖНЬОГО РУХУ (НЕРЕГУЛЬОВАНІ ПЕРЕХРЕСТЯ)"}, {"section": "9", "title": "ПОПЕРЕДЖУВАЛЬНІ СИГНАЛИ"}, {"section": "10", "title": "ПОЧАТОК РУХУ ТА ЗМІНА ЙОГО НАПРЯМКУ"}, {"section": "11", "title": "РОЗТАШУВАННЯ ТРАНСПОРТНИХ ЗАСОБІВ НА ДОРОЗІ"}, {"section": "12", "title": "ШВИДКІСТЬ РУХУ"}, {"section": "13", "title": "ДИСТАНЦІЯ, ІНТЕРВАЛ, ЗУСТРІЧНИЙ РОЗ'ЇЗД"}, {"section": "14", "title": "ОБГІН"}, {"section": "15", "title": "ЗУПИНКА І СТОЯНКА"}, {"section": "16.1", "title": "ПРОЇЗД ПЕРЕХРЕСТЬ (РЕГУЛЬОВАНІ ПЕРЕХРЕСТЯ)"}, {"section": "16.2", "title": "ПРОЇЗД ПЕРЕХРЕСТЬ (НЕРЕГУЛЬОВАНІ ПЕРЕХРЕСТЯ)"}, {"section": "17", "title": "ПЕРЕВАГИ МАРШРУТНИХ ТРАНСПОРТНИХ ЗАСОБІВ"}, {"section": "18", "title": "ПРОЇЗД ПІШОХІДНИХ ПЕРЕХОДІВ І ЗУПИНОК ТРАНСПОРТНИХ ЗАСОБІВ"}, {"section": "19", "title": "КОРИСТУВАННЯ ЗОВНІШНІМИ СВІТЛОВИМИ ПРИЛАДАМИ"}, {"section": "20", "title": "РУХ ЧЕРЕЗ ЗАЛІЗНИЧНІ ПЕРЕЇЗДИ"}, {"section": "21", "title": "ПЕРЕВЕЗЕННЯ ПАСАЖИРІВ"}, {"section": "22", "title": "ПЕРЕВЕЗЕННЯ ВАНТАЖУ"}, {"section": "23", "title": "БУКСИРУВАННЯ ТА ЕКСПЛУАТАЦІЯ ТРАНСПОРТНИХ СОСТАВІВ"}, {"section": "24", "title": "НАВЧАЛЬНА ЇЗДА"}, {"section": "25", "title": "РУХ ТРАНСПОРТНИХ ЗАСОБІВ У КОЛОНАХ"}, {"section": "26", "title": "РУХ У ЖИТЛОВІЙ ТА ПІШОХІДНІЙ ЗОНІ"}, {"section": "27", "title": "РУХ ПО АВТОМАГІСТРАЛЯХ"}, {"section": "28", "title": "РУХ ПО ГІРСЬКИХ ДОРОГАХ І НА КРУТИХ СПУСКАХ"}, {"section": "29", "title": "МІЖНАРОДНИЙ РУХ"}, {"section": "30", "title": "НОМЕРНІ, РОЗПІЗНАВАЛЬНІ ЗНАКИ, НАПИСИ І ПОЗНАЧЕННЯ"}, {"section": "31", "title": "ТЕХНІЧНИЙ СТАН ТРАНСПОРТНИХ ЗАСОБІВ ТА ЇХ ОБЛАДНАННЯ"}, {"section": "32", "title": "ОКРЕМІ ПИТАННЯ ДОРОЖНЬОГО РУХУ, ЩО ПОТРЕБУЮТЬ УЗГОДЖЕННЯ"}, {"section": "33", "title": "ДОРОЖНІ ЗНАКИ"}, {"section": "34", "title": "ДОРОЖНЯ РОЗМІТКА"}, {"section": "35", "title": "ОСНОВИ БЕЗПЕЧНОГО ВОДІННЯ"}, {"section": "36", "title": "ОСНОВИ ПРАВА В ОБЛАСТІ ДОРОЖНЬОГО РУХУ"}, {"section": "37", "title": "НАДАННЯ ДОМЕДИЧНОЇ ДОПОМОГИ"}, {"section": "38", "title": "ЕТИКА ВОДІННЯ, КУЛЬТУРА ТА ВІДПОЧИНОК ВОДІЯ"}, {"section": "39", "title": "ЄВРОПРОТОКОЛ"}, {"section": "40", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ А1, А (ЗАГАЛЬНІ)"}, {"section": "41", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ А1, А (БУДОВА І ТЕРМІНИ)"}, {"section": "42", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ А1, А (ЮРИДИЧНА ВІДПОВІДАЛЬНІСТЬ)"}, {"section": "43", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ А1, А (БЕЗПЕКА)"}, {"section": "44", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ В1, В (ЗАГАЛЬНІ)"}, {"section": "45", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ В1, В (БУДОВА І ТЕРМІНИ)"}, {"section": "46", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ В1, В (ЮРИДИЧНА ВІДПОВІДАЛЬНІСТЬ)"}, {"section": "47", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ В1, В (БЕЗПЕКА)"}, {"section": "48", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ C1,C (ЗАГАЛЬНІ)"}, {"section": "49", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ C1,C (БУДОВА І ТЕРМІНИ)"}, {"section": "50", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ C1,C (ЮРИДИЧНА ВІДПОВІДАЛЬНІСТЬ)"}, {"section": "51", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ C1,C (БЕЗПЕКА)"}, {"section": "52", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ D1, D (ЗАГАЛЬНІ)"}, {"section": "53", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДОКАТЕГОРІЙD1, D (БУДОВА І ТЕРМІНИ)"}, {"section": "54", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ D1, D (ЮРИДИЧНА ВІДПОВІДАЛЬНІСТЬ)"}, {"section": "55", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ D1, D (БЕЗПЕКА)"}, {"section": "56", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ BE, C1E, CE, D1E, DE (ЗАГАЛЬНІ)"}, {"section": "57", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ BE, C1E, CE, D1E, DE (БУДОВА И ТЕРМІНИ)"}, {"section": "58", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ BE, C1E, CE, D1E, DE (ЮРИДИЧНА ВІДПОВІЛЬНІСТЬ)"}, {"section": "59", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЙ BE, C1E, CE, D1E, DE (БЕЗПЕКА)"}, {"section": "60", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЇ T (ЗАГАЛЬНІ)"}, {"section": "61", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЇ Т (БУДОВА І ТЕРМІНИ)"}, {"section": "62", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЇ Т (ЮРИДИЧНА ВІДПОВІЛЬНІСТЬ)"}, {"section": "63", "title": "ДОДАТКОВІ ПИТАННЯ ЩОДО КАТЕГОРІЇ Т (БЕЗПЕКА)"}];
let testQuestions=[],pos=0,answers={},testNo=0,timer=null,secondsLeft=1200,finished=false,mode='practice',examWrong=0;
let homeView='tickets',topicSection='',topicStart=0;

function show(id){
  ['home','quiz','result'].forEach(x=>$(x).classList.toggle('hidden',x!==id));
  $('homeBtn').classList.toggle('hidden',id==='home');
  $('testsTab').classList.toggle('active',id==='home' && homeView==='tickets');
  $('topicsTab').classList.toggle('active',id==='home' && homeView==='topics');
  $('examTab').classList.toggle('active',id==='home' && homeView==='exam');
  if(id==='home'){
    $('ticketsView').classList.toggle('hidden',homeView!=='tickets');
    $('topicsView').classList.toggle('hidden',homeView!=='topics');
  } else {
    $('ticketsView').classList.add('hidden');
    $('topicsView').classList.add('hidden');
  }
  window.scrollTo({top:0,behavior:'smooth'});
}
function tests(){
  let n=Math.ceil(Q.length/20),html='';
  for(let i=0;i<n;i++){
    let count=Math.min(20,Q.length-i*20);
    html+=`<div class="test-card" data-test="${i+1}"><b>Тест №${i+1}</b><span>${count} питань · питання ${i*20+1}–${i*20+count}</span></div>`;
  }
  $('tests').innerHTML=html;
  document.querySelectorAll('.test-card').forEach(c=>c.onclick=()=>start(+c.dataset.test));
  $('qCount').textContent=Q.length;$('testCount').textContent=n;
}
function topics(){
  $('topics').innerHTML=TOPICS.map(t=>{
    const qs=Q.filter(q=>q.section===t.section);
    if(!qs.length)return '';
    let ranges='';
    for(let start=0;start<qs.length;start+=20){
      const end=Math.min(start+20,qs.length);
      ranges+=`<button class="topic-range" data-section="${t.section}" data-start="${start}">${start+1}–${end}</button>`;
    }
    return `<article class="topic-card"><div class="topic-heading"><div class="topic-number">Тема №${t.section}</div><h3>${t.title}</h3><span>${qs.length} ${qs.length===1?'питання':'питань'}</span></div><div class="topic-ranges">${ranges}</div></article>`;
  }).join('');
  document.querySelectorAll('.topic-range').forEach(b=>b.onclick=()=>startTopic(b.dataset.section,+b.dataset.start));
}
function start(n){
  homeView='tickets';mode='practice';testNo=n;testQuestions=Q.slice((n-1)*20,n*20);beginQuiz();
}
function startTopic(section,start){
  homeView='topics';mode='topic';topicSection=section;topicStart=start;
  const qs=Q.filter(q=>q.section===section);
  testQuestions=qs.slice(start,start+20);
  beginQuiz();
}
function startExam(){
  closeExamModal();
  homeView='exam';mode='exam';testNo=0;examWrong=0;
  testQuestions=[...Q].sort(()=>Math.random()-0.5).slice(0,20);
  beginQuiz();
}
function beginQuiz(){
  pos=0;answers={};finished=false;secondsLeft=1200;clearInterval(timer);
  timer=setInterval(()=>{secondsLeft--;drawTimer();if(secondsLeft<=0){clearInterval(timer);finish()}},1000);
  show('quiz');draw();
}
function drawTimer(){
  let m=Math.floor(secondsLeft/60),s=secondsLeft%60;
  if($('timer')){$('timer').textContent=`${m}:${String(s).padStart(2,'0')}`;$('timer').classList.toggle('warn',secondsLeft<=120)}
  if($('timer2'))$('timer2').textContent=`${m}:${String(s).padStart(2,'0')}`;
}
function draw(){
  let q=testQuestions[pos],selected=answers[pos];if(!q)return;
  let topic=TOPICS.find(t=>t.section===q.section);
  if(mode==='exam')$('quizTitle').textContent='Іспит';
  else if(mode==='topic')$('quizTitle').textContent=`Тема №${topic?.section||q.section} — ${topic?.title||''}`;
  else $('quizTitle').textContent=`Тест №${testNo}`;
  $('counter').textContent=`Питання ${pos+1} з ${testQuestions.length}`;
  $('num').textContent=`Питання №${q.id}`;
  $('qtext').textContent=q.question;
  $('bar').style.width=((pos+1)/testQuestions.length*100)+'%';
  drawTimer();
  let im='';if(q.image&&q.image.length)im=q.image.map(src=>`<img class="question-image" src="${src}" alt="Ілюстрація до питання">`).join('');
  $('questionImages').innerHTML=im;
  let letters='ABCDE';
  $('answers').innerHTML=q.options.map((o,i)=>{
    let cls='answer';
    if(selected!==undefined){
      cls+=' locked';
      if(i===q.correct) cls+=' correct';
      if(i===selected && selected!==q.correct) cls+=' wrong';
    }
    return `<button class="${cls}" data-i="${i}"><span class="letter">${letters[i]}</span><span>${o}</span></button>`;
  }).join('');
  document.querySelectorAll('.answer').forEach(b=>b.onclick=()=>choose(+b.dataset.i));
  let status='';
  if((mode==='practice'||mode==='topic') && selected!==undefined){
    status=selected===q.correct?`<div class="status ok">✓ Правильно! Відповідь зарахована.</div>`:`<div class="status bad">✕ Неправильно. Правильний варіант виділено зеленим.</div>`;
  }
  if(mode==='exam' && selected!==undefined){
    status=selected===q.correct
      ? `<div class="status ok">✓ Правильно! Переходимо до наступного питання…</div>`
      : `<div class="status bad">✕ Неправильно. Правильний варіант виділено зеленим. Перейдіть далі вручну.</div>`;
  }
  $('feedback').innerHTML=status;$('feedback').classList.toggle('hidden',!status);
  $('prev').classList.toggle('hidden',mode==='exam');
  $('next').classList.toggle('hidden',mode==='exam' && selected===undefined);
  $('next').textContent=pos===testQuestions.length-1?'Завершити':'Наступне питання →';
}
function choose(i){
  if(answers[pos]!==undefined)return;
  const q=testQuestions[pos];answers[pos]=i;
  if(mode==='exam'){
    const isCorrect=i===q.correct;
    if(!isCorrect)examWrong++;
    draw();
    if(examWrong>=3){setTimeout(()=>finish(true),900);return;}
    if(isCorrect){
      setTimeout(()=>{if(finished)return;if(pos<testQuestions.length-1){pos++;transitionToNext()}else finish()},700);
    }
  } else draw();
}
function transitionToNext(){
  const card=document.querySelector('.quizcard');
  if(card){card.classList.add('question-exit');setTimeout(()=>{card.classList.remove('question-exit');card.classList.add('question-enter');draw();requestAnimationFrame(()=>card.classList.remove('question-enter'));},180)}else draw();
}
function next(){if(pos<testQuestions.length-1){pos++;transitionToNext()}else finish()}
function prev(){if(pos>0){pos--;draw()}}
function finish(examFailed=false){
  if(finished)return;finished=true;clearInterval(timer);
  let correct=0;testQuestions.forEach((q,i)=>{if(answers[i]===q.correct)correct++});
  let wrong=testQuestions.length-correct;
  const special=$('resultSpecial'), specialImage=$('resultSpecialImage'), specialMessage=$('resultSpecialMessage');
  special.classList.add('hidden');special.classList.remove('fail','perfect');specialImage.src='';specialMessage.textContent='';
  const isPerfect=(correct===20 && testQuestions.length===20 && wrong===0);
  const isFailed=(wrong>2);
  if(mode==='exam'){
    let passed=!examFailed && wrong<=2 && testQuestions.every((q,i)=>answers[i]!==undefined);
    $('resultTitle').textContent=passed?'Іспит складено':'Іспит не складено';
    $('resultScore').textContent=`${correct} / ${testQuestions.length}`;
    $('resultText').textContent=examFailed?`Допущено 3 неправильні відповіді. Іспит автоматично завершено.`:(passed?`Неправильних відповідей: ${wrong}. Ви допустили не більше 2 помилок.`:`Неправильних відповідей: ${wrong}. Для складання іспиту потрібно не більше 2 помилок.`);
  }else if(mode==='topic'){
    const topic=TOPICS.find(t=>t.section===topicSection);
    const from=topicStart+1,to=topicStart+testQuestions.length;
    $('resultTitle').textContent=`Тема №${topicSection} · ${from}–${to}`;
    $('resultScore').textContent=`${correct} / ${testQuestions.length}`;
    $('resultText').textContent=wrong===0?'Усі відповіді правильні!':`Помилок: ${wrong}. Правильні відповіді позначено після кожного питання.`;
  }else{
    $('resultTitle').textContent=`Тест №${testNo}`;
    $('resultScore').textContent=`${correct} / ${testQuestions.length}`;
    $('resultText').textContent=wrong===0?'Усі відповіді правильні!':`Помилок: ${wrong}. Для реального іспиту важливо мати не більше 2 помилок.`;
  }
  if(isFailed){
    special.classList.remove('hidden');special.classList.add('fail');
    specialImage.src='images/mascot-fail.webp';specialImage.alt='Маскот DuckPDR — тест не складено';
    specialMessage.textContent='Спробуй ще раз! Наступного разу точно вийде!';
  }else if(isPerfect){
    special.classList.remove('hidden');special.classList.add('perfect');
    specialImage.src='images/mascot-perfect.webp';specialImage.alt='Маскот DuckPDR — ідеальний результат';
    specialMessage.textContent='Ти пройшов тест ідеально! Посвідчення водія вже не за горами!';
  }
  let html='';testQuestions.forEach((q,i)=>{if(answers[i]!==q.correct)html+=`<div class="mistake"><b>Питання ${i+1}:</b> ${q.question}<br><span>Правильна відповідь: ${q.options[q.correct]}</span></div>`});
  $('mistakes').innerHTML=html||'<p>Помилок немає.</p>';
  $('again').textContent=mode==='exam'?'Пройти іспит ще раз':mode==='topic'?'Пройти ще раз':'Пройти ще раз';
  show('result');
}
function openExamModal(){homeView='exam';$('examModal').classList.remove('hidden');$('examModal').setAttribute('aria-hidden','false');show('home')}
function closeExamModal(){$('examModal').classList.add('hidden');$('examModal').setAttribute('aria-hidden','true')}
function openTickets(){homeView='tickets';mode='practice';show('home')}
function openTopics(){homeView='topics';mode='topic';show('home')}
$('next').onclick=next;$('prev').onclick=prev;
$('homeBtn').onclick=()=>{clearInterval(timer);show('home')};
$('again').onclick=()=>mode==='exam'?openExamModal():mode==='topic'?startTopic(topicSection,topicStart):start(testNo);
$('back').onclick=()=>show('home');
$('allBtn').onclick=()=>{$('search').value='';filterTests('')};
$('search').oninput=e=>filterTests(e.target.value);
$('testsTab').onclick=openTickets;
$('topicsTab').onclick=openTopics;
$('examTab').onclick=openExamModal;
$('examCancel').onclick=()=>{closeExamModal();openTickets()};$('examStart').onclick=startExam;
$('examModal').addEventListener('click',e=>{if(e.target.classList.contains('modal-backdrop'))closeExamModal()});
function filterTests(s){s=s.trim().toLowerCase();document.querySelectorAll('.test-card').forEach(c=>c.classList.toggle('hidden',s&&!c.textContent.toLowerCase().includes(s)))}
tests();topics();show('home');

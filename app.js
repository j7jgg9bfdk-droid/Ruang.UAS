(() => {
const { courses, sourcesIndex } = window.UASData;

const STORAGE_KEY = "ut-sistem-informasi-progress-v1";
const app = document.querySelector("#app");
const state = {
  semester: 1,
  selectedCourseId: "",
  query: "",
  view: "catalog",
  questionIndex: 0,
  answers: [],
  quizSize: 25,
  quizQuestions: []
};

const semesterCredits = [17, 18, 21, 19, 20, 20, 17, 13];
const progress = readProgress();
const readyCourses = courses.filter((course) => course.status === "ready").length;

function readProgress() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return value;
  } catch {
    return {};
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    showToast("Progres tidak dapat disimpan di browser ini.");
  }
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function icon(name, size = 16) {
  const paths = {
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z"/><path d="M4 5.5v15.2M8 7h8M8 11h8"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
    external: '<path d="M14 3h7v7M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    trophy: '<path d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0zM7 7H4v1a4 4 0 0 0 4 4m9-5h3v1a4 4 0 0 1-4 4"/>',
    sparkle: '<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6zM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z"/>',
    close: '<path d="m18 6-12 12M6 6l12 12"/>'
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.book}</svg>`;
}

function getCourse(id = state.selectedCourseId) {
  return courses.find((course) => course.id === id);
}

function getSemesterCourses(semester = state.semester) {
  return courses.filter((course) => course.semester === semester);
}

function shuffle(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [items[index], items[other]] = [items[other], items[index]];
  }
  return items;
}

function matchingCourses() {
  const query = state.query.trim().toLocaleLowerCase("id-ID");
  return getSemesterCourses().filter((course) => {
    if (!query) return true;
    return [course.title, course.bmpTitle, course.curriculumCode, course.bmpCode]
      .some((value) => String(value || "").toLocaleLowerCase("id-ID").includes(query));
  });
}

function displayStatus(course) {
  if (course.status === "ready") return { label: "Latihan tersedia", className: "ready" };
  if (course.status === "no-uas") return { label: "Tanpa UAS", className: "no-uas" };
  return { label: "Materi menyusul", className: "" };
}

function courseCard(course) {
  const status = displayStatus(course);
  const record = progress[course.id];
  const active = course.id === state.selectedCourseId;
  const alias = course.bmpCode && course.bmpCode !== course.curriculumCode
    ? `<span>BMP ${escapeHtml(course.bmpCode)}</span>` : "";
  const choice = course.choiceLabel
    ? `<span class="status-tag choice-tag">${escapeHtml(course.choiceLabel)}</span>` : "";
  const courseStat = record && Number.isFinite(record.bestScore)
    ? `<span class="course-card-stat"><strong>${course.credits} SKS</strong> · terbaik ${record.bestScore}%</span>`
    : `<span class="course-card-stat"><strong>${course.credits} SKS</strong></span>`;
  return `<button class="course-card${active ? " active" : ""}" type="button" data-action="select-course" data-id="${escapeHtml(course.id)}" aria-pressed="${active}">
    <span class="course-card-top"><span class="code-pill">${escapeHtml(course.curriculumCode)}</span>${course.status === "ready" ? '<span class="ready-dot" title="Latihan tersedia"></span>' : ""}</span>
    <span class="course-title">${escapeHtml(course.title)}</span>
    <span class="course-card-bottom"><span class="course-card-alias">${alias || `BMP ${escapeHtml(course.bmpCode)}`}</span>${courseStat}<span class="status-tag ${status.className}">${status.label}</span></span>
    ${choice ? `<span style="margin-top:8px">${choice}</span>` : ""}
  </button>`;
}

function semesterNav() {
  return Array.from({ length: 8 }, (_, index) => {
    const semester = index + 1;
    const count = getSemesterCourses(semester).length;
    const active = semester === state.semester;
    return `<button type="button" class="semester-btn${active ? " active" : ""}" data-action="select-semester" data-semester="${semester}" aria-pressed="${active}">
      <span>Semester ${semester}</span><span class="semester-count">${count} MK</span>
    </button>`;
  }).join("");
}

function detailPanel() {
  const course = getCourse();
  if (!course) {
    return `<section class="detail-panel" aria-label="Detail mata kuliah"><div class="detail-empty">
      <span class="empty-icon">${icon("book", 19)}</span><h3>Pilih mata kuliah untuk mulai</h3>
      <p>Ringkasan, rujukan BMP, dan latihan akan tampil di sini. Pilih salah satu kartu di atas.</p>
    </div></section>`;
  }
  const record = progress[course.id] || {};
  const sourceUrl = course.status === "ready" ? course.sourceUrl : sourcesIndex.catalogueUrl;
  const bmpInfo = course.bmpCode ? `BMP ${escapeHtml(course.bmpCode)}${course.bmpTitle ? ` · ${escapeHtml(course.bmpTitle)}` : ""}` : "Kode BMP belum dicantumkan";
  const choiceInfo = course.choiceLabel ? `<div class="notice"><strong>Kelompok pilihan.</strong> ${escapeHtml(course.choiceLabel)}. Pastikan pilihan ini sesuai paket registrasi Anda.</div>` : "";
  const stats = record.attempts ? `<div class="detail-stats"><span>Percobaan <strong>${record.attempts}</strong></span><span>Nilai terbaik <strong>${record.bestScore}%</strong></span></div>` : "";
  const content = course.status === "ready"
    ? `<h4 class="detail-section-title">Ringkasan cakupan BMP</h4><p class="summary-copy">${escapeHtml(course.summary)}</p>
       <fieldset class="quiz-size-picker"><legend>Jumlah soal latihan</legend><div class="quiz-size-options">${[25, 50, 100].map((count) => `<label class="quiz-size-option"><input type="radio" name="quiz-size" value="${count}" ${state.quizSize === count ? "checked" : ""}><span><strong>${count}</strong><small>soal</small></span></label>`).join("")}</div></fieldset>
       <p class="practice-disclaimer">Soal latihan orisinal berdasarkan cakupan BMP, bukan soal resmi UAS.</p>
       ${stats}<div class="detail-actions"><button class="button primary" type="button" data-action="start-quiz">Mulai ${state.quizSize} soal ${icon("arrow", 15)}</button><a class="button secondary" href="${escapeHtml(course.sourceUrl)}" target="_blank" rel="noreferrer">Lihat BMP UT ${icon("external", 14)}</a></div>`
    : course.status === "no-uas"
      ? `<div class="notice"><strong>Mata kuliah ini tidak menggunakan UAS</strong> pada katalog kurikulum UT 2026/2027. Halaman ini menampilkan info rujukan, bukan kuis UAS.</div>
         <div class="detail-actions"><a class="button secondary" href="${escapeHtml(sourcesIndex.libraryUrl)}" target="_blank" rel="noreferrer">Cari bahan di Perpustakaan UT ${icon("external", 14)}</a></div>`
      : `<div class="notice"><strong>Bank latihan belum tersedia.</strong> Saya menampilkan mata kuliah ini sesuai katalog terbaru, tetapi belum menyusun soal sebelum cakupan BMP-nya dapat dirujuk dengan jelas.</div>
         <div class="detail-actions"><a class="button secondary" href="${escapeHtml(sourcesIndex.libraryUrl)}" target="_blank" rel="noreferrer">Cari BMP di Perpustakaan UT ${icon("external", 14)}</a><a class="button ghost" href="${escapeHtml(sourcesIndex.catalogueUrl)}" target="_blank" rel="noreferrer">Buka katalog kurikulum ${icon("external", 14)}</a></div>`;
  return `<section class="detail-panel" aria-label="Detail ${escapeHtml(course.title)}">
    <div class="detail-header"><div class="detail-title-wrap"><span class="section-kicker">Semester ${course.semester} · ${displayStatus(course).label}</span><h3>${escapeHtml(course.title)}</h3>
      <div class="detail-codes"><strong>${escapeHtml(course.curriculumCode)}</strong> · kode kurikulum<br>${bmpInfo}</div>
    </div><span class="credits-tag">${course.credits} SKS</span></div>
    ${choiceInfo}<p class="source-line">${icon("file", 15)}<span><a href="${escapeHtml(sourceUrl)}" target="_blank" rel="noreferrer">${escapeHtml(course.sourceLabel)}</a><br>${escapeHtml(course.edition)} · data semester diperiksa ${escapeHtml(sourcesIndex.lastChecked)}</span></p>
    ${content}
  </section>`;
}

function catalogView() {
  const semesterCourses = getSemesterCourses();
  const filtered = matchingCourses();
  const selected = getCourse();
  const detail = selected && selected.semester === state.semester ? detailPanel() : "";
  return `<main class="workspace">
    <aside class="semester-panel" aria-label="Pilih semester"><p class="panel-title">Pilih semester</p><nav class="semester-list">${semesterNav()}</nav></aside>
    <div class="workspace-main">
      <section class="course-panel" aria-label="Daftar mata kuliah semester ${state.semester}">
        <div class="course-panel-head"><h3>Mata kuliah · Semester ${state.semester}</h3><span class="count-label">${filtered.length} dari ${semesterCourses.length} mata kuliah</span></div>
        <div class="search-wrap">${icon("search", 17)}<input class="search-input" id="course-search" type="search" placeholder="Cari nama atau kode mata kuliah" value="${escapeHtml(state.query)}" autocomplete="off" aria-label="Cari mata kuliah"></div>
        <div class="course-grid" id="course-grid" style="margin-top:13px">${filtered.length ? filtered.map(courseCard).join("") : '<div class="empty-state" style="grid-column:1/-1">Tidak ada mata kuliah yang cocok. Coba kata pencarian lain.</div>'}</div>
      </section>
      ${detail}
    </div>
  </main>`;
}

function quizView() {
  const course = getCourse();
  if (!course || course.status !== "ready" || !state.quizQuestions.length) return catalogView();
  const total = state.quizQuestions.length;
  const index = Math.min(Math.max(state.questionIndex, 0), total - 1);
  const question = state.quizQuestions[index];
  const selectedAnswer = state.answers[index];
  const answered = Number.isInteger(selectedAnswer);
  const progressPercent = Math.round(((index + 1) / total) * 100);
  const options = question.choices.map((choice, choiceIndex) => {
    let resultClass = "";
    if (answered && choiceIndex === question.answerIndex) resultClass = " correct";
    else if (answered && choiceIndex === selectedAnswer) resultClass = " incorrect";
    return `<button class="answer-option${resultClass}" type="button" data-action="answer" data-answer="${choiceIndex}" ${answered ? "disabled" : ""}>
      <span class="answer-letter">${String.fromCharCode(65 + choiceIndex)}</span><span>${escapeHtml(choice)}</span>
    </button>`;
  }).join("");
  const feedback = answered
    ? `<div class="feedback ${selectedAnswer === question.answerIndex ? "good" : "try"}" role="status"><strong>${selectedAnswer === question.answerIndex ? "Tepat!" : "Belum tepat."}</strong> ${escapeHtml(question.explanation)}</div>`
    : "";
  return `<section class="detail-panel quiz-shell" aria-label="Kuis ${escapeHtml(course.title)}">
    <div class="quiz-top"><button class="button ghost" type="button" data-action="back-course">← Detail mata kuliah</button><span class="quiz-progress-label">${index + 1} / ${total} soal</span></div>
    <p class="section-kicker">Latihan BMP ${escapeHtml(course.bmpCode)}</p>
    <div class="progress-track" aria-label="Progres soal"><div class="progress-fill" style="width:${progressPercent}%"></div></div>
    <h2 class="quiz-question" tabindex="-1">${escapeHtml(question.prompt)}</h2>
    <div class="answer-list">${options}</div>${feedback}
    <div class="quiz-actions"><button class="button ghost" type="button" data-action="previous" ${index === 0 ? "disabled" : ""}>← Sebelumnya</button>
      <button class="button primary" type="button" data-action="next" ${answered ? "" : "disabled"}>${index === total - 1 ? "Lihat hasil" : "Soal berikutnya"} ${icon("arrow", 14)}</button>
    </div>
  </section>`;
}

function resultView() {
  const course = getCourse();
  if (!course || course.status !== "ready") return catalogView();
  const total = state.quizQuestions.length;
  const correct = state.quizQuestions.reduce((count, question, index) => count + (state.answers[index] === question.answerIndex ? 1 : 0), 0);
  const score = Math.round((correct / total) * 100);
  const previous = progress[course.id] || { attempts: 0, bestScore: 0 };
  progress[course.id] = {
    attempts: Number(previous.attempts || 0) + 1,
    bestScore: Math.max(Number(previous.bestScore || 0), score),
    completedAt: new Date().toISOString()
  };
  saveProgress();
  return `<section class="detail-panel result-card" aria-label="Hasil latihan">
    <span class="section-kicker">Latihan selesai</span><div class="result-score">${score}%</div>
    <h3>${correct === total ? "Bagus sekali!" : "Satu langkah lebih siap."}</h3>
    <p>Jawaban benar ${correct} dari ${total} soal untuk <strong>${escapeHtml(course.title)}</strong>.<br>Nilai terbaik Anda: <strong>${progress[course.id].bestScore}%</strong>.</p>
    <div class="detail-actions"><button class="button primary" type="button" data-action="retry">Ulangi latihan</button><button class="button secondary" type="button" data-action="back-course">Lihat ringkasan</button></div>
  </section>`;
}

function render() {
  const courseCount = new Set(courses.map((course) => course.id)).size;
  const attempts = Object.values(progress).reduce((total, item) => total + (Number(item?.attempts) || 0), 0);
  const completedCourses = Object.keys(progress).length;
  const body = state.view === "quiz" ? quizView() : state.view === "result" ? resultView() : catalogView();
  app.innerHTML = `<div class="shell">
    <header class="topbar"><a class="brand" href="#top" data-action="home"><span class="brand-mark">${icon("book", 20)}</span><span>ruang<span style="color:#dd765c">.</span>UAS</span></a>
      <a class="top-link" href="${escapeHtml(sourcesIndex.catalogueUrl)}" target="_blank" rel="noreferrer">Katalog UT 2026/2027 ${icon("external", 13)}</a></header>
    <section class="hero" id="top"><div class="hero-copy"><span class="eyebrow"><i class="eyebrow-dot"></i>Belajar mandiri · S1 Sistem Informasi</span>
      <h1>Belajar terarah.<br>Hadapi UAS lebih siap.</h1><p>Pilih semester dan mata kuliah. Pelajari ringkasan BMP, lalu coba latihan konsep dengan pembahasan langsung.</p>
    </div><div class="hero-art" aria-hidden="true"><div class="book-stack"><span class="book b1"></span><span class="book b2"></span><span class="book b3"></span><span class="plant"></span></div></div></section>
    <div class="summary-strip" aria-label="Ringkasan progres">
      <span class="summary-pill"><span class="summary-icon">${icon("book", 15)}</span><strong>${courseCount}</strong> mata kuliah di katalog</span>
      <span class="summary-pill"><span class="summary-icon">${icon("sparkle", 15)}</span><strong>${readyCourses}</strong> latihan tersedia</span>
      <span class="summary-pill"><span class="summary-icon">${icon("trophy", 15)}</span><strong>${attempts}</strong> percobaan tersimpan</span>
      ${completedCourses ? `<span class="summary-pill"><span class="summary-icon">${icon("check", 15)}</span><strong>${completedCourses}</strong> mata kuliah pernah dilatih</span>` : ""}
    </div>
    <div class="section-heading"><div><p class="section-kicker">Rencana belajar Anda</p><h2>Mulai dari semester pilihan</h2></div></div>
    ${body}
    <footer class="footer"><span class="footer-note">Ruang UAS adalah media latihan mandiri, bukan situs resmi Universitas Terbuka. Struktur mata kuliah mengacu pada Katalog Kurikulum UT 2026/2027. Soal yang tersedia ditulis sebagai latihan orisinal dan bukan soal UAS resmi.</span><span class="footer-meta"><span>Dikembangkan oleh <a href="https://gustisuardana.my.id" target="_blank" rel="noreferrer">Gusti Suardana</a></span><a href="${escapeHtml(sourcesIndex.libraryUrl)}" target="_blank" rel="noreferrer">Perpustakaan Digital UT ${icon("external", 11)}</a></span></footer>
  </div><div class="toast" role="status" aria-live="polite"></div>`;
}

function showToast(message) {
  const element = document.querySelector(".toast");
  if (!element) return;
  element.textContent = message;
  element.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => element.classList.remove("show"), 2200);
}

function finishQuiz() {
  state.view = "result";
  render();
}

function focusQuizQuestion() {
  document.querySelector(".quiz-question")?.focus();
}

app.addEventListener("input", (event) => {
  if (event.target.id !== "course-search") return;
  state.query = event.target.value;
  const filtered = matchingCourses();
  const grid = document.querySelector("#course-grid");
  if (grid) grid.innerHTML = filtered.length ? filtered.map(courseCard).join("") : '<div class="empty-state" style="grid-column:1/-1">Tidak ada mata kuliah yang cocok. Coba kata pencarian lain.</div>';
  const count = document.querySelector(".count-label");
  if (count) count.textContent = `${filtered.length} dari ${getSemesterCourses().length} mata kuliah`;
});

app.addEventListener("change", (event) => {
  if (event.target.name !== "quiz-size") return;
  state.quizSize = [25, 50, 100].includes(Number(event.target.value)) ? Number(event.target.value) : 25;
  render();
});

app.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button || button.disabled) return;
  const action = button.dataset.action;
  if (action === "select-semester") {
    state.semester = Math.min(8, Math.max(1, Number(button.dataset.semester) || 1));
    state.selectedCourseId = "";
    state.query = "";
    state.view = "catalog";
    render();
  } else if (action === "select-course") {
    state.selectedCourseId = button.dataset.id;
    state.view = "catalog";
    render();
    document.querySelector(".detail-panel")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } else if (action === "start-quiz") {
    const course = getCourse();
    if (!course || course.status !== "ready" || !course.questions.length) return;
    state.quizQuestions = shuffle([...course.questions]).slice(0, Math.min(state.quizSize, course.questions.length));
    state.questionIndex = 0;
    state.answers = Array(state.quizQuestions.length).fill(null);
    state.view = "quiz";
    render();
    focusQuizQuestion();
  } else if (action === "choose-quiz-size") {
    state.quizSize = [25, 50, 100].includes(Number(button.dataset.count)) ? Number(button.dataset.count) : 25;
    render();
  } else if (action === "answer") {
    const course = getCourse();
    if (!course || Number.isInteger(state.answers[state.questionIndex])) return;
    state.answers[state.questionIndex] = Number(button.dataset.answer);
    render();
    focusQuizQuestion();
  } else if (action === "next") {
    const course = getCourse();
    if (!course || !Number.isInteger(state.answers[state.questionIndex])) return;
    if (state.questionIndex >= state.quizQuestions.length - 1) finishQuiz();
    else { state.questionIndex += 1; render(); focusQuizQuestion(); }
  } else if (action === "previous") {
    state.questionIndex = Math.max(0, state.questionIndex - 1);
    render();
    focusQuizQuestion();
  } else if (action === "retry") {
    const course = getCourse();
    state.quizQuestions = shuffle([...(course?.questions || [])]).slice(0, Math.min(state.quizSize, course?.questions.length || 0));
    state.questionIndex = 0;
    state.answers = Array(state.quizQuestions.length).fill(null);
    state.view = "quiz";
    render();
  } else if (action === "back-course") {
    state.view = "catalog";
    render();
  } else if (action === "home") {
    event.preventDefault();
    state.view = "catalog";
    state.selectedCourseId = "";
    render();
  }
});

render();
})();

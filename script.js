const chapters = [
  {
    title: "Capítulo 1: la cinta del turno cero",
    status: "VHS RECUPERADO // PLAY",
    stat: "Percepción",
    mod: 2,
    dc: 12,
    intro:
      "La transmisión arranca como una cinta de videoclub mal rebobinada. En pantalla: un pasillo de hospital, luz roja, fecha imposible y tres siluetas retenidas al fondo. Anna golpea una puerta con la calma de quien sabe que esto acabará siendo anécdota. Judit señala una cámara que no debería estar encendida. Isaac aparece medio segundo antes que los demás, mirando directamente al objetivo, como si hubiera llegado allí antes que el guion. El sistema escribe: TURNO CERO. Solo quien distinga cuándo empieza podrá abrir el primer cierre.",
    success:
      "Éxito. Rebobinas mentalmente la escena y lo ves: la cinta no se activa por movimiento, ni por cumpleaños, ni por susto barato de los 90. Se activa cuando el hospital cambia de turno y las visitas dejan de ser humanas. El CRT desbloquea la pregunta.",
    failures: [
      "Fallo. La cinta se arruga, aparece una tarta con demasiadas velas y una voz de Isaac susurra: yo no he sido. El sistema marca esa frase como evidencia, no como coartada. Recoloca el dado y vuelve a mirar.",
      "Fallo. La cámara enfoca demasiado tiempo a una puerta cerrada. Anna pide que nadie toque nada. Judit pregunta quién ha leído una nota en voz alta. El monitor responde con interferencias. Vuelve a tirar.",
    ],
    lock: {
      title: "Bloqueo 1: el turno",
      status: "ESPERANDO IDENTIFICACION",
      copy:
        'La cinta se detiene en una nota pegada al monitor: "Cuando todo se queda en silencio, empiezan las visitas de verdad".',
      label: "Introduce la palabra de acceso",
      answers: ["noche", "la noche"],
      hint: "No busca una hora. Busca el momento del día en el que los pasillos dejan de ser fiables.",
    },
  },
  {
    title: "Capítulo 2: la taquilla de los nombres",
    status: "REGISTRO DE VICTIMAS // ABIERTO",
    stat: "Inteligencia",
    mod: 3,
    dc: 14,
    intro:
      "La primera puerta cede y te escupe a una sala de taquillas con olor a metal viejo y colonia de hospital abandonado. Hay tres pulseras de ingreso colgadas en ganchos oxidados: Anna, Isaac y Judit. La de Anna tiene una nota: mantiene al grupo unido aunque el mapa mienta. La de Judit: encontró una llave, no preguntes dónde. La de Isaac tiene dos etiquetas superpuestas: VICTIMA y SOSPECHOSO HABITUAL. La máquina exige ordenar el registro antes de que las taquillas vuelvan a cerrarse con alguien dentro.",
    success:
      "Éxito. Cruzas nombres, iniciales y coartadas con precisión de jugador que ya ha visto demasiadas losetas malditas. Anna, Isaac y Judit siguen figurando como acompañantes, aunque el sistema insiste en poner a Isaac entre signos de interrogación. El segundo bloqueo queda listo.",
    failures: [
      "Fallo. Abres una taquilla equivocada y cae una montaña de componentes imaginarios sin embolsar. El horror adopta muchas formas, y una de ellas es organizar una campaña a medianoche. Vuelve a tirar.",
      "Fallo. Isaac aparece en el reflejo de una puerta metálica, sonríe raro y dice: abre esa, que seguro que no pasa nada. El sistema aumenta su sospecha en silencio. Repite la tirada.",
    ],
    lock: {
      title: "Bloqueo 2: los acompañantes",
      status: "REGISTRO DE VISITANTES BLOQUEADO",
      copy:
        "Tres firmas sobreviven en el registro de visitas. El sistema no quiere nombres completos: solo iniciales, en el orden en que aparecen en la prueba 02.",
      label: "Introduce las iniciales",
      answers: ["aij"],
      hint: "Son las iniciales de quienes te han metido en esto con cariño y dudosa prudencia.",
    },
  },
  {
    title: "Capítulo 3: la regla que salva partidas",
    status: "MAPA TACTICO // CORRUPTO",
    stat: "Cordura",
    mod: -1,
    dc: 10,
    intro:
      "El plano del hospital se despliega como un tablero que alguien ha diseñado con odio y mucho tiempo libre. Pasillos como losetas, habitaciones como encuentros, puertas que prometen atajos y huelen a mala decisión. Anna aparece marcada como VICTIMA EN PELIGRO. Judit aparece junto a una llave que nadie recuerda haber conseguido. Isaac parpadea entre ALIADO PROBABLE, SOSPECHOSO POSIBLE y NO DEJAR SOLO CON OBJETOS BRILLANTES. El mapa ofrece una salida rápida si el grupo se separa. Eso, naturalmente, es una trampa.",
    success:
      "Éxito. Aguantas la presión del mapa y no compras el atajo. Has sobrevivido a campañas eternas, mazmorras imposibles y discusiones tácticas donde alguien siempre quiere abrir otra puerta. Recuerdas la regla antigua, la que no sale en las cartas pero salva noches enteras.",
    failures: [
      "Fallo. El mapa susurra: dividiros, cubrís más terreno. Esa frase ha eliminado más grupos que cualquier monstruo con miniatura grande. Respira, mira mal a la pantalla y vuelve a tirar.",
      "Fallo. Una puerta nueva aparece donde antes había pared. Isaac dice que igual es contenido opcional. Anna y Judit, desde algún lugar del hospital, votan claramente que no. Tira otra vez.",
    ],
    lock: {
      title: "Bloqueo 3: protocolo de supervivencia",
      status: "ULTIMO CIERRE ACTIVO",
      copy:
        "Un post-it pegado al mapa dice: Descent, Gloomhaven, pasillos estrechos, sustos y una norma de oro: nadie se queda solo.",
      label: "Introduce la clave de equipo",
      answers: ["grupo", "en grupo", "juntos"],
      hint: "No es una estadística. Es la forma correcta de entrar cuando quieres salir con todos.",
    },
  },
];

const state = {
  step: 0,
  phase: "trial",
  failures: 0,
  sanity: 0,
};

let typeTimer = 0;

const transmission = document.querySelector("#transmission");
const intro = document.querySelector("#intro");
const casefile = document.querySelector("#casefile");
const finale = document.querySelector("#finale");
const voucher = document.querySelector("#voucher");
const statusEl = document.querySelector("[data-status]");
const titleEl = document.querySelector("[data-title]");
const copyEl = document.querySelector("[data-copy]");
const hintEl = document.querySelector("[data-hint]");
const labelEl = document.querySelector("[data-label]");
const form = document.querySelector("[data-form]");
const input = document.querySelector("[data-answer]");
const rollForm = document.querySelector("[data-roll-form]");
const rollInput = document.querySelector("[data-roll]");
const rollMeta = document.querySelector("[data-roll-meta]");
const rollResult = document.querySelector("[data-roll-result]");
const terminal = document.querySelector(".terminal-screen");
const sanityLabel = document.querySelector("[data-sanity-label]");
const sanityMarks = document.querySelectorAll("[data-sanity-mark]");
const sanityWarning = document.querySelector("[data-sanity-warning]");
const evidenceButtons = document.querySelectorAll("[data-evidence]");

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function signed(value) {
  return value >= 0 ? `+${value}` : `${value}`;
}

function currentChapter() {
  return chapters[state.step];
}

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

function updateProgress() {
  document.querySelectorAll("[data-step-dot]").forEach((dot, index) => {
    dot.classList.toggle("is-complete", index < state.step);
  });
}

function updateSanity() {
  const labels = ["Estable", "Alterada", "Comprometida", "Crítica"];
  const level = Math.min(state.sanity, 3);

  document.body.dataset.sanity = String(level);
  sanityLabel.textContent = labels[level];
  sanityMarks.forEach((mark, index) => {
    mark.classList.toggle("is-marked", index < level);
  });

  if (level === 0) {
    sanityWarning.classList.add("is-hidden");
    sanityWarning.textContent = "";
    return;
  }

  sanityWarning.textContent =
    level === 1
      ? "Marca de cordura I: la pantalla conserva ecos de la tirada fallida."
      : level === 2
        ? "Marca de cordura II: el expediente empieza a escribir entre líneas."
        : "Marca de cordura III: algo al otro lado del monitor ya sabe tu nombre.";
  sanityWarning.classList.remove("is-hidden");
}

function renderTrial() {
  const chapter = currentChapter();
  scrollToTop();
  state.phase = "trial";
  statusEl.textContent = chapter.status;
  titleEl.textContent = chapter.title;
  typeCopy(chapter.intro);
  hintEl.classList.add("is-hidden");
  hintEl.textContent = "";
  form.classList.add("is-hidden");
  rollForm.classList.remove("is-hidden");
  rollMeta.textContent = `Prueba de ${chapter.stat} ${signed(chapter.mod)} // CD ${chapter.dc}`;
  rollResult.classList.add("is-hidden");
  rollResult.textContent = "";
  rollInput.value = "";
  rollInput.focus();
  updateProgress();
  updateSanity();
}

function renderRiddle(message = "") {
  const lock = currentChapter().lock;
  state.phase = "riddle";
  statusEl.textContent = lock.status;
  titleEl.textContent = lock.title;
  typeCopy(message ? `${message}\n\n${lock.copy}` : lock.copy);
  labelEl.textContent = lock.label;
  hintEl.classList.add("is-hidden");
  hintEl.textContent = "";
  rollForm.classList.add("is-hidden");
  form.classList.remove("is-hidden");
  input.value = "";
  input.focus();
  updateProgress();
  updateSanity();
}

function typeCopy(text) {
  window.clearInterval(typeTimer);
  copyEl.textContent = "";
  copyEl.classList.add("is-typing");

  let index = 0;
  typeTimer = window.setInterval(() => {
    copyEl.textContent = text.slice(0, index);
    index += 1;

    if (index > text.length) {
      window.clearInterval(typeTimer);
      copyEl.classList.remove("is-typing");
    }
  }, 18);
}

function stopTyping() {
  window.clearInterval(typeTimer);
  copyEl.classList.remove("is-typing");
}

function revealVoucher() {
  finale.classList.add("is-hidden");
  voucher.classList.remove("is-hidden");
  scrollToTop();
}

function revealFinale() {
  casefile.classList.add("is-hidden");
  finale.classList.remove("is-hidden");
  scrollToTop();
}

function fail() {
  terminal.classList.remove("shake");
  window.requestAnimationFrame(() => {
    terminal.classList.add("shake");
  });
}

document.querySelector("[data-accept-transmission]").addEventListener("click", () => {
  transmission.classList.add("is-hidden");
  intro.classList.remove("is-hidden");
  scrollToTop();
});

document.querySelector("[data-start]").addEventListener("click", () => {
  intro.classList.add("is-hidden");
  casefile.classList.remove("is-hidden");
  scrollToTop();
  renderTrial();
});

document.querySelector("[data-open-voucher]").addEventListener("click", revealVoucher);

rollForm.addEventListener("submit", (event) => {
  event.preventDefault();
  stopTyping();

  const chapter = currentChapter();
  const roll = Number(rollInput.value);

  if (!Number.isInteger(roll) || roll < 1 || roll > 20) {
    fail();
    rollResult.textContent = "El dado tiene que ser un d20 honrado: introduce un número entre 1 y 20.";
    rollResult.classList.remove("is-hidden");
    return;
  }

  const total = roll + chapter.mod;
  if (total >= chapter.dc) {
    rollResult.textContent = `Tirada: ${roll} ${signed(chapter.mod)} = ${total}. Éxito.`;
    rollResult.classList.remove("is-hidden");
    setTimeout(() => renderRiddle(chapter.success), 700);
    return;
  }

  const failure = chapter.failures[state.failures % chapter.failures.length];
  state.failures += 1;
  state.sanity += 1;
  fail();
  updateSanity();
  statusEl.textContent = "TIRADA FALLIDA // REPETIR PRUEBA";
  rollResult.textContent = `Tirada: ${roll} ${signed(chapter.mod)} = ${total}. Necesitas ${chapter.dc}.`;
  rollResult.classList.remove("is-hidden");
  typeCopy(failure);
  rollInput.value = "";
  rollInput.focus();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const lock = currentChapter().lock;
  const answer = normalize(input.value);

  if (!lock.answers.includes(answer)) {
    stopTyping();
    fail();
    statusEl.textContent = "ACCESO DENEGADO";
    return;
  }

  state.step += 1;
  state.failures = 0;
  if (state.step >= chapters.length) {
    document.querySelectorAll("[data-step-dot]").forEach((dot) => dot.classList.add("is-complete"));
    setTimeout(revealFinale, 450);
    return;
  }

  renderTrial();
});

document.querySelector("[data-show-hint]").addEventListener("click", () => {
  const chapter = currentChapter();
  hintEl.textContent =
    state.phase === "trial"
      ? `Tira 1d20, suma ${chapter.stat} ${signed(chapter.mod)} e intenta llegar a CD ${chapter.dc}. Si fallas, no pasa nada: el horror insiste, tú también.`
      : chapter.lock.hint;
  hintEl.classList.remove("is-hidden");
});

document.querySelector("[data-reset]").addEventListener("click", () => {
  state.step = 0;
  state.phase = "trial";
  state.failures = 0;
  state.sanity = 0;
  renderTrial();
});

evidenceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    stopTyping();
    evidenceButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    const template = document.querySelector(`#evidence-${button.dataset.evidence}`);
    copyEl.innerHTML = "";
    copyEl.append(template.content.cloneNode(true));
  });
});

const chapters = [
  {
    title: "Capítulo 1: el turno que no existe",
    status: "LLAMADA ANONIMA ENTRANTE",
    stat: "Percepción",
    mod: 2,
    dc: 12,
    intro:
      "Rafa recibe un enlace desde un número desconocido. El mensaje dice: no te fíes de nadie. Sabemos que es tu cumpleaños. Anna, Isaac y Judit están dentro del hospital y alguien ha movido sus fichas sin permiso. La pantalla vieja carraspea y muestra una cámara de pasillo: tres sombras esperan al final, pero una cuarta sombra parece ir siempre un paso por delante.",
    success:
      "Éxito. Entre el ruido de la cinta VHS distingues una cosa clara: las cámaras solo graban cuando empieza el turno prohibido. El ordenador abre el primer bloqueo.",
    failures: [
      "Fallo. La imagen se dobla, aparece una tarta de cumpleaños con demasiadas velas y oyes a Isaac decir desde algún sitio: yo no he sido. Nadie le cree. Respira, recoloca el dado y vuelve a intentarlo.",
      "Fallo. Has mirado demasiado tiempo a la pantalla y ahora la pantalla te mira a ti. Anna golpea una puerta al fondo. Judit grita que alguien ha leído una nota en voz alta. Vuelve a tirar.",
    ],
    lock: {
      title: "Bloqueo 1: el turno",
      status: "ESPERANDO IDENTIFICACION",
      copy:
        'En la pantalla parpadea una nota: "Cuando todo se queda en silencio, empiezan las visitas de verdad".',
      label: "Introduce la palabra de acceso",
      answers: ["noche", "la noche"],
      hint: "No es una hora exacta. Es el momento del día en el que dan comienzo las mejores historias de miedo.",
    },
  },
  {
    title: "Capítulo 2: la taquilla de visitantes",
    status: "REGISTRO DE VICTIMAS LOCALIZADO",
    stat: "Inteligencia",
    mod: 3,
    dc: 14,
    intro:
      "La taquilla se abre con un golpe seco. Dentro hay tres pulseras de ingreso: Anna, Isaac y Judit. También hay una cuarta etiqueta, escrita con rotulador rojo: sospechoso habitual. La letra se parece demasiado a la de Isaac, que curiosamente siempre sabe dónde está la llave después de decir que no ha tocado nada.",
    success:
      "Éxito. Ordenas las pistas como si fueran cartas de evento: nombres, iniciales, puerta correcta. La taquilla deja de temblar y el registro de acompañantes se desbloquea.",
    failures: [
      "Fallo. Has intentado aplicar lógica de campaña larga a una taquilla maldita. La taquilla responde con un chirrido que suena exactamente como un máster preparando una traición. Vuelve a tirar.",
      "Fallo. Isaac aparece en un monitor, sonríe raro y dice: abre esa, que seguro que no pasa nada. Eso cuenta como mala señal oficial. Repite la tirada.",
    ],
    lock: {
      title: "Bloqueo 2: los acompañantes",
      status: "REGISTRO DE VISITANTES BLOQUEADO",
      copy:
        "La taquilla conserva tres firmas. El sistema solo acepta las iniciales, en el mismo orden en que aparecen en la prueba 02.",
      label: "Introduce las iniciales",
      answers: ["aij"],
      hint: "Anna, Isaac y Judit. Sin espacios, todo junto.",
    },
  },
  {
    title: "Capítulo 3: protocolo de supervivencia",
    status: "MAPA TACTICO INESTABLE",
    stat: "Cordura",
    mod: -1,
    dc: 10,
    intro:
      "El plano del hospital se convierte en un tablero imposible: pasillos como losetas, puertas como encuentros, habitaciones que parecen diseñadas por alguien que odia a los grupos que se separan. Anna y Judit aparecen marcadas como víctimas en peligro. Isaac aparece marcado como aliado probable, sospechoso posible y problema recurrente.",
    success:
      "Éxito. Contra todo pronóstico, mantienes la calma. Recuerdas la norma que salva campañas, partidas y noches de escape room: si el grupo se rompe, la historia se cobra intereses.",
    failures: [
      "Fallo. Pierdes 1 punto imaginario de cordura al ver una puerta que claramente no estaba ahí hace cinco segundos. Por suerte esto es una web de cumpleaños y no una campaña letal. Vuelve a tirar.",
      "Fallo. El mapa susurra: dividiros, cubrís más terreno. Tú sabes que esa frase ha matado más grupos que cualquier monstruo de manual. Tira otra vez.",
    ],
    lock: {
      title: "Bloqueo 3: protocolo de supervivencia",
      status: "ULTIMO CIERRE ACTIVO",
      copy:
        "Un post-it pegado al mapa dice: Descent, Gloomhaven, pasillos estrechos, sustos y una norma de oro: nadie se queda solo.",
      label: "Introduce la clave de equipo",
      answers: ["grupo", "en grupo", "juntos"],
      hint: "La palabra que importa no es miedo, ni puerta, ni mapa. Es como entramos siempre.",
    },
  },
];

const state = {
  step: 0,
  phase: "trial",
  failures: 0,
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
  fail();
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

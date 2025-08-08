let englishWord = "";
let title = "";
let rememberSpanish = "";
let rememberEnglish = "";

let tooltip = null;
let buttonRemenber = null;

let numTexto = 1;

const newsWords = document.querySelector(".newsWords");
let archivo = `../Texts/text${numTexto}.json`;
// Cargar y procesar JSON
function chargerText(){


fetch(archivo)
  .then(response => response.json())
  .then(data => {
    insertTextAndTitle(data);
    assignClickEvents();
  })
  .catch(error => console.error('Error al cargar JSON:', error));

function insertTextAndTitle(data) {
  title = data.title
    .map(p => `<span class="palabra" data-es="${p.español}">${p.ingles}</span>`)
    .join(' ');

  englishWord = data.text
    .map(p => `<span class="palabra" data-es="${p.español}">${p.ingles}</span>`)
    .join(' ');

  document.querySelector(".title").innerHTML = title;
  document.querySelector(".text").innerHTML = englishWord;
}
}
chargerText();

function assignClickEvents() {
  document.querySelectorAll(".palabra").forEach(span => {
    span.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevenir que el body elimine el panel al hacer clic en la palabra
      showTranslation(span);
    });
  });
}

function showTranslation(span) {
  removeTooltip(); // Elimina cualquier tooltip anterior

  const positionWord = span.getBoundingClientRect();

  // Crear el div flotante
  tooltip = document.createElement("div");
  tooltip.textContent = span.dataset.es;
  tooltip.style.position = "absolute";

  // Crear el botón de recordar
  buttonRemenber = document.createElement("button");
  buttonRemenber.style.position = "absolute";

  const width = 120;
  const height = 60;

  tooltip.style.top = (window.scrollY + positionWord.top - height - 10) + "px";
  tooltip.style.left = (window.scrollX + positionWord.left + (positionWord.width / 2) - (width / 2)) + "px";

  buttonRemenber.style.top = (window.scrollY + positionWord.top - height - 80) + "px";
  buttonRemenber.style.left = (window.scrollX + positionWord.left + (positionWord.width / 2) - (width / 2)) + "px";

  // Estilos del tooltip
  tooltip.style.width = width + "px";
  tooltip.style.height = height + "px";
  tooltip.style.backgroundColor = "rgba(6, 146, 123, 0.98)";
  tooltip.style.border = "1px solid #000";
  tooltip.style.zIndex = "1000";
  tooltip.style.borderRadius = "10px";
  tooltip.style.fontSize = "1.5em";
  tooltip.style.clipPath = `
    polygon(
      50% 100%,
      55% 90%,
      100% 90%,
      100% 0%,
      0% 0%,
      0% 90%,
      45% 90%
    )
  `;

  // Estilos del botón
  buttonRemenber.style.width = width-20+ "px";
  buttonRemenber.style.height = height-20+ "px";
  buttonRemenber.style.backgroundColor = "rgba(21, 156, 180, 1)";
  buttonRemenber.style.border = "1px solid #000";
  buttonRemenber.style.zIndex = "1000";
  buttonRemenber.style.borderRadius = "10px";
  buttonRemenber.textContent = "SAVE";
  buttonRemenber.style.color = "white";
  buttonRemenber.style.fontWeight = "bold";
  buttonRemenber.style.fontSize = "1em";

  // Guardar al hacer clic en el botón
  buttonRemenber.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevenir que se cierre por el clic del documento
    guardar();
    removeTooltip(); // También eliminar panel tras guardar
  });

  // Agregar al DOM
  document.body.appendChild(tooltip);
  document.body.appendChild(buttonRemenber);

  rememberEnglish = span.textContent;
  rememberSpanish = span.dataset.es;
}

// Eliminar tooltip y botón si existen
function removeTooltip() {
  if (tooltip) {
    tooltip.remove();
    tooltip = null;
  }
  if (buttonRemenber) {
    buttonRemenber.remove();
    buttonRemenber = null;
  }
}

// Al hacer clic fuera del tooltip/botón, eliminar el panel
document.addEventListener("click", () => {
  removeTooltip();
});

function guardar() {
  newsWords.innerHTML += "<br> ° " + rememberEnglish;
  console.log(rememberEnglish);
  console.log(rememberSpanish);
}


// cambio de texto

let nextText = document.getElementById("nextText");
console.log(nextText)
nextText.addEventListener("click", () => {
  numTexto = 2;
  archivo = `../Texts/text${numTexto}.json`;
  chargerText(); // Carga el nuevo texto
});
const materias = [
  // Primer Año
  { nombre: "Filosofía" },
  { nombre: "Historia social general" },
  { nombre: "Introducción a la Sociología" },
  { nombre: "economía general" },
  { nombre: "introducción a la comunicación" },
  { nombre: "taller de lectura y escritura" },
  // Segundo Año
  { nombre: "introducción a la publicidad", requiere: ["Historia social general", "introducción a la comunicación"], tipo: ["aprobada", "aprobada"] },
  { nombre: "psicología social", requiere: ["Introducción a la Sociología", "psicologia general"], tipo: ["aprobada", "aprobada"] },
  { nombre: "lingüística", requiere: ["Introducción a la Sociología", "taller de lectura y escritura"], tipo: ["aprobada", "aprobada"] },
  { nombre: "comunicación visual", requiere: ["introducción a la comunicación", "taller de lectura y escritura"], tipo: ["aprobada", "aprobada"] },
  { nombre: "marketing I", requiere: ["economía general", "introducción a la comunicación"], tipo: ["aprobada", "aprobada"] },
  { nombre: "diseño y producción gráfica", requiere: ["comunicación visual", "introducción a la publicidad"], tipo: ["regularizada", "aprobada"] },
  { nombre: "metodología de la investigación social", requiere: ["Filosofía", "Introducción a la Sociología"], tipo: ["aprobada", "aprobada"] },
  { nombre: "comunicación I", requiere: ["Historia social general", "introducción a la comunicación"], tipo: ["aprobada", "aprobada"] },
  // Tercer Año
  { nombre: "medios de comunicación publicitaria", requiere: ["marketing I", "introducción a la publicidad"], tipo: ["regularizada", "aprobada"] },
  { nombre: "redacción publicitaria", requiere: ["lingüística"], tipo: ["aprobada"] },
  { nombre: "Producción audiovisual", requiere: ["diseño y producción gráfica", "comunicación visual"], tipo: ["regularizada", "aprobada"] },
  { nombre: "comunicación II", requiere: ["comunicación I"], tipo: ["aprobada"] },
  { nombre: "planificación de medios", requiere: ["medios de comunicación publicitaria", "comunicación I"], tipo: ["regularizada", "aprobada"] },
  { nombre: "opinión pública", requiere: ["metodología de la investigación social"], tipo: ["aprobada"] },
  { nombre: "marketing II", requiere: ["marketing I"], tipo: ["aprobada"] },
  { nombre: "comunicación III", requiere: ["comunicación II", "comunicación I"], tipo: ["regularizada", "aprobada"] },
  // Cuarto Año
  { nombre: "Semiología", requiere: ["redacción publicitaria", "lingüística"], tipo: ["regularizada", "aprobada"] },
  { nombre: "organización y administración de la empresa publicitaria", requiere: ["planificación de medios", "medios de comunicación publicitaria"], tipo: ["regularizada", "aprobada"] },
  { nombre: "diseño multimedial", requiere: ["Producción audiovisual", "diseño y producción gráfica"], tipo: ["regularizada", "aprobada"] },
  { nombre: "investigación en publicidad", requiere: ["opinión pública", "metodología de la investigación social"], tipo: ["regularizada", "aprobada"] },
  { nombre: "prensa y comunicación institucional", requiere: ["comunicación II", "psicología social"], tipo: ["regularizada", "aprobada"] },
  { nombre: "política de los medios de comunicación social", requiere: ["comunicación I", "medios de comunicación publicitaria"], tipo: ["aprobada", "aprobada"] },
  { nombre: "práctica publicitaria", requiere: ["planificación de medios", "organización y administración de la empresa publicitaria", "medios de comunicación publicitaria"], tipo: ["regularizada", "regularizada", "aprobada"] },
  { nombre: "creatividad en publicidad", requiere: ["diseño multimedial", "Producción audiovisual"], tipo: ["regularizada", "aprobada"] },
];

const grid = document.querySelector(".grid");

function crearMateria(materia, index) {
  const div = document.createElement("div");
  div.className = "card locked";
  div.id = `materia-${index}`;
  div.innerHTML = `
    <h2>${materia.nombre}</h2>
    <select>
      <option value="nada">- Estado -</option>
      <option value="regularizada">Regularizada</option>
      <option value="aprobada">Aprobada</option>
    </select>
  `;

  div.querySelector("select").addEventListener("change", () => verificarDesbloqueo());
  grid.appendChild(div);
}

function verificarDesbloqueo() {
  const estados = {};
  document.querySelectorAll(".card").forEach(card => {
    const nombre = card.querySelector("h2").innerText;
    const estado = card.querySelector("select").value;
    estados[nombre] = estado;
  });

  materias.forEach((m, i) => {
    const card = document.getElementById(`materia-${i}`);
    if (!m.requiere) {
      card.classList.remove("locked");
      card.classList.add("unlocked");
      return;
    }

    let habilitada = true;
    m.requiere.forEach((req, idx) => {
      const tipoNecesario = m.tipo[idx];
      const estadoActual = estados[req];
      if (tipoNecesario === "aprobada" && estadoActual !== "aprobada") habilitada = false;
      if (tipoNecesario === "regularizada" && estadoActual !== "regularizada" && estadoActual !== "aprobada") habilitada = false;
    });

    if (habilitada) {
      card.classList.remove("locked");
      card.classList.add("unlocked");
    } else {
      card.classList.remove("unlocked");
      card.classList.add("locked");
    }
  });
}

materias.forEach((m, i) => crearMateria(m, i));
verificarDesbloqueo();

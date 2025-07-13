const materias = [
  // PRIMER AÑO
  { nombre: "Filosofía" },
  { nombre: "Historia social general" },
  { nombre: "Introducción a la Sociología" },
  { nombre: "Economía general" },
  { nombre: "Introducción a la comunicación" },
  { nombre: "Taller de lectura y escritura" },

  // SEGUNDO AÑO
  { nombre: "Introducción a la publicidad", requiere: ["Historia social general", "Introducción a la comunicación"] },
  { nombre: "Psicología social", requiere: ["Introducción a la Sociología", "Psicología general"] },
  { nombre: "Lingüística", requiere: ["Introducción a la Sociología", "Taller de lectura y escritura"] },
  { nombre: "Comunicación visual", requiere: ["Introducción a la comunicación", "Taller de lectura y escritura"] },
  { nombre: "Marketing I", requiere: ["Economía general", "Introducción a la comunicación"] },
  { nombre: "Diseño y producción gráfica", requiere: ["Comunicación visual|regularizada", "Introducción a la publicidad"] },
  { nombre: "Metodología de la investigación social", requiere: ["Filosofía", "Introducción a la Sociología"] },
  { nombre: "Comunicación I", requiere: ["Historia social general", "Introducción a la comunicación"] },

  // TERCER AÑO
  { nombre: "Medios de comunicación publicitaria", requiere: ["Marketing I|regularizada", "Introducción a la publicidad"] },
  { nombre: "Redacción publicitaria", requiere: ["Lingüística"] },
  { nombre: "Producción audiovisual", requiere: ["Diseño y producción gráfica|regularizada", "Comunicación visual"] },
  { nombre: "Comunicación II", requiere: ["Comunicación I"] },
  { nombre: "Planificación de medios", requiere: ["Medios de comunicación publicitaria|regularizada", "Comunicación I"] },
  { nombre: "Opinión pública", requiere: ["Metodología de la investigación social"] },
  { nombre: "Marketing II", requiere: ["Marketing I"] },
  { nombre: "Comunicación III", requiere: ["Comunicación II|regularizada", "Comunicación I"] },

  // CUARTO AÑO
  { nombre: "Semiología", requiere: ["Redacción publicitaria|regularizada", "Lingüística"] },
  { nombre: "Organización y administración de la empresa publicitaria", requiere: ["Planificación de medios|regularizada", "Medios de comunicación publicitaria"] },
  { nombre: "Diseño multimedial", requiere: ["Producción audiovisual|regularizada", "Diseño y producción gráfica"] },
  { nombre: "Investigación en publicidad", requiere: ["Opinión pública|regularizada", "Metodología de la investigación social"] },
  { nombre: "Prensa y comunicación institucional", requiere: ["Comunicación II|regularizada", "Psicología social"] },
  { nombre: "Política de los medios de comunicación social", requiere: ["Comunicación I", "Medios de comunicación publicitaria"] },
  { nombre: "Práctica publicitaria", requiere: ["Planificación de medios|regularizada", "Organización y administración de la empresa publicitaria|regularizada", "Medios de comunicación publicitaria"] },
  { nombre: "Creatividad en publicidad", requiere: ["Diseño multimedial|regularizada", "Producción audiovisual"] }
];

const malla = document.getElementById("malla");
const estados = JSON.parse(localStorage.getItem("materiasEstados") || "{}");

function render() {
  malla.innerHTML = "";
  materias.forEach(({ nombre, requiere = [] }) => {
    const estado = estados[nombre] || "";
    const bloqueada = !requiere.every(req => {
      const [materia, reqEstado = "aprobada"] = req.split("|");
      return estados[materia] === reqEstado;
    });

    const div = document.createElement("div");
    div.className = `materia ${bloqueada ? "bloqueada" : ""}`;
    div.dataset.estado = estado;

    const titulo = document.createElement("h3");
    titulo.textContent = nombre;
    div.appendChild(titulo);

    const opciones = document.createElement("div");
    opciones.className = "estado";

    ["", "regularizada", "aprobada"].forEach(op => {
      const btn = document.createElement("button");
      btn.textContent = op || "✖";
      btn.onclick = () => {
        estados[nombre] = op;
        localStorage.setItem("materiasEstados", JSON.stringify(estados));
        render();
      };
      opciones.appendChild(btn);
    });

    div.appendChild(opciones);
    malla.appendChild(div);
  });
}

render();

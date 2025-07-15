const materias = [
  // --- CBC ---
  { id: "pensamiento", nombre: "Pensamiento Científico", correlativas: [], ciclo: "CBC" },
  { id: "sociedad", nombre: "Sociedad y Estado", correlativas: [], ciclo: "CBC" },
  { id: "biologia", nombre: "Biología", correlativas: [], ciclo: "CBC" },
  { id: "psicologia", nombre: "Psicología (CBC)", correlativas: [], ciclo: "CBC" },
  { id: "semiologia", nombre: "Semiología", correlativas: [], ciclo: "CBC" },
  { id: "matematica", nombre: "Matemática (CBC)", correlativas: [], ciclo: "CBC" },

  // --- Primer año ---
  { id: "psico_general", nombre: "Psicología General", correlativas: ["psicologia"], ciclo: "1° año" },
  { id: "estadistica", nombre: "Estadística", correlativas: ["matematica"], ciclo: "1° año" },
  { id: "psico_social", nombre: "Psicología Social", correlativas: ["psicologia"], ciclo: "1° año" },
  { id: "psico_freud", nombre: "Psicoanálisis: Freud", correlativas: ["psicologia"], ciclo: "1° año" },
  { id: "psico_genetica", nombre: "Psicología y Epistemología Genética", correlativas: ["psicologia"], ciclo: "1° año" },
  { id: "neurofisiologia", nombre: "Neurofisiología", correlativas: ["biologia"], ciclo: "1° año" },

  // --- Segundo año ---
  { id: "historia_psico", nombre: "Historia de la Psicología", correlativas: ["psico_general"], ciclo: "2° año" },
  { id: "metodologia", nombre: "Metodología de la Investigación", correlativas: ["psico_general", "estadistica"], ciclo: "2° año" },
  { id: "salud_mental", nombre: "Salud Pública y Salud Mental", correlativas: ["psico_social", "psico_freud", "psico_genetica"], ciclo: "2° año" },
  { id: "teorias_grupos", nombre: "Teorías y Técnicas de Grupos", correlativas: ["psico_social", "psico_freud", "psico_genetica"], ciclo: "2° año" },
  { id: "evolutiva_ninez", nombre: "Psicología Evolutiva: Niñez", correlativas: ["psico_genetica"], ciclo: "2° año" },
  { id: "psicopatologia", nombre: "Psicopatología", correlativas: ["psico_freud", "neurofisiologia"], ciclo: "2° año" },

  // --- Tercer año ---
  { id: "evolutiva_adolescencia", nombre: "Psicología Evolutiva: Adolescencia", correlativas: ["evolutiva_ninez"], ciclo: "3° año" },
  { id: "exploracion1", nombre: "Exploración y Diagnóstico I", correlativas: ["psicopatologia", "evolutiva_adolescencia"], ciclo: "3° año" },
  { id: "exploracion2", nombre: "Exploración y Diagnóstico II", correlativas: ["exploracion1"], ciclo: "3° año" },

  // --- Cuarto año ---
  { id: "etica", nombre: "Psicología, Ética y DDHH", correlativas: ["historia_psico"], ciclo: "4° año" },
  { id: "institucional", nombre: "Psicología Institucional", correlativas: ["salud_mental", "teorias_grupos"], ciclo: "4° año" },
  { id: "educacional", nombre: "Psicología Educacional", correlativas: ["salud_mental", "teorias_grupos"], ciclo: "4° año" },
  { id: "trabajo", nombre: "Psicología del Trabajo", correlativas: ["salud_mental", "teorias_grupos"], ciclo: "4° año" },
  { id: "clinica_adultos", nombre: "Clínica: Adultos", correlativas: ["exploracion2"], ciclo: "4° año" },
  { id: "juridica", nombre: "Psicología Jurídica", correlativas: ["exploracion2"], ciclo: "4° año" },
  { id: "emergencias", nombre: "Clínica: Emergencias", correlativas: ["exploracion2"], ciclo: "4° año" },

  // --- Final ---
  { id: "practica_final", nombre: "Práctica Profesional e Investigación", correlativas: ["clinica_adultos", "emergencias", "juridica"], ciclo: "Final" }
];

const materiasCBC = ["pensamiento", "sociedad", "biologia", "psicologia", "semiologia", "matematica"];
const materiasPrimerAño = ["psico_general", "estadistica", "psico_social", "psico_freud", "psico_genetica", "neurofisiologia"];

let completadas = JSON.parse(localStorage.getItem("materiasAprobadas")) || [];

function crearMalla() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  const ciclos = [...new Set(materias.map(m => m.ciclo))];

  ciclos.forEach(ciclo => {
    const seccion = document.createElement("div");
    const titulo = document.createElement("h2");
    titulo.innerText = ciclo;
    seccion.appendChild(titulo);

    const contenedor = document.createElement("div");
    contenedor.classList.add("ciclo");

    materias
      .filter(m => m.ciclo === ciclo)
      .forEach(materia => {
        const div = document.createElement("div");
        div.className = "materia";
        div.id = materia.id;
        div.innerText = materia.nombre;

        if (completadas.includes(materia.id)) {
          div.classList.add("completada");
        }

        contenedor.appendChild(div);
      });

    seccion.appendChild(contenedor);
    malla.appendChild(seccion);
  });
}

function actualizarHabilitadas() {
  const cbcCompleto = materiasCBC.every(id => completadas.includes(id));

  materias.forEach(materia => {
    const div = document.getElementById(materia.id);
    const yaCompletada = completadas.includes(materia.id);
    if (yaCompletada) return;

    const habilitadaPorCorrelativas = materia.correlativas.every(c => completadas.includes(c));
    const esPrimerAño = materiasPrimerAño.includes(materia.id);
    const habilitada =
      habilitadaPorCorrelativas &&
      (!esPrimerAño || (esPrimerAño && cbcCompleto));

    if (habilitada) {
      div.classList.add("habilitada");
    } else {
      div.classList.remove("habilitada");
    }
  });
}

document.addEventListener("click", e => {
  if (!e.target.classList.contains("habilitada")) return;
  const id = e.target.id;
  e.target.classList.remove("habilitada");
  e.target.classList.add("completada");
  completadas.push(id);
  localStorage.setItem("materiasAprobadas", JSON.stringify(completadas));
  actualizarHabilitadas();
});

crearMalla();
actualizarHabilitadas();

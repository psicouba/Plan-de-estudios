// Datos de materias (simplificado, vos podés seguir completando)
const materias = [
  { id: 'pensamiento', nombre: 'Pensamiento Científico', correlativas: [] },
  { id: 'sociedad', nombre: 'Sociedad y Estado', correlativas: [] },
  { id: 'biologia', nombre: 'Biología', correlativas: [] },
  { id: 'psicologia', nombre: 'Psicología (CBC)', correlativas: [] },
  { id: 'semiologia', nombre: 'Semiología', correlativas: [] },
  { id: 'matematica', nombre: 'Matemática (CBC)', correlativas: [] },
  
  // Formación general (algunas)
  {
    id: 'psico_general',
    nombre: 'Psicología General',
    correlativas: ['psicologia']
  },
  {
    id: 'estadistica',
    nombre: 'Estadística',
    correlativas: ['matematica']
  },
  {
    id: 'metodologia',
    nombre: 'Metodología de la Investigación',
    correlativas: ['psico_general', 'estadistica']
  }
];

// Cargar estado guardado (localStorage)
let completadas = JSON.parse(localStorage.getItem('materiasAprobadas')) || [];

// Crear grilla
const malla = document.getElementById('malla');

materias.forEach(materia => {
  const div = document.createElement('div');
  div.classList.add('materia');
  div.id = materia.id;
  div.innerText = materia.nombre;

  if (completadas.includes(materia.id)) {
    div.classList.add('completada');
  }

  malla.appendChild(div);
});

// Habilitar las materias que cumplen sus correlativas
function actualizarHabilitadas() {
  materias.forEach(materia => {
    const div = document.getElementById(materia.id);
    const yaCompletada = completadas.includes(materia.id);
    if (yaCompletada) return;

    const habilitada = materia.correlativas.every(c => completadas.includes(c));
    if (habilitada) {
      div.classList.add('habilitada');
    } else {
      div.classList.remove('habilitada');
    }
  });
}

// Evento clic
malla.addEventListener('click', e => {
  const id = e.target.id;
  const materia = materias.find(m => m.id === id);

  if (!materia) return;
  if (!e.target.classList.contains('habilitada')) return;

  e.target.classList.remove('habilitada');
  e.target.classList.add('completada');
  completadas.push(id);
  localStorage.setItem('materiasAprobadas', JSON.stringify(completadas));
  actualizarHabilitadas();
});

// Inicial
actualizarHabilitadas();


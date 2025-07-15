const materias = [
  // CBC
  { id: "pensamiento", nombre: "Pensamiento Científico", correlativas: [] },
  { id: "sociedad", nombre: "Sociedad y Estado", correlativas: [] },
  { id: "biologia", nombre: "Biología", correlativas: [] },
  { id: "psicologia", nombre: "Psicología (CBC)", correlativas: [] },
  { id: "semiologia", nombre: "Semiología", correlativas: [] },
  { id: "matematica", nombre: "Matemática (CBC)", correlativas: [] },

  // Formación General
  { id: "psico_general", nombre: "Psicología General", correlativas: ["psicologia"] },
  { id: "psico_social", nombre: "Psicología Social", correlativas: ["psicologia"] },
  { id: "psico_freud", nombre: "Psicoanálisis: Freud", correlativas: ["psicologia"] },
  { id: "psico_genetica", nombre: "Psicología y Epistemología Genética", correlativas: ["psicologia"] },
  { id: "neurofisiologia", nombre: "Neurofisiología", correlativas: ["biologia"] },

  { id: "historia_psico", nombre: "Historia de la Psicología", correlativas: ["psico_general"] },
  { id: "estadistica", nombre: "Estadística", correlativas: ["matematica"] },
  { id: "metodologia", nombre: "Metodología de la Investigación", correlativas: ["psico_general", "estadistica"] },

  { id: "salud_mental", nombre: "Salud Pública y Salud Mental", correlativas: ["psico_social", "psico_freud", "psico_genetica"] },
  { id: "teorias_grupos", nombre: "Teorías y Técnicas de Grupos", correlativas: ["psico_social", "psico_freud", "psico_genetica"] },

  { id: "evolutiva_ninez", nombre: "Psicología Evolutiva: Niñez", correlativas: ["psico_genetica"] },
  { id: "evolutiva_adolescencia", nombre: "Psicología Evolutiva: Adolescencia", correlativas: ["evolutiva_ninez"] },

  { id: "psicopatologia", nombre: "Psicopatología", correlativas: ["psico_freud", "neurofisiologia"] },

  { id: "exploracion1", nombre: "Teoría y Técnica de Exploración y Diagnóstico Psicológico I", correlativas: ["psicopatologia", "evolutiva_adolescencia"] },
  { id: "exploracion2", nombre: "Teoría y Técnica de Exploración y Diagnóstico Psicológico II", correlativas: ["exploracion1"] },

  // Formación Profesional
  { id: "etica", nombre: "Psicología, Ética y DDHH", correlativas: ["historia_psico"] },
  { id: "institucional", nombre: "Psicología Institucional", correlativas: ["salud_mental", "teorias_grupos"] },
  { id: "educacional", nombre: "Psicología Educacional", correlativas: ["salud_mental", "teorias_grupos"] },
  { id: "trabajo", nombre: "Psicología del Trabajo", correlativas: ["salud_mental", "teorias_]()


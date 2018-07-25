class User {
  constructor(id, stats) {
    this.id = id;
    this.stats = stats;
  }
}
class Stats {
  constructor(percent, practice, reads, quizzes) {
    this.percent = percent;
    this.practice = practice;
    this.reads = reads;
    this.quizzes = quizzes;
  }
}
class Reads {
  constructor(total, completed, percent) {
    this.total = total,
    this.completed = completed,
    this.percent = percent;
  }
}
class Exercizes {
  constructor(total, completed, percent) {
    this.total = total,
    this.completed = completed,
    this.percent = percent;
  }
}
class Quizzes {
  constructor(total, completed, percent, scoreSum, scoreAvg) {
    this.total = total,
    this.completed = completed,
    this.percent = percent,
    this.scoreSum = scoreSum,
    this.scoreAvg = scoreAvg;
  }
}

let processed = [];
window.computeUsersStats = (users, progress) => {
  let progressArr = Object.entries(progress);
  let user = users;
  for (let i = 0; i < progressArr.length; i++) {
    user = users[i].id;
    if (user === progressArr[i][0]) {
      let userCourses = Object.entries(progressArr[i][1]);
      if (userCourses.length === 0) {
        processed.push('Usuario no tiene información que mostrar');
      } else {
        let intro = userCourses[0][1];
        let units = Object.entries(intro.units);
        let percent = intro.percent;
        let userStats = new Stats(percent, getReadings(units), getExercizes(units), getQuizzes(units));
        let users = new User(user, userStats);
        processed.push(users);
      }
    }
  }
  console.log(processed);
  return processed;
};
// Calcular lecturas
const getReadings = (units) => {
  let readings = 0;
  let completedReadings = 0;
  let readingsPercent;
  let reads;
  for (let i = 0; i < units.length; i++) { // Itera en cada una de las unidades del curso
    let parts = Object.entries(units[i][1].parts);
    for (let j = 0; j < parts.length; j++) { // Itera en las partes de cada unidad
      let chapter = parts[j][1];
      if (chapter.type === 'read') { // Verifica que la parte sea de tipo 'read' y suma 1 al total de lecturas
        readings++;
      }
      if (chapter.type === 'read' && chapter.completed === 1) { // Si la lectura se completó suma 1 a lecturas completadas
        completedReadings++;
      }
    }
    readingsPercent = (completedReadings / readings) * 100; // Calcula el promedio de acuerdo a los datos obtenidos
  };
  // Entrega el resultado en un nuevo objeto de tipo Reads (declarado anteriormente)
  reads = new Reads(readings, completedReadings, readingsPercent);
  return reads;
};

// Calcular ejercicios
const getExercizes = (units) => {
  let exercize = 0;
  let completedExercize = 0;
  let exercizePercent;
  let exercizes;
  for (let i = 0; i < units.length; i++) { // Itera en cada una de las unidades del curso
    let parts = Object.entries(units[i][1].parts);
    for (let j = 0; j < parts.length; j++) { // Itera en las partes de cada unidad
      let chapter = parts[j][1];
      if (chapter.type === 'practice') { // Verifica que la parte sea de tipo 'practice' y suma 1 al total de ejercicios
        exercize++;
      }
      if (chapter.type === 'practice' && chapter.completed === 1) { // Si el ejercicio se completó suma 1 a ejercicios completados
        completedExercize++;
      }
    }
    exercizePercent = (completedExercize / exercize) * 100; // Calcula el promedio de acuerdo a los datos obtenidos
  };
  // Entrega el resultado en un nuevo objeto de tipo Exercizes (declarado anteriormente)
  exercizes = new Exercizes(exercize, completedExercize, exercizePercent);
  return exercizes;
};

// Calcular quizzes
const getQuizzes = (units) => {
  let quiz = 0;
  let completedQuiz = 0;
  let scoreSum = 0;
  let scoreAvg = 0;
  let quizzes;
  let quizPercent;
  for (let i = 0; i < units.length; i++) { // Itera en cada una de las unidades del curso
    let parts = Object.entries(units[i][1].parts);
    for (let j = 0; j < parts.length; j++) { // Itera en las partes de cada unidad
      let chapter = parts[j][1];
      if (chapter.type === 'quiz') { // Verifica que la parte sea de tipo 'quiz' y suma 1 al total de quizzes
        quiz++;
      }
      if (chapter.type === 'quiz' && chapter.completed === 1) { // Si el quiz se completó suma 1 a quizes completados
        completedQuiz++;
        scoreSum += chapter.score; // Si se completa suma el puntaje que sacó en el quiz
      }
    }
    quizPercent = (completedQuiz / quiz) * 100; // Calcula el promedio de acuerdo a los datos obtenidos
    scoreAvg = scoreSum / completedQuiz; // Saca un promedio del puntaje de los quizes
  };
  // Entrega el resultado en un nuevo objeto de tipo Quizzes (declarado anteriormente)
  quizzes = new Quizzes(quiz, completedQuiz, quizPercent, scoreSum, scoreAvg);
  return quizzes;
};

// Calcula los totales para el cohort
const calculateTotals = (processed) => {
  let totalReads = 0;
  let totalQuiz = 0;
  let totalExercize = 0;
  let totalCohort = 0;
  for (let i = 0; processed.length; i++) {
    if (processed[i] === 'Usuario no tiene información que mostrar') {
      totalReads += 0;
      totalQuiz += 0;
      totalExercize += 0;
      totalCohort += 0;
    } else {
      totalReads += processed[i].stats.reads.percent;
      totalQuiz += processed[i].stats.quizzes.percent;
      totalExercize += processed[i].stats.practice.percent;
      totalCohort += processed[i].stats.percent;
    }
    document.getElementById('totalReads').innerHTML = Math.round(totalReads / processed.length) + '%';
    document.getElementById('totalQuiz').innerHTML = Math.round(totalQuiz / processed.length) + '%';
    document.getElementById('totalExercize').innerHTML = Math.round(totalExercize / processed.length) + '%';
    document.getElementById('totalCohort').innerHTML = Math.round(totalCohort / processed.length) + '%';
  };
};

window.sortUsers = (users, orderBy, orderDirection) => {
  if (orderBy === 'name') {
    return users.sort(function(a, b) {
      if (orderDirection === 'DES') {
        return a.name.localeCompare(b.name);
      } else {
        return a.name.localeCompare(b.name) * -1;
      }
    });
  }

  if (orderBy === 'percent') {
    return users.sort((a, b) => {
      if (orderDirection === 'DES') {
        return a.stats.percent - b.stats.percent;
      } else {
        return (a.stats.percent - b.stats.percent) * -1;
      }
    });
  }
};

window.filterUsers = (processed, search) => {
  if (search) {
    if (processed) {
      search = search.toLowerCase();
      return processed.filter(user => user &&
        user.name &&
        user.name.toLowerCase().indexOf(search) >= 0);
    }
  }
  return processed;
};


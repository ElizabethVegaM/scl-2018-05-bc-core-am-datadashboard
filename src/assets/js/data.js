window.onload = () => {
  database();
};

// Variables vacías que guardarán los archivos json
let users = {};
let cohorts = {};
let progress = {};

// Traer los archivos json
const database = () => {
  fetch('../../../data/cohorts/lim-2018-03-pre-core-pw/users.json')
    .then(response => response.json())
    .then(data => {
      users = data;
      console.log(users);
    });

  fetch('../../../data/cohorts.json')
    .then(response => response.json())
    .then(cohortsJSON => {
      cohort = cohortsJSON;
    });

  fetch('../../../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
    .then(response => response.json())
    .then(progressJSON => {
      progress = progressJSON;
    });
};

class User {
  constructor(stats) {
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

window.computeUsersStats = (users, progress, courses) => {
  let processed = [];
  let cohort = courses[31].coursesIndex;
  let progressArr = Object.entries(progress);
  console.log(progressArr);
  for (let i = 0; i < progressArr.length; i++) {
    let user = users[i].id;
    console.log(user);
    if (user === progressArr[i][0] && users[i].role === 'student') {
      let userCourses = Object.entries(progressArr[i][1]);   
      console.log(userCourses);
      if (userCourses.length === 0) {
        userCourses = 'Sin Info';
        processed.push(users);
      } else {
        let intro = userCourses[0][1];
        console.log(intro);
        let units = Object.entries(intro.units);
        console.log(units);
        let percent = intro.percent;
        let userStats = new Stats(percent, getReadings(units), getExercizes(units), getQuizzes(units));
        let users = new User(userStats);
        console.log(users);
        processed.push(users);
      }
    }
  }
  return processed;
};

window.sortUsers = (users, orderBy, orderDirection) => {

};
window.filterUsers = (users, search) => {

};
window.processCohortData = (options) => {

};

// Calcular lecturas
window.getReadings = (units) => {
  // Declaro un objeto constructor de lecturas que guadrará la información final

  // Se recorren los objetos dentro de objetos hasta llegar los puntos de cada unidad, donde verifica las propiedades que sean de tipo lectura y de acuerdo a eso las suma para lograr el total (readings), conocer las que la alumna ha completado (completedReadings) y saca un promedio de acuerdo a eso (readingsPercent)

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
window.getExercizes = (units) => {
  // Declaro un objeto constructor de exercizes que guadrará la información final

  // Se recorren los objetos dentro de objetos hasta llegar los puntos de cada unidad, donde verifica las propiedades que sean de tipo practice y de acuerdo a eso las suma para lograr el total (exercize), conocer las que la alumna ha completado (completedExercize) y saca un promedio de acuerdo a eso (exercizePercent)
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
window.getQuizzes = (units) => {
  // Declaro un objeto constructor de Quizzes que guadrará la información final

  // Se recorren los objetos dentro de objetos hasta llegar los puntos de cada unidad, donde verifica las propiedades que sean de tipo quiz y de acuerdo a eso las suma para lograr el total (quiz), conocer las que la alumna ha completado (completedQuiz), saca un promedio de acuerdo a eso (quizPercent), además muestra la suma de sus puntajes (scoreSum) y el puntaje promedio (scoreAvg)

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

const renderUsers = data => {
  let rankingNumber = 0;
  const render = data.forEach(element => {
    rankingNumber++;
    tableName.innerHTML += '<tr>' +
      '<td>' + rankingNumber + '</td>' +
      '<td>' + data[rankingNumber - 1].name.toUpperCase() + '</td>' +
      '<td>' + +'</td>' +
      '<td>' + +'</td>' +
      '<td>' + +'</td>' +
      '<td>' + +'</td>' +
      '<td>' + +'</td>' +
      '</tr>';
  });
};
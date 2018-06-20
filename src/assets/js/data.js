window.onload = () => {
  database();
}

// Variables vacías que guardarán los archivos json
let users = {};
let cohorts = {};
let progress = {};

// Traer los archivos json
const database = () => {
  const usersJSON = '../../../data/cohorts/lim-2018-03-pre-core-pw/users.json';
  const cohortsJSON = '../../../data/cohorts.json';
  const progressJSON = '../../../data/cohorts/lim-2018-03-pre-core-pw/progress.json';

  fetch(usersJSON)
    .then(response => response.json())
    .then(data => {
      users = data;
      console.log(users);
    })

  fetch(cohortsJSON)
    .then(response => response.json())
    .then(cohortsJSON => {
      cohort = cohortsJSON[31].coursesIndex;
      console.log(cohort);
    })

  fetch(progressJSON)
    .then(response => response.json())
    .then(progressJSON => {
      progress = progressJSON;
      console.log(progress);
    })
}

// Calcular lecturas
window.getReadings = (users, progress) => {
  // Declaro un objeto constructor de exercizes que guadrará la información final
  class Reads {
    constructor(total, completed, percent) {
      this.total = total,
      this.completed = completed,
      this.percent = percent
    }
  }

  // 
  let courses = Object.entries(progress).find(element => element[0] == users.id)[1];
  let units = Object.entries(courses.intro.units);
  let readings = 0;
  let completedReadings = 0;
  let readingsPercent;
  for (let i = 0; i < units.length; i++) {
    let parts = Object.entries(units[i][1].parts);
    for (let j = 0; j < parts.length; j++) {
      let chapter = parts[j][1];
      if (chapter.type == 'read') {
        readings++;
      }
      if (chapter.type == 'read' && chapter.completed == 1) {
        completedReadings++;
      }
    }
    readingsPercent = (completedReadings / readings) * 100;
  };
  let reads = new Reads(readings, completedReadings, readingsPercent)
  return reads;
}

// Calcular ejercicios
window.getExercizes = (users, progress) => {
  // Declaro un objeto constructor de exercizes que guadrará la información final
  class Exercizes {
    constructor(total, completed, percent) {
      this.total = total,
      this.completed = completed,
      this.percent = percent
    }
  }
  let courses = Object.entries(progress).find(element => element[0] == users.id)[1];
  let units = Object.entries(courses.intro.units);
  let exercize = 0;
  let completedExercize = 0;
  let exercizePercent;
  let exercizes;
  for (let i = 0; i < units.length; i++) {
    let parts = Object.entries(units[i][1].parts);
    for (let j = 0; j < parts.length; j++) {
      let chapter = parts[j][1];
      if (chapter.type == 'practice') {
        exercize++;
      }
      if (chapter.type == 'practice' && chapter.completed == 1) {
        completedExercize++;
      }
    }
    exercizePercent = (completedExercize / exercize) * 100;
  };
  exercizes = new Exercizes(exercize, completedExercize, exercizePercent);
  return exercizes;
}

// Calcular quizzes
window.getQuizzes = (users, progress) => {
  // Declaro un objeto constructor de exercizes que guadrará la información final
  class Quizzes {
    constructor(total, completed, percent, scoreSum, scoreAvg) {
      this.total = total,
      this.completed = completed,
      this.percent = percent,
      this.scoreSum = scoreSum,
      this.scoreAvg = scoreAvg
    }
  }

  let courses = Object.entries(progress).find(element => element[0] == users.id)[1];
  let units = Object.entries(courses.intro.units);
  let quiz = 0;
  let completedQuiz = 0;
  let scoreSum = 0;
  let scoreAvg = 0;
  let quizzes;
  let quizPercent;
  for (let i = 0; i < units.length; i++) {
    let parts = Object.entries(units[i][1].parts);
    for (let j = 0; j < parts.length; j++) {
      let chapter = parts[j][1];
      if (chapter.type == 'quiz') {
        quiz++;
      }
      if (chapter.type == 'quiz' && chapter.completed == 1) {
        completedQuiz++;
        scoreSum += chapter.score;
      }
    }
    quizPercent = (completedQuiz / quiz) * 100;
    scoreAvg = scoreSum / completedQuiz;
  };
  quizzes = new Quizzes(quiz, completedQuiz, quizPercent, scoreSum, scoreAvg);
  return quizzes;
}

window.computeUsersStats = (user, progress, courses) => {
  let userId = user.id;

};

window.sortUsers = (users, orderBy, orderDirection) => {

};
window.filterUsers = (users, search) => {

};
window.processCohortData = (options) => {

};

/*
let studentInfo = user.forEach(element => {
  let userName = element.name;
  let userId = element.id;
  let percent = 'Sin info';
  if(progress[userId].intro) {
    percent = progress[userId].intro.percent;
  }



let usersCohort = [];

class User {
  constructor(stats) {
    this.stats = stats;
  }



    class Stats {
      constructor(percent, practice, reads, quizzes) {
        this.percent = percent;
        this.practice = practice;
        this.reads = reads;
        this.quizzes = quizzes;
      }
    }


class Exercizes {
    constructor(total, completed, percent) {
      this.total = total,
      this.completed = completed,
      this.percent = percent
    }
  }

  class Reads {
    constructor(total, completed, percent) {
      this.total = total,
      this.completed = completed,
      this.percent = percent
    }
  }

  class Quizzes {
    constructor(total, completed, percent, scoreSum, scoreAvg) {
      this.total = total,
      this.completed = completed,
      this.percent = percent,
      this.scoreSum = scoreSum,
      this.scoreAvg = scoreAvg
    }
  } */
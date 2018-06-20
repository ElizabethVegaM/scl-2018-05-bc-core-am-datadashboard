window.onload = () => {
  database();
}

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
  let courses = Object.entries(progress).find(element => element[0] == users.id)[1];
  console.log(courses);
  let units = Object.entries(courses.intro.units);
  console.log(units);
  let readings = 0;
  let completedReadings = 0;
  for (let i = 0; i < units.length; i++) {
    let parts = Object.entries(units[i][1].parts);
    console.log(parts);
    for (let j = 0; j < parts.length; j++) {
      let chapter = parts[j][1];
      console.log(chapter);
      if (chapter.type == 'read') {
        readings++;
        console.log(readings);
      }
      if (chapter.type == 'read' && chapter.completed == 1) {
        completedReadings++;
        console.log(completedReadings);
      }
      console.log(`estas ${readings} y estas ${completedReadings}`);
    }
    let readingsPercent = (completedReadings / readings) * 100;
    console.log(readingsPercent);
  };
}

// Calcular ejercicios
window.getExercizes = (users, progress) => {
  let courses = Object.entries(progress).find(element => element[0] == users.id)[1];
  console.log(courses);
  let units = Object.entries(courses.intro.units);
  console.log(units);
  let exercizes = 0;
  let completedExercizes = 0;
  for (let i = 0; i < units.length; i++) {
    let parts = Object.entries(units[i][1].parts);
    console.log(parts);
    for (let j = 0; j < parts.length; j++) {
      let chapter = parts[j][1];
      console.log(chapter);
      if (chapter.type == 'practice') {
        exercizes++;
        console.log(exercizes);
      }
      if (chapter.type == 'practice' && chapter.completed == 1) {
        completedExercizes++;
        console.log(completedExercizes);
      }
      console.log(`estas ${exercizes} y estas ${completedExercizes}`);
    }
    let exercizesPercent = (completedExercizes / exercizes) * 100;
    console.log(exercizesPercent);
  };
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
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

const asideBtn = document.getElementById('menu-toggle');
const usersBtn = document.getElementById('show');
const tableName = document.getElementById('studentsName');
const hiddingElement = document.getElementById('mainInfo');
const wrapper = document.getElementById('wrapper');

// Botón que maneja la visualización de la barra lateral
$(document).ready(function() {
  $('#sidebarCollapse').on('click', function() {
    $('#sidebar').toggleClass('active');
  });
});

document.getElementById('show').addEventListener('click', () => {
  hiddingElement.classList.remove('d-none');
  renderUsers(users, computeUsersStats(users, progress));
  calculateTotals(computeUsersStats(users, progress));
});

// Imprimir los datos en la tabla
const renderUsers = (user, processed) => {
  let rankingNumber = 0;
  for (let i = 0; i < processed.length; i++) {
    rankingNumber++;
    if (processed[i] === 'Usuario no tiene información que mostrar' && user[i].role === 'student') {
      tableName.innerHTML += '<tr>' +
        '<td>' + rankingNumber + '</td>' +
        '<td>' + user[i].name.toUpperCase() + '</td>' +
        '<td class="numbers">' + '-' + '</td>' +
        '<td class="numbers">' + '-' + '</td>' +
        '<td class="numbers">' + '-' + '</td>' +
        '<td class="numbers">' + '-' + '</td>' +
        '</tr>';
    } else if (user[i].role === 'student') {
      tableName.innerHTML += '<tr>' +
        '<td>' + rankingNumber + '</td>' +
        '<td>' + user[i].name.toUpperCase() + '</td>' +
        '<td class="numbers">' + Math.round(processed[i].stats.reads.percent) + '%' + '</td>' +
        '<td class="numbers">' + Math.round(processed[i].stats.quizzes.percent) + '%' + '</td>' +
        '<td class="numbers">' + Math.round(processed[i].stats.practice.percent) + '%' + '</td>' +
        '<td class="numbers">' + Math.round(processed[i].stats.percent) + '%' + '</td>' +
        '</tr>';
    };
  };
};
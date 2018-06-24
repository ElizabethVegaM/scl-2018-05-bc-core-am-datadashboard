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
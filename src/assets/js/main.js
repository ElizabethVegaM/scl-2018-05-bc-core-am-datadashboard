const asideBtn = document.getElementById('expandMenu');
const usersBtn = document.getElementById('show');
const tableName = document.getElementById('studentsName');
const hiddingElement = document.getElementById('mainInfo');


// Proceso de impresión de los datos recibidos en una tabla 
usersBtn.addEventListener('click', () => {
  hiddingElement.classList.remove('d-none');

});

/*

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
      '</tr>'
  })
}


asideBtn.addEventListener('click', () => {
  const logo = document.getElementById('logo');
  const sidebar = document.getElementById('sidebar');
  if (logo.style.display === 'none') {
    logo.style.display = 'block';
  } else if (logo.style.display === 'block') {
    logo.style.display = 'none';
  } else if (sidebar.style.display === 'none') {
    sidebar.style.display = 'block';
  } else if (sidebar.style.display === 'block') {
    sidebar.style.display = 'none';
  }
})
*/
const asideBtn = document.getElementById('expandMenu')
const usersBtn = document.getElementById('show');
const tableName = document.getElementById('studentsName');
const hiddingElement = document.getElementById('mainInfo');
const usersJSON = '../../../data/cohorts/lim-2018-03-pre-core-pw/users.json';

fetch(usersJSON)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    renderUsers(data);
  })

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


const renderUsers = data => {
  usersBtn.addEventListener('click', () => {
    hiddingElement.classList.remove('d-none');
    const render = data.forEach(element => {
      return tableName.innerHTML += `<p>${element.name.toUpperCase()}</p>`
    })
    return render;
  })
}
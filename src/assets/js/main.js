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

const renderUsers = data => {
  usersBtn.addEventListener('click', () => {
    hiddingElement.classList.remove('d-none');
    const render = data.forEach(element => {
      return tableName.innerHTML += `<p>${element.name}</p>` 
    })
    return render;
  })
}

/*
Para crear tablas dinámicas

const show = (data) => {
  const tblPlace = document.getElementsByClassName('table');
  // Crear elemento tbody
  let tblBody = document.querySelector('tbody');
  // Crea las celdas
  for (let i = 1; i < 5; i++) {
    // Crea las hileras de la tabla
    let row = document.createElement('tr');
 
    for (let j = 0; j < 2; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      let cell = document.createElement('td');

      const render = data.forEach(element => {
        return row.innerHTML = `<td>${element.name}</td>`;
      })

      cell.appendChild(render);
      row.appendChild(cell);
    }
 
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(row);
  }
}
*/

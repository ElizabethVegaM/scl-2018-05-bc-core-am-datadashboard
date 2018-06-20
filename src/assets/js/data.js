window.database = () => {
  const usersJSON = '../../../data/cohorts/lim-2018-03-pre-core-pw/users.json';
  const progressJSON = '../../../data/cohorts/lim-2018-03-pre-core-pw/progress.json';

  fetch(usersJSON)
  .then(response => response.json())
  .then(users => {
    console.log(users);
    callingUsers(users);
  })

fetch(progressJSON)
  .then(response => response.json())
  .then(progressJSON => {
    console.log(progressJSON);
    const completition = Object.entries(progressJSON);
    console.log(completition);
  })
}

const callingUsers = (users) => {


}


window.computeUsersStats = (user, progress, courses) => {
  completition.find(callback, [])  
  
};
window.sortUsers = (users, orderBy, orderDirection) => {

};
window.filterUsers = (users, search) => {

};
window.processCohortData = (options) => {

};
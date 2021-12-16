function getAllPersons() {
  axios.get('/persons')
    .then(result => {
      data = result.data;
      document.getElementById('list').innerHTML =
        data.map(person => `<li class="card">
        <div class="peson-info">
          <h3 style="margin: 0;">${person.firstName} ${person.lastName}</h3>
          <div>${person.age}</div>
          <div>${person.city}</div>
        </div>
        <div class="eye-color" style="background-color: ${person.eyeColor};"></div>
        </li>`).join('');
    })
}
getAllPersons()

document.querySelector('form')
  .onsubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const valuse = Object.values(form)
      .reduce((acc, curr) => {
        const {
          value,
          name
        } = curr
        return name ? {
          ...acc,
          [name]: value
        } : acc
      }, {});
    // console.log(valuse)
    addPerson(valuse)
  }

function addPerson(personObj) {
  axios.post('/persons', personObj)
    .then(() => {
      getAllPersons()
    })
}
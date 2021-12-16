const express = require('express');
// const router = require('./route')
const {
  nanoid
} = require('nanoid')

// router(app)

const app = express();
app.use(express.static('public'))
app.use(express.json());

const persons = []

app.post('/persons', (req, res) => {
  let userId = nanoid();
  const {
    firstName,
    lastName,
    age,
    city,
    eyeColor
  } = req.body;

  if (firstName && lastName && age && city && eyeColor) {
    persons.push({
      firstName,
      lastName,
      age,
      city,
      eyeColor,
      id: userId
    })
    res.send('ok')
  } else {
    res.send('missing data')
  }

})

app.get('/persons/:id?', (req, res) => {
  const {
    id
  } = req.params;

  if (!id) {
    let query = req.query;
    if (Object.keys(query).length) {
      for (const queryEl in query) {
        let filterdUser = persons.filter(person => person[queryEl] === query[queryEl])
        res.send(filterdUser)
        return
      }
    } else {
      res.send(persons);
    }
  } else {
    const currntUser = persons.find(el => el.id === id);
    if (!currntUser) {
      res.send(`This person is not exist`)
    } else {
      res.send(currntUser);
    }
  }
})

app.put('/persons/:id', (req, res) => {
  const {
    id
  } = req.params;

  try {
    let currntUserIndex = persons.findIndex(el => el.id === id)
    persons[currntUserIndex] = {
      ...persons[currntUserIndex],
      ...req.body
    }
    res.send(persons[currntUserIndex])
  } catch (error) {
    throw error;
  }

})

app.delete('/persons/:id', (req, res) => {
  const {
    id
  } = req.params;
  if (id) {
    let person = persons.find(el => el.id === id);
    let personIndex = persons.findIndex(el => el.id === id);
    persons.splice(personIndex, 1)
    res.send(person)
  } else {
    res.send(`plese send ${id} params`)
  }
})




app.listen(3000, console.log('server is run in port: 3000'));
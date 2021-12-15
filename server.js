const express = require('express');
const {
  nanoid
} = require('nanoid')

const app = express();
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
    if (!(Object.keys(query).length === 0)) {
      for (const queryEl in query) {
        const element = query[queryEl];
        let filterdUser = persons.filter(person => person[queryEl] === element)
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
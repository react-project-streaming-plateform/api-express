const express = require("express");
const cors = require('cors');
import { v4 as uuidv4 } from "uuid";
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const users = [
  { id: uuidv4(), name: "John", lastname: "Smith" },
  { id: uuidv4(), name: "Marc", lastname: "Truc" },
];

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  const { name, lastname } = req.body;
  if (!lastname || !name) {
    res.status(400).send("You need name and lastname");
    return;
  }
  console.log("my name is", req.body.name, req.body.lastname);
  users.push({id: uuidv4(), name, lastname });
  res.send("Got a POST request");
});

app.put("/users/:id", (req, res) => {
  const id = req.params.id
  const {type, ...items } = req.body;

  const index = users.findIndex(user => user.id === id )
  if (index === -1) {
    res.status(400).send("This user does not exist");
    return;
  }
  users[index] = {...users[index], ...items}
  res.send("Got a PUT request");
});

app.delete('/users/:id', (req, res) => {
  const id = req.params.id
  const index = users.findIndex(user => user.id === id )
  if (index === -1) {
    res.status(400).send("This user does not exist");
    return;
  }

  users.splice(index, 1)

  res.send('Got a DELETE request')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

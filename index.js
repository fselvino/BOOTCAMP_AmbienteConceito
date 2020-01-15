const express = require("express");

const server = express();
server.use(express.json()); //informa para o express que passar json no bady da requisiçao

//Query params = ?teste=1
//Router params = /users/1
//Request body = { }

// CRUD create, read, update, delete

//rota para retornar todos usuarios
const users = ["Diego", "Robson", "Vitor"];
server.get("/users", (req, res) => {
  return res.json(users);
});

//rota para retornar um usuario expecifico
server.get("/users/:index", (req, res) => {
  //const nome = req.query.nome;
  const { index } = req.params;

  //return res.json({ message: `Hello ${nome}` });
  return res.json(users[index]);
});

//rota para criar um usuario
server.post("/users", (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

//rota para editar usuarios
server.put("/users/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;
  return res.json(users);
});

//rota para excluir usuarios
server.delete("/users/:index", (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);

  return res.json(users);
});

server.listen(3000);

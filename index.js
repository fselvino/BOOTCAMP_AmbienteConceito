const express = require("express");

const server = express();
server.use(express.json()); //informa para o express que passar json no bady da requisiçao

//Query params = ?teste=1
//Router params = /users/1
//Request body = { }

// CRUD create, read, update, delete

//rota para retornar todos usuarios
const users = ["Diego", "Robson", "Vitor"];

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Metodo : ${req.method}, URL : ${req.url}`);
  next();
  console.timeEnd("Request");
});

//Middeware que verifica se o nome do usuairo foi repassado no corpo da requisiçao
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }
  return next();
}

function checkUserInArray(req, res, next) {
  //recebe o valor da variavel users no index informado
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }

  //repassa o valor recebido da requisiçao para variavel user
  req.user = user;
  return next();
}

server.get("/users", (req, res) => {
  return res.json(users);
});

//rota para retornar um usuario expecifico
server.get("/users/:index", checkUserInArray, (req, res) => {
  //const nome = req.query.nome;
  const { index } = req.params;

  //return res.json({ message: `Hello ${nome}` });
  return res.json(req.user);
});

//rota para criar um usuario
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

//rota para editar usuarios
server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;
  return res.json(users);
});

//rota para excluir usuarios
server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);

  return res.json(users);
});

server.listen(3000);

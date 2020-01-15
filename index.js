const express = require("express");

const server = express();

//Query params = ?teste=1
//Router params = /users/1
//Request body = { }
const users = ["Diego", "Claudio", "Vitor"];
server.get("/users/:index", (req, res) => {
  //const nome = req.query.nome;
  const { index } = req.params;

  //return res.json({ message: `Hello ${nome}` });
  return res.json(users[index]);
});

server.listen(3000);

const express = require("express")
const nunjucks = require("nunjucks")

//Server is an object to execute the express function
const server = express()

//Configurar pasta public
server.use(express.static("public"))

nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

//Configurando caminhos da aplicação
/*
  req: Requisição/Pedido
  res: Reposta
*/
server.get("/", (req, res) => {
  return res.render("index.html", { title: "Um título"})
})

server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

server.get("/search-results", (req, res) => {
  return res.render("search-results.html")
})

//ligando o servidor
server.listen(3000)

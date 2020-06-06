const express = require("express")
const nunjucks = require("nunjucks")

//Pegando o banco de dados
const db = require("./database/db.js")

//Server is an object to execute the express function
const server = express()

//Configurar pasta public
server.use(express.static("public"))

//Habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

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
  return res.render("index.html", { title: "Um título" })
})


server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})


server.post("/savepoint", (req, res) => {

  //Inserir dados no Banco de dados
  const query = `
        INSERT INTO places (
          name,
          image,
          address,
          address2,
          state,
          city,
          items
        ) VALUES (?,?,?,?,?,?,?);
      `

  const values = [
    req.body.name,
    req.body.image,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
      if (err) {
        console.log(err)
        return res.render("create-point.html", { error: true})
        //return res.render("create-point.html")
      }

      return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)
})


server.get("/search-results", (req, res) => {

  const search = req.query.search

  if(search == ""){
    //Pesquisa Vazia
    return res.render("search-results.html", {total: 0})
  }

  //Pegar os dados do banco de dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err)
    }

    const total = rows.length

    //Mostrar as páginas html com os dados do banco de dados
    return res.render("search-results.html", { places: rows, total })
  })
})

//ligando o servidor
server.listen(3000)

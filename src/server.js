const express = require("express")
const server = express()

const db = require("./database/db.js")

server.use(express.static("public"))
server.use(express.urlencoded({extended: true}))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", (req, res) =>{
    res.render("index.html", {aaaa: "um titulo"})
})

server.get("/create-point", (req, res) =>{   
    res.render("create-point.html")
})

server.post("/savepoint", (req, res) =>{
    
    const query = `
    INSERT INTO places (
        name,
        image,
        adress,
        adress2,
        state,
        city,
        items
        ) VALUES (?,?,?,?,?,?,?);
        `
        const values = [
            req.body.name,
            req.body.image,
            req.body.adress, 
            req.body.adress2,
            req.body.uf,
            req.body.city,
            req.body.items
        ]
        
        function afterInsertData(err){
            if(err)
            return console.log(err)
            
            console.log("Cadastrado com sucesso")
            console.log(this)
            return res.render("create-point.html", {saved: true})
        }
        db.run(query, values, afterInsertData)
    })
    
server.get("/search", (req, res) =>{
    
    const search = req.query.search

    if(search == "")
        return res.render("search-results.html", {total: 0})

    else{
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
            if(err)
            return console.log(err)
            
            console.log("Aqui estão seus registros: ")
            console.log(rows)
            
            const total = rows.length
            
            return res.render("search-results.html", {places: rows, total: total})
        })
    }
})
    
server.listen(3000)

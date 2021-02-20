const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./src/database/datt.db')

module.exports = db
// db.serialize(() => {

//     // criar tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           image TEXT,
//           name TEXT,
//           adress TEXT,
//           adress2 TEXT,
//           state TEXT,
//           city TEXT,
//           items TEXT 
//         );
//     `)
    
//     // adicionar dados
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             adress,
//             adress2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América", 
//         "Numero 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]

//     function afterInsertData(err){
//         if(err)
//             return console.log(err)
    
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }
    
//     // db.run(query, values, afterInsertData)

//     // consultar dados
//     db.all(`SELECT * FROM places`, function(err, rows){
//         if(err)
//             return console.log(err)

//         console.log("Aqui estão seus registros: ")
//         console.log(rows)
//     })
    
//     // deletar dado
    // db.run(`DELETE FROM places WHERE id = ?`,[4], function(err){
    //     if(err)
    //     console.log(err)

    //     console.log("Registro deletado com sucesso!")
    // })
// })
const express = require('express')
const mysql = require('mysql2')

const router = express.Router()
const jsonParser = express.json()

try{
    // Создание соединения к базе 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'servicedb'
})
//Соединение с базой
db.connect((err) => {
    if(err){
        console.log(`Error ${err}`);
    } else{
        console.log("Persons: Connected");
    }
})

// получение всех данных из таблицы Person
router.get('/', async (req, res) => {
    try{
        await db.query("SELECT id, surname, name, patronamic FROM person", 
        (err, rows) => {
            if(err){
                console.log('Error query')
            } else {
                console.log("Query success")
                res.send(rows)
            }
        })
    }catch(e){
        console.log(e);
    }
   
})

// Добавление данных в таблицу
router.put('/', jsonParser, async(req,res) => {
    try{
        res.send(req.body)
        await db.query(`INSERT INTO person 
                            (surname, name, patronamic)  
                        VALUES 
                            ('${req.body.surname}'
                            ,'${req.body.name}'
                            ,'${req.body.patronamic}')`)
    }catch(e){
        console.log(e);
    }
    

})

// Изменение данных
router.post('/', jsonParser, async(req,res) => {
    try{
        await db.query(`UPDATE person SET 
            id = '${req.body.id}'
            , person.surname ='${req.body.surname}'
            , person.name = '${req.body.name}'
            , person.patronamic = '${req.body.patronamic}' 
            WHERE id = '${req.body.id}' `,
            (rows) => {
       
            res.send(req.body) })
    }catch(e){
        console.log(e);
    }
    
})

router.delete('/', jsonParser, async (request, respons) => { 

    try{
        await db.query(`DELETE FROM person WHERE id = '${request.query.id}'`, 
            (rows) => {
               console.log(`Remove item id = ${request.query.id}`);
            }
        )
    } catch(e){
        console.log(e);
    }
    
    }
)

} catch(e){
    console.log(e);
}



module.exports = router

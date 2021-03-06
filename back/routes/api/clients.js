const express = require('express')
const mysql = require('mysql2')
const router = express.Router()
const jsonParser = express.json()


try{
const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'servicedb'
    })
db.connect((err) => {
        if(err){
            console.log(`Error ${err}`);
        } else{
            console.log("Clients: Connected");
        }
    })


router.get('/', async (req, res) => {
try{
    await db.query(`SELECT 
                        client.id as id
                        , client.surname
                        , client.name
                        , client.patronamic
                        , client.date_born as date_born
                        , client.pass_id as pass_id
                        , client.habitation as habitation
                        , client.state as state
                    FROM 
                        client
                    WHERE client.state = 1`, 
        (err, rows) => {
            res.send(rows)
        })
    }catch(e){} //try-catch
   
}) //get select
router.put('/', jsonParser,async(req,res) => {
    try{
        res.send(req.body)
        await db.query(`INSERT INTO client
                            (surname, name, patronamic, date_born, habitation, pass_id, state) 
                        VALUES ('${req.body.surname}', '${req.body.name}', '${req.body.patronamic}',
                                '${req.body.date_born}','${req.body.habitation}',
                                '${req.body.pass_id}', '${req.body.state}')`)

    }catch(e){}

}) // put add
router.post('/', jsonParser, async(req,res) => {
    try{
        await db.query(`UPDATE client 
                        SET id='${req.body.id}',
                            surname='${req.body.surname}',
                            name='${req.body.name}',
                            patronamic='${req.body.patronamic}',
                            date_born='${req.body.date_born}',
                            habitation='${req.body.habitation}',
                            pass_id='${req.body.pass_id}',
                            state='${req.body.state}' 
                        WHERE id = '${req.body.id}'`)
    }catch(e){}
}) // post update
router.delete('/', jsonParser, async(req,res)=>{
    try{
        await db.query(`DELETE FROM client WHERE id = '${req.query.id}'`)
    }catch(e){}
}) // delete 

}catch(e){}
module.exports = router
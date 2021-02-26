const express = require('express')
const mysql = require('mysql2')
const router = express.Router()
const jsonParser = express.json()

try{
    const  db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'servicedb'
    })
    db.connect((err) => {
        if(err){
            console.log(`Error ${err}`);
        } else{
            console.log("Cars: Connected");
        }
    })

// Получение всех данных из таблицы Car
router.get('/', async (req, res) => {
    try{
        await db.query(`SELECT 
        car.id
        , car.mark
        , car.color
        , car.year_production
        , car.gos_number
        , car.state
        , owner.type 
    FROM 
        car join owner on car.owner_id = owner.id 
    WHERE car.state = 1`, 
        (err, rows) => {
            res.send(rows)
       
        })
    }catch(e){ }

})
router.put('/', jsonParser, async(req,res) => {
    try{
        await db.query(`INSERT INTO car 
                            (color, gos_number, mark, owner_id, state, year_production) 
                        VALUES 
                            ('${req.body.color}', '${req.body.gos_number}', 
                            '${req.body.mark}', '${req.body.owner_id}', 
                            '${req.body.state}', '${req.body.year_production}')`)
    }catch(e){}
})
router.post('/', jsonParser, async(req,res)=> {
    try{
        await db.query(`UPDATE car SET 
                            id='${req.body.id}', color='${req.body.color}',
                            gos_number='${req.body.gos_number}',mark='${req.body.mark}',
                            owner_id='${req.body.owner_id}',state='${req.body.state}',
                            year_production='${req.body.year_production}' 
                        WHERE id = '${req.body.id}'`)
    }catch(e){
        console.log(e);
    }
})
router.delete('/',jsonParser, async(req, res)=> {
    try{
        await db.query(`DELETE FROM car WHERE id = '${req.query.id}'`,
        (rows) => {
            console.log(`Remove item id = ${req.query.id}`);
         })

    }catch(e){}

})

}catch(e){}



module.exports = router
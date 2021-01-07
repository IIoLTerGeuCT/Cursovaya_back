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
            console.log(`Error ${err}`)
        } else{
            console.log("PriceList: Connected")
        }
    })

router.get('/', async (req, res) => {
    try{
        await db.query("SELECT id, type, price FROM price_list", 
        (err, rows) => {
           
                res.send(rows)

        })
    } catch(e){
        console.log(e)
    }
    
})
// Добавление данных в таблицу price_list
router.put('/',jsonParser, async(req,res)=> {
    try{
        res.send(req.body)
        await db.query(`INSERT INTO price_list 
                                (type, price)  
                        VALUES 
                                ('${req.body.type}'
                                ,'${req.body.price}')`)
    }catch(e){
        console.log(e)
    }
    
})

// Изменение данных
router.post('/', jsonParser, async(req,res)=>{
    try{
        await db.query(`UPDATE price_list SET 
                        id = '${req.body.id}'
                        , type ='${req.body.type}'
                        , price = '${req.body.price}'
                    WHERE id = '${req.body.id}' `,
    (rows) => {
            res.send(req.body)
    })
    }catch(e){
        console.log(e);
    }
    
})

router.delete('/', async(req,res) =>{
    try{
        await db.query(`DELETE FROM price_list WHERE id = '${req.query.id}'`, 
            (rows) => {
               console.log(`Remove item id = ${req.query.id}`);
            }
        )
    }catch(e){console.log(e)}

})

} catch(e){console.log(e);}


module.exports = router
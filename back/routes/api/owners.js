const express = require('express')
const mysql = require('mysql2')
const router = express.Router()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'servicedb'
})



router.get('/', async (req, res) => {

    db.connect((err) => {
        if(err){
            console.log(`Error ${err}`);
        } else{
            console.log("Owner: Connected");
        }
    })
    await db.query(`SELECT id, type
                    FROM 
                        owner `, 
        (err, rows) => { })
})


module.exports = router
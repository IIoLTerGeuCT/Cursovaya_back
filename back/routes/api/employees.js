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
            console.log("Employees: Connected");
        }
})

router.get('/', async (req, res) => {

try{
    await db.query(`SELECT 
                        employee.id
                        , employee.surname
                        , employee.name
                        , employee.patronamic
                        , employee.specialization
                        , employee.rank
                        , employee.expirience
                        , employee.state
                    FROM employee 
                    WHERE employee.state = 1`, 
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
       
})// get select

router.put('/', jsonParser, async(req,res)=>{
    try{
        await db.query(`INSERT INTO employee 
                            (surname,name,patronamic,expirience, rank, specialization, state) 
                        VALUES ('${req.body.surname}', '${req.body.name}', '${req.body.patronamic}',
                                '${req.body.expirience}','${req.body.rank}',
                                '${req.body.specialization}','${req.body.state}')`)
    }catch(e){
        console.log(e);
    }

})// put insert

router.post('/',jsonParser, async(req, res)=>{
    try{
        await db.query(`UPDATE employee 
                        SET id='${req.body.id}',
                            surname='${req.body.surname}', 
                            name='${req.body.name}', 
                            patronamic='${req.body.patronamic}',
                            expirience='${req.body.expirience}', 
                            rank='${req.body.rank}',
                            specialization='${req.body.specialization}',
                            state='${req.body.state}' 
                        WHERE id = '${req.body.id}'`)
    }catch(e){
        console.log(e);
    }
}) // post update

router.delete('/', jsonParser, async(req,res) =>{
    try{
        await db.query(`DELETE FROM employee WHERE id = '${req.query.id}'`,
        (rows) => {
            console.log(`Remove item id = ${req.query.id}`);
        })
       }catch(e){
        console.log(e);
    }

})// delete

} catch(e){
    console.log(e);
}

module.exports = router
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
            console.log("Service: Connected");
        }
    })
router.get('/', async (req, res) => {

try{
    await db.query(`SELECT
                        service.id as id 
                        , service.date_start_repairs as start 
                        , service.date_finish_repairs as finish 
                        , car.mark
                        , car.gos_number
                        , owner.type
                        , ClientP.surname as clientSurname
                        , ClientP.name as clientName
                        , ClientP.patronamic as clientPatronamic
                        , EmployeeP.surname as EmployeeSurname
                        , EmployeeP.name as EmployeeName
                        , EmployeeP.patronamic as EmployeePatronamic
                        , service.price_list_id
                    FROM 
                    service join (car join owner on car.owner_id = owner.id) on service.car_id = car.id
                            join (client join person ClientP on client.person_id = ClientP.id) on service.client_id = client.id
                            join (employee join person EmployeeP on employee.person_id = EmployeeP.id) on service.employee_id = employee.id
                    WHERE service.state = 1`, 
                                   // join price_list on service.price_list_id = price_list.id
            (err, rows) => {
                if(err){
                    console.log('Error query')
                } else {
                    console.log("Query success")
                    res.send(rows)
                }
            })
} catch(e){
    console.log(e);
}
        
}) // get select
router.put('/', jsonParser, async(req,res)=>{
    try{
        await db.query(`INSERT INTO service
                            (car_id, client_id, date_finish_repairs, date_start_repairs, employee_id, price_list_id, state)
                        VALUES ('${req.body.car_id}','${req.body.client_id}','${req.body.date_finish_repairs}',
                                '${req.body.date_start_repairs}','${req.body.employee_id}','${req.body.price_list_id}','${req.body.state}')`)
    }catch(e){console.log(e);}

})// put insert
router.post('/',jsonParser, async(req,res) => {
    try{
        await db.query(`UPDATE service 
                        SET id='${req.body.id}',car_id='${req.body.car_id}',client_id='${req.body.client_id}',
                            date_finish_repairs='${req.body.date_finish_repairs}',
                            date_start_repairs='${req.body.date_start_repairs}',
                            employee_id='${req.body.employee_id}', price_list_id='${req.body.price_list_id}',
                            state='${req.body.state}' 
                        WHERE id = '${req.body.id}'`)
    } catch(e){
        console.log(e);
    }




})// porst Update

router.delete('/', jsonParser, async(req,res) =>{
    try{
        await db.query(`DELETE FROM service WHERE id = '${req.query.id}'`,
        (rows) => {
            console.log(`Remove item id = ${req.query.id}`);
        })
       }catch(e){
        console.log(e);
    }

})// delete










} catch(e) {
    console.log(e);
}







module.exports = router
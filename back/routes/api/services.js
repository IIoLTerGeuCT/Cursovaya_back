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

    switch (req.query.state) {
        case '1':
            try{
                await db.query(`SELECT
                                    service.id AS id
                                    , car.mark
                                    , car.gos_number
                                    , owner.type
                                    , client.surname as clientSurname
                                    , client.name as clientName
                                    , client.patronamic as clientPatronamic
                                    , employee.surname as EmployeeSurname
                                    , employee.name as EmployeeName
                                    , employee.patronamic as EmployeePatronamic
                                    , service.date_start_repairs as start 
                                    , service.date_finish_repairs as finish 
                                    , price_list_id
                                    , service.state as serviceState
                                FROM
                                    service
                                JOIN (car join owner on car.owner_id = owner.id) on service.car_id = car.id
                                JOIN CLIENT ON service.client_id = CLIENT.id
                                JOIN employee ON service.employee_id = employee.id
                                WHERE
                                    service.state = '1'
                                ORDER BY
                                    service.id`, 
                        (err, rows) => {
                                console.log(err === true?'Error query': 'Query success')
                                res.send(rows)
                        })
    
            } catch(e){
                console.log(e);
            }
            break;
        case '2':
            try{
                await db.query(`SELECT
                                    service.id AS id
                                    , car.mark
                                    , car.gos_number
                                    , owner.type
                                    , client.surname as clientSurname
                                    , client.name as clientName
                                    , client.patronamic as clientPatronamic
                                    , employee.surname as EmployeeSurname
                                    , employee.name as EmployeeName
                                    , employee.patronamic as EmployeePatronamic
                                    , service.date_start_repairs as start 
                                    , service.date_finish_repairs as finish 
                                    , price_list_id
                                    , service.state as serviceState
                                FROM
                                    service
                                JOIN (car join owner on car.owner_id = owner.id) on service.car_id = car.id
                                JOIN CLIENT ON service.client_id = CLIENT.id
                                JOIN employee ON service.employee_id = employee.id
                                WHERE
                                    service.state = '2'
                                ORDER BY
                                    service.id`, 
                        (err, rows) => {
                                console.log(err === true?'Error query': 'Query success')
                                res.send(rows)
                        })
    
            } catch(e){
                console.log(e);
            }
            break;
        case '3':
            try{
                await db.query(`SELECT
                                    service.id AS id
                                    , car.mark
                                    , car.gos_number
                                    , owner.type
                                    , client.surname as clientSurname
                                    , client.name as clientName
                                    , client.patronamic as clientPatronamic
                                    , employee.surname as EmployeeSurname
                                    , employee.name as EmployeeName
                                    , employee.patronamic as EmployeePatronamic
                                    , service.date_start_repairs as start 
                                    , service.date_finish_repairs as finish 
                                    , price_list_id
                                    , service.state as serviceState
                                FROM
                                    service
                                JOIN (car join owner on car.owner_id = owner.id) on service.car_id = car.id
                                JOIN CLIENT ON service.client_id = CLIENT.id
                                JOIN employee ON service.employee_id = employee.id
                                WHERE
                                    service.state = '3'
                                ORDER BY
                                    service.id`, 
                        (err, rows) => {
                                console.log(err === true?'Error query': 'Query success')
                                res.send(rows)
                        })
    
            } catch(e){
                console.log(e);
            }
            break;
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

    // if(req.body.id !== undefined & req.body.state !== undefined){
    //     try{
    //         await db.query(`UPDATE service 
    //                         SET service.state='${req.body.state}' 
    //                         WHERE service.id = '${req.body.id}'`)
    //         } catch(e){
    //             console.log(e);
    //         }
    //     res.send({"id":`${req.body.id}`,"state":`${req.body.state}`})
    //     res.send(`Данные успешно изменены!!!`)
    // }
   
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
          

   
   
})// post Update

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
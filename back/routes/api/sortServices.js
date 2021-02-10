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
   
router.get('/',jsonParser, async (req, res) => {
        try{
            // 1. Сортировка по id
            // 2. Сортировка по Марке авто
            // 3. Сортировка по ФИО клиента
            // 4. Сортировка по ФИО Сотрудника
            // 5. Сортировка по дате начала ремонта
            // 6. Сортировка по дате окончания ремонта
    
            let value = req.query.myKey
            if(!value){
                console.log(`Ошибка ${req.query.myKey}`);
                console.log('Значение введено не верно или ошибка');
            } else {
                console.log(`Значение получено ${req.query.myKey}`);
                switch(value){
                    case '1':
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
                                        ORDER BY service.id `,
                            (err, rows) => { 
                                res.send(rows) 
                        })
                        break
                    case '2':
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
                                        order by mark`,
                            (err, rows) => { 
                                res.send(rows) 
                        })
                        break
                    case '3': 
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
                                                order by clientSurname`,
                                    (err, rows) => { 
                                        res.send(rows) 
                                })
                        break
                    case '4':
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
                                                order by EmployeeSurname`,
                                    (err, rows) => { 
                                        res.send(rows) 
                                })
                        break
                    case '5':
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
                                                order by start`,
                                    (err, rows) => { 
                                        res.send(rows) 
                                })
                        break
                    case '6':
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
                                                order by finish`,
                                    (err, rows) => { 
                                        res.send(rows) 
                                })
                        break;
                    default:
                        console.log("Ошибка ввода")
                        break
                    }
                }
            } catch(e){} // try-catch
        } //callback
    )  // get
} catch(e){ }
   


module.exports = router
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
                            WHERE service.state = 1
                            order by id
                   `,
                            (err, rows) => { 
                                console.log(err === true ? 'Error query' : 'Query success: case 1'); 
                                res.send(rows) 
                        })
                                    break
                    case '2':
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
                            WHERE service.state = 1
                            order by mark
                   `,
                            (err, rows) => { 
                                console.log(err === true ? 'Error query' : 'Query success: case 2'); 
                                res.send(rows) 
                        })
                                    break
                    case '3': 
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
                            WHERE service.state = 1
                            order by clientSurname
                           `,
                                    (err, rows) => { 
                                        console.log(err === true ? 'Error query' : 'Query success: case 3'); 
                                        res.send(rows) 
                                })
                        break
                    case '4':
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
                            WHERE service.state = 1
                            order by EmployeeSurname
                            `,
                                    (err, rows) => { 
                                        console.log(err === true ? 'Error query' : 'Query success: case 4'); 
                                        res.send(rows) 
                                })
                        break
                    case '5':
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
                            WHERE service.state = 1
                            order by start
                            `,
                                    (err, rows) => { 
                                        console.log(err === true ? 'Error query' : 'Query success: case 5') 
                                        res.send(rows) 
                                })
                        break
                    case '6':
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
                            WHERE service.state = 1
                            order by finish
                            `,
                                    (err, rows) => { 
                                        console.log(err === true ? 'Error query' : 'Query success: case 6'); 
                                        res.send(rows) 
                                })
                        break;
                    default:
                        console.log("Ошибка ввода")
                        break
                    }
                }
            } catch(e){ console.log(e) } // try-catch
        } //callback
    )  // get
} catch(e){ 
    console.log(e)
}
   


module.exports = router
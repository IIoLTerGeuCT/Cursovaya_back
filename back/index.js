const express = require('express') // Подключаем express 
const app = express()


const body_parser = require('body-parser')
const cors = require('cors')

app.use(body_parser.json())
app.use(cors())


// Порт для прослушки
const port = process.env.PORT || 3001
// Старт сервера
app.listen(port, () => {
    console.log( `Server started ${port}`);
})


// Регистрация путей

const priceLists = require('./routes/api/priceLists')
app.use('/api/priceLists', priceLists)


const clients = require('./routes/api/clients')
app.use('/api/clients', clients)

const employees = require('./routes/api/employees')
app.use('/api/employees', employees)

const cars = require('./routes/api/cars')
app.use('/api/cars', cars)

const owners = require('./routes/api/owners')
app.use('/api/owners', owners)

const services = require('./routes/api/services')
app.use('/api/services', services)

const sortServices = require('./routes/api/sortServices')
app.use('/api/sortServices', sortServices)










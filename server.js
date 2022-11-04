const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const TestModel = require('./models/schema')


//set mongoose connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING)
        console.log(`Connected to database: ${mongoose.connection.name}`)
    } catch (err) {
        console.log('Failed to connect', err)
    }
}
connectDB()

//Set middleware to use
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

//set the server request for the server from ejs
app.get('/', async (request, response)=> {
    try {
        //get data from DB - specific collection
        const content = await TestModel.find()
        console.log(content)
        //after data is found, then render ejs and pass the data so that i can render on the page
        response.render('index.ejs', {contentKey: content})

    } catch(error){
        response.status(500).send({message: error.message})
    }
})

//Set port to initialize our server
app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
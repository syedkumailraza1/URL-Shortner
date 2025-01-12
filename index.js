const express = require('express')
const {ConnectDB} = require('./DB/connection.js')
const app = express()
const env = require('dotenv').config()
const urlRoute = require('./Router/url.router.js')
const port = process.env.PORT
const cors = require('cors')

app.use(express.json())

app.use('/',urlRoute)
app.use(cors())

ConnectDB().then(()=>{console.log("DB Connected");
})



app.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})
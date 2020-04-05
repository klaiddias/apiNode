const express = require('express')
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

userRoute(app)

app.get('/', (req, res) => {
    res.send('Hello App')
})

app.listen(port, () => console.log(`Application runing in port ${port}`))
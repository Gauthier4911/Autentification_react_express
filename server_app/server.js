const express = require('express')
const app = express()
const database = require('./database/db')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const session = require('express-session')
const appRoutes = require('./routes/web')
const cors = require('cors')
const port = 3000

app.use(cors())

app.use(fileUpload())

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }))
}
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', appRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const passport = require('passport')
const cors = require('cors')
const path = require("path");
const morgan = require('morgan');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')



const models = require('./models/models')
const sequelize = require('./db')
const passportjs = require('./middleware/passport.jwt')
const posts = require('./routes/post.route')
const auth = require('./routes/auth.route')



const app = express()

app.use(passport.initialize())
passportjs(passport)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'));
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))


app.use('/api/post', posts)
app.use('/api/auth', auth)





const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('DB connect')
    }catch (e){
        console.log(e)
    }
}



start()




module.exports = app
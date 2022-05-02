const app = require('./app')
const config = require('config')
const port = process.env.port || config.get('port')


app.listen(port, () => console.log(`Server started port: ${port}`))
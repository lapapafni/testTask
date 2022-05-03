const app = require('./app')
const config = require('config')
const port = process.env.PORT || 8001


app.listen(port, () => console.log(`Server started port: ${port}`))
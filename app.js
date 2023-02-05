require('dotenv').config()
require('express-async-errors')
const connectDb = require('./db/connect-db')

const productsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const express = require('express')
const app = express()

//middleware 
app.use(express.json())

//routes
app.use('/api/products', productsRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.APP_PORT ?? 5050

app.listen(port, () => {
    connectDb(process.env.MONGO_URI)
    console.log(`app is listening to the port ${port}`)
})
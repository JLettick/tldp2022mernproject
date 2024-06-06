import 'dotenv/config'
import init_db from './utilities/initialize.js'
import express from 'express'
import accountRouter from './routes/account-routes.js'
import customerRouter from './routes/customer-routes.js'
import eventRouter from './routes/event-routes.js'
import registrationRouter from './routes/registration-routes.js'
import { logger } from './utilities/logger.js'
import morgan from 'morgan';

logger.stream = {
    write: function(message, encoding) {
        logger.info(message)
    }
}

const stream = {
    write: (message) => {
        logger.info(message.trim());
    }
}
init_db()

var app = express()
app.use(express.json())

app.use(morgan("combined", {stream}))

app.use('/api/accounts', accountRouter)
app.use('/api/customers', customerRouter)
app.use('/api/events', eventRouter)
app.use('/api/registrations', registrationRouter)

app.listen('8000');

console.log('server started') 
import Customer from '../models/customer.js'
import bcrypt from 'bcrypt'
import { logger } from '../utilities/logger.js'


const accountController = {

  login: async function(req, res) {
    const user = await Customer.findOne({CUSTOMER_NAME: req.body.username})
      if (!user){
        logger.warning("User attempted to log into an user that doesn't exist")
        res.sendStatus(401);
    } else{
      const compare = await bcrypt.compare(req.body.password, user.PASSWORD);
      if (compare){
        logger.info("User Successfully Logged In")
        res.sendStatus(200);
      }else{
        logger.info("User Failed to Login")
        res.sendStatus(401);

      }
    }

  },

  register: async function(req, res) {
    const password = await bcrypt.hash(req.body.password, 8);
    console.log('password: ', password);
    Customer.create({ 
      CUSTOMER_NAME: req.body.name, 
      PASSWORD: password,
      EMAIL: req.body.email
    }).then(
      () => {
        logger.info("New user registered")
        res.sendStatus(201)
      }, // OK
      () => res.sendStatus(500) // OK
    ).catch((err) => {
      logger.error("Error occured registering user")
    })
  }

}

export default accountController
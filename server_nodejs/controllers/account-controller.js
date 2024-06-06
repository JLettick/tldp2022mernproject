import Customer from '../models/customer.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import 'dotenv/config'

const accountController = {

  login: async function(req, res) {
    const user = await Customer.findOne({CUSTOMER_NAME: req.body.username})
      if (!user){
      res.sendStatus(401);
    } else{
      const compare = await bcrypt.compare(req.body.password, user.PASSWORD);
      
      delete user.password
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {expiresIn: "1h"});
      if (compare){
        res.cookie("token", token, {
          httpOnly: true
        });
        res.sendStatus(200);
      }else{
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
      () => res.sendStatus(201), // OK
      () => res.sendStatus(500) // OK
    )
  }

}

export default accountController
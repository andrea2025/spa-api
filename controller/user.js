const bcrypt = require('bcryptjs');
const User = require('../model/user');
const dotenv = require('dotenv').config();
const salt = 10;
const jwt = require('jsonwebtoken');


const userRegister = async (req, res, next) =>{
    try {
      const { name, email, password} = req.body;
      const data = await User.findOne({ email });
      if (data) {
        return res.status(400).json({
          message: "User has been registered already"
        });
      } else {
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({
          name,
          password: hash,
          email
        });
        await newUser.save();
        return res.status(201).json({
          message:"registered Successfully"
        })
      }
    } catch (err) {
      return next(err);
    }
  };

  const userLogin = async (req, res) => {
 
    try {
      const { email, password } = req.body;
      const data = await User.findOne({ email });
      console.log(data);
      if (!data) {
        return res.status(401).json({
          message: "User doesn't exist"
        });
      } else {
          const passwordChecked = await bcrypt.compare(password, data.password);
        if (!passwordChecked) {
          return res.status(401).json({
            message: "Invalid Email/password"
          });
          } else {
            const token = jwt.sign({ email: data.email }, process.env.SECRET, { expiresIn: '7h'});
           
            return res.status(200).json({
              message:"You have been login Successfully",
              token
            })
           
          }
        }
      
    } catch(err) {
      return next(err);
    }
  }

// const userDisplay = (req, res, next) => {
//     User.find((err, data) => {
//         if (err) return next (err)
//         res.status(200).json({
//             message:"users return successfully",
//             data
//         })
    
//     })
// }



module.exports = { userRegister, userLogin};
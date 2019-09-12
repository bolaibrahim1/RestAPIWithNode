const router = require('express').Router();
const bcrypt = require('bcryptjs');
//Import JWT
const jwt = require('jsonwebtoken');
// Import our User model
const User = require('../model/User');
// Import validations
const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body;
         // Now lets validate the User Data
        const {error} = registerValidation(req.body);

        if(error){
            return res.status(400).send(error.details[0].message);
        } else {

            //First let's check if user exist or Not
            const emailExist = await User.findOne({email: email});
            if(emailExist){
                return res.status(400).send("Email already exist.");
            }

            // Hash the password for security
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Save User
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            });

            const newUser = await user.save();
            res.send({id: newUser._id, name: newUser.name, email:newUser.email});
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }

   
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        // Now lets validate the User Data
        const {error} = loginValidation(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        } else 
        {
            //First let's check if user exist or Not
            const user = await User.findOne({email: email});
            if(!user){
                return res.status(400).send("This email is not found.");
            }
            // Check if the password is correct
            const validPassword = await bcrypt.compare(password, user.password);
            if(!validPassword) {
                return res.status(400).send("Incorrect password");
            }

            const token = jwt.sign({_id: user._id}, process.env.APP_SECRET);
            res.header('access_token', token)
                .send({
                status:'success', 
                user: {id: user._id, name: user.name, email:user.email}, 
                _token:token
            });
        }
    } catch (err) {
        return res.status(400).send(err);
    }
});

module.exports = router;
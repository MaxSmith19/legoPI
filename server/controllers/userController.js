const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const saltrounds = 10;


// GET a single user by email and password 
// @Params req(uest), res(ponse)
// @Desc Req ideally contains the email and password of the user.
// @returns (tbd) a JWT or a session token.
const loginUser = async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(bcrypt.compare(req.body.password, user.password)){
            res.status(200).json(user);
        }else{
            res.status(404).json({ message: 'User not found' });
        }
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

// GET a single user by ID
//@Params req(uest), res(ponse) 
// Req ideally contains the ID of the user
// @returns the user object in JSON.
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST a new user
// @Params req(uest), res(ponse)
// @Desc Req ideally contains the name, email and password,  of the user. 
// @Returns the user object in JSON.
// TODO - research whether confirmation passowrd is frontend or backend
const createUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, saltrounds)
    }); 

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT a user by ID
// @Params req(uest), res(ponse)
// @Desc Req ideally contains the ID of the user, and whatever fields need to be updated.
// @Returns the updated user object in JSON.
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE a user by ID
// @Params req(uest), res(ponse)
// Baseplate, may not be needed.
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.remove();
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports= {
    loginUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
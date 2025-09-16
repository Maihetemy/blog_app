const express = require('express');
const { login, signUp, updateUser, getAllUsers, getProfile, searchUsers, deleteUser } = require('./user.service');
const router = express.Router(); // like app in index.js


//get all users
router.get('/', getAllUsers);

// sign up route
router.post('/sign_up', signUp);

// login route
router.post('/login', login);

//update users
router.patch('/update_user/:id', updateUser);

//get profile
router.get('/profile/:id', getProfile);

//search users
router.get('/search', searchUsers);

//delete user
router.delete('/delete_user/:id', deleteUser);

module.exports = { userRouter: router };
// export this router to use in index.js
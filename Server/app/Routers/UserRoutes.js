//user routes

const express = require ("express");
const multer = require('multer');


const UserController = require('../Controllers/UserController');

const router = express.Router();


router.post('/user', UserController.createUser); // Create user 
router.get('/users',UserController.getAllUsers); // Get all users 
router.get('/user/:userId',UserController.getUserById); // Get user by userId 
router.get('/user',UserController.groupByRole); // Get user by user type
router.put('/user/:userId',UserController.updateUser); // Update a user 
router.delete('/user/:userId',UserController.deleteUser); // Delete a user 
router.put('/change-password/:userId',UserController.updatePassword); // update password 

module.exports = router;

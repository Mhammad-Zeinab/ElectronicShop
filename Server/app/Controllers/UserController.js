//UserController

const User = require ('../Models/User');
const bcrypt = require('bcryptjs');


const UserController = {};

// Create user
UserController.createUser = async (req, res) => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.json({ message: 'Email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Get the current year as a 2-digit string (e.g. "21" for 2021)
    const year = new Date().getFullYear().toString().slice(-2);

    // Create a new user
    const newUser = new User({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      userType: req.body.userType
    });

    const savedUser = await newUser.save();

    res.status(201).json({ savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
//get All users
UserController.getAllUsers = async (req, res) =>{
  try{
      const users = await User.find();
      res.status(200).json(users);
  }catch(error){
      console.log(error.message);
      res.status(500).json( {message: error.message});
  }
};
// Get user by userId
UserController.getUserById = async (req, res) =>{
  try{
      const userId = req.params.userId;
      const user = await User.findById({userId});
      res.status(200).json(user);
  }catch(error){
      console.log(error.message);
      res.status(500).json( {message: error.message});
  }
};
//get user by Type
UserController.groupByRole = async (req, res) => {
  try {
    const userType = req.body.userType;
    const users = await User.find({ userType: userType });
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
// Update user
UserController.updateUser = async (req, res) => {
  try {
    // Find user by userId
    const userId = req.params.userId;
    const user = await User.findOne({ userId });

    // If user not found, return 404 Not Found response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data
    user.name = req.body.name || user.name;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;

    // If password is provided, hash it and update it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    // Save updated user to database
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
//update password 
UserController.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    
    // Find the user by their userID
    const userId = req.params.userId;
    const user = await User.findOne({ userId: userId });

    // Check if the provided old password matches the stored password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect old password' });
    } else{

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      res.json({ message: 'Password changed successfully' });
    
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
// Delete user
UserController.deleteUser = async (req, res) => {
  try {

    // Find user by userId
    const user = await User.findByIdAndDelete( req.params.userId );

    // If user not found, return 404 Not Found response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = UserController;
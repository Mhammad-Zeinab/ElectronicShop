//LogRoutes

const express = require ('express');
const LogController = require ('../Controllers/LogController')
const router = express.Router();

router.post('/login',LogController.login); // Log In
router.post('/logout',LogController.logout); //Log out

module.exports = router;
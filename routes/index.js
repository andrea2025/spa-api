var express = require('express');
var router = express.Router();
var auth = require('../controller/user');

/* GET home page. */
+

router.post('/register', auth.userRegister)

router.post('/login', auth.userLogin)

// router.get('/all', auth.userDisplay)


module.exports = router;

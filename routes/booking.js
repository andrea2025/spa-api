var express = require('express');
var router = express.Router();
var bookingSpa = require('../controller/booking')
var verify = require('../middleware/token')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

 router.post('/', verify, bookingSpa.BookingEntry)

 router.put('/:id',  bookingSpa.BookingUpdate)

 router.delete('/:id', verify, bookingSpa.BookingDelete)

 router.get('/all', bookingSpa.BookingDisplay)
 
 router.get('/:id', bookingSpa.bookOne)


module.exports = router;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    name: String,
    number: { type: Number },
    email: { type: String},
    date:{type:String},
    time:{type:String},
    treatment:{type:String},
    msg:{type:String},
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema); 
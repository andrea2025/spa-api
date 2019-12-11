const Booking = require("../model/bookings");
const dotenv = require("dotenv").config();

const BookingEntry = async (req, res, next) => {
  const { name, number, email, date, time, treatment, msg } = req.body;
  try {
    const newEntry = new Booking({
      name,
      number,
      email,
      date,
      time,
      treatment,
      msg
    });
    await newEntry.save();
    return res.status(201).json({
      message: "Booking completed"
    });
  } catch (err) {
    return next(err);
  }
};

const BookingUpdate = async (req, res,next) => {
const { date, time, treatment, msg } = req.body;
try{
        id = req.params.id;
        await Booking.findOne({ _id: id }, (err, data) => {
            if (err) next(err);
            if (!data) {
                return res.status(404).json({
                    message: "Booking doesn't exist"
                })
            } else {
                if (date) {
                    data.date = date;
                }
                if (time) {
                    data.time = time;
                }
                if (treatment) {
                    data.treatment = treatment;
                }
                if (msg) {
                    data.msg = msg;
                }
                data.save((err, editedBooking) => {
                    if (err) {
                        next(err)
                    } else {
                        res.status(200).send(editedBooking);
                    }
                })
            }
        })

      }catch(err){
        return next(err);
      }

      };


const BookingDelete = async (req, res,next) => {
  try {
    const id = req.params.id
      await Booking.remove({ _id: id});
        return res.status(200).json({
          message: "Appointment has been Deleted"
        });
  
    
  } catch(err) {
    return next(err);
  }
};

const BookingDisplay = async (req, res, next) => {
  try {
    const data = await Booking.find({}).sort({createdAt:-1});
    return res.status(200).json({
      data
    });
  } catch(err) {
    return next(err);
  }
};

const bookOne = async(req, res, next) => {
  try {
      const id = req.params.id
      const data = await Booking.findOne({_id: id });
      res.status(200).json({ data });
  } 
  catch(err) {
      return next(err)
  }
}

module.exports = { BookingEntry, BookingUpdate, BookingDelete, BookingDisplay,bookOne };

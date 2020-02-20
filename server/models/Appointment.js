const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new mongoose.Schema({
  date: String,
  time: String,
  comment: String,
  appointmentType: String,
  dateTime: {
    type: String,
    unique: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
  Appointment
};

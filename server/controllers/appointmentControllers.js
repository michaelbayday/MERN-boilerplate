const { Appointment, User } = require("../models/Appointment");
const moment = require("moment");

const appointmentControllers = {};

appointmentControllers.deleteAppointment = (req, res, next) => {
  Appointment.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    if (err || result === null) {
      res.locals.error = "Updating appointment failed";
    }
    return next();
  });
};

appointmentControllers.updateAppointment = (req, res, next) => {
  const { comment } = req.body;
  let { date, time } = req.body;
  let amPm = time.slice(time.length - 2, time.length);
  if (amPm === "PM" && Number(time.slice(0, 2)) !== 12) {
    let hour = (Number(time.slice(0, 2)) + 12).toString().padStart(2, "0");
    time = hour + time.slice(2);
  }
  time = time.slice(0, 5);
  date = date.slice(0, 33);
  date = moment(date).format("YYYY-MM-DD");
  const dateTime = date + " " + time;
  Appointment.findOneAndUpdate(
    { _id: req.params.id },
    { time, date, dateTime, comment },
    (err, result) => {
      if (err || result === null) {
        res.locals.error = "Updating appointment failed";
      }
      return next();
    }
  );
  // Appointment.findByIdAndUpdate(
  //   req.params.id,
  //   { time, date, comment, dateTime },
  //   (err, appointment) => {
  //     console.log(appointment);
  //     return next();
  //   }
  // );
};

appointmentControllers.searchUser = (req, res, next) => {
  if (!req.query.name || !req.query.email) {
    next({ err: "issue with request body" });
  }
  const { name, email } = req.query;
  User.findOne({ name, email }, (err, user) => {
    if (user === null) {
      return res.status(400).json([]);
    } else {
      res.locals.user = user;
      return next();
    }
  });
};

appointmentControllers.getAppointments = (req, res, next) => {
  if (res.locals.user) {
    Appointment.find({ user_id: res.locals.user.id }, (err, appointments) => {
      const sortedAppointments = appointments.sort((a, b) => {
        return a.dateTime > b.dateTime ? 1 : b.dateTime > a.dateTime ? -1 : 0;
      });
      res.locals.appointments = sortedAppointments;
      return next();
    });
  } else {
    Appointment.find({}, (err, appointments) => {
      const sortedAppointments = appointments.sort((a, b) => {
        return a.dateTime > b.dateTime ? 1 : b.dateTime > a.dateTime ? -1 : 0;
      });
      res.locals.appointments = sortedAppointments;
      return next();
    });
  }
};

appointmentControllers.getUsers = (req, res, next) => {
  if (res.locals.appointments) {
    User.find({}, (err, users) => {
      const usersObj = {};
      users.forEach(el => {
        usersObj[el._id] = el;
      });
      res.locals.users = usersObj;
      return next();
    });
  }
};

appointmentControllers.createAppointmentsObject = (req, res, next) => {
  if (res.locals.users && res.locals.appointments) {
    const finalAppointments = {};
    const appointments = res.locals.appointments;
    const users = res.locals.users;

    appointments.forEach(el => {
      const tempAppointment = Object.assign({}, el._doc);
      tempAppointment.customerName = users[el.user_id].name;
      tempAppointment.customerEmail = users[el.user_id].email;
      tempAppointment.customerPhone = users[el.user_id].phone;
      finalAppointments[el._id] = tempAppointment;
    });
    res.locals.finalAppointments = finalAppointments;
    return next();
  }
};

appointmentControllers.createAppointment = (req, res, next) => {
  // try {
  if (!req.body) {
    next({ err: "issue with request body" });
  }
  const { name, email, phone, comment } = req.body;
  let { date, time } = req.body;
  let amPm = time.slice(time.length - 2, time.length);
  if (amPm === "PM" && Number(time.slice(0, 2)) !== 12) {
    let hour = (Number(time.slice(0, 2)) + 12).toString().padStart(2, "0");
    time = hour + time.slice(2);
  }
  time = time.slice(0, 5);
  date = date.slice(0, 33);
  date = moment(date).format("YYYY-MM-DD");
  const dateTime = date + " " + time;
  User.findOne({ name, email }, (err, result) => {
    if (result === null) {
      User.create({ name, email, phone }, (e, newUser) => {
        Appointment.create(
          { date, time, user_id: newUser.id, comment, dateTime },
          (error, newAppointment) => {
            if (error) {
              res.locals.error =
                "Issue creating appointment. Make sure there are no appointment conflicts";
            } else {
              res.locals.newAppointment = newAppointment;
            }
            return next();
          }
        );
      });
    } else {
      Appointment.create(
        { date, time, user_id: result.id, comment, dateTime },
        (error, newAppointment) => {
          if (error) {
            console.log(error);
            return res.status(400).json("Error in appointment creation");
          }
          res.locals.newAppointment = newAppointment;
          return next();
        }
      );
    }
  });

  //   await User.findOne({ name, email })
  //     .exec()
  //     .then(async result => {
  //       console.log(result);
  //       if (result !== null) {
  //         user = result;
  //         return;
  //       } else {
  //         return await User.create({ name, email, phone });
  //       }
  //     })
  //     .exec()
  //     .then(newUser => {
  //       user = newUser;
  //       return;
  //     });
  //   Appointment.create({ time: date, user_id: user.id })
  //     .exec()
  //     .then(newAppointment => {
  //       res.locals.newAppointment = newAppointment;
  //       return next();
  //     });
  // } catch (err) {
  //   next(err);
  // }
};

module.exports = appointmentControllers;

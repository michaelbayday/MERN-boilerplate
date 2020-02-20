const { Appointment, User } = require("../../models/Appointment");
const appointmentControllers = require("../../controllers/appointmentControllers");

module.exports = app => {
  app.get(
    "/api/appointments/user",
    appointmentControllers.searchUser,
    appointmentControllers.getAppointments,
    appointmentControllers.getUsers,
    appointmentControllers.createAppointmentsObject,
    (req, res, next) => {
      res.json(res.locals.finalAppointments);
    }
  );
  app.get("/api/appointments", (req, res, next) => {
    Appointment.find({})
      .exec()
      .then(appointments => res.json(appointments))
      .catch(err => next(err));
  });

  app.put(
    "/api/appointments/:id",
    appointmentControllers.updateAppointment,
    (req, res, next) => {
      console.log("finalmiddleware");
      if (res.locals.error) {
        res.status(400).json(res.locals.error);
      } else {
        res.status(200).json("Successfully Updated Appointment");
      }
    }
  );

  app.post(
    "/api/appointments",
    appointmentControllers.createAppointment,
    (req, res, next) => {
      if (res.locals.error) {
        res.status(400).json(res.locals.error);
      } else {
        res.status(200).json("Successfully Added Appointment");
      }
    }
  );

  // app.delete("/api/appointments/:id", function(req, res, next) {
  //   Counter.findOneAndDelete({ _id: req.params.id })
  //     .exec()
  //     .then(counter => res.json())
  //     .catch(err => next(err));
  // });

  // app.put("/api/appointments/:id/increment", (req, res, next) => {
  //   Counter.findById(req.params.id)
  //     .exec()
  //     .then(counter => {
  //       counter.count++;

  //       counter
  //         .save()
  //         .then(() => res.json(counter))
  //         .catch(err => next(err));
  //     })
  //     .catch(err => next(err));
  // });
};

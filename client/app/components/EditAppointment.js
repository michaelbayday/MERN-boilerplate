import React, { useState } from "react";
import { Modal, Form, Button, Col } from "react-bootstrap";
import DatePicker from "react-date-picker";
import moment from "moment";
import { username, password } from "../../environment";

const EditAppointmentModal = ({
  show,
  toggleEditModal,
  currentAppointment,
  storeUserAppointmentInformation,
  editCurrentDate
}) => {
  const date = moment(currentAppointment.date).toDate();
  const comment = currentAppointment.comment;
  const time = currentAppointment.time
    ? moment(currentAppointment.time, "HH:mm").format("hh:mm A")
    : "8:00 AM";

  const editAppointment = event => {
    event.preventDefault();
    const form = event.target;
    const appointmentBody = {
      time: form.formTime.value,
      date: date,
      comment: form.formComments.value
    };
    fetch(`/api/appointments/${currentAppointment._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentBody)
    })
      .then(response => response.json())
      .then(data => {
        fetch(
          `/api/appointments/user?name=${currentAppointment.customerName}&email=${currentAppointment.customerEmail}`,
          {
            headers: { "Content-Type": "application/json" }
          }
        )
          .then(resp => resp.json())
          .then(appointments => {
            storeUserAppointmentInformation(appointments);
            toggleEditModal(false);
            const twilioInformation = {
              Body: `This is confirming your appointment on ${moment(
                date
              ).format("MMMM Do YYYY")} at ${appointmentBody.time}`,
              To: currentAppointment.customerPhone,
              From: "+14243873507"
            };
            let formBody = [];
            for (let property in twilioInformation) {
              const encodedKey = encodeURIComponent(property);
              const encodedValue = encodeURIComponent(
                twilioInformation[property]
              );
              formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            let headers = new Headers();
            headers.set(
              "Authorization",
              "Basic " + btoa(username + ":" + password)
            );
            headers.set(
              "Content-Type",
              "application/x-www-form-urlencoded;charset=UTF-8"
            );
            fetch(
              "https://api.twilio.com/2010-04-01/Accounts/AC63fbb74c462c353b2ce5fe82a343534c/Messages.json",
              {
                method: "POST",
                body: formBody,
                headers: headers
              }
            )
              .then(res => res.json())
              .then(data => {
                console.log("successful text message");
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteAppointment = event => {
    event.preventDefault();
    const time = document.querySelector("#formTime").value;
    fetch(`/api/appointments/${currentAppointment._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(response => {
        fetch(
          `/api/appointments/user?name=${currentAppointment.customerName}&email=${currentAppointment.customerEmail}`,
          {
            headers: { "Content-Type": "application/json" }
          }
        )
          .then(resp => resp.json())
          .then(appointments => {
            storeUserAppointmentInformation(appointments);
            toggleEditModal(false);
            const twilioInformation = {
              Body: `This is confirming your appointment cancellation on ${moment(
                date
              ).format("MMMM Do YYYY")} at ${time}`,
              To: currentAppointment.customerPhone,
              From: "+14243873507"
            };
            let formBody = [];
            for (let property in twilioInformation) {
              const encodedKey = encodeURIComponent(property);
              const encodedValue = encodeURIComponent(
                twilioInformation[property]
              );
              formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            let headers = new Headers();
            headers.set(
              "Authorization",
              "Basic " + btoa(username + ":" + password)
            );
            headers.set(
              "Content-Type",
              "application/x-www-form-urlencoded;charset=UTF-8"
            );
            fetch(
              "https://api.twilio.com/2010-04-01/Accounts/AC63fbb74c462c353b2ce5fe82a343534c/Messages.json",
              {
                method: "POST",
                body: formBody,
                headers: headers
              }
            )
              .then(res => res.json())
              .then(data => {
                console.log("successful deletion");
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        toggleEditModal(false);
      }}
    >
      <Form onSubmit={editAppointment}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit appointment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              disabled
              type="name"
              placeholder="Roger Stone"
              value={currentAppointment.customerName}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              disabled
              type="email"
              placeholder="Enter email"
              value={currentAppointment.customerEmail}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              disabled
              type="phone"
              placeholder="888-888-8888"
              value={currentAppointment.customerPhone}
              required
            />
          </Form.Group>
          <Form.Row style={{ flexDirection: "row" }}>
            <Col>
              <Form.Group controlId="formDate">
                <Form.Label>Date:</Form.Label>
                <br />
                <DatePicker
                  calendarType="US"
                  value={date}
                  format="MM-dd-y"
                  onChange={val => editCurrentDate(val)}
                  minDate={new Date()}
                />
              </Form.Group>
              <Form.Group controlId="formTime">
                <Form.Label>Time:</Form.Label>
                <Form.Control as="select" defaultValue={time} required>
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="08:30 AM">08:30 AM</option>
                  <option value="08:30 AM">09:00 AM</option>
                  <option value="09:30 AM">09:30 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="12:30 PM">12:30 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="01:30 PM">01:30 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="05:30 PM">05:30 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Group controlId="formComments">
            <Form.Label>Comments:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Special Instructions"
              defaultValue={comment}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            className="btn btn-danger"
            onClick={deleteAppointment}
          >
            Cancel Appointment
          </Button>
          <Button type="submit">Edit Appointment</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditAppointmentModal;

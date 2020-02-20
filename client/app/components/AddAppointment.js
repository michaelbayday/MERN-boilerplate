import React, { useState } from "react";
import { Modal, Form, Button, Col } from "react-bootstrap";
import DatePicker from "react-date-picker";
import moment from "moment";

const AddAppointmentModal = ({ show, toggleAppointmentModal }) => {
  const submitAppointment = event => {
    event.preventDefault();
    const form = event.target;
    const appointmentBody = {
      name: form.formName.value,
      email: form.formBasicEmail.value,
      phone: form.formPhoneNumber.value,
      time: form.formTime.value,
      date: dateField,
      comment: form.formComments.value
    };
    fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentBody)
    })
      .then(res => res.json())
      .then(response => {
        const twilioInformation = {
          Body: `This is confirming your appointment on ${moment(
            dateField
          ).format("MMMM Do YYYY")} at ${appointmentBody.time}`,
          To: appointmentBody.phone,
          From: "+14243873507"
        };
        let formBody = [];
        for (let property in twilioInformation) {
          const encodedKey = encodeURIComponent(property);
          const encodedValue = encodeURIComponent(twilioInformation[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        let headers = new Headers();
        let username = "AC63fbb74c462c353b2ce5fe82a343534c";
        let password = "d5303e80bbede54b55bc3f5147391595";
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
            toggleAppointmentModal(false);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [dateField, setDate] = useState(new Date());

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        toggleAppointmentModal(false);
      }}
    >
      <Form onSubmit={submitAppointment}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add an appointment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="name" placeholder="Roger Stone" required />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control type="phone" placeholder="888-888-8888" required />
          </Form.Group>
          <Form.Row style={{ flexDirection: "row" }}>
            <Col>
              <Form.Group controlId="formDate">
                <Form.Label>Date:</Form.Label>
                <br />
                <DatePicker
                  calendarType="US"
                  value={dateField}
                  format="MM-dd-y"
                  onChange={date => setDate(date)}
                />
              </Form.Group>
              <Form.Group controlId="formTime">
                <Form.Label>Time:</Form.Label>
                <Form.Control as="select" required>
                  <option>08:00 AM</option>
                  <option>08:30 AM</option>
                  <option>09:00 AM</option>
                  <option>09:30 AM</option>
                  <option>10:00 AM</option>
                  <option>10:30 AM</option>
                  <option>11:00 AM</option>
                  <option>11:30 AM</option>
                  <option>12:00 PM</option>
                  <option>12:30 PM</option>
                  <option>01:00 PM</option>
                  <option>01:30 PM</option>
                  <option>02:00 PM</option>
                  <option>02:30 PM</option>
                  <option>03:00 PM</option>
                  <option>03:30 PM</option>
                  <option>04:00 PM</option>
                  <option>04:30 PM</option>
                  <option>05:00 PM</option>
                  <option>05:30 PM</option>
                  <option>06:00 PM</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Group controlId="formComments">
            <Form.Label>Comments:</Form.Label>
            <Form.Control type="text" placeholder="Special Instructions" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Submit Appointment</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddAppointmentModal;

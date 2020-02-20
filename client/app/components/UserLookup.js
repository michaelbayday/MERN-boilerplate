import React, { useState } from "react";
import { Modal, Form, Button, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const UserLookupModal = ({
  show,
  toggleUserLookupModal,
  storeUserAppointmentInformation
}) => {
  const history = useHistory();

  const searchUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.formName.value;
    const email = form.formBasicEmail.value;

    fetch(`/api/appointments/user?name=${name}&email=${email}`, {
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(appointments => {
        storeUserAppointmentInformation(appointments);
        history.push("/myappointments");
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
        toggleUserLookupModal(false);
      }}
    >
      <Form onSubmit={searchUser}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Look up your appointments
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
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Submit Username</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UserLookupModal;

import React from "react";
import { ListGroup } from "react-bootstrap";
import moment from "moment";

const ListComponent = ({
  appointments,
  toggleEditModal,
  storeAppointmentInformation
}) => {
  const listItems = [];
  for (let id in appointments) {
    listItems.push(
      <ListGroup.Item
        action
        onClick={() => {
          storeAppointmentInformation(id, true);
          toggleEditModal(true);
        }}
        eventKey={id}
        key={id}
      >
        {appointments[id].customerName} at{" "}
        {moment(appointments[id].time, "hh:mm").format("hh:mm A")} on{" "}
        {moment(appointments[id].date).format("MMM DD YYYY")}
      </ListGroup.Item>
    );
  }
  return <ListGroup style={{ width: "500px" }}>{listItems}</ListGroup>;
};

export default ListComponent;

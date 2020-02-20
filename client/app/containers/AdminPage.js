import React from "react";
import { connect } from "react-redux";
import ListComponent from "../components/ListComponent";
import EditAppointmentModal from "../components/EditAppointment";
import * as actions from "../actionCreators/actions";

const mapStateToProps = state => {
  return {
    appointments: state.appointments.appointments,
    showEditModal: state.appointments.showEditModal,
    currentAppointment: state.appointments.currentAppointment
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleEditModal: show => {
      dispatch(actions.toggleEditModal(show));
    },
    loadAllAppointments: appointments =>
      dispatch(actions.loadAllAppointments(appointments)),
    storeAppointmentInformation: (id, admin) => {
      dispatch(actions.storeAppointmentInformation(id, admin));
    },
    editCurrentDate: date => {
      dispatch(actions.editCurrentDate(date));
    }
  };
};

class Admin extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    fetch("/api/appointments")
      .then(res => res.json())
      .then(appointments => {
        this.props.loadAllAppointments(appointments);
      });
  }
  render() {
    return (
      <>
        <ListComponent
          toggleEditModal={this.props.toggleEditModal}
          appointments={this.props.appointments}
          storeAppointmentInformation={this.props.storeAppointmentInformation}
          admin={true}
        />
        <EditAppointmentModal
          toggleEditModal={this.props.toggleEditModal}
          show={this.props.showEditModal}
          currentAppointment={this.props.currentAppointment}
          loadAllAppointments={this.props.loadAllAppointments}
          editCurrentDate={this.props.editCurrentDate}
          admin={true}
        />
      </>
    );
  }
}

const AdminContainer = connect(mapStateToProps, mapDispatchToProps)(Admin);
export default AdminContainer;

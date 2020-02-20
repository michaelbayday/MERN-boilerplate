import React from "react";
import { connect } from "react-redux";
import ListComponent from "../components/ListComponent";
import EditAppointmentModal from "../components/EditAppointment";
import * as actions from "../actionCreators/actions";

const mapStateToProps = state => {
  return {
    appointments: state.appointments.userAppointments,
    showEditModal: state.appointments.showEditModal,
    currentAppointment: state.appointments.currentAppointment
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleEditModal: show => {
      dispatch(actions.toggleEditModal(show));
    },
    storeAppointmentInformation: (id, admin) => {
      dispatch(actions.storeAppointmentInformation(id, admin));
    },
    storeUserAppointmentInformation: array => {
      dispatch(actions.storeUserAppointmentInformation(array));
    },
    editCurrentDate: date => {
      dispatch(actions.editCurrentDate(date));
    }
  };
};

const UserManageAppointmentsComponent = props => {
  return (
    <>
      <ListComponent
        toggleEditModal={props.toggleEditModal}
        appointments={props.appointments}
        storeAppointmentInformation={props.storeAppointmentInformation}
      />
      <EditAppointmentModal
        toggleEditModal={props.toggleEditModal}
        show={props.showEditModal}
        currentAppointment={props.currentAppointment}
        storeUserAppointmentInformation={props.storeUserAppointmentInformation}
        editCurrentDate={props.editCurrentDate}
        admin={false}
      />
    </>
  );
};

const UserManageAppointmentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManageAppointmentsComponent);
export default UserManageAppointmentsContainer;

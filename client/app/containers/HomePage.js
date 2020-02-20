import React from "react";
import { connect } from "react-redux";
import * as actions from "../actionCreators/actions";
import { Button } from "react-bootstrap";
import AddAppointmentModal from "../components/AddAppointment";
import UserLookupModal from "../components/UserLookup";

const mapStateToProps = state => {
  return {
    showAppointmentModal: state.appointments.showAppointmentModal,
    showUserLookupModal: state.appointments.showUserLookupModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleAppointmentModal: show => {
      dispatch(actions.toggleAppointmentModal(show));
    },
    toggleUserLookupModal: show => {
      dispatch(actions.toggleUserLookupModal(show));
    },
    storeUserAppointmentInformation: array => {
      dispatch(actions.storeUserAppointmentInformation(array));
    }
  };
};

const Home = props => {
  return (
    <>
      <Button
        variant="primary"
        onClick={() => props.toggleAppointmentModal(true)}
      >
        Add Appointment
      </Button>
      <Button
        variant="primary"
        onClick={() => props.toggleUserLookupModal(true)}
      >
        Lookup My Appointments
      </Button>
      <AddAppointmentModal
        show={props.showAppointmentModal}
        toggleAppointmentModal={props.toggleAppointmentModal}
      />
      <UserLookupModal
        show={props.showUserLookupModal}
        toggleUserLookupModal={props.toggleUserLookupModal}
        storeUserAppointmentInformation={props.storeUserAppointmentInformation}
      />
    </>
  );
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeContainer;

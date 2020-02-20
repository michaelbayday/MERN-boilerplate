import React from "react";
import { connect } from "react-redux";
import * as actions from "../actionCreators/actions";
import { Button } from "react-bootstrap";
import AddAppointmentModal from "../components/AddAppointment";
import UserLookupModal from "../components/UserLookup";

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {};

const Admin = props => {
  return <>ello fam</>;
};

const AdminContainer = connect(mapStateToProps, mapDispatchToProps)(Admin);
export default AdminContainer;

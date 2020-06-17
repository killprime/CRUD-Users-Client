import { connect } from 'react-redux';
import React from "react";

import { axiosLoadUsers } from '../../redux/actions';
import UserForm from '../User/UserForm';

class EditUser extends React.Component {

  componentDidMount(){
    this.props.axiosLoadUsers(false, this.props.props.match.params.id);
  }

  render() {
    return (
      <UserForm type={'edit'} />
    );
  }
}

const mapDispatchToProps = {
  axiosLoadUsers
}

export default connect(null, mapDispatchToProps)(EditUser)

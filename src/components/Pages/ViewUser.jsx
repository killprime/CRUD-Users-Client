import { connect } from 'react-redux';
import React from "react";
import { Redirect } from 'react-router-dom'

import { axiosLoadUsers } from '../../redux/actions';
import UserTable from '../User/components/UserTable';


class ViewUser extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.axiosLoadUsers(false, this.props.props.match.params.id);
  }

  render() {

    if(this.props.isDelete)
    {
      return (
        <Redirect to='/' />
      )
    }

    return (
      <UserTable />
    );
  }
}

const mapDispatchToProps = {
  axiosLoadUsers
}

const mapStateToProps = state => ({
  isDelete: state.users.isDelete,
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewUser)

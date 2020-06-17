import { connect } from 'react-redux';
import React from "react";

import { setStateIsDelete, showAlert } from '../../redux/actions';
import UserList from '../User/UserList';


class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    if(this.props.isDelete)
    {
      this.props.setStateIsDelete(false);
      this.props.showAlert({ text: 'User successfully deleted' });
    }
  }

  render() {


    return (
        <div>
          <h2>Users</h2>
          <UserList />
        </div>
    );
  }
}

const mapDispatchToProps = {
  setStateIsDelete,
  showAlert
}

const mapStateToProps = state => ({
  isDelete: state.users.isDelete,
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

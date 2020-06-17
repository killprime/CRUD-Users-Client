import React from "react";

import UserForm from '../User/UserForm';

class CreateUser extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <UserForm type={'create'} />
    );

  }
}

export default CreateUser

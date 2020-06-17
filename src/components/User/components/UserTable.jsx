import { connect } from 'react-redux';
import React from "react";

import { Alert } from '../../IndependentComponents/Alert';
import { axiosLoadUsers, deleteUser } from '../../../redux/actions';
import Button from '../../IndependentComponents/Button';
import Loader from '../../IndependentComponents/Loader';
import UserView from './UserView';



class UserTable extends React.Component {

  render() {

    if(this.props.loading)
    {
      return <Loader />
    }

    if(!this.props.axiosUsers.length)
    {
      return (
        <div>
          No Users Found
        </div>
      )
    }

    return (
      <div>
        { this.props.alert && <Alert params={this.props.alert} /> }
        <table className="table table-hover table-users">
          <thead>
            <tr>
              <th scope="col">Full name</th>
              <th scope="col">Phone number</th>
              <th scope="col">Buttons</th>
            </tr>
          </thead>
          <tbody className="users">
            { this.props.axiosUsers.map(user => {

              let buttons = [];

              let key = 0;
              //this.props.deleteUser = this.props.deleteUser.bind(this);
              let deleteUser = this.props.deleteUser.bind(this);

              buttons.push(this.props.buttons.map((button) => {
                key++;

                switch (button){
                  case 'view':
                    return <Button path={'/user/' + user.id} addClass={'btn-primary'} text={'View user'} key={key} />
                  case 'edit':
                    return <Button path={'/user/' + user.id + '/edit'} addClass={'btn-success'} text={'Edit user'} key={key} />
                  case 'delete':
                    return <Button path={'#'} componentOnClick={() => {deleteUser(user.id)}} addClass={'btn-danger'} text={'Delete user'} key={key} />
                }
                // Нужно в баттон передать параметр или объект, а в самом компоненте осуществить вызов диспатчера
              }))


              return <UserView user={user} buttons={buttons} key={user.id} />
            }) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = {
  axiosLoadUsers,
  deleteUser
}

const mapStateToProps = state => ({
  axiosUsers: state.users.axiosUsers,
  paramPagination: state.users.paramPagination,
  buttons: state.users.buttons,
  alert: state.app.alert,
  loading: state.app.loading,
})

export default connect(mapStateToProps, mapDispatchToProps)(UserTable)

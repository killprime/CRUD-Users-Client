import React from "react";

import UserPaginate from './components/UserPaginate';
import UserTable from './components/UserTable';


export default class UserList extends React.Component {

  render() {
    return (
        <div>
          <div className="wrap-users-table">
            <UserTable />
          </div>
          <UserPaginate />
        </div>
    );
  }

}

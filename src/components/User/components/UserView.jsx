import React from "react";

function UserView({user, buttons}) {

  return (
    <tr>
      <td>{user.fio}</td>
      <td>{user.tel}</td>
      <td>{buttons.map(button => button)}</td>
    </tr>
  );
}

export default UserView;

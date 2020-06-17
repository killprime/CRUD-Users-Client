import React from "react";
import { Link } from 'react-router-dom'

function Button({path, addClass, text, componentOnClick}) {

  return (
    <Link to={path} onClick={(componentOnClick) ? componentOnClick : () => {} } className={'btn '+ addClass}>
      {text}
    </Link>
  );
}

export default Button;

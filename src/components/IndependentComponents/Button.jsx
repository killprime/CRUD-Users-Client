import React from "react";

function Button({path, addClass, text, componentOnClick}) {

  return (
    <a href={path} onClick={(componentOnClick) ? componentOnClick : () => {} } className={'btn '+ addClass}>
      {text}
    </a>
  );
}

export default Button;

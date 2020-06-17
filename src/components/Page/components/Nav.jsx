import React from "react";
import { useLocation, Link } from 'react-router-dom'

function Nav() {

  const location = useLocation();
  const pathname = location.pathname;
  const SECTIONS = [
    { id: 1, title: 'Create user', href: '/create-user'},
    { id: 2, title: 'Simple page', href: '/simple-page'},
  ]

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">CRUD app</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">

          {SECTIONS.map(({ id, title, href}) => (
            <li key={id} className={'nav-item ' + ( (pathname == href) ? 'active' : '' )}>
              <Link className="nav-link" to={href}>{title}</Link>
            </li>
          ))}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import LoginPage from '../LoginPage/LoginPage';
import NavLogin from '../NavLogin/NavLogin';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => {
  let orgRoute = `/organizationHome/${props.user.id}`
  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Contribute Woodbury</h2>
      </Link>
      <div className="nav-right">

        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {/* {props.user.id ? 'Home' : 'Login / Register'} */}
        {props.user.id ? <Link className="nav-link" to={orgRoute}>Home</Link> : <NavLogin className="nav-link" />}

        <Link className="nav-link" to="/calendar">
          Calendar
      </Link>
        <Link className="nav-link" to="/directory">
          Directory
      </Link>
        <a className="nav-link" target="_blank" href="https://www.woodburyfoundation.org" rel="noopener noreferrer">
          WCF
        </a>

        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.user.id && (
          <>
            {/* <Link className="nav-link" to="/info">
              Info Page
          </Link> */}
            <LogOutButton className="nav-link" />
          </>
        )}
        {/* Always show this link since the about page is not protected */}
        {/* <Link className="nav-link" to="/about">
          About
      </Link> */}
      </div>
    </div>
  );
}

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);

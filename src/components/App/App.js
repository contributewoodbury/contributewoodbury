import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import AddEvent from '../AddEvent/AddEvent';
import EditNonprofit from '../EditNonprofit/EditNonprofit';
import OrganizationHome from '../OrganizationHome/OrganizationHome';
// import NavLogin from '../NavLogin/NavLogin';
import EventDetails from '../EventDetails/EventDetails';


import './App.css';
import AddVolunteerRoles from '../AddVolunteerRoles/AddVolunteerRoles';
import Calendar from '../Calendar/Calendar';
import DirectoryPage from '../DirectoryPage/DirectoryPage';
import VolunteerSignup from '../VolunteerSignup/VolunteerSignup';
import NonprofitValidation from '../NonprofitValidation/NonprofitValidation';
import LoginPage from '../LoginPage/LoginPage';
import VolunteerList from '../VolunteerList/VolunteerList';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />

            <Route
              exact
              path="/calendar"
              component={Calendar}
            />
            {/* NavLogin Test Route */}
            <Route
              exact
              path="/signup/:id"
              component={VolunteerSignup}
              />

            <ProtectedRoute
              exact
              path="/addevent/:id"
              component={AddEvent}
            />
            <ProtectedRoute
              exact
              path="/addvolunteers"
              component={AddVolunteerRoles}
            />

            <Route
              exact
              path="/editNonprofit/:id"
              component={EditNonprofit}
            />

            <ProtectedRoute
              exact
              path="/directory"
              component={DirectoryPage}
            />

            <ProtectedRoute
              exact
              path="/validation"
              component={NonprofitValidation}
            />

            <ProtectedRoute
              exact
              path="/volunteerList/:id"
              component={VolunteerList}
            />


            <Route 
              exact
              path="/organizationHome/:id"
              component={OrganizationHome}
            />

            <Route
              exact
              path="/eventDetails/:id"
              component={EventDetails}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={LoginPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}



export default connect()(App);

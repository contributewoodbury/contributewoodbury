import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';



const styles = theme => ({
  button: {
    backgroundColor: '#457736',
    color: 'white',
    margin: '20px'
  },
  textField: {
    margin: '10px'
  },
  heading: {
    color: '#714723'
  },
  form: {
    display: 'flex-inline',
    textAlign: 'center'
  }
})

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form className={this.props.classes.form} onSubmit={this.registerUser}>
          {/* <center> */}
          <h1 className={this.props.classes.heading} >Register your nonprofit organization to post and share your upcoming events!</h1>
          <div>
            <label htmlFor="username">
              {/* Username: */}
              <TextField
                className={this.props.classes.textField}
                label="username"
                variant="outlined"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              {/* Password: */}
              <TextField
                className={this.props.classes.textField}
                label="password"
                variant="outlined"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <Button
              className={this.props.classes.button}
              type="submit"
              name="submit"
              value="Register"
            >Register</Button>
          </div>
          {/* </center> */}
        </form>
        <center>
          <Button
            type="button"
            className={this.props.classes.button}
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            back
          </Button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default withStyles(styles) (connect(mapStateToProps)(RegisterPage));


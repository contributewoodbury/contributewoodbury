import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';


const styles = theme => ({
  buttons: {
    color: 'white',
    backgroundColor: '#457736',
    margin: '0px 0px 0px 30px'
  },
  heading: {
    color: '#714723'
  },
})

class LoginPage extends Component {
  
handleBrowse = () => {
  console.log('browse nonprofits button clicked');
  this.props.history.push('/directory')
}

handleSeeEvents = () => {
  this.props.history.push('/calendar')
}

handleNonprofit = () => {
  console.log(this.props.user);
  if (this.props.user) {
    this.props.history.push(`/organizationHome/${this.props.user.id}`);
  } else {
    this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' });
  }
}



  render() {
    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <div >
        <div>
          <center>
          <h1 className={this.props.classes.heading} >What are you looking for?</h1>
          <h3 className={this.props.classes.heading}>I'm interested in participating or volunteering</h3>
          <Button className={this.props.classes.buttons} variant="contained"
                  onClick={this.handleBrowse} >Browse Nonprofits</Button>
          <Button className={this.props.classes.buttons} variant="contained"
                  onClick={this.handleSeeEvents} >See Upcoming Events</Button>
            </center>
        </div>
        <div>
          <center>
          <h3 className={this.props.classes.heading}>Are you a nonprofit? Share your upcoming events on our calendar!</h3>
              <Button className={this.props.classes.buttons} variant="contained"
                onClick={() => this.handleNonprofit()}>
                  I'm a nonprofit</Button>
          </center>
        </div>
        </div>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
  user: state.user
});

export default withStyles(styles) (connect(mapStateToProps)(LoginPage));

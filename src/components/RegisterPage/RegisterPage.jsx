import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Swal from 'sweetalert2';
import FormControl from '@material-ui/core/FormControl';



const styles = theme => ({
  heading: {
    color: '#714723',
  },
  backButton: {
    color: 'white',
    backgroundColor: '#457736',
    margin: '50px 10px 10px 30px'
  },
  submitButton: {
    float: 'right',
    color: 'white',
    backgroundColor: '#457736',
    margin: '50px 250px 10px 30px'
  },
  textFields: {
    margin: '10px 10px 10px 30px',
    width: '400px'
  },
  description: {
    margin: '10px 10px 10px 30px',
    width: '1030px'
  },
  dropdownBox: {
    width: '500px'
  },
  rootDiv: {
    margin: '0px 100px 0px 100px'
  },
})

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    description: '',
    address: '',
    city: '',
    zip_code: '',
    state: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    website: '',
    logo: '',
    category_id: 1,
    category_name: 'NONE'
  };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_CATEGORIES' });
  }

  registerUser = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: this.state
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChange = (propertyName, event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  handleDropdownChange = (propertyName1, propertyName2, event) => {
    console.log('in handle dropdown change');
    this.setState({
      ...this.state,
      [propertyName1]: event.target.value.id,
      [propertyName2]: event.target.value.name
    });
  }

  handleBackButton = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Your data has not been saved.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
      // confirmButtonColor: '#457736'
    }).then((result) => {
      if (result.value) {
        this.props.history.goBack();
      }
    });
  }

  render() {
    return (
      <div className={this.props.classes.rootDiv}>
        {JSON.stringify(this.state)}
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        {/* <center> */}
        <h1 className={this.props.classes.heading} >Register your nonprofit organization to post and share your upcoming events!</h1>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <label htmlFor="Organization Name">
              <TextField required
                className={this.props.classes.textFields}
                label="Organization Name"
                variant="outlined"
                type="text"
                name="Name"
                value={this.state.name}
                onChange={(event) => this.handleInputChange('username', event)}
              />
            </label>
            <br />
            <label htmlFor="password">
              {/* Password: */}
              <TextField required
                className={this.props.classes.textFields}
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={this.state.password}
                onChange={(event) => this.handleInputChange('password', event)}
              />
            </label>
            <TextField className={this.props.classes.description} type="text" placeholder="Organization Description" variant="outlined" multiline rows="4" onChange={(event) => { this.handleInputChange('description', event) }} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h2>
              Contact Information
                        </h2>
            <TextField className={this.props.classes.textFields} type="text" placeholder="Point of Contact Name" variant="outlined" onChange={(event) => { this.handleInputChange('contact_name', event) }} />
            <br />
            <TextField required className={this.props.classes.textFields} type="text" placeholder="Point of Contact Email" variant="outlined" onChange={(event) => { this.handleInputChange('contact_email', event) }} />
            <br />
            <TextField required className={this.props.classes.textFields} type="text" placeholder="Point of Contact Phone" variant="outlined" onChange={(event) => { this.handleInputChange('contact_phone', event) }} />
            <br />
            <TextField required className={this.props.classes.textFields} type="text" placeholder="Organization Website URL" variant="outlined" onChange={(event) => { this.handleInputChange('website', event) }} />
            <br />
            <TextField className={this.props.classes.textFields} type="text" placeholder="Organization Logo URL" variant="outlined" onChange={(event) => { this.handleInputChange('logo', event) }} />
            <br />
          </Grid>

          {/* Right Column */}
          <Grid item xs={6}>
            <h2>Organization Address</h2>
            <TextField required className={this.props.classes.textFields} type="text" label="Street Address" variant="outlined"
              value={this.state.address} onChange={(event) => this.handleInputChange('address', event)} />
            <br />
            <TextField required className={this.props.classes.textFields} type="text" label="City" variant="outlined"
              value={this.state.city} onChange={(event) => this.handleInputChange('city', event)} />
            <br />
            <TextField required className={this.props.classes.textFields} type="text" label="State" variant="outlined"
              value={this.state.state} onChange={(event) => this.handleInputChange('state', event)} />
            <br />
            <TextField required className={this.props.classes.textFields} type="text" label="Zip Code" variant="outlined"
              value={this.state.zip_code} onChange={(event) => this.handleInputChange('zip_code', event)} />
            <br />
            <FormControl variant="filled">
              <InputLabel >
                Choose Organization Category
                            </InputLabel>
              <Select
                className={this.props.classes.dropdownBox} value={this.state.category_name} onChange={(event) => { this.handleDropdownChange('category_id', 'category_name', event) }}
              >
                <MenuItem value={this.state.category_name}>
                  <em>{this.state.category_name}</em>
                </MenuItem>
                {this.props.categories.map(category => 
                  <MenuItem key={category.id} value={category}>
                  {category.name}
                  </MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button
              type="button"
              className={this.props.classes.backButton}
              onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
            >
              back
          </Button>
            <Button
              className={this.props.classes.submitButton}
              onClick={this.registerUser}
              name="submit"
              value="Register"
            >Register</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
  categories: state.nonprofit.categories,
});

export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));


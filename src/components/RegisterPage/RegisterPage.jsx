import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Swal from 'sweetalert2';
import FormControl from '@material-ui/core/FormControl';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';


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
  logoTextField: {
    margin: '10px 10px 10px 30px',
    width: '300px'
  },
  uploadButton: {
    color: 'white',
    backgroundColor: '#457736',
    margin: '20px 10px 0px 10px'
  },
  regButtons: {
    margin: '5px'
  }
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
    category_id: '',
    category_name: 'NONE',
    uploadButton: false,
    uploadFile: '',
  };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_CATEGORIES' });
  }

  registerUser = (event) => {
    event.preventDefault();
    let attempt = 'https://'
    if(this.state.website.startsWith('http') === false){
      this.setState({
        ...this.state, 
        website: attempt.concat("", this.state.website)
      })
    } 
    setTimeout(() => {
      console.log(this.state);
      if (this.state.username && this.state.password && this.state.address && this.state.city && this.state.zip_code && this.state.state && this.state.contact_email
        && this.state.contact_phone && this.state.website) {
        this.props.dispatch({
          type: 'REGISTER',
          payload: this.state
        });
      } else {
        this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
      }
    }, 200)
    // console.log(this.state);
    // if (this.state.username && this.state.password && this.state.address && this.state.city && this.state.zip_code && this.state.state && this.state.contact_email 
    //   && this.state.contact_phone && this.state.website) {
    //   this.props.dispatch({
    //     type: 'REGISTER',
    //     payload: this.state
    //   });
    // } else {
    //   this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    // }
  } // end registerUser

  handleInputChange = (propertyName, event) => {
    if (this.props.upload) {
      this.setState({
        logo: this.props.upload.url
      })
    }
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
    }).then((result) => {
      if (result.value) {
        this.props.history.goBack();
      }
    });
  }


  handleUploadButton = () => {
    console.log('uploadbutton clicked');
    this.setState({
      uploadButton: true
    })
  }

  handleCancelUpload = () => {
    this.setState({
      uploadButton: false
    })
  }

  handleFileSelection = (event) => {
    let file = event.target.files[0]
    this.setState({
      uploadFile: file
    })
    console.log('this file was uploaded:', event.target.files[0]);
  }

  handleFileUpload = () => {
    const data = new FormData();
    data.append('file', this.state.uploadFile)
    this.props.dispatch({
      type: 'IMAGE_UPLOAD',
      payload: data
    })
    this.setState({
      uploadButton: false
    })
  }

  render() {
    return (
      <div className={this.props.classes.rootDiv}>
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
            <TextField className={this.props.classes.description} type="text" placeholder="Organization Description" label="Organization Description" variant="outlined" multiline rows="4" onChange={(event) => { this.handleInputChange('description', event) }} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h2>
              Contact Information
                        </h2>
            <TextField className={this.props.classes.textFields} type="text" placeholder="Point of Contact Name" label="Contact Name"
              value={this.state.contact_name} variant="outlined" onChange={(event) => { this.handleInputChange('contact_name', event) }} />
            <br />
            <TextField required className={this.props.classes.textFields} type="text" placeholder="Point of Contact Email" label="Contact Email"
            value={this.state.contact_email} variant="outlined" onChange={(event) => { this.handleInputChange('contact_email', event) }} />
            <br />
            {this.state.uploadButton ? 
            <div className={this.props.classes.textFields} >
              <input type="file" name="file" onChange={this.handleFileSelection} />
              <button className={this.props.classes.regButtons} onClick={this.handleFileUpload}>Upload</button>
              <button className={this.props.classes.regButtons} onClick={this.handleCancelUpload} >cancel</button>
            </div>
            : 
            <>
            <TextField className={this.props.classes.logoTextField} type="text" placeholder="Organization Logo URL" label="Logo URL"
              value={this.state.logo} variant="outlined" onChange={(event) => { this.handleInputChange('logo', event) }} />
              <Button className={this.props.classes.uploadButton}
                      onClick={this.handleUploadButton} >Upload</Button>
                      </>
                      
                      }
            <br />
            <TextField required className={this.props.classes.textFields} type="text" placeholder="Organization Website URL" label="Website"
            value={this.state.website} variant="outlined" onChange={(event) => { this.handleInputChange('website', event) }} />
            <br />
            <FormControl variant="filled">
              <InputLabel >
                Choose Organization Category
                            </InputLabel>
              <Select
                className={this.props.classes.dropdownBox} value={this.state.category_name} 
                onChange={(event) => { this.handleDropdownChange('category_id', 'category_name', event) }}>
                <MenuItem value={this.state.category_name}>
                  <em>{this.state.category_name}</em>
                </MenuItem>
                {this.props.categories.map(category =>
                  <MenuItem key={category.id} value={category}>
                    {category.name}
                  </MenuItem>)}
              </Select>
            </FormControl>
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
            <PhoneInput autoComplete="true" country='US' style={{ maxWidth: '350px' }}
              placeholder="Enter phone number"
              value={this.state.contact_phone}
              onChange={value => this.setState({ ...this.state, contact_phone: value })} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button
              type="button"
              className={this.props.classes.backButton}
              onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
            >
              Back
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
  upload: state.upload.uploadedImage
});

export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));


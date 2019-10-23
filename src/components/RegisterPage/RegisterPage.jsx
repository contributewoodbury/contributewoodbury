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

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (this.props.upload !== prevProps.upload) {
      this.setState({
        logo: this.props.upload.url
      })
    }
  }


  registerUser = (event) => {
    event.preventDefault();
    let attempt = 'https://'
    if (this.state.website.startsWith('http') === false) {
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
    }, 200);
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

  demoRegister = () => {
    this.setState({
      username: 'Backpacks 4 Kids',
      password: 'backpacks',
      description: 'Backpacks 4 Kids has been serving the Woodbury Community for over 15 years now.  Joe Smith has been leading our nonprofit since its founding and is determined to make sure Woodbury\'s youth are well prepared to thrive in the Woodbury education system.  We focus on elementary age children who are adversely affected by a low economic status. Our organization helps make sure school children have enough food and supplies to do well during the school year and while on breaks. We accept donations and fundraise to purchase much needed supplies for students in need.  We often host events distributing backpacks full of supplies to those children in need at their respective schools.',
      address: 'K12345 Elementary Lane',
      city: 'Woodbury',
      zip_code: '55125',
      state: 'MN',
      contact_name: 'Joe Smith',
      contact_email: 'freefood@backpacks4kids.org',
      contact_phone: '651-233-1337',
      website: 'https://www.backpacks4kids.org',
      logo: 'http://schoolnutrition.org/uploadedImages/5_News_and_Publications/4_The_Journal_of_Child_Nutrition_and_Management/Fall_2013/bpfp-fig.png',
      category_id: 4,
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
        <h1 className={this.props.classes.heading} onClick={() => this.demoRegister()}>Register your nonprofit organization to post and share your upcoming events!</h1>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <label htmlFor="Organization Name">
              <TextField required
                className={this.props.classes.textFields}
                label="Organization Name"
                variant="outlined"
                type="text"
                name="Name"
                value={this.state.username}
                onChange={(event) => this.handleInputChange('username', event)}
              />
            </label>
            <br />
            <label htmlFor="password">
      
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
            <TextField className={this.props.classes.description} type="text" placeholder="Organization Description" label="Organization Description" variant="outlined" multiline rows="4" onChange={(event) => { this.handleInputChange('description', event) }} value={this.state.description}/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h2 className={this.props.classes.heading} >
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
            <h2 className={this.props.classes.heading} >Organization Address</h2>
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


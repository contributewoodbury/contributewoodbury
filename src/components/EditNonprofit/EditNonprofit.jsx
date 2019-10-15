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
        width: '900px'
    },
    dropdownBox: {
        margin: '10px 10px 10px 30px',
        width: '400px'
    },
    inputLabel: {
        margin: '10px 10px 10px 30px'
    },
    rootDiv: {
        margin: '0px 100px 0px 100px',
        // fontFamily: "Muli"

    },
    paragraph: {
        margin: '10px 10px 0px 30px'
    }
})


class EditNonprofit extends Component {

    componentDidMount () {
        this.props.dispatch({
            type: 'GET_NONPROFIT',
            payload: this.props.match.params.id
        })
    }

    state = {
        id: this.props.match.params.id,
        name: '',
        description: '',
        contact_name:  '',
        contact_email: '',
        contact_phone: '',
        website: '',
        logo: '',
        category_id: 1,
        category_name: 'NONE'
    }


    handleInputChange = (propertyName, event) => {
        console.log('in handle input change');
        this.setState({
            ...this.state,
            [propertyName]: event.target.value,
        });
    }

    handleEditInputChange = (propertyName, event) => {
        console.log('in handle EDIT input change');
        this.props.dispatch({
            type: 'SET_EDITS_TO_NONPROFIT',
            payload: {
                [propertyName]: event.target.value
            }
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

    handleBackButton = (id) => {
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
               
                this.props.history.goBack()
            }
        })
        console.log('back button was clicked');
       
    }

    handleSubmitButton = () => {
        let id = this.props.match.params.id
        Swal.fire({
            title: 'Success!',
            text: 'The changes you made to your nonprofit have been submitted.',
            type: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#457736'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({
                    type: 'EDIT_NONPROFIT',
                    payload: this.props.reduxStore.nonprofit.nonprofit[0]
                })
                this.props.dispatch({
                    type: 'GET_NONPROFIT',
                    payload: id
                })
                this.props.history.goBack()
            }
        })
        console.log('submit event button clicked');
        
    }


    render() {
        let dropdownMenu = {
            communityDevelopment: {
                id: 1,
                name: 'Community Development'
            },
            humanServices: {
                id: 2,
                name: 'Human Services'
            },
            health: {
                id: 3,
                name: 'Health'
            },
            youth: {
                id: 4,
                name: 'Youth'
            },
        }

        let currentNonProfit = this.props.reduxStore.nonprofit.nonprofit[0];


        return(
            <div className={this.props.classes.rootDiv}>
                <h1 className={this.props.classes.heading}>Edit Nonprofit Information</h1>
                
                <p className={this.props.classes.paragraph}>Please change any information about your organization below. After you submit your changes, your new information will be displayed in your organization page.</p>
                {/* {JSON.stringify(this.state)} */}
                <br/>
                {/* {JSON.stringify(this.props.reduxStore.nonprofit)} */}
                <br/>
                {/* {JSON.stringify(currentNonProfit)} */}

            {/* Below is conditionally rendered based on the existance of the currentNonProfit information in the reducer */}

            {   currentNonProfit &&
                <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField className={this.props.classes.textFields} type="text" label= "Name of Organization" defaultValue= {currentNonProfit.nonprofit_name}
                        placeholder="Name of Organization" variant="outlined" onChange={(event) => { this.handleEditInputChange('nonprofit_name', event) }}/>
                        <br/>
                                <TextField className={this.props.classes.description} defaultValue={currentNonProfit.description} type="text" placeholder="Organization Description" label="Organization Description" variant="outlined" multiline rows="4" onChange={(event) => { this.handleEditInputChange('description', event) }}/>
                    </Grid>

                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        {/* <h2>
                            left column
                        </h2> */}
                                <TextField className={this.props.classes.textFields} defaultValue={currentNonProfit.contact_name} type="text" placeholder="Point of Contact Name" label="Point of Contact Name" variant="outlined" onChange={(event) => { this.handleEditInputChange('contact_name', event) }}/>
                        <br />
                                <TextField className={this.props.classes.textFields} defaultValue={currentNonProfit.contact_email} type="text" placeholder="Point of Contact Email" label="Point of Contact Email" variant="outlined" onChange={(event) => { this.handleEditInputChange('contact_email', event) }}/>
                        <br />
                            <TextField className={this.props.classes.textFields} defaultValue={currentNonProfit.contact_phone} type="text" placeholder="Point of Contact Phone" label="Point of Contact Phone" variant="outlined" onChange={(event) => { this.handleEditInputChange('contact_phone', event) }}/>
                        <br />
                            <TextField className={this.props.classes.textFields} defaultValue={currentNonProfit.website} type="text" placeholder="Organization Website URL" label="Organization Website URL" variant="outlined" onChange={(event) => { this.handleEditInputChange('website', event) }}/>
                        <br />
                            <TextField className={this.props.classes.textFields} type="text" defaultValue={currentNonProfit.logo} placeholder="Organization Logo URL" label="Organization Logo URL" variant="outlined" onChange={(event) => { this.handleEditInputChange('logo', event) }}/>
                        <br />
                    </Grid>
                    <Grid item xs={6}>
                        {/* <h2>
                            right column
                        </h2> */}
                        
                            <TextField className={this.props.classes.textFields} defaultValue={currentNonProfit.address} type="text" placeholder="Street Address" label="Street Address" variant="outlined" onChange={(event) => { this.handleEditInputChange('address', event) }} />
                            <br />
                            <TextField className={this.props.classes.textFields} defaultValue={currentNonProfit.city} type="text" placeholder="City" label="City" variant="outlined" onChange={(event) => { this.handleEditInputChange('city', event) }} />
                            <br />
                            <TextField className={this.props.classes.textFields} defaultValue={currentNonProfit.state} type="text" placeholder="State" label="State" variant="outlined" onChange={(event) => { this.handleEditInputChange('state', event) }} />
                            <br />
                            <TextField className={this.props.classes.textFields} type="text" defaultValue={currentNonProfit.zip_code} placeholder="Zip Code" label="Zip Code" variant="outlined" onChange={(event) => { this.handleEditInputChange('zip_code', event) }} />
                            <br />
                            <FormControl variant="filled">
                                <InputLabel className={this.props.classes.inputLabel}>
                                    Choose Organization Category
                                </InputLabel>
                                <Select
                                    className={this.props.classes.dropdownBox} value={this.state.category_name} onChange={(event) => { this.handleDropdownChange('category_id', 'category_name', event) }}

                                >
                                    <MenuItem value={this.state.category_name}>
                                        <em>{this.state.category_name}</em>
                                    </MenuItem>
                                    <MenuItem value={dropdownMenu.communityDevelopment}>Community Development</MenuItem>
                                    <MenuItem value={dropdownMenu.health}>Health</MenuItem>
                                    <MenuItem value={dropdownMenu.humanServices}>Human Services</MenuItem>
                                    <MenuItem value={dropdownMenu.youth}>Youth</MenuItem>
                                </Select>
                            </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button className={this.props.classes.backButton} onClick={this.handleBackButton}  variant="contained">Back</Button>
                        <Button className={this.props.classes.submitButton} onClick={this.handleSubmitButton} variant="contained">Submit</Button>
                    </Grid>
                </Grid>
                </div>

               

            //         <div>
            //         <Grid container spacing={3}>
            //             <Grid item xs={12}>
            //                 <TextField className={this.props.classes.textFields} type="text"
            //                     placeholder="Name of Organization" variant="outlined" onChange={(event) => { this.handleInputChange('name', event) }} />
            //                 <br />
            //                 <TextField className={this.props.classes.description}  type="text" placeholder="Organization Description" variant="outlined" multiline rows="4" onChange={(event) => { this.handleInputChange('description', event) }} />
            //             </Grid>

            //         </Grid>

            //         <Grid container spacing={3}>
            //             <Grid item xs={6}>
            //                 <h2>
            //                     left column
            //             </h2>
            //                 <TextField className={this.props.classes.textFields} type="text" placeholder="Point of Contact Name" variant="outlined" onChange={(event) => { this.handleInputChange('contact_name', event) }} />
            //                 <br />
            //                 <TextField className={this.props.classes.textFields} value={this.state.contact_email} type="text" placeholder="Point of Contact Email" variant="outlined" onChange={(event) => { this.handleInputChange('contact_email', event) }} />
            //                 <br />
            //                 <TextField className={this.props.classes.textFields} type="text" placeholder="Point of Contact Phone" variant="outlined" onChange={(event) => { this.handleInputChange('contact_phone', event) }} />
            //                 <br />
            //                 <TextField className={this.props.classes.textFields} type="text" placeholder="Organization Website URL" variant="outlined" onChange={(event) => { this.handleInputChange('website', event) }} />
            //                 <br />
            //                 <TextField className={this.props.classes.textFields} type="text" placeholder="Organization Logo URL" variant="outlined" onChange={(event) => { this.handleInputChange('logo', event) }} />
            //                 <br />
            //             </Grid>
            //             <Grid item xs={6}>
            //                 <h2>
            //                     right column
            //             </h2>
            //                 <FormControl variant="filled">
            //                     <InputLabel >
            //                         Choose Organization Category
            //                 </InputLabel>
            //                     <Select
            //                         className={this.props.classes.dropdownBox} value={this.state.category_name} onChange={(event) => { this.handleDropdownChange('category_id', 'category_name', event) }}

            //                     >
            //                         <MenuItem value={this.state.category_name}>
            //                             <em>{this.state.category_name}</em>
            //                         </MenuItem>
            //                         <MenuItem value={dropdownMenu.communityDevelopment}>Community Development</MenuItem>
            //                         <MenuItem value={dropdownMenu.health}>Health</MenuItem>
            //                         <MenuItem value={dropdownMenu.humanServices}>Human Services</MenuItem>
            //                         <MenuItem value={dropdownMenu.youth}>Youth</MenuItem>
            //                     </Select>
            //                 </FormControl>
            //             </Grid>
            //         </Grid>
            //         <Grid container spacing={3}>
            //             <Grid item xs={12}>
            //                 <Button className={this.props.classes.backButton} onClick={this.handleBackButton} variant="contained">Back</Button>
            //                 <Button className={this.props.classes.submitButton} onClick={this.handleSubmitButton} variant="contained">Submit</Button>
            //             </Grid>
            //         </Grid>
            //         </div>

            }
            </div>

        )
        

    }
}

const mapStateToProps = reduxStore => {
    return {
        reduxStore
    }
}

export default withStyles(styles)(connect(mapStateToProps)(EditNonprofit));
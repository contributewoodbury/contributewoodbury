import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, CardContent, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Swal from 'sweetalert2';


const styles = theme => ({
    rootDiv: {
        margin: '0px 100px 0px 100px'
    },
    heading: {
        color: '#714723'
    },
    textFields: {
        margin: '10px 10px 10px 30px',
        width: '500px'
    },
    times: {
        margin: '10px 10px 10px 30px',
    },
    addRolesButton: {
        color: 'white',
        backgroundColor: '#457736',
        float: 'right',
        margin: '20px 690px 0px 0px'
    },
    backButton: {
        color: 'white',
        backgroundColor: '#457736',
        margin: '0px 0px 0px 30px'
    },
    doneButton: {
        float: 'right',
        color: 'white',
        backgroundColor: '#457736',
        margin: '0px 130px 0px 0px'
    },
    removeButton: {
        color: 'white',
        backgroundColor: '#457736',
        margin: '0px 0px 0px 30px',
    },
    displayRoles: {
        margin: '10px 10px 10px 30px'
    }
})



class AddVolunteerRoles extends Component {

    state = {
        name: '',
        description: '',
        number_needed: '',
        start_time: '',
        end_time: '',
        date: '',
        event_id: this.props.match.params.id,
    }

    componentDidMount(){
        this.props.dispatch({
            type: 'GET_VOLUNTEER_ROLES',
            payload: this.props.match.params.id
        })
    }

    handleChange = (propertyName, event) => {
        this.setState({
            [propertyName]: event.target.value
        })
        console.log(this.state);
    }

    handleAddRolesButton = () => {
        console.log('add roles button clicked');
        //dispatches state to saga
        this.props.dispatch({
            type: 'ADD_VOLUNTEERS',
            payload: this.state
        })
        //sweet alert?
        //clear fields
        this.setState({
            name: '',
            description: '',
            number_needed: '',
            start_time: '',
            end_time: '',
            date: ''
        })
    }

    handleBackButton = () => {
        console.log('back button clicked');
        Swal.fire({
            text: "Only your saved roles have been saved. Do you wish to go back?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.value) {
                this.props.history.push(`/editEvent/${this.props.match.params.id}`);
            }
        })
    }

    handleDoneButton = () => {
                console.log('done button clicked');
                //alert: "thanks you're done!" or something similar
                Swal.fire({
                    title: 'Success!',
                    text: `You're done!`,
                    type: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#457736'
                })
                //links to nonprofit home page
                this.props.history.push(`/eventDetails/${this.props.match.params.id}`)
            }

    handleRemoveRole = (id) => {
                console.log('remove roles button was clicked for this id:', id);
                //alert: "are you sure?" and "this role has been deleted"
                Swal.fire({
                    title: 'Are you sure?',
                    text: "This role will be deleted forever.",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.value) {
                        //delete role based on id of clicked item
                        this.props.dispatch({
                            type: 'DELETE_ROLE',
                            payload: { role_id: id, event_id: this.props.match.params.id }
                        })
                    }
                })
            }





    render() {


            return(
            <div className = { this.props.classes.rootDiv } >
                    <h1 className={this.props.classes.heading} >Add Volunteer Roles</h1>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {/* <Card> */}
                            <CardContent>
                                <p>Please enter the required information for each volunteer role for your event. <br />
                                    Add as many roles as you would like. <br />
                                    The roles will be displayed on your event page.
                                </p>
                            </CardContent>
                            {/* </Card> */}
                        </Grid>

                        <Grid item xs={12}>
                            {/* <Card> */}
                            <CardContent>
                                <h2 className={this.props.classes.heading} >What do you need volunteers to help with?</h2>
                                <TextField className={this.props.classes.textFields} type="text" label="Role" variant="outlined"
                                    value={this.state.name} onChange={(event) => this.handleChange('name', event)} />
                                <TextField className={this.props.classes.textFields} type="date" variant="outlined"
                                    value={this.state.date} onChange={(event) => this.handleChange('date', event)} />
                                <br />
                                <TextField className={this.props.classes.textFields} type="text" label="description" variant="outlined" multiline rows="4"
                                    value={this.state.description} onChange={(event) => this.handleChange('description', event)} />
                                <TextField className={this.props.classes.textFields} type="number" label="number of volunteers needed" variant="outlined"
                                    value={this.state.number_needed} onChange={(event) => this.handleChange('number_needed', event)} />
                                <br />
                                <TextField className={this.props.classes.times} type="time" variant="outlined"
                                    value={this.state.start_time} onChange={(event) => this.handleChange('start_time', event)} />
                                <TextField className={this.props.classes.times} type="time" variant="outlined"
                                    value={this.state.end_time} onChange={(event) => this.handleChange('end_time', event)} />
                                <Button className={this.props.classes.addRolesButton} variant="contained" size="small"
                                    onClick={this.handleAddRolesButton} >Add role(s)</Button>
                            </CardContent>
                            {/* </Card> */}
                        </Grid>

                        <Grid item xs={12}>
                            <CardContent className={this.props.classes.displayRoles} >

                                <h3>Current Volunteer Roles:</h3>

                                {this.props.reduxStore.volunteer.volunteerRoleList.map(roleInfo => (
                                    <>
                                        <CardContent>
                                            <span><b>role: </b>{roleInfo.name}</span><br />
                                            <span><b>description: </b>{roleInfo.description}</span><br />
                                            <span><b>volunteers needed: </b>{roleInfo.number_needed}</span><br />
                                            <span><b>date: </b>{roleInfo.date}</span><br />
                                            <span><b>time: </b>{roleInfo.start_time} - {roleInfo.end_time} </span><br />
                                            <Button onClick={() => this.handleRemoveRole(roleInfo.id)} >Remove</Button>
                                        </CardContent>
                                    </>
                                ))}

                            </CardContent>
                        </Grid>

                        <Grid item xs={12}>

                            <CardContent>
                                <Button className={this.props.classes.backButton} variant="contained"
                                    onClick={this.handleBackButton} >Back</Button>
                                <Button className={this.props.classes.doneButton} variant="contained"
                                    onClick={this.handleDoneButton} >Done</Button>
                            </CardContent>

                        </Grid>
                    </Grid>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        reduxStore
    }
}

export default withStyles(styles)(connect(mapStateToProps)(AddVolunteerRoles));
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, CardContent, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';


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
        date: ''
    }

    handleAddRolesButton = () => {
        console.log('add roles button clicked');
        //dispatches state to saga
    }

    handleBackButton = () => {
        console.log('back button clicked');
        //alert: "are you sure? your saved roles have been added"
        //links back to add event page for edits?
    }

    handleSubmitButton = () => {
        console.log('done button clicked');
        //alert: "thanks you're done!" or something similar
        //links to nonprofit home page
        //no dispatch
    }

    handleRemove = () => {
        console.log('remove roles button was clicked');
        //delete role based on id of clicked item
        //alert: "this role has been deleted"
        //render updated volunter roles created list
    }




    render () {


        return (
            <div className={this.props.classes.rootDiv} >
                <h1 className={this.props.classes.heading} >add volunteer roles page</h1>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {/* <Card> */}
                            <CardContent>
                                <p>Please enter the required information for each volunteer role for your event. <br/>
                                Add as many roles as you would like. <br/>
                                The roles will be displayed on your event page.
                                </p>
                            </CardContent>
                        {/* </Card> */}
                    </Grid>

                    <Grid item xs={12}>
                        {/* <Card> */}
                            <CardContent>
                                <h2 className={this.props.classes.heading} >What do you need volunteers to help with?</h2>
                                <TextField className={this.props.classes.textFields} type="text" label="Role" variant="outlined" />
                                <TextField className={this.props.classes.textFields} type="date" variant="outlined" />
                                <br/>
                                <TextField className={this.props.classes.textFields} type="text" label="description" variant="outlined" multiline rows="4" />
                                <TextField className={this.props.classes.textFields} type="text" label="# of volunteers needed" variant="outlined" />
                                <br/>
                                <TextField className={this.props.classes.times} type="time" variant="outlined" />
                                <Button className={this.props.classes.addRolesButton} variant="contained" size="small"
                                    onClick={this.handleAddRolesButton} >Add role(s)</Button>
                            </CardContent>
                        {/* </Card> */}
                    </Grid>

                    <Grid item xs={12}>
                        <CardContent className={this.props.classes.displayRoles} >
                            {/* this could be a component later */}
                            <h3>Volunteer Roles Created:</h3>
                            <div>
                                <h5>volunteer role #1:</h5>
                                <ul>
                                    <li>description</li>
                                    <li>date and time</li>
                                    <li># of roles needed</li>
                                </ul>
                                <Button variant="contained" size="small" className={this.props.classes.removeButton}
                                        onClick={this.handleRemove} >remove</Button>
                            </div>

                            <div>
                                <h5>volunteer role #2:</h5>
                                <ul>
                                    <li>description</li>
                                    <li>date and time</li>
                                    <li># of roles needed</li>
                                </ul>
                                <Button variant="contained" size="small" className={this.props.classes.removeButton}
                                        onClick={this.handleRemove} >remove</Button>
                            </div>
 
                        </CardContent>
                    </Grid>

                    <Grid item xs={12}>
                        {/* <Card> */}
                            <CardContent>
                                <Button className={this.props.classes.backButton} variant="contained"
                                    onClick={this.handleBackButton} >Back</Button>
                                <Button className={this.props.classes.doneButton} variant="contained"
                                    onClick={this.handleSubmitButton} >Done</Button>
                            </CardContent>
                        {/* </Card> */}
                    </Grid>
                </Grid>
            </div>
        )
    }
}


export default withStyles (styles) (connect()(AddVolunteerRoles));
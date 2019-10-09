import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Card, CardContent, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import SignupForm from '../SignupForm/SignupForm';
import NonprofitDetails from '../NonprofitDetails/NonprofitDetails';


const styles = theme => ({
    rootDiv: {
        margin: '0px 100px 0px 100px'
    },
    heading: {
        color: '#714723'
    },
    backButton: {
        float: 'left',
        color: 'white',
        backgroundColor: '#457736',
    },
    doneButton: {
        float: 'right',
        color: 'white',
        backgroundColor: '#457736',
        margin: '0px 330px 0px 0px'
    },
    
})


class VolunteerSignup extends Component {

    //REVISIT THE WIREFRAME AND DATABASE TO MAKE SURE PROPERTIES MATCH
    state = {


    }




    handleBackButton = (id) => {
        console.log('back button was clicked');
        //ADD SWEETALERT
        this.props.history.push(`/organizationHome/${id}`) 
    }

    handleDoneButton = () => {
        console.log('done button was clicked');
        //ADD SWEETALERT: YOURE DONE! OR SOMETHING SIMILAR
        this.props.history.push(`/organizationHome`)
    }


    render () {

        let id = this.props.match.params.id

        return (

            <div className={this.props.classes.rootDiv} >
                <h1 className={this.props.classes.heading} >Volunteers Sign Up</h1>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                            <CardContent>
                                <NonprofitDetails />
                            </CardContent>
                    </Grid>

                    <Grid item xs={12}>
                            <CardContent>
                                <h3>signup information goes here</h3>
                                {this.props.event.map(item => (
                                    <>
                                    <span>Event: {item.name}</span><br/>
                                    <span>Description: {item.description}</span><br/>
                                    <span>Date: {item.start_date} - {item.end_date}</span><br/>
                                    <span>Location: {item.address} </span>
                                    <span>{item.city}, {item.state} {item.zip_code}</span><br/>
                                    </>
                                ))}

                            
                                {this.props.role.map((each) => {
                                    if(parseFloat(this.props.match.params.id) === each.id) {
                                        return (
                                            <>
                                                <h4>{each.name} ({each.number_needed} volunteers needed)</h4>
                                                <h5>Date: {each.date} </h5>
                                                <h5>Time: {each.start_time} - {each.end_time} </h5>
                                                <h5>Description: {each.description} </h5>
                                            </>
                                        )  
                                    } else {
                                        return false
                                    }
                                })}
                            </CardContent>
                    </Grid>

                    <Grid item xs={12}>
                        <SignupForm />
                    </Grid>

                    <Grid item xs={12}>
                            <CardContent>
                                <h3>volunteers added goes here</h3>
                            </CardContent>
                    </Grid>

                    <Grid item xs={12}>
                            <CardContent>
                                <Button className={this.props.classes.backButton} variant="contained" 
                                    onClick={this.handleBackButton} >back</Button>
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
        event: reduxStore.event.eventDetails,
        user: reduxStore.user,
        role: reduxStore.volunteer.volunteerRoleList,
        nonprofit: reduxStore.nonprofit
    }
}



export default withStyles(styles) (connect(mapStateToProps) (VolunteerSignup));
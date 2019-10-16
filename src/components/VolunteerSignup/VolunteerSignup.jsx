import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import SignupForm from '../SignupForm/SignupForm';
import NonprofitDetails from '../NonprofitDetails/NonprofitDetails';
import moment from 'moment';
import Swal from 'sweetalert2';


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
        margin: '0px 550px 0px 0px'
    },
    cardContent: {
        margin: '25px'
    }
    
})


class VolunteerSignup extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_SPECIFIC_VOLUNTEER_ROLE',
            payload: this.props.match.params.id
        })
    }

    //REVISIT THE WIREFRAME AND DATABASE TO MAKE SURE PROPERTIES MATCH
  




    handleBackButton = (id) => {
        console.log('back button was clicked');
        //ADD SWEETALERT
        Swal.fire({
            title: 'Are you sure?',
            text: "Your information has not been saved!",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
            // confirmButtonColor: '#457736'
        }).then((result) => {
            if (result.value) {
                this.props.history.push(`/organizationHome/${id}`)
            }
        })
    }

    handleDoneButton = () => {
        console.log('done button was clicked');
        //ADD SWEETALERT: YOURE DONE! OR SOMETHING SIMILAR
        this.props.dispatch({
            type: 'VOLUNTEER_SIGNUP',
            payload: this.props.signup
        })
        this.props.history.push(`/organizationHome/${this.props.user.id}`)
    }

    // handleRemoveVolunteer = () => {
    //     console.log('remove volunteer button clicked');
        
    // }


    render () {

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
                                {/* <h3>signup information goes here</h3> */}
                                {this.props.event.map((item) => {
                                    let startDate = moment(item.start_date).format('MM[/]DD[/]YYYY')
                                    let endDate = moment(item.end_date).format('MM[/]DD[/]YYYY')
                                    return(
                                        <>
                                            <span><b>Event:</b> {item.name}</span><br />
                                            <span><b>Description:</b> {item.description}</span><br />
                                            <span><b>Date:</b> { startDate } - { endDate }</span><br />
                                            <span><b>Location:</b> {item.address} </span>
                                            <span>{item.city}, {item.state} {item.zip_code}</span><br />
                                        </>
                                    )
                                })}
                        </CardContent>
                        <CardContent>
                            <div>
                                
                                <span><b>Role:</b> {this.props.role.name} ({this.props.role.number_needed} volunteers needed)</span><br />
                                <span><b>Description:</b> {this.props.role.description} </span><br />
                                <span><b>Date:</b> {moment( this.props.role.date ).format('MM[/]DD[/]YYYY')} </span><br />
                                <span><b>Time:</b> {moment(this.props.role.start_time, 'hh:mm').format('LT')} - {moment(this.props.role.end_time, 'hh:mm').format('LT')} </span><br />
                                
                            </div>

                            </CardContent>
                    </Grid>

                    <Grid item xs={12}>
                        <SignupForm roleId={this.props.match.params.id} />
                    </Grid>

                    <Grid item xs={12}>
                            <CardContent>
                                {this.props.saved.length > 0  ? 
                                <>
                                <h3>Thank you for volunteering! Your information has been sent to the organization.</h3>
                                {/* {JSON.stringify(this.props.saved)} */}
                                {this.props.saved.map((volunteer) => {
                                    // let moment = moment().format('hh:mm')

                                    return (
                                        <CardContent className={this.props.classes.cardContent} >
                                            <span><b>Name:</b> {volunteer.name} </span><br />
                                            <span><b>Phone:</b> {volunteer.phone_number} </span><br />
                                            <span><b>Date/time:</b> {moment(volunteer.date).format('MM[/]DD[/]YYYY')} from {moment(volunteer.start_time, 'hh:mm').format('LT')} </span> -  <span>{moment(volunteer.end_time, 'hh:mm').format('LT')}</span><br />
                                            
                                        </CardContent>
                                    )
                                })}</> : <span></span> }
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
        role: reduxStore.volunteer.specificRole,
        nonprofit: reduxStore.nonprofit,
        saved: reduxStore.volunteer.previousSignUps,
        signedup: reduxStore.volunteersignedUpVolunteers,
    }
}



export default withStyles(styles) (connect(mapStateToProps) (VolunteerSignup));
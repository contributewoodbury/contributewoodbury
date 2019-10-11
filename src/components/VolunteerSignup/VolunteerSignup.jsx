import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import SignupForm from '../SignupForm/SignupForm';
import NonprofitDetails from '../NonprofitDetails/NonprofitDetails';
import moment from 'moment';


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
    cardContent: {
        margin: '25px'
    }
    
})


class VolunteerSignup extends Component {

    componentDidMount() {
        this.getSelectedRole();
    }

    //REVISIT THE WIREFRAME AND DATABASE TO MAKE SURE PROPERTIES MATCH
  

    getSelectedRole = () => {
        this.props.dispatch({
            type: 'GET_SPECIFIC_VOLUNTEER_ROLE',
            payload: this.props.match.params.id
        })
        console.log('the role id is:', this.props.match.params.id);
        
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
                                {/* <h3>signup information goes here</h3> */}
                                {this.props.event.map((item) => {
                                    let startDate= moment(item.start_date).format("MM-DD-YYYY")
                                    let endDate =  moment(item.end_date).format("MM-DD-YYYY")
                                    return(
                                        <>
                                            <span>Event: {item.name}</span><br />
                                            <span>Description: {item.description}</span><br />
                                            <span>Date: {startDate} - {endDate}</span><br />
                                            <span>Location: {item.address} </span>
                                            <span>{item.city}, {item.state} {item.zip_code}</span><br />
                                        </>
                                    )
                                })}
                        </CardContent>
                        <CardContent>
                            <div>
                                
                                <span>{this.props.role.name} ({this.props.role.number_needed} volunteers needed)</span><br />
                                <span>Date: {this.props.role.date} </span><br />
                                <span>Time: {this.props.role.start_time} - {this.props.role.end_time} </span><br />
                                <span>Description: {this.props.role.description} </span><br />
                            </div>

                            </CardContent>
                    </Grid>

                    <Grid item xs={12}>
                        <SignupForm roleId={this.props.match.params.id} roles={this.props.role.start_time} />
                    </Grid>

                    <Grid item xs={12}>
                            <CardContent>
                                <h3>volunteers added goes here</h3>
                                {/* {JSON.stringify(this.props.saved)} */}
                                {this.props.saved.map(volunteer => (
                                        <CardContent className={this.props.classes.cardContent} >
                                            <span>name: {volunteer.name} </span><br />
                                            <span>phone: {volunteer.phone_number} </span><br />
                                            <span>date: {volunteer.start_time} </span> <span> - </span> <span>{volunteer.end_time}</span><br />
                                            <Button className={this.props.classes.doneButton} >Remove</Button>
                                        </CardContent>
                                    
                                ))}
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
        saved: reduxStore.volunteer.previousSignUps
    }
}



export default withStyles(styles) (connect(mapStateToProps) (VolunteerSignup));
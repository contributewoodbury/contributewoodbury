import React, { Component } from 'react';
import { Button, Grid, Card, CardContent, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import SignupForm from '../SignupForm/SignupForm';

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
    logo: {
        height: '80px',
    },
    nonprofitInfo: {
        display: 'inline-block',
        padding: '20px',
    }
})


class VolunteerSignup extends Component {



    state = {

    }



    render () {



        return (

            // REMOVE CARDS WHEN DONE
            <div className={this.props.classes.rootDiv} >
                <h1 className={this.props.classes.heading} >Volunteers Sign Up</h1>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        {/* <Card> */}
                            <CardContent>
                                <h3>nonprofit information and logo goes here</h3>
                                <div className={this.props.classes.nonprofitInfo} >
                                    <img className={this.props.classes.logo} src="https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/fc/3034007-inline-i-applelogo.jpg" alt=""/>
                                </div>
                                <div className={this.props.classes.nonprofitInfo} >
                                    <p>nonprofit name<br/>
                                        123 5th avenue S. <br/>
                                        Woodbury, MN 55423
                                    </p>
                                </div>
                            </CardContent>
                        {/* </Card> */}
                    </Grid>

                    <Grid item xs={12}>
                        {/* <Card> */}
                            <CardContent>
                                <h3>signup information goes here</h3>
                                <h4>Volunteers Needed Role (3)</h4>
                                <h5>Date: </h5>
                                <h5>Time: </h5>
                                <h5>Description: </h5>
                            </CardContent>
                        {/* </Card> */}
                    </Grid>

                    <Grid item xs={12}>
                        <SignupForm />
                    </Grid>

                    <Grid item xs={12}>
                        {/* <Card> */}
                            <CardContent>
                                <h3>volunteers added goes here</h3>
                            </CardContent>
                        {/* </Card> */}
                    </Grid>

                    <Grid item xs={12}>
                        {/* <Card> */}
                            <CardContent>
                                {/* <h3>back and done buttons here</h3> */}
                                <Button className={this.props.classes.backButton} variant="contained" >back</Button>
                                <Button className={this.props.classes.doneButton} variant="contained">Done</Button>
                            </CardContent>
                        {/* </Card> */}
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles) (VolunteerSignup);
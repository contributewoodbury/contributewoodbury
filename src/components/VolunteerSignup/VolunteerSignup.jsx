import React, { Component } from 'react';
import { Button, Grid, Card, CardContent, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

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
    },
    saveButton: {
        color: 'white',
        backgroundColor: '#457736',
        margin: '10px 10px 10px 30px',
    },
    textFields: {
        margin: '10px 10px 10px 30px',
        width: '300px'
    },
    messageInput: {
        margin: '10px 10px 10px 30px',
        width: '645px'
    }
})


class VolunteerSignup extends Component {



    render () {



        return (

            // REMOVE CARDS WHEN DONE
            <div className={this.props.classes.rootDiv} >
                <h1 className={this.props.classes.heading} >Volunteers Sign Up</h1>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <h3>nonprofit information and logo goes here</h3>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <h3>signup information goes here</h3>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <h3>inputs go here</h3>
                                <TextField className={this.props.classes.textFields} type="text" placeholder="First Name" variant="outlined" label="First Name" />
                                <TextField className={this.props.classes.textFields} type="text" placeholder="Last Name" variant="outlined" label="Last Name" />
                                <br/>
                                <TextField className={this.props.classes.textFields} type="text" placeholder="email" variant="outlined" label="email" />
                                <TextField className={this.props.classes.textFields} type="text" placeholder="phone number" variant="outlined" label="phone number" />
                                <br/>
                                <TextField className={this.props.classes.messageInput} type="text" 
                                            placeholder="Let us know your needs. Can you volunteer for more or less hours than needed? Do you have questions?" 
                                            variant="outlined" label="Message" multiline rows={4} />
                                <Button variant="contained" className={this.props.classes.saveButton} >Save</Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <h3>volunteers added goes here</h3>
                            </CardContent>
                        </Card>
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
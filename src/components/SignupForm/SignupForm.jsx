import React, { Component } from 'react';
import { CardContent, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    textFields: {
        margin: '10px 10px 10px 30px',
        width: '300px'
    },
    messageInput: {
        margin: '10px 10px 10px 30px',
        width: '645px'
    },
    saveButton: {
        color: 'white',
        backgroundColor: 'orange',
        margin: '10px 10px 10px 30px',
    },
})

class SignupForm extends Component {




    render () {



        return (


            <div>
                <CardContent>
                    <h3>Sign me up!</h3>
                    <TextField className={this.props.classes.textFields} type="text" placeholder="First Name" variant="outlined" label="First Name" />
                    <TextField className={this.props.classes.textFields} type="text" placeholder="Last Name" variant="outlined" label="Last Name" />
                    <br />
                    <TextField className={this.props.classes.textFields} type="text" placeholder="email" variant="outlined" label="email" />
                    <TextField className={this.props.classes.textFields} type="text" placeholder="phone number" variant="outlined" label="phone number" />
                    <br />
                    <TextField className={this.props.classes.messageInput} type="text"
                        placeholder="Let us know your needs. Can you volunteer for more or less hours than needed? Do you have questions?"
                        variant="outlined" label="Message" multiline rows={4} /><br />
                    <Button variant="contained" className={this.props.classes.saveButton} >Sign Up!</Button>
                </CardContent>
            </div>
        )
    }
}


export default withStyles(styles) (SignupForm);
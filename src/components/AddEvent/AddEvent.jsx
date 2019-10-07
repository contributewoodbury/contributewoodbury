import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CardContent, Grid, InputLabel, MenuItem, FormControlLabel, Checkbox, FormControl, Select, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    backButton: {
        color: 'white',
        backgroundColor: '#457736'
    },
    submitButton: {
        float: 'right',
        color: 'white',
        backgroundColor: '#457736'
    },
    dropdownBox: {
        width: '500px'
    },
    checkbox: {
        margin: '0px 0px 10px 0px',
    },
    rootDiv: {
        margin: '0px 100px 0px 100px'
    },
    textFields: {
        margin: '10px 10px 10px 30px',
        width: '400px'
    },
    description: {
        margin: '10px 10px 10px 30px',
        width: '1030px'
    }
})


class AddEvent extends Component {



    render() {



        return (

            <div className={this.props.classes.rootDiv}>
                <h1>Add Event</h1>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {/* <Card> */}
                            <CardContent>

                            
                            <h2>hello</h2>
                            <FormControl variant="outlined">
                                <InputLabel >
                                    Re-Use previous event
                                </InputLabel>
                                <Select
                                    className={this.props.classes.dropdownBox}
                                    // value={values.age}
                                    // onChange={handleChange}
                                    // labelWidth={labelWidth}
                                    // inputProps={{
                                    //     name: 'age',
                                    //     id: 'outlined-age-simple',
                                    // }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Event 1</MenuItem>
                                    <MenuItem value={20}>Event 2</MenuItem>
                                    <MenuItem value={30}>Event 3</MenuItem>
                                </Select>

                                <FormControlLabel 
                                    className={this.props.classes.checkbox}
                                    control={
                                        <Checkbox
                                            checked={true}
                                            // onChange={handleChange('checkedB')}
                                            value="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Volunteers Needed"
                                />

                                <TextField className={this.props.classes.textFields} type="text" placeholder="Event Name" variant="outlined"/>

                                <TextField className={this.props.classes.description} type="text" placeholder="Event Description" variant="outlined" multiline rows="4" />

                               

                            </FormControl>
                            </CardContent>
                        {/* </Card> */}
                    </Grid>
                </Grid>


                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        {/* <Card> */}
                            <CardContent>
                            <h2>left column</h2>
                            <TextField className={this.props.classes.textFields} type="date" placeholder="Start" variant="outlined" />
                            <br/>
                            <TextField className={this.props.classes.textFields} type="time" placeholder="Start Time" variant="outlined" />
                            <TextField className={this.props.classes.textFields} type="time" placeholder="End Time" variant="outlined" />
                            <br/>
                            <TextField className={this.props.classes.textFields} type="text" placeholder="Point Of Contact" variant="outlined" />
                            <br/>
                            <TextField className={this.props.classes.textFields} type="text" placeholder="Image url" variant="outlined" />
                            </CardContent>
                        {/* </Card> */}
                    </Grid>
                    <Grid item xs={6}>
                        {/* <Card> */}
                            <CardContent>
                            <h2>right column</h2>
                            <TextField className={this.props.classes.textFields} type="date" placeholder="End" variant="outlined" />
                            <br/>
                            <TextField className={this.props.classes.textFields} type="text" placeholder="Location" variant="outlined" />
                            <br />
                            <TextField className={this.props.classes.textFields} type="text" placeholder="Point of Contact Phone" variant="outlined" />
                            <br />
                            <TextField className={this.props.classes.textFields} type="text" placeholder="Point of Contact Email" variant="outlined" />
                            </CardContent>
                        {/* </Card> */}
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button className={this.props.classes.backButton} variant="contained">Back</Button>
                        <Button className={this.props.classes.submitButton} variant="contained">Submit</Button>
                    </Grid>
                </Grid>
                

            </div>
        )
    }
}


export default withStyles(styles) (connect()(AddEvent));
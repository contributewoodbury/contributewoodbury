import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Grid, InputLabel, MenuItem, FormControlLabel, Checkbox, FormControl, Select, TextField } from '@material-ui/core';




class AddEvent extends Component {



    render() {



        return (

            <div>
                <h1>Add Event</h1>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card>
                            <h2>hello</h2>
                            <FormControl variant="outlined">
                                <InputLabel >
                                    Re-Use previous event
                                </InputLabel>
                                <Select
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
                                    control={
                                        <Checkbox
                                            // checked={state.checkedB}
                                            // onChange={handleChange('checkedB')}
                                            value="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Volunteers Needed"
                                />

                                <TextField type="text" placeholder="Event Name" variant="outlined"/>

                                <TextField type="text" placeholder="Event Description" variant="outlined" />

                               

                            </FormControl>
                        </Card>
                    </Grid>
                </Grid>


                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Card>
                            <h2>left column</h2>
                            <TextField type="date" placeholder="Start" variant="outlined" />
                            <br/>
                            <TextField type="time" placeholder="Start Time" variant="outlined" />
                            <TextField type="time" placeholder="End Time" variant="outlined" />
                            <br/>
                            <TextField type="text" placeholder="Point Of Contact" variant="outlined" />
                            <br/>
                            <TextField type="text" placeholder="Image url" variant="outlined" />
                            
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <h2>right column</h2>
                            <TextField type="date" placeholder="End" variant="outlined" />
                            <br/>
                            <TextField type="text" placeholder="Location" variant="outlined" />
                            <br />
                            <TextField type="text" placeholder="Point of Contact Phone" variant="outlined" />
                            <br />
                            <TextField type="text" placeholder="Point of Contact Email" variant="outlined" />
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Button variant="contained">Back</Button>
                    <Button variant="contained">Submit</Button>
                </Grid>
                

            </div>
        )
    }
}


export default connect()(AddEvent);
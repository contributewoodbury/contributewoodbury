import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Grid, InputLabel, MenuItem, FormHelperText, FormControl, Select, Paper, TextField } from '@material-ui/core';




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

                                <TextField></TextField>
                            </FormControl>
                        </Card>
                    </Grid>
                </Grid>


                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Card>
                            <h2>left column</h2>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <h2>right column</h2>
                        </Card>
                    </Grid>
                </Grid>
                

            </div>
        )
    }
}


export default connect()(AddEvent);
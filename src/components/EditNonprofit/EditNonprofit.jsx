import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CardContent, Grid, InputLabel, MenuItem, FormControlLabel, Checkbox, FormControl, Select, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    heading: {
        color: '#714723',
    },
    backButton: {
        color: 'white',
        backgroundColor: '#457736',
        margin: '50px 10px 10px 30px'
    },
    submitButton: {
        float: 'right',
        color: 'white',
        backgroundColor: '#457736',
        margin: '50px 250px 10px 30px'
    }, 
    textFields: {
        margin: '10px 10px 10px 30px',
        width: '400px'
    },
    description: {
        margin: '10px 10px 10px 30px',
        width: '1030px'
    },
    dropdownBox: {
        width: '500px'
    },
    rootDiv: {
        margin: '0px 100px 0px 100px'
    },
})



class EditNonprofit extends Component {

    render() {



        return(
            <div className={this.props.classes.rootDiv}>
                <h1 className={this.props.classes.heading}>Edit Nonprofit</h1>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField className={this.props.classes.textFields} type="text" placeholder="Name of Organization" variant="outlined" />
                        <br/>
                        <TextField className={this.props.classes.description} type="text" placeholder="Event Description" variant="outlined" multiline rows="4" />
                    </Grid>

                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <h2>
                            left column
                        </h2>
                        <TextField className={this.props.classes.textFields} type="text" placeholder="Point of Contact Name" variant="outlined" />
                        <br />
                        <TextField className={this.props.classes.textFields} type="text" placeholder="Point of Contact Email" variant="outlined" />
                        <br />
                        <TextField className={this.props.classes.textFields} type="text" placeholder="Point of Contact Phone" variant="outlined" />
                        <br />
                        <TextField className={this.props.classes.textFields} type="text" placeholder="Organization Website URL" variant="outlined" />
                        <br />
                        <TextField className={this.props.classes.textFields} type="text" placeholder="Organization Logo URL" variant="outlined" />
                        <br />
                    </Grid>
                    <Grid item xs={6}>
                        <h2>
                            right column
                        </h2>
                        <InputLabel >
                            Choose Organization Category
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
                            <MenuItem value={10}>Community Development</MenuItem>
                            <MenuItem value={20}>Health</MenuItem>
                            <MenuItem value={30}>Human Services</MenuItem>
                            <MenuItem value={30}>Youth</MenuItem>
                        </Select>
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

export default withStyles(styles) (connect()(EditNonprofit));
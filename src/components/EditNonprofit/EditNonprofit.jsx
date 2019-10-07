import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CardContent, Grid, InputLabel, MenuItem, FormControlLabel, Checkbox, FormControl, Select, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({

})



class EditNonprofit extends Component {

    render() {



        return(
            <div>
                <h1>Edit Nonprofit</h1>

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
                    </Grid>
                    <Grid item xs={6}>
                        <h2>
                            right column
                        </h2>
                    </Grid>
                </Grid>
            </div>

        )
        

    }
}

export default withStyles(styles) (connect()(EditNonprofit));
import React, {Component} from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import {connect} from 'react-redux';

const styles = theme => ({
    rootDiv: {
        margin: '0px 100px 0px 100px'
    },
    root: {
        width: '100%',
        overfloxX: 'auto'
    }
})

class VolunteerList extends Component {


    componentDidMount() {
        this.props.dispatch({
            type: 'GET_SPECIFIC_VOLUNTEERS',
            payload: this.props.match.params.id
        })
    }//end componentDidMount
  

    render() {
        // let volunteerInfo = this.props.volunteer[0] || 'a'
        return (
            <div className={this.props.classes.rootDiv}>
                <Grid container spacing={1} justify = "center">
                    <h1>Volunteer List For {}</h1>
                </Grid>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        volunteer: state.volunteer.volunteerRoleList
    }
}

export default connect(mapStateToProps)(withStyles(styles)(VolunteerList));
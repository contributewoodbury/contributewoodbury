import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core/';
import moment from 'moment';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: 'black',
        color: 'white',
    },
    body: {
        fontSize: 14,
    }
}))(TableCell);

const styles = theme => ({
    rootDiv: {
        margin: '0px 100px 0px 100px'
    },
    root: {
        width: '100%',
        overfloxX: 'auto',
    },
    table: {
        minWidth: 700
    },
    button: {
        color: 'white',
        backgroundColor: '#457736'
    },
    centerButton: {
        justify: 'center'
    }

})

class VolunteerList extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_EVENT_DETAILS',
            payload: this.props.match.params.id
        });
        if (this.props.nonProfit) {
            this.props.dispatch({
                type: 'GET_SPECIFIC_VOLUNTEERS',
                payload: { id: this.props.match.params.id, np_id: this.props.nonProfit.nonprofit_id }
            });
        }
    }//end componentDidMount

    componentDidUpdate(prevProps) {
        console.log(prevProps);
        if (!prevProps.nonProfit && this.props.nonProfit) {
            this.props.dispatch({
                type: 'GET_SPECIFIC_VOLUNTEERS',
                payload: { id: this.props.match.params.id, np_id: this.props.nonProfit.nonprofit_id }
            });
        }
    }

    handleClick = () => {
        console.log('clicked')
        this.props.history.goBack()
    }//end handleClick


    render() {
        const { classes } = this.props;
        return (
            <div className={this.props.classes.rootDiv}>
                <Grid container spacing={1} justify="center">
                    {
                        this.props.event.map((name) => {
                            return <h1 key={name.id}>Volunteers signed up for {name.name}</h1>
                        })
                    }
                </Grid>
                <Grid container spacing={1}>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>Role</CustomTableCell>
                                    <CustomTableCell align="right">Volunteer/Time</CustomTableCell>
                                    <CustomTableCell align="right">Comments</CustomTableCell>
                                    <CustomTableCell align="right">Contact Infromation</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.props.volunteer.map((vol) => {
                                        return <>
                                            <TableRow key={vol.id}>
                                                <CustomTableCell>{vol.role_name}</CustomTableCell>
                                                <CustomTableCell align="right">{vol.name} {moment(vol.start_time, "hh:mm").format('LT')}-{moment(vol.end_time, "hh:mm").format('LT')}</CustomTableCell>
                                                <CustomTableCell align="right">{vol.comments}</CustomTableCell>
                                                <CustomTableCell align="right">Email: {vol.email} Phone: {vol.phone_number}</CustomTableCell>
                                            </TableRow>
                                        </>
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
                <br></br>
                <Grid container spacing={1} justify="center">
                    <Button className={classes.button} onClick={this.handleClick}>Back</Button>
                </Grid>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        volunteer: state.volunteer.volunteerList,
        event: state.event.eventDetails,
        nonProfit: state.nonprofit.nonprofit[0]
    }
}

export default connect(mapStateToProps)(withStyles(styles)(VolunteerList));
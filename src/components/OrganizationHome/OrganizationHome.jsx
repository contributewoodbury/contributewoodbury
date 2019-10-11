import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Link } from '@material-ui/core/';
import { connect } from 'react-redux';

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
        minWidth: 700,
    },
    button: {
        color: 'white',
        backgroundColor: '#457736'
    }
})

class OrganizationHome extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_NONPROFIT',
            payload: this.props.match.params.id
        })
    }//end componentDidMount

    handleVolunteerClick = (id) => {
        console.log('clicked');
        this.props.history.push(`/eventDetails/${id}`);
    }//end handleVolunteerClick

    handleEditDetails = () => {
        console.log('edit details button clicked')
        let id = this.props.match.params.id
        this.props.history.push(`/editNonprofit/${id}`)
    }//end handleEditDetails

    handleVolunteerListClick = (id) => {
        console.log('volunteer list button clicked id:', id)
        this.props.history.push(`/volunteerList/${id}`)
    }//end handleVolunteerListClick

    handleEditClick = (id) => {
        console.log('edit button clicked id:', id)
    }//end handleEditClick

    handleAddEvent = () => {
        console.log('add event clicked')
        let id = this.props.match.params.id
        this.props.history.push(`/addEvent/${id}`)
    }//end handleAddEvent

    render() {
        let nonprofitInfo = this.props.nonprofit[0] || 'a';
        return (
            <div className={this.props.classes.rootDiv}>
                <Grid container spacing={1} justify="center">
                    <h1>{this.props.nonprofit[0] && this.props.nonprofit[0].nonprofit_name}</h1>
                </Grid>
                <Grid container spacing={1}>
                    <p>Contact: {this.props.nonprofit[0] && this.props.nonprofit[0].contact_email}</p>
                </Grid>
                <Grid container spacing={1}>
                    Organization Address: <br></br> <address>{this.props.nonprofit[0] && this.props.nonprofit[0].address} <br></br>
                        {this.props.nonprofit[0] && this.props.nonprofit[0].city} &nbsp; {this.props.nonprofit[0] && this.props.nonprofit[0].zip_code}
                    </address>
                </Grid>
                <Grid container spacing={1}>
                    <Link variant="body1" href={this.props.nonprofit[0] && this.props.nonprofit[0].website} target="_blank">Link To Website</Link>
                </Grid>
                <Grid container spacing={1}>
                    <p>Organization Description: {this.props.nonprofit[0] && this.props.nonprofit[0].description}</p>
                </Grid>
                {nonprofitInfo.nonprofit_name === this.props.user.name && <Button className={this.props.classes.button} onClick={this.handleEditDetails}>Edit Details</Button>}
                <Grid container spacing={1} justify="center">
                    <h2>Event List</h2>
                </Grid>
                <Grid container spacing={3}>
                    <Paper className={this.props.classes.root}>
                        <Table className={this.props.classes.table}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>Name</CustomTableCell>
                                    <CustomTableCell align="right">Event Date</CustomTableCell>
                                    <CustomTableCell align="center">Actions</CustomTableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {  
                                    this.props.nonprofit.map((info) => {
                                        let button = ''
                                        if (info.nonprofit_name === this.props.user.name) {
                                            button = <><Button className={this.props.classes.button} onClick={() => this.handleVolunteerListClick(info.event_id)}>Volunteer List</Button> &nbsp; 
                                            <Button className={this.props.classes.button} onClick={() => this.handleEditClick(info.event_id)}>Edit</Button></>
                                        }
                                        if (info.event_id) {
                                            return <>
                                                <TableRow key={info.id}>
                                                    <CustomTableCell>{info.event_name}</CustomTableCell>
                                                    <CustomTableCell align="right">{info.start_date}</CustomTableCell>
                                                    <CustomTableCell align="right"><Button className={this.props.classes.button}
                                                        onClick={() => { this.handleVolunteerClick(info.event_id) }}>Volunteer</Button> &nbsp; {button}</CustomTableCell>

                                                </TableRow>
                                            </>
                                        } else {
                                            return <p>No listed events</p>
                                        }
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
                <br></br>
                    <Grid container spacing={12} justify="center">
                        {nonprofitInfo.nonprofit_name === this.props.user.name && <Button className={this.props.classes.button} onClick={this.handleAddEvent}>Add Event</Button>}
                    </Grid>
        
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        nonprofit: state.nonprofit.nonprofit,
        user: state.user
    }
}


export default connect(mapStateToProps)(withStyles(styles)(OrganizationHome));
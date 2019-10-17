import React, {Component} from 'react';
import {Grid, CardContent} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
import {connect} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core/';
import moment from 'moment';
import './EventDetails.css';


const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: 'black',
        color: 'white'
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

const styles = theme => ({
    rootDiv: {
        margin: '0px 100px 0px 100px',
        marginTop: '50px'
    },
    root: {
        width: '100%',
        overfloxX: 'auto'
    },
    table: {
        minWidth: 700,
    },
    button: {
        color: 'white',
        backgroundColor: '#457736'
    }
})

class EventDetails extends Component {

    componentDidMount () {
        this.props.dispatch ({
            type: 'GET_EVENT_DETAILS',
            payload: this.props.match.params.id
        })
    }//end componentDidMount

    handleClick = (id) => {
        console.log('clicked')
        this.props.history.push(`/signup/${id}`)
    }//end handleClick

    handleButtonClick = () => {
        console.log('clicked volunteer list')
        let id = this.props.match.params.id
        this.props.history.push(`/volunteerList/${id}`)
    }//end handleClick

    handleEditEvent = () => {
        let id = this.props.match.params.id
        console.log('clicked the event id is:', id)
        this.props.history.push(`/editEvent/${id}`)
    }//end handleEditEvent

    render() {
        let nonprofitInfo = this.props.nonprofit[0] || 'a';
        return (
            <div className={this.props.classes.rootDiv}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <CardContent>
                        <h2 className="name">{this.props.nonprofit[0] && this.props.nonprofit[0].nonprofit_name}</h2>
                        <address className="address">
                        {this.props.nonprofit[0] && this.props.nonprofit[0].address} <br></br>
                        {this.props.nonprofit[0] && this.props.nonprofit[0].city}&nbsp;
                        {this.props.nonprofit[0] && this.props.nonprofit[0].state}&nbsp;
                        {this.props.nonprofit[0] && this.props.nonprofit[0].zip_code}
                        </address>
                    </CardContent>
                </Grid>
                    <Grid item xs={6}>
                        <CardContent>
                            <img src={this.props.nonprofit[0] && this.props.nonprofit[0].logo} alt="nonprofit logo" width="400" />
                        </CardContent>
                    </Grid>
            </Grid>
                                {
                                    this.props.event.eventDetails.map((info) => {
                                        return <>
                                            <Grid container spacing={3} key={info.id}>
                                                <Grid item xs={6}>
                                                    <h2>{info.name}</h2>
                                                    <p>Date: {moment(info.start_date).format("MM/DD/YYYY")}</p>
                                                        <Grid container spacing={1}>
                                                            Location:&nbsp;<address>
                                                                {info.address}<br></br>
                                                                {info.city}&nbsp;{info.state}
                                                                &nbsp;{info.zip_code}
                                                            </address>
                                                        </Grid>
                                                    <p>Contact: {this.props.nonprofit[0] && this.props.nonprofit[0].contact_email} </p>
                                                    
                                                    <p>Description: {info.description}</p>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <img src={info.event_url} alt="Event Logo" width="400"/>
                                                </Grid>
                                            </Grid>
                                        </>
                                    })
                                }
                {nonprofitInfo.nonprofit_name === this.props.user.name && <Button className={this.props.classes.button} onClick={this.handleEditEvent}>Edit</Button>}
                <h3 className="header">Volunteer Opportunities for this event:</h3>
                <Paper className={this.props.classes.root}>
                    <Table className={this.props.classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Name</CustomTableCell>
                                <CustomTableCell align="right">Times</CustomTableCell>
                                <CustomTableCell align="right">Volunteers Needed</CustomTableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.props.volunteers.volunteerRoleList.map((person) => {
                                    return (<> 
                                    <TableRow key={person.id}>
                                    <CustomTableCell>{person.name}</CustomTableCell>
                                    <CustomTableCell align="right">
                                                {moment(person.start_time, "hh:mm").format('LT')} - {moment(person.end_time, "hh:mm").format('LT')}
                                    </CustomTableCell>
                                            <CustomTableCell align="right"><Link component="button"
                                                variant="body2"
                                                onClick={() => { this.handleClick(person.id) }}>Volunteers Needed({person.number_needed})
                                            </Link></CustomTableCell>
                                    </TableRow>
                                    </>)
                                })
                            }
                        </TableBody>
                    </Table>
                </Paper>
                <br></br>
                <Grid container justify='center'>
                {nonprofitInfo.nonprofit_name === this.props.user.name && <Button className={this.props.classes.button} onClick={this.handleButtonClick}> Volunteer List </Button>}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event,
        nonprofit: state.nonprofit.nonprofit,
        volunteers: state.volunteer,
        user: state.user
    }
}

export default connect(mapStateToProps)(withStyles(styles)(EventDetails));
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

    render() {
        let nonprofitInfo = this.props.nonprofit[0] || 'a';
        return (
            <div className={this.props.classes.rootDiv}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                <CardContent>
                        <img src={this.props.nonprofit[0] && this.props.nonprofit[0].logo} alt="nonprofit logo" width="400" />
                </CardContent>
                </Grid>
                <Grid item xs={6}>
                    <CardContent>
                        <h2>{this.props.nonprofit[0] && this.props.nonprofit[0].nonprofit_name}</h2>
                        <address>
                        {this.props.nonprofit[0] && this.props.nonprofit[0].address} <br></br>
                        {this.props.nonprofit[0] && this.props.nonprofit[0].city} &nbsp;
                        {this.props.nonprofit[0] && this.props.nonprofit[0].zip_code}
                        </address>
                    </CardContent>
                </Grid>
            </Grid>
                                {
                                    this.props.event.eventDetails.map((info) => {
                                        return <>
                                            <Grid container spacing={3} key={info.id}>
                                                <Grid item xs={6}>
                                                    <h2>{info.name}</h2>
                                                    <p>Date: {info.start_date}</p>
                                                    <address>Location:
                                                        <p>{info.address}<br></br>
                                                        {info.city} &nbsp;
                                                        {info.zip_code}</p>
                                                    </address>
                                                    <p>Contact: {this.props.nonprofit[0] && this.props.nonprofit[0].contact_email} </p>
                                                    <p>Description: {info.description}</p>
                                                </Grid>
                                            </Grid>
                                        </>
                                    })
                                }
                <h3>Volunteer Opportunities for this event:</h3>
                <Paper className={this.props.classes.root}>
                    <Table className={this.props.classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Times</CustomTableCell>
                                <CustomTableCell align="right">Volunteers Needed</CustomTableCell>
                                <CustomTableCell align="right">Description</CustomTableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.props.volunteers.volunteerRoleList.map((person) => {
                                    return (<> 
                                    <TableRow>
                                    <CustomTableCell key={person.id}>{person.start_time} - {person.end_time}</CustomTableCell>
                                        <CustomTableCell align="right"><Link component="button"
                                            variant="body2"
                                            onClick={() => {this.handleClick(person.id)}}>Volunteers Needed({person.number_needed})
                                            </Link></CustomTableCell>
                                    <CustomTableCell align="right">
                                            {person.description}
                                    </CustomTableCell>
                                    </TableRow>
                                    </>)
                                })
                            }
                        </TableBody>
                    </Table>
                </Paper>
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
        nonprofit: state.nonprofit,
        volunteers: state.volunteer,
        user: state.user
    }
}

export default connect(mapStateToProps)(withStyles(styles)(EventDetails));
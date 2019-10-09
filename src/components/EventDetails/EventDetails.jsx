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

    render() {
        return (
            <div className={this.props.classes.rootDiv}>
                    {
                        this.props.nonprofit.map((information) => {
                            return (<>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <CardContent>
                                    <img src={information.nonprofit_logo} alt={information.nonprofit_name} width="400"  hight="500"/>
                                        </CardContent>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CardContent>
                                            <h2>{information.nonprofit_name}</h2>
                                            <address>
                                            <p>{information.nonprofit_address}<br></br>
                                            {information.nonprofit_city} &nbsp;
                                            {information.nonprofit_zip_code}</p>
                                            </address>
                                        </CardContent>
                                    </Grid>
                                </Grid>
                                {
                                    this.props.event.eventDetails.map((info) => {
                                        return <>
                                            <Grid container spacing={3}>
                                                <Grid item xs={6}>
                                                    <h2>{info.name}</h2>
                                                    <p>Date: {info.start_date}</p>
                                                    <p><address>Location:
                                            <p>{info.address}<br></br>
                                                            {info.city} &nbsp;
                                            {info.zip_code}</p>
                                                    </address></p>
                                                    <p>Contact: {information.nonprofit_contact_email}</p>
                                                    <p>Description: {info.description}</p>
                                                </Grid>
                                            </Grid>
                                        </>
                                    })
                                }
                            </>)
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
                                    return <> 
                                    <CustomTableCell>{person.start_time} - {person.end_time}</CustomTableCell>
                                        <CustomTableCell align="right"><Link component="button"
                                            variant="body2"
                                            onClick={() => {this.handleClick(person.event_id)}}>Volunteers Needed({person.number_needed})
                                            </Link></CustomTableCell>
                                    <CustomTableCell align="right">
                                            {person.description}
                                    </CustomTableCell>
                                    </>
                                })
                            }
                        </TableBody>
                    </Table>
                </Paper>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event,
        nonprofit: state.nonprofit,
        volunteers: state.volunteer
    }
}

export default connect(mapStateToProps)(withStyles(styles)(EventDetails));
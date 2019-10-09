import React, {Component} from 'react';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, Link} from '@material-ui/core/';
import {connect} from 'react-redux';

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

    componentDidMount () {
        this.props.dispatch({
            type: 'GET_NONPROFIT',
            payload: this.props.match.params.id
        })
    }//end componentDidMount

    handleVolunteerClick = (id) => {
        console.log('clicked');
        this.props.history.push(`/eventDetails/${id}`);
    }//end handleVolunteerClick

    render() {
        return (
            <div className={this.props.classes.rootDiv}>
                <Grid container spacing={3} justify="center">
                   {
                       this.props.nonprofit.map((name) => {
                           return (<h1 key={name.id}>{name.nonprofit_name}</h1>)
                       })
                   }
                </Grid>
                <Grid container spacing={3}>
                { this.props.nonprofit[0] ?
                    this.props.nonprofit.map((i, info) => {
                        if({i}== 0){
                        let editButton = ''
                        if (info.nonprofit_name  === this.props.user.name) {
                            editButton = <Button>Edit Details</Button>  
                        } 
                        return <>
                        <p key={info.id}>Contact Name: {info.contact_email}</p>
                        <p>Organization Address: {info.address}</p>
                        <p>{info.city} {info.zip_code}</p>
                        <Link variant="body1" href={info.website} target="_blank">Link To Website</Link>
                        <p>Organization Description: {info.description}</p>
                        {editButton}
                        </>
                    } else {return false}}) : "oops"
                }
                </Grid>
                <Grid container spacing={3} justify="center">
                    <h2>Event List</h2>
                </Grid>
                <Grid container spacing={3}>
                    <Paper className={this.props.classes.root}>
                        <Table className={this.props.classes.table}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>Name</CustomTableCell>
                                    <CustomTableCell align="right">Event Date</CustomTableCell>
                                    <CustomTableCell align="right">Actions</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                this.props.nonprofit.map((info) => {
                                    if (info.event_id) {
                                    return <>
                                    <TableRow key={info.id}>
                                    <CustomTableCell>{info.event_name}</CustomTableCell>
                                    <CustomTableCell align="right">{info.start_date}</CustomTableCell>
                                    <CustomTableCell align="right"><Button className={this.props.classes.button}
                                        onClick={() => {this.handleVolunteerClick(info.event_id)}}>Volunteer</Button></CustomTableCell>
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

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        nonprofit: state.nonprofit,
        user: state.user
    }
}


export default connect(mapStateToProps)(withStyles(styles)(OrganizationHome));
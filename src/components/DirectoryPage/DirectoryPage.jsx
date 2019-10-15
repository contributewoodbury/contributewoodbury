import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import { thisExpression } from '@babel/types';
import { AssistantPhoto } from '@material-ui/icons';
import moment from 'moment';
import Swal from 'sweetalert2';
// import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    backButton: {
        color: 'white',
        backgroundColor: '#457736',
        margin: '0px 0px 0px 30px'
    },
    backButtonText: {
        color: 'white',
        textDecoration: 'none',
    },
    root: {
        maxHeight: '800px',
        width: '80%',
        marginTop: theme.spacing(3),
        overflowY: 'scroll',
        margin: 'auto'
    },
    search: {
        float: 'right',
        width: '50%',
        margin: theme.spacing(3),

    },
    rows: {
        height: '100px'
    },
    flag: {
        color: 'red'
    }

})


class DirectoryPage extends Component {

    state = {
        searchbar: ''
    }
    componentDidMount() {
        this.getOrganizationDetails();
    }

    componentDidUpdate(prevProps) {
        if (this.props.reduxStore.user.name === 'Admin' && prevProps.reduxStore.user.name !== this.props.reduxStore.user.name) {
            this.props.dispatch({
                type: 'GET_ADMIN_DIRECTORY'
            });
        }
    }

    getOrganizationDetails = () => {
        console.log('in get org. details');
        this.props.dispatch({
            type: 'GET_DIRECTORY'
        });

    }

    handleVolunteerButton = (id) => {
        console.log('volunteer button for id:', id);
        this.props.history.push(`/organizationhome/${id}`)

    }

    searchbarInput = (event) => {
        this.setState({
            searchbar: event.target.value
        });
    }

    searchSubmit = (event) => {
        event.preventDefault();
        console.log("searched");
        this.props.dispatch({ type: 'SEARCH', payload: this.state.searchbar });
    }

    handleDelete = (id, orgName) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${orgName}. Do you wish to continue?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
            // confirmButtonColor: '#457736'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({ type: 'DECLINE_NONPROFIT', payload: id });
            }
        });
    }

    render() {

        const nonprofitName = this.props.reduxStore.user.name;
        let sixMonthsBeforeTodaysDate = moment().subtract(6, "months").format("YYYY-MM-DD");
        // let lastConfirmed = moment(this.props.reduxStore.user.last_confirmed).format("YYYY-MM-DD");

        return (
            <div>
                <h1>
                    Directory
                </h1>

                <Paper className={this.props.classes.root}>

                    <div className={this.props.classes.search}>
                        <Paper elevation={1}>
                            <form onSubmit={this.searchSubmit}>
                                <IconButton aria-label="Search" onClick={this.searchSubmit} >
                                    <SearchIcon />
                                </IconButton>
                                <InputBase placeholder="Search Local Nonprofits" onChange={this.searchbarInput} value={this.state.searchbar} />
                            </form>
                            <Divider />
                        </Paper>
                    </div>


                    <Table hover="true" size="medium">

                        {/* conditional rendering of the COLUMN HEADINGS based on the user being an admin or not */}
                        {
                            nonprofitName === 'Admin' ?
                                <TableHead>
                                    <TableRow className={this.props.classes.rows}>
                                        <TableCell align="left">Image</TableCell>
                                        <TableCell align="left">Agency</TableCell>
                                        <TableCell align="left">Category</TableCell>
                                        <TableCell align="left">Flagged</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>

                                :

                                <TableHead>
                                    <TableRow className={this.props.classes.rows}>
                                        <TableCell align="left">Image</TableCell>
                                        <TableCell align="left">Agency</TableCell>
                                        <TableCell align="left">Category</TableCell>
                                        <TableCell align="left">Volunteer Opportunities</TableCell>
                                        <TableCell align="center">Website Link</TableCell>
                                    </TableRow>
                                </TableHead>
                        }

                        {/* conditional rendering of the TABLE ROWS based on the user being an admin or not */}
                        {
                            nonprofitName === 'Admin' ?
                                <TableBody>
                                    {this.props.reduxStore.admin.adminDirectory &&
                                        this.props.reduxStore.admin.adminDirectory.map(nonprofit => {
                                        let lastConfirmed = moment(nonprofit.last_confirmed).format("YYYY-MM-DD");
                                        if (nonprofit.name !== 'Admin') {
                                            return (
                                                <TableRow key={nonprofit.id} className={this.props.classes.rows} hover={true}>
                                                    <TableCell align="left">{nonprofit.logo}</TableCell>
                                                    <TableCell align="left">{nonprofit.name}<br />
                                                        {nonprofit.address}<br />
                                                        {nonprofit.city}, MN
                                                              {nonprofit.state}
                                                        {nonprofit.zip_code}  </TableCell>
                                                    <TableCell align="left">{nonprofit.category_id}</TableCell>

                                                    <TableCell align="left">
                                                        {lastConfirmed < sixMonthsBeforeTodaysDate &&
                                                            <div>
                                                                {/* conditionally show this if date of lastConfirmed is <6months */}
                                                                <AssistantPhoto fontSize="large" className={this.props.classes.flag} />
                                                            </div>
                                                        }
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <Button className={this.props.classes.backButton} variant="contained"
                                                        onClick={() => { this.handleDelete(nonprofit.id, nonprofit.name) }}> Delete
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        } else { return false; }
                                    })}
                                </TableBody>

                                :

                                <TableBody>

                                    {this.props.reduxStore.directory.map((nonprofit) => {
                                        if (nonprofit.name !== 'Admin') {
                                            return (
                                                <TableRow key={nonprofit.id} className={this.props.classes.rows} hover={true}>
                                                    <TableCell align="left">{nonprofit.logo}</TableCell>
                                                    <TableCell align="left">{nonprofit.name}<br />
                                                        {nonprofit.address}<br />
                                                        {nonprofit.city}, MN &nbsp;
                                                              {nonprofit.state}
                                                        {nonprofit.zip_code}  </TableCell>
                                                    <TableCell align="left">{nonprofit.category_id}</TableCell>
                                                    <TableCell align="left"><Button className={this.props.classes.backButton} variant="contained"
                                                        onClick={() => this.handleVolunteerButton(nonprofit.id)} >Volunteer</Button></TableCell>
                                                    <TableCell align="center"><Button className={this.props.classes.backButton} variant="contained">
                                                        <a className={this.props.classes.backButtonText} href={nonprofit.website} >Website</a></Button></TableCell>
                                                </TableRow>
                                            )
                                        } else { return false; }
                                    })}

                                </TableBody>
                        }
                    </Table>
                </Paper>
            </div >
        )


    }


}

const mapStateToProps = reduxStore => {
    return {
        reduxStore
    }
}

export default withStyles(styles)(connect(mapStateToProps)(DirectoryPage));
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import { thisExpression } from '@babel/types';
import {AssistantPhoto} from '@material-ui/icons';

import Typography from '@material-ui/core/Typography';

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
        marginTop: theme.spacing.unit * 3,
        overflowY: 'scroll',
        margin: 'auto'
    },
    search: {
        float: 'right',
        width: '50%',
        margin: theme.spacing.unit * 3,
        
    },
    rows: {
        height: '100px'
    },
    flag: {
        color: 'red'
    }

})


class DirectoryPage extends Component {
    componentDidMount() {
        this.getOrganizationDetails();
    }

    getOrganizationDetails = () => {
        console.log('in get org. details');
        this.props.dispatch({
            type: 'GET_DIRECTORY'
        })
    }

    handleVolunteerButton = (id) => {
        console.log('volunteer button for id:', id);
        this.props.history.push(`/organizationhome/${id}`)
        
    }



    render() {

        const nonprofitName = this.props.reduxStore.user.name;
        

        return(
            <div>
                <h1>
                    Nonprofit Directory Page
                </h1>

                
                
                {nonprofitName==='Admin'? <h1>You are an ADMIN!</h1> : <h1>You are just a plain ol' user!</h1>}
                
               
                <Paper className={this.props.classes.root}>

                    <div className={this.props.classes.search}>
                        <Paper elevation={1}>
                            <IconButton aria-label="Search">
                                <SearchIcon />
                            </IconButton>
                            <InputBase placeholder="Search Local Nonprofits" />
                            <Divider/>
                        </Paper>
                    </div>

                    {/* {nonprofitName === 'Admin' ? <h1>You are an ADMIN!</h1> : <h1>You are just a plain ol' user!</h1>} */}

                    
                    <Table hover={true} size="large">

                    {/* conditional rendering of the COLUMN HEADINGS based on the user being an admin or not */}
                    {
                        nonprofitName === 'Admin'? 
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
                            {this.props.reduxStore.directory.map(nonprofit => (
                                <TableRow key={nonprofit.id} className={this.props.classes.rows} hover={true}>
                                    <TableCell align="left">{nonprofit.logo}</TableCell>
                                    <TableCell align="left">{nonprofit.name}<br/>
                                                              {nonprofit.address}<br/>
                                                              {nonprofit.city}, MN 
                                                              {nonprofit.state}  
                                                              {nonprofit.zip_code}  </TableCell>
                                    <TableCell align="left">{nonprofit.category_id}</TableCell>
                                    <TableCell align="left"><AssistantPhoto fontSize="large" className={this.props.classes.flag}/></TableCell>
                                    <TableCell align="center"><Button className={this.props.classes.backButton} variant="contained">
                                        <a className={this.props.classes.backButtonText} href={nonprofit.website} >Delete</a></Button></TableCell>
                                </TableRow>
                            ))} 
                        </TableBody>

                        :

                        <TableBody>
                            {this.props.reduxStore.directory.map(nonprofit => (
                                <TableRow key={nonprofit.id} className={this.props.classes.rows} hover={true}>
                                    <TableCell align="left">{nonprofit.logo}</TableCell>
                                    <TableCell align="left">{nonprofit.name}<br />
                                        {nonprofit.address}<br />
                                        {nonprofit.city}, MN
                                                        {nonprofit.state}
                                        {nonprofit.zip_code}  </TableCell>
                                    <TableCell align="left">{nonprofit.category_id}</TableCell>
                                    <TableCell align="left"><Button className={this.props.classes.backButton} variant="contained"
                                        onClick={(event) => this.handleVolunteerButton(nonprofit.id)} >Volunteer</Button></TableCell>
                                    <TableCell align="center"><Button className={this.props.classes.backButton} variant="contained">
                                        <a className={this.props.classes.backButtonText} href={nonprofit.website} >Website</a></Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    }

                    </Table>
                </Paper>

                {JSON.stringify(this.props.reduxStore.directory)}
                <br/>
                <br/>
                {JSON.stringify(this.props.reduxStore.user)}
            </div>
        )


    }


}

const mapStateToProps = reduxStore => {
    return {
        reduxStore
    }
}

export default withStyles(styles) (connect(mapStateToProps)(DirectoryPage));
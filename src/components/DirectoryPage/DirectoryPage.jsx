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

const styles = theme => ({
    backButton: {
        color: 'white',
        backgroundColor: '#457736',
        margin: '0px 0px 0px 30px'
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
    }

})


class DirectoryPage extends Component {


    render() {


        return(
            <div>
                <h1>
                    In Directory Page
                </h1>

                

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

                    <Table hover={true} size="large">
                        <TableHead>
                            <TableRow className={this.props.classes.rows}>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center">Agency</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Volunteer Opportunities</TableCell>
                                <TableCell align="center">Website Link</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow className={this.props.classes.rows} hover={true}>
                                    <TableCell align="center">test</TableCell>
                                    <TableCell align="center">test</TableCell>
                                    <TableCell align="center">test</TableCell>
                                    <TableCell align="center"><Button className={this.props.classes.backButton}variant="contained">Volunteer</Button></TableCell>
                                    <TableCell align="center"><Button className={this.props.classes.backButton} variant="contained">Website</Button></TableCell>
                                </TableRow>
                            <TableRow>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right"><Button className={this.props.classes.backButton} variant="contained">Volunteer</Button></TableCell>
                                <TableCell align="right"><Button className={this.props.classes.backButton} variant="contained">Website</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right"><Button className={this.props.classes.backButton} variant="contained">Volunteer</Button></TableCell>
                                <TableCell align="right"><Button className={this.props.classes.backButton} variant="contained">Website</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right"><Button className={this.props.classes.backButton} variant="contained">Volunteer</Button></TableCell>
                                <TableCell align="right"><Button className={this.props.classes.backButton} variant="contained">Website</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right"><Button className={this.props.classes.backButton} variant="contained">Volunteer</Button></TableCell>
                                <TableCell align="right"><Button className={this.props.classes.backButton} variant="contained">Website</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right"><Button className={this.props.classes.backButton} variant="contained">Volunteer</Button></TableCell>
                                <TableCell align="right"><Button className={this.props.classes.backButton} variant="contained">Website</Button></TableCell>
                            </TableRow>
                           
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )


    }


}


export default withStyles(styles) (connect()(DirectoryPage));
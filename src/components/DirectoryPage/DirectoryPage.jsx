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

const styles = theme => ({

})


class DirectoryPage extends Component {


    render() {


        return(
            <div>
                <h1>
                    In Directory Page
                </h1>

                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Image</TableCell>
                                <TableCell align="right">Agency</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Volunteer Opportunities</TableCell>
                                <TableCell align="right">Website Link</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                <TableRow>
                                    <TableCell align="right">test</TableCell>
                                    <TableCell align="right">test</TableCell>
                                    <TableCell align="right">test</TableCell>
                                    <TableCell align="right">test</TableCell>
                                    <TableCell align="right">test</TableCell>
                                </TableRow>
                            <TableRow>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                                <TableCell align="right">test</TableCell>
                            </TableRow>
                           
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )


    }


}


export default withStyles(styles) (connect()(DirectoryPage));
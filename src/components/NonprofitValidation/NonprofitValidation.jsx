import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Swal from 'sweetalert2';


const styles = theme => ({
    card: {
        width: '400px',
        height: '400px',
        margin: '40px 20px 10px 100px',
    },
    approveButton: {
        color: 'white',
        backgroundColor: '#457736',
        margin: '40px 10px 10px 10px'
    },
    declineButton: {
        float: 'right',
        color: 'white',
        backgroundColor: '#457736',
        margin: '40px 10px 10px 10px'
    },
    directoryButton: {
        float: 'right',
        color: 'white',
        backgroundColor: '#457736',
        margin: '10px 150px 10px 10px'
    },
    heading: {
        margin: '40px 10px 10px 40px',
        color: '#714723'
    }
})

class NonprofitValidation extends Component {

    componentDidMount() {
        this.handleGetRequests();
    }

    handleGetRequests = ( ) => {
        this.props.dispatch({
            type: 'GET_NONPROFIT_REQUESTS'
        })
    }

    handleDirectoryButton = () => {
        this.props.history.push('/directory');
    }

    handleApproveButton = (id) => {
        Swal.fire({
            title: 'Success!',
            text: 'Nonprofit approved.',
            type: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#457736'
        }).then((result) => {
            if (result.value) {
                console.log('approve button clicked for id:', id);
                this.props.dispatch({
                    type: 'APPROVE_NONPROFIT',
                    payload: id
                })
                
            }
        })
        

    }

    // handleApproveButton = (id) => {
    //     console.log('approve button clicked for id:', id);
    //     this.props.dispatch({
    //         type: 'APPROVE_NONPROFIT',
    //         payload: id
    //     })
    // }

    // handleDeclineButton = (id) => {
    //     console.log('decline button clicked for id:', id);
    //     this.props.dispatch({
    //         type: 'DECLINE_NONPROFIT',
    //         payload: id
    //     })
    // }


    handleDeclineButton = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Declining will delete the nonprofit.",
            type: 'warning',
            showCancelButton: true,
            // confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
            confirmButtonColor: '#457736'
        }).then((result) => {
            if (result.value) {

                console.log('decline button clicked for id:', id);
                this.props.dispatch({
                    type: 'DECLINE_NONPROFIT',
                    payload: id
                })
            }
        })

    }




    render () {



        return (


            <div>
                <h1 className={this.props.classes.heading}>Nonprofit Validation</h1>
                
                <Button className={this.props.classes.directoryButton} onClick={this.handleDirectoryButton} variant="contained">Directory</Button>
                
                <Grid container spacing={3}>
                       
                    {this.props.reduxStore.admin.admin.map(nonprofit => (
                     
                        <Card className={this.props.classes.card}>
                            <CardContent key={nonprofit.id}>
                                Name: {nonprofit.name}
                                <br/>
                                Description: {nonprofit.description}
                                <br />
                                Contact Email: {nonprofit.contact_email}
                                <br />
                                Address: {nonprofit.address}
                                <br />
                                City: {nonprofit.city}
                                <br />
                                State: {nonprofit.state}
                                <br />
                                Zip Code: {nonprofit.zip_code}
                                <br/>
                                    <Button className={this.props.classes.approveButton} variant="contained"
                                        onClick={(event) => this.handleApproveButton(nonprofit.id)} >Approve</Button>
                                    <Button className={this.props.classes.declineButton} variant="contained"
                                        onClick={(event) => this.handleDeclineButton(nonprofit.id)} >Decline</Button>
                            </CardContent>
                            
                        </Card>

                    ))}
                    
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        reduxStore
    }
}


export default withStyles(styles)(connect(mapStateToProps) (NonprofitValidation));
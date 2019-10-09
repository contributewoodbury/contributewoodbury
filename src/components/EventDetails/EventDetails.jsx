import React, {Component} from 'react';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
import {connect} from 'react-redux';

const styles = theme => ({
    rootDiv: {
        margin: '0px 100px 0px 100px'
    },
    root: {
        width: '100%',
        overfloxX: 'auto'
    }
})

class EventDetails extends Component {

    componentDidMount () {
        this.props.dispatch ({
            type: 'GET_EVENT_DETAILS',
            payload: this.props.match.params.id
        })
    }
    render() {
        return (
            <div className={this.props.classes.rootDiv}>
                <Grid container spacing={3}>
                    <Grid container spacing={3}>
                    {
                        this.props.nonprofit.map((information) => {
                            return <>
                            <h2>{information.nonprofit_name}</h2>
                            <Grid container spacing={3}>
                            <p>{information.nonprofit_address}</p>
                            <br></br>
                                    <p>{information.nonprofit_city}</p> <br></br><p>{information.nonprofit_zip_code}</p>
                                </Grid>
                            </>
                        })
                    }
                    </Grid>
                    {
                        this.props.event.eventDetails.map((info) => {
                            return <>
                            <Grid containter spacing={3}>
                                <h2>{info.name}</h2>
                            </Grid>
                            <Grid container spacing={3}>
                            <p>Date: {info.start_date}</p>
                                </Grid>
                            <Grid container spacing ={3}>
                                <p>Location: <address>
                                    {info.address} <br></br>
                                    {info.city} 
                                    {info.zip_code }
                                    </address>
                                    </p>
                            </Grid>
                            <Grid container spacing={3}>
                                <p>Contact: </p>
                            </Grid>
                            <Grid>
                            Description: {info.description}
                            </Grid>
                            <Grid containter spacing={3}>
                            <h3>Volunteer Opportunities for this event:</h3>
                                </Grid>
                            </>
                        })
                    }
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event,
        nonprofit: state.nonprofit
    }
}

export default connect(mapStateToProps)(withStyles(styles)(EventDetails));
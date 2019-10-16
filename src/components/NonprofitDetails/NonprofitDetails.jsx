import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';


const styles = theme => ({
    nonprofitInfo: {
        display: 'inline-block',
        padding: '20px',
    },
    logo: {
        height: '80px',
    },
})


class NonprofitDetails extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_EVENT_DETAILS',
            payload: this.props.role.event_id
        })
    }



    render () {



        return (
            <>

                    <div className={this.props.classes.nonprofitInfo} >
                        <img className={this.props.classes.logo} src={this.props.user.logo} alt="" />
                    </div>
                    <div className={this.props.classes.nonprofitInfo} >
                        <p>
                            {this.props.user.name}<br />
                            {this.props.user.address}<br />
                            {this.props.user.city}, {this.props.user.state} {this.props.user.zip_code}
                        </p>
                    </div>

            </>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        nonprofit: reduxStore.nonprofit.nonprofit,
        role: reduxStore.volunteer.specificRole,
        user: reduxStore.user
    }
}

export default withStyles(styles) (connect(mapStateToProps) (NonprofitDetails));
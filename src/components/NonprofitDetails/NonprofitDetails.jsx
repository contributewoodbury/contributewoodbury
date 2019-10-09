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


    render () {



        return (
            <>
                <h3>nonprofit information and logo goes here</h3>
                <div className={this.props.classes.nonprofitInfo} >
                    <img className={this.props.classes.logo} src={this.props.user.logo} alt="" />
                </div>
                <div className={this.props.classes.nonprofitInfo} >
                    <>
                        <p>{this.props.user.name}<br />
                            {this.props.user.address}<br />
                            {this.props.user.city}, MN {this.props.user.zip_code} </p>
                    </>
                </div>
                {/* {JSON.stringify(this.props)} */}
            </>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        event: reduxStore.event.eventDetails,
        user: reduxStore.user
    }
}

export default withStyles(styles) (connect(mapStateToProps) (NonprofitDetails));
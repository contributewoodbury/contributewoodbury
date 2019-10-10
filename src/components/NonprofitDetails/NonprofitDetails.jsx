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

                    <>
                    {this.props.nonprofit.map(each => (
                        <>
                        <div className={this.props.classes.nonprofitInfo} >
                            <img className={this.props.classes.logo} src={each.logo} alt="" />
                        </div>
                        <div className={this.props.classes.nonprofitInfo} >
                            <p>
                                {each.nonprofit_name}<br />
                                {each.address}<br/>
                                {each.city}, {each.state} {each.zip_code}
                            </p>
                        </div>   
                        </>
                    ))}
                    </>

                {/* {JSON.stringify(this.props.nonprofit)} */}
            </>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        nonprofit: reduxStore.nonprofit
    }
}

export default withStyles(styles) (connect(mapStateToProps) (NonprofitDetails));
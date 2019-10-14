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
                    {/* {JSON.stringify(this.props.nonprofit[0].nonprofit_name)} */}
                    {this.props.nonprofit ? 
                    <>
                        <div className={this.props.classes.nonprofitInfo} >
                            <img className={this.props.classes.logo} src={this.props.nonprofit[0].logo} alt="" />
                        </div>
                        <div className={this.props.classes.nonprofitInfo} >
                            <p>
                                {this.props.nonprofit[0].nonprofit_name}<br />
                                {this.props.nonprofit[0].address}<br />
                                {this.props.nonprofit[0].city}, {this.props.nonprofit[0].state} {this.props.nonprofit[0].zip_code}
                            </p>
                        </div></> : <span></span>  }
                     {/* {this.props.nonprofit.map(each => (
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
                    ))} */}
                    </>

                {/* {JSON.stringify(this.props.nonprofit)} */}
            </>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        nonprofit: reduxStore.nonprofit.nonprofit
    }
}

export default withStyles(styles) (connect(mapStateToProps) (NonprofitDetails));
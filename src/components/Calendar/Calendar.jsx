import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


class Calendar extends Component {

  componentDidMount(){
    this.props.dispatch({ type: 'GET_CALENDAR'})
  }



  render() { 
    // let calendarDivider = <div><h1>{Date.today().last().sunday()} - {Date.today().next().saturday()}</h1></div>;
    return ( 
      <div>
        <script type="text/javascript" src="date.js"></script>
        Calendar
         <div><h1>{moment("20191004", "YYYYMMDD").fromNow()}</h1></div>
        {moment().format('MM[/]DD[/]YYYY')} - {moment().add(7, 'days').calendar()}
      </div>
     );
  }
}

const mapStoreToProps = store => ({
  store,
});
 
export default connect(mapStoreToProps)(Calendar);



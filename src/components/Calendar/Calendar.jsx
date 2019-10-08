import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './calendar.css';


const Calendar = () => {
  const dispatch = useDispatch();
  const eventList = useSelector(store => store.calendar.calendar);
  const npList = useSelector(store => store.directory);
  React.useEffect(() => {
    dispatch({ type: 'GET_CALENDAR' });
    dispatch({ type: 'GET_DIRECTORY' })
  }, [])

  function findName(id) {
    for (let nonprofit of npList) {
      if (+(id) === nonprofit.id) {
        return nonprofit.name
      }
    }
  }

  return (
    <div>
      <div><h1>Calendar</h1></div>
      <div>
        <h4>{moment().subtract(7, 'days').calendar('MM[/]DD[/]YYYY')} - {moment().subtract(1, 'days').calendar('MM[/]DD[/]YYYY')}</h4>
        <ul>
          {eventList.lastWeek ? eventList.lastWeek.map(event =>
            <li key={event.id}> <b>Event:</b> {event.name} &nbsp;
            <Link to='/event'>Learn More</Link>
              <b> Organization: </b> {findName(event.non_profit_id)}
              <br /> <b>Dates: </b>
              {moment(event.start_date).format('MMM Do YYYY')} - {moment(event.end_date).format('MMM Do YYYY')}
            </li>) : 'No Events this week'}
        </ul>
      </div>
      <div>
        <h4>{moment().format('MM[/]DD[/]YYYY')} - {moment().add(6, 'days').calendar('MM[/]DD[/]YYYY')}</h4>
        <ul>
          {eventList.currentWeek ? eventList.currentWeek.map(event =>
            <li key={event.id}> <b>Event:</b> {event.name} &nbsp;
            <Link to='/event'>Learn More</Link>
              <b> Organization: </b> {findName(event.non_profit_id)}
              <br /> <b>Dates: </b>
              {moment(event.start_date).format('MMM Do YYYY')} - {moment(event.end_date).format('MMM Do YYYY')}
            </li>) : 'No Events this week'}
        </ul>
      </div>
      <div>
        <h4>{moment().add(7, 'days').calendar()} - {moment().add(13, 'days').calendar()}</h4>
        <ul>
          {eventList.nextWeek ? eventList.nextWeek.map(event =>
            <li key={event.id}> <b>Event:</b> &nbsp; {event.name}
              <Link to='/event'>Learn More</Link>
              <b> Organization: </b> {findName(event.non_profit_id)}
              <br /> <b>Dates: </b>
              {moment(event.start_date).format('MMM Do YYYY')} - {moment(event.end_date).format('MMM Do YYYY')}
            </li>) : 'No Events this week'}
        </ul>
      </div>
      <div>
        <h4>Future Events</h4>
        <ul>
          {eventList.nextWeek ? eventList.future.map(event =>
            <li key={event.id}> <b>Event:</b> {event.name} &nbsp;
            <Link to='/event'>Learn More</Link>
              <b> Organization: </b> {findName(event.non_profit_id)}
              <br /> <b>Dates: </b>
              {moment(event.start_date).format('MMM Do YYYY')} - {moment(event.end_date).format('MMM Do YYYY')}
            </li>) : 'No Events this week'}
        </ul>
      </div>
    </div>
  );
}

export default Calendar;



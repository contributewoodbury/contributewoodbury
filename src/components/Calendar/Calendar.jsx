import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment, { now } from 'moment';


const Calendar = () => {
  const dispatch = useDispatch();
  const eventList = useSelector(store => store.calendar);
  React.useEffect(() => {
    dispatch({ type: 'GET_CALENDAR' })
  }, [])

  return (
    <div>
      <div><h1>Calendar</h1></div>
      <div>
        <h4>{moment().format('MM[/]DD[/]YYYY')} - {moment().add(6, 'days').calendar('MM[/]DD[/]YYYY')}</h4>
        <ul>
          {eventList.currentWeek && eventList.currentWeek.map(event => <li>event.name</li>)}
        </ul>
      </div>
      <div>
        <h4>{moment().add(7, 'days').calendar()} - {moment().add(13, 'days').calendar()}</h4>
        <ul>
          {eventList.nextWeek ? eventList.nextWeek.map(event => <li>{event.name}</li>) : 'No Events this week'}
        </ul>
      </div>
    </div>
  );
}

export default Calendar;



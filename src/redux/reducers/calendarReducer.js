import moment, { now } from 'moment';

const calendar = (state = [], action) => {
  switch (action.type) {
    case 'SET_CALENDAR':
      let calendar = { lastWeek: [], currentWeek: [], nextWeek: [] }
      for (const event of action.payload) {
        if (event.end_date < now && event.end_date > moment().subtract(7, 'days')) {
          calendar.lastweek.push(event);
        } else if (event.end_date > now && event.end_date < moment().add(7, 'days')) {
          calendar.currentweek.push(event);
        } else {
          calendar.nextWeek.push(event);
        }
      }
      return calendar;
    default:
      return state;
  }
}

export default calendar;
import { Calendar } from 'react-big-calendar';
import { addHours } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { getMessagesES, localizer } from '../../helpers';
import { Navbar } from "../";


const event = [{
  title: 'Cumpleaños del jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#fafafa',
  use: {
    _id: '123',
    name: 'Jose'
  }
}]
export const CalendarPage = () => {
  return (
    <>
      <Navbar/>

      <Calendar
      culture='es'
        localizer={localizer}
        events={event}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 90px)' }}
        messages={ getMessagesES() }
      />
    </>
  )
}

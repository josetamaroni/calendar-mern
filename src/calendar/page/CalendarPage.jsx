import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { getMessagesES, localizer } from '../../helpers';
import { CalendarEvent, CalendarModal, FabAddNew, Navbar, FabDelete } from "../";
import { useUiStore,useCalendarStore } from '../../hooks';


export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    // console.log({event, start, end, isSelected})
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    //* Al hacer doble click abre el modal
    openDateModal();
  }
  const onSelect = (event) => {
    //* Al hacer click sobre el evento se activa
    setActiveEvent(event);
  }
  const onViewChanged = (event) => {
    setLastView(event)
    localStorage.setItem('lastView',event)
  }

  return (
    <>
      <Navbar/>

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 90px)' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />
      
      {/* Modal */}
      <CalendarModal/>

      {/* Boton para crear nuevo evento */}
      <FabAddNew/>

      <FabDelete/>
    </>
  )
}

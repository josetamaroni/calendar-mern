import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsDateToEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) );
    }

    //* Actualizar un evento
    const startSavingEvent = async ( calendarEvent ) => {
        try {
            if( calendarEvent.id ){
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return;
            }
            //Creo nuevo
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );
        } catch (error) {
            Swal.fire('Error al guardar', error.response.data?.msg, 'error');
        }
    }

    //* Eliminar un Evento
    const startDeletingEvent = async() => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch( onDeleteEvent() );
        } catch (error) {
            Swal.fire('Error al eliminar el evento', error.response.data?.msg, 'error');
        }
    }

    //* Buscar todos los eventos
    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsDateToEvents( data.eventos );

            //* Todos los eventos de la base de datos los guardo en el Store 
            dispatch(onLoadEvents(events)); 
        } catch (error) {
            console.log('Error - startLoadingEvents', error)
        }
    }

    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //* Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}
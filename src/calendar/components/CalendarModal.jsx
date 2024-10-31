import React, { useEffect, useMemo, useState } from 'react'
import { addHours, differenceInSeconds } from 'date-fns';
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';

import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from '../../hooks';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');
registerLocale( 'es', es );

export const CalendarModal = () => {
  //* hook para saber si el modal esta abierto/cerrado
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  //* Formulario
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours( new Date(), 2)
  });

  //* Valido que tenga titulo el evento
  const titleClass = useMemo(() => {
    if ( !formSubmitted ) return '';

    return ( formValues.title.length > 0 )
      ? 'is-valid'
      : 'is-invalid';
  }, [ formValues.title, formSubmitted ])

  //* Cargo la informacion del evento en el Modal
  useEffect(() => {
    if ( activeEvent !== null ) {
      setFormValues({ ...activeEvent })
    }
  }, [activeEvent])


  const onInputChanged = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }
  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onCloseModal = () => {
    //* Al hacer click afuera del modal se cierra
    closeDateModal();
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    //* validar que la fecha final sea mayor que la fecha inicial
    const diference = differenceInSeconds( formValues.end, formValues.start )
    if ( isNaN( diference ) ) {
      Swal.fire('Fechas incorrectas','Debe seleccionar una fecha','error')
      return;
    }
    if (diference < 0) {
      Swal.fire('Fechas incorrectas','La fecha inicial no debe ser mayor que la fecha final','error')
      return;
    }
    if (  formValues.title.length <= 0 ) return;

    // Crear nuevo evento y Cerrar modal
    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
    // TODO Restablecer formulario y remover error en pantalla
    console.log(formValues)
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
    >
      <form className="container" onSubmit={ onSubmit }>
      <h3> Nuevo evento </h3>
      <hr />
        <div className="form-group mb-2">
          <label className="form-label">Fecha y hora inicio</label>
          <div>
            <DatePicker
              className="form-control"
              selected={ formValues.start }
              onChange={ (event) => onDateChanged(event,'start') }
              dateFormat='Pp'
              showTimeSelect
              locale="es"
              timeCaption='Hora'
            />
          </div>
        </div>

        <div className="form-group mb-2">
          <label className="form-label">Fecha y hora fin</label>
          <div>
            <DatePicker
              minDate={ formValues.start}
              className="form-control"
              selected={ formValues.end }
              onChange={ (event) => onDateChanged(event,'end') }
              dateFormat='Pp'
              showTimeSelect
              locale="es"
              timeCaption='Hora'
            />
          </div>
        </div>

        <hr />
        <div className="form-group mb-2">
          <label className="form-label">Titulo y notas</label>
          <input 
            type="text" 
            className={`form-control ${ titleClass }`}
            placeholder="Título del evento"
            name="title"
            value={formValues.title}
            onChange={onInputChanged}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="12"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  )
}

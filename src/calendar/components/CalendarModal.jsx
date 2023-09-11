import React, { useState } from 'react'
import { addHours } from 'date-fns';
import es from 'date-fns/locale/es';

import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  // Para cerrar el modal
  const [isOpen, setIsOpen] = useState(true);

  // formulario
  const [formValues, setFormValues] = useState({
    title: 'Fernando',
    notes: 'Herrera',
    start: new Date(),
    end: addHours( new Date(), 2)
  });

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
  
  // Para las fechas de Inicio y Fin
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());

  const onCloseModal = () => {
    console.log('cerrando modal')
    setIsOpen(false)
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
    >
      <h3> Nuevo evento </h3>
      <hr />
      <form className="container">
        <div className="form-group mb-2">
          <label class="form-label">Fecha y hora inicio</label>
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

        <div className="form-group mb-2">
          <label class="form-label">Fecha y hora fin</label>
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

        <hr />
        <div className="form-group mb-2">
          <label class="form-label">Titulo y notas</label>
          <input 
            type="text" 
            className="form-control"
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
            rows="5"
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

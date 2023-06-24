
import React from 'react'

export const Navbar = () => {
  return (
    <div className='navbar navbar-dark bg-dark mb-2 px-4'>
        <span className='navbar-brand'>
            <i className='fas fa-calendar-alt pe-2'></i>
            Jose
        </span>
        <button className='btn btn-outline-danger'>
            <i className='fas fa-sign-out-alt pe-2'></i>
            <span>Salir</span>
        </button>
    </div>
  )
}

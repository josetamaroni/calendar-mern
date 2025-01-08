
import React from 'react'
import { useAuthStore } from '../../hooks';

export const Navbar = () => {
  
  const { startLogout, user } = useAuthStore();

  return (
    <div className='navbar navbar-dark bg-dark mb-2 px-4'>
        <span className='navbar-brand'>
            <i className='fas fa-calendar-alt pe-2'></i>
            { user.name ? user.name : 'Welcome' }
        </span>
        <button className='btn btn-outline-danger' onClick={startLogout}>
            <i className='fas fa-sign-out-alt pe-2'></i>
            &nbsp;
            <span>Salir</span>
        </button>
    </div>
  )
}

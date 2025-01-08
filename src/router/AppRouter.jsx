import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

export const AppRouter = () => {
    
    // const authStatus = 'checking';
    // const authStatus = 'not-authenticated';
    // const authStatus = 'authenticated';

    const { status, checkAuthToken } = useAuthStore();
    useEffect(() => {
        checkAuthToken();
    }, [])
    
    if (status == 'checking') {
        return (
            <div><h1>Cargando...</h1></div>
        )
    }
    return (
        <Routes>
            {
               ( status === 'not-authenticated' )
               ? (
                    <>
                        <Route path='/auth/*' element={ <LoginPage/> } />
                        <Route path='/*' element={ <Navigate to='/auth/login' /> } />
                    </>
                )
               : (
                    <>
                        <Route path='/' element={ <CalendarPage/> } />
                        <Route path='/*' element={ <Navigate to='/' /> } />
                    </>
               )
            }
            
            
        </Routes>
  )
}

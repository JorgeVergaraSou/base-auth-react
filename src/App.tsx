
import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import './App.css'
import { PrivateRoutes, PublicRoutes, Roles } from './models'
import { AuthGuard } from './guards'
import { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import { RoutesWithNotFound } from './utilities';
import Logout from './components/Logout/Logout'
import RoleGuard from './guards/rol.guard'
import Dashboard from './pages/Private/Dashboard/Dashboard'



const Login = lazy(() => import('./pages/Login/Login'))

const Private = lazy(() => import('./pages/Private/Private'))

function App() {


  return (

    <div className='App'>

    <Suspense fallback={<div>Loading...</div>}>

    <Provider store={store}>

      <BrowserRouter>
      <Logout />
        <RoutesWithNotFound>

          

            <Route path='/' element={<Navigate replace to={PrivateRoutes.PRIVATE} />} />

            <Route path={PublicRoutes.LOGIN} element={<Login />} />

            <Route element={<AuthGuard privateValidation={true} />}> /** se usa en esta parte porque intercepta y verifica que esta el usuario registrado */

              <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} /> /** este es el llamado Outlet del Guard */
          
            </Route>

            <Route element={<RoleGuard rol={Roles.ADMIN} />}>
                <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
              </Route>

        

        </RoutesWithNotFound>

      </BrowserRouter>

      </Provider>

</Suspense>


    </div>

  )
}

export default App
/**1:27:11 */
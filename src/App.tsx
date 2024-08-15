
import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import './App.css'
import { PrivateRoutes, PublicRoutes, Roles } from './models'
import { AuthGuard } from './guards'
import { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import { RoutesWithNotFound } from './utilities';
//import Logout from './components/Logout/Logout'
import RoleGuard from './guards/rol.guard'
import Admin from './pages/Private/Admin/Admin'
import Header from './components/Header'
import IngresoProductos from './pages/Private/Admin/IngresoProductos'

const Login = lazy(() => import('./pages/Login/Login'))
const Private = lazy(() => import('./pages/Private/Private'))

function App() {

  return (

    <div className='flex flex-col min-h-screen'>

      <Suspense fallback={<div>Loading...</div>}>

        <Provider store={store}>

          <BrowserRouter>
            <Header />
            <RoutesWithNotFound>


              <Route path='/' element={<Navigate replace to={PrivateRoutes.PRIVATE} />} />

              <Route path={PublicRoutes.LOGIN} element={<Login />} />

              <Route element={<AuthGuard privateValidation={true} />}> /** se usa en esta parte porque intercepta y verifica que esta el usuario registrado */

                <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} /> /** este es el llamado Outlet del Guard */

              </Route>

              <Route element={<RoleGuard role={Roles.ADMIN} />}>
                <Route path={PrivateRoutes.ADMIN} element={<Admin />} />
                <Route path={PrivateRoutes.INGRESO_PRODUCTOS} element={<IngresoProductos />} />
              </Route>

              <Route element={<RoleGuard role={Roles.USER} />}>
                <Route path={PrivateRoutes.USER} element={<Admin />} />
              </Route>



            </RoutesWithNotFound>

          </BrowserRouter>

        </Provider>

      </Suspense>


    </div>

  )
}

export default App
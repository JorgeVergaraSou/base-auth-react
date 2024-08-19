import { Navigate, Route } from "react-router-dom"
import { PrivateRoutes } from "../../models"
import { lazy } from "react"
import { RoutesWithNotFound } from "../../utilities"

const Admin = lazy(() => import('./Admin/Admin'))
//const Dashboard = lazy(() => import('./Dashboard/Dashboard'))
const UserPage = lazy(() => import('./User/User'))

function Private() {
  //const userRole = useSelector((state: AppStore) => state.user.role);
  return (

    
     <RoutesWithNotFound>
      <Route path='/' element={<Navigate to={PrivateRoutes.ADMIN} />} />
      <Route path={PrivateRoutes.ADMIN} element={<Admin />} />
      <Route path={PrivateRoutes.USER} element={<UserPage />} />
    </RoutesWithNotFound>



  )
}
export default Private

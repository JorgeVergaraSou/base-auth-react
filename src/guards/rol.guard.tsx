import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRoutes } from '../models';
import { AppStore } from '../redux/store';
import { Props } from '../interfaces/roles.interface';

function RoleGuard({ rol }: Props) {
  const userState = useSelector((store: AppStore) => store.user);
  return userState.rol === rol ? <Outlet /> : <Navigate replace to={PrivateRoutes.PRIVATE} />;
}
export default RoleGuard;
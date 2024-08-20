import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from '../models';
import { AppStore } from '../redux/store';
import { Props } from '../interfaces/guard.interface';
import { clearLocalStorage } from '../utilities';
import { UserKey, resetUser } from '../redux/states/user';

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to={PrivateRoutes.PRIVATE} />;

export const AuthGuard = ({ privateValidation }: Props) => {
  const userState = useSelector((store: AppStore) => store.user);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  if (token) {
    // Decodificar el payload del token para obtener la fecha de expiración
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(exp * 1000); // Convertir a objeto Date
    const currentDate = new Date();

    // Verificar si el token ha expirado
    if (expirationDate <= currentDate) {
      clearLocalStorage(UserKey);
      dispatch(resetUser());

      // Redirigir al login si el token ha expirado
      return <Navigate replace to={PublicRoutes.LOGIN} />;
    }
  }

  // Comprobar el estado del usuario para navegación
  return userState.name ? (
    privateValidation ? (
      PrivateValidationFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate replace to={PublicRoutes.LOGIN} />
  );
};

export default AuthGuard;

/*
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from '../models';
import { AppStore } from '../redux/store';
import { Props } from '../interfaces/guard.interface';


const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to={PrivateRoutes.PRIVATE} />;

export const AuthGuard = ({ privateValidation }: Props) => {
  const userState = useSelector((store: AppStore) => store.user);
  return userState.name ? (
    privateValidation ? (
      PrivateValidationFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate replace to={PublicRoutes.LOGIN} />
  );
};

export default AuthGuard;
*/
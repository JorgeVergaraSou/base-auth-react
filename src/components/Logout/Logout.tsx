import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetUser } from '@/redux/states/user';
import { PublicRoutes } from '@/models';

function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    // resetUser ya limpia el localStorage (ver redux/states/user.ts), no
    // hace falta duplicarlo acá.
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
  };

  return logOut;
}

export default useLogout;

import { useNavigate } from "react-router-dom";
import { resetUser, UserKey } from "../../redux/states/user"
import { clearLocalStorage } from "../../utilities";
import { PublicRoutes } from "../../models";
import { useDispatch } from "react-redux";


function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    clearLocalStorage(UserKey)
    dispatch(resetUser())
    navigate(PublicRoutes.LOGIN, { replace: true });

  };
  return <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={logOut}>Logout</button>
}
export default Logout
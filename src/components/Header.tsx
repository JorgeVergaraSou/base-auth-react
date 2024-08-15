import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";

import NavBars from "./NavBars/NavBars";

function Header() {
    const user = useSelector((state: AppStore) => state.user);

    const isAuthenticated = user && user.token;

    return (
        <>
            <div >
                
             
                {isAuthenticated && <NavBars />}
            </div>
        </>
    );
}

export default Header;

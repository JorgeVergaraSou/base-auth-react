import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";

import NavBars from "./NavBars/NavBars";
import DropdownMenu from "./NavBars/DropdownMenu";

function Header() {
    const user = useSelector((state: AppStore) => state.user);

    const isAuthenticated = user && user.token;

    return (
        <>
            <div >          
             
                {isAuthenticated && <NavBars />}
            </div>

            <div><DropdownMenu /></div>
        </>
    );
}

export default Header;

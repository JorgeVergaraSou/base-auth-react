// src/components/Header.tsx
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppStore } from "@/redux/store";
import { PublicRoutes } from "@/models";
import DropdownMenu from "./NavBars/DropdownMenu";

const publicPaths: string[] = Object.values(PublicRoutes);

function Header() {
    const user = useSelector((state: AppStore) => state.user);
    const location = useLocation();

    // En rutas públicas (login, register) nunca se muestra el menú
    // privado, aunque haya quedado un token viejo en el store/localStorage.
    const enRutaPublica = publicPaths.some((path) => location.pathname.startsWith(`/${path}`));

    const isAuthenticated = Boolean(user?.token) && !enRutaPublica;

    return (
        <>
            <header>
                {isAuthenticated && <DropdownMenu />}
            </header>
        </>
    );
}

export default Header;

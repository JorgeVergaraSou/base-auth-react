import { useSelector } from "react-redux";
import { AppStore } from "../../../redux/store";

function IngresoProductos() {
    const user = useSelector((state: AppStore) => state.user);

    return (
      <div className="flex flex-col text-center">
        <h1 className="text-3xl bg-red-500 font-bold underline">
          Bienvenido, {user.name}
        </h1>
        <div><h3>ACA SE INGRESA</h3></div>

  
       
        {/* Aquí puedes mostrar más información o componentes basados en los datos del usuario */}
      </div>
    );
}
export default IngresoProductos
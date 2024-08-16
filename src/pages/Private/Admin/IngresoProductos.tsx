import { useSelector } from "react-redux";
import { AppStore } from "../../../redux/store";

function IngresoProductos() {
    const user = useSelector((state: AppStore) => state.user);

    return (
      <div className="flex flex-col text-center bg-orange-400">
        <h1 className="text-3xl bg-red-500 font-bold underline">
          Bienvenido, {user.name}
        </h1>
        <div><h3>ACA SE INGRESA</h3></div>

        <div className="grid grid-cols-3 gap-4">
  <div className="bg-gray-200 h-20 w-full">Elemento 1</div>
  <div className="bg-gray-300 h-20 w-full">Elemento 2</div>
  <div className="bg-gray-200 h-20 w-full">Elemento 3</div>

</div>
       
        {/* Aquí puedes mostrar más información o componentes basados en los datos del usuario */}
      </div>
    );
}
export default IngresoProductos
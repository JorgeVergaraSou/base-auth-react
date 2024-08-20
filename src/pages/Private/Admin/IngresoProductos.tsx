import { useSelector } from "react-redux";
import { AppStore } from "../../../redux/store";

function IngresoProductosPage() {
  const user = useSelector((state: AppStore) => state.user);

  return (
    <div className="flex flex-col text-center bg-orange-400">
      <h1 className="text-3xl bg-red-500 font-bold underline">
        Bienvenido: {user.name}
      </h1>
      <div><h2>ACA SE INGRESA</h2></div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-200 h-20 w-full">Elemento 1</div>
        <div className="bg-gray-300 h-20 w-full">
          <form action="">
            <input type="text" placeholder="Escriba el nombre del producto" />
          </form>
        </div>
        <div className="bg-gray-200 h-20 w-full">Elemento 3</div>
      </div>
    </div>
  );
}
export default IngresoProductosPage
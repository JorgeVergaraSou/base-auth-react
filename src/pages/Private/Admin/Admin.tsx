import { useSelector } from 'react-redux';
import { AppStore } from '../../../redux/store';


function AdminPage() {
  const user = useSelector((state: AppStore) => state.user);

  return (
    <div className="flex flex-col text-center ">
      <h1 className="text-3xl bg-red-500 font-bold underline">
        Bienvenido, {user.name}
      </h1>

      <p>Correo: {user.email}</p>
      <p>Rol: {user.role}</p>
   
      {/* Aquí puedes mostrar más información o componentes basados en los datos del usuario */}
    </div>
  );
}

export default AdminPage;

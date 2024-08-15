import { useSelector } from 'react-redux';
import { AppStore } from '../../../redux/store';


function UserPage() {
  const user = useSelector((state: AppStore) => state.user);

  return (
    <div>
      <h1>Bienvenido {user.name}</h1>
      <p>Correo: {user.email}</p>
      <p>Rol: {user.role}</p>
      {/* Aquí puedes mostrar más información o componentes basados en los datos del usuario */}
    </div>
  );
}

export default UserPage;

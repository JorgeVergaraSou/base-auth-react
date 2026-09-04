import { useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';


function AdminPage() {
  const user = useSelector((state: AppStore) => state.user);

  return (
    <div>
      <h1>
        Bienvenido, {user.name}
      </h1>
      <div><h3>Correo: {user.email}</h3>
      <h4>Rol: {user.role}</h4>
      </div>

      <div>
        <div>Elemento 1</div>
        <div>ADMIN PAGE</div>
        <div>Elemento 3</div>
      </div>
    </div>
  );
}

export default AdminPage;

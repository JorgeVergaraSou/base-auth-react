import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { useState } from "react";
import axios from "axios";

function ProfilePage() {
  const user = useSelector((state: AppStore) => state.user);
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async (field: string) => {
    try {
      const updateData: any = {}; 
  
      if (field === 'name') updateData.name = newName;
      if (field === 'email') updateData.email = newEmail;
      if (field === 'password') updateData.password = newPassword;
      if (field === 'currentPassword') updateData.currentPassword = currentPassword;

      
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      };

      const response = await axios.patch(`${apiUrl}/auth/updateUser/${user.idUser}`, updateData, { headers });

      console.log('Respuesta del servidor:', response.data);
      setMessage(response.data.message);

    } catch (error) {
      console.error('Error en la actualización:', error);
      setMessage('Ocurrió un error al actualizar los datos.');
    }
  };

  return (
    <div className="flex flex-col text-center h-full mx-auto px-2">
      <div><h1>Perfil {user.role}</h1></div>
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-1"></div>
        <div className="col-span-3 bg-gray-300 h-full w-full rounded-t-xl p-8">
          <ul className="space-y-4">

            {/* Campo para cambiar el nombre */}
            <li className="flex items-center">


            <div className="flex flex-col">
                <div>
                  Contraseña actual:
                  <input 
                    type="password" 
                    placeholder="Ingresa tu contraseña actual" 
                    className="bg-gray-200 rounded-lg p-2"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
              </div>


              <div className="flex flex-col">
                <label>Nombre actual: {user.name}</label>
                <input 
                  type="text" 
                  placeholder="Cambiar nombre" 
                  className="bg-gray-200 rounded-lg p-2"
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button className="bg-green-300 rounded-lg p-2 mt-2" onClick={() => handleUpdate('name')}>Cambiar nombre</button>
              </div>
            </li>

            {/* Campo para cambiar el email */}
            <li className="flex items-center">
              <div className="flex flex-col">
                <label>Email actual: {user.email}</label>
                <input 
                  type="email" 
                  placeholder="Cambiar email" 
                  className="bg-gray-200 rounded-lg p-2"
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <button className="bg-green-300 rounded-lg p-2 mt-2" onClick={() => handleUpdate('email')}>Cambiar email</button>
              </div>
            </li>

            {/* Campo para cambiar la contraseña */}
            <li className="flex items-center">
              <div className="flex flex-col">
                <label>Cambiar contraseña:</label>
                <input 
                  type="password" 
                  placeholder="Nueva contraseña" 
                  className="bg-gray-200 rounded-lg p-2"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button className="bg-green-300 rounded-lg p-2 mt-2" onClick={() => handleUpdate('password')}>Cambiar contraseña</button>
              </div>
            </li>

          </ul>

          {/* Mostrar mensaje de éxito o error */}
          {message && <div className="mt-4 p-4 bg-blue-300 rounded">{message}</div>}
        </div>
        <div className="col-span-1"></div>
      </div>
    </div>
  );
}

export default ProfilePage;

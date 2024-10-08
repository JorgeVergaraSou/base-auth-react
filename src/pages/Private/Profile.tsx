import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { profileService } from "../../services";

function ProfilePage() {
  const user = useSelector((state: AppStore) => state.user);
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [message, setMessage] = useState('');
  const [profileData, setProfileData] = useState<any>(null); // Estado para los datos del perfil

  // Función para obtener datos del perfil
  const fetchProfileData = async () => {
    if (!user.token) return;

    try {
      const response = await profileService(user.token);
      setProfileData(response.data.profile); // Asigna los datos del perfil obtenidos al estado
    } catch (error: any) {
      console.error('Error al obtener el perfil:', error.message);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleUpdate = async (field: string) => {
   
    const fieldValidations: Record<string, { value: string; message: string }> = {
      name: { value: newName, message: 'El campo nombre no puede estar vacío.' },
      email: { value: newEmail, message: 'El campo email no puede estar vacío.' },
      password: { value: newPassword, message: 'El campo contraseña no puede estar vacío.' },
    };
  
    // Verifica si el campo que se está actualizando tiene un valor vacío
    if (fieldValidations[field] && fieldValidations[field].value.trim() === '') {
      setMessage(fieldValidations[field].message);
      return;
    }
  
    // Crea el objeto de datos a actualizar
    const updateData: any = { currentPassword: currentPassword };
  
    // Asigna el valor al campo correspondiente
    if (field in fieldValidations) {
      updateData[field] = fieldValidations[field].value;
    }
  
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };
    console.log(updateData);
    
      try {
      const resUpdateUser = await axios.patch(`${apiUrl}/auth/updateUser/${user.idUser}`, updateData, { headers });


      setMessage(resUpdateUser.data.message);

      fetchProfileData();

      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setCurrentPassword('');

    } catch (error: any) {
      // Captura el error enviado por el filtro de excepciones
      if (error.response) {
        // El servidor envió una respuesta fuera del rango 2xx
        console.error('Error del servidor:', error.response.data.message);
        alert(error.response.data.message);
  
      } else {
        // Error en la solicitud
        console.error('Error en la solicitud:', error.message);
        alert(error.message);
 
      }
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setCurrentPassword('');
    }
  };


  return (
    <div className="flex flex-col text-center h-full mx-auto px-2">
      <div><h1>Perfil {user.role}</h1></div>
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-1">


        </div>
        <div className="col-span-3 bg-gray-300 h-full w-full rounded-t-xl p-8">



          <ul className="space-y-4">


            {profileData && (

              <>

                <li className="flex items-center">
                  <div className="flex flex-col">
                    <label>Nombre: {profileData.name}</label>
                    <input
                      type="text"
                      placeholder="Cambiar nombre"
                      className="bg-gray-200 rounded-lg p-2"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)} />
                    <button className="bg-green-300 rounded-lg p-2 mt-2" onClick={() => handleUpdate('name')}>Cambiar nombre</button>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="flex flex-col">
                    <label>Email: {profileData.email}</label>
                    <input
                      type="email"
                      placeholder="Cambiar email"
                      className="bg-gray-200 rounded-lg p-2"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <button className="bg-green-300 rounded-lg p-2 mt-2" onClick={() => handleUpdate('email')}>Cambiar email</button>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="flex flex-col">
                    <label>Cambiar contraseña:</label>
                    <input
                      type="password"
                      placeholder="Nueva contraseña"
                      className="bg-gray-200 rounded-lg p-2"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button className="bg-green-300 rounded-lg p-2 mt-2" onClick={() => handleUpdate('password')}>Cambiar contraseña</button>
                  </div>
                </li>

              </>
            )}
            <li className="flex items-center">


              <div className="flex flex-col">
                <div>
                  Contraseña actual:
                  <input
                    type="password"
                    placeholder="Ingresa tu contraseña actual"
                    className="bg-gray-200 rounded-lg p-2 "
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
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

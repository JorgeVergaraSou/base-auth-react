import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { useState } from "react";
//import { updateUserServiceAxios } from "../../services/updateUser.service";
//import { updateUserServiceFetch } from "../../services/update.service";
import axios from "axios";

function ProfilePage() {
  const user = useSelector((state: AppStore) => state.user);
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newSecretWord, setNewSecretWord] = useState('');

  const handleUpdate = async (field: string) => {
    try {
      const updateData: { name?: string, newEmail?: string, newPassword?: string, newSecretWord?: string } = {};
  
      if (field === 'name') updateData.name = newName;
      if (field === 'email') updateData.newEmail = newEmail;
      if (field === 'password') updateData.newPassword = newPassword;
      if (field === 'secretWord') updateData.newSecretWord = newSecretWord;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`, // Configurar el encabezado Authorization
      };

      const cleanedUpdateData = Object.fromEntries(
        Object.entries(updateData).filter(([_, v]) => v != null)
      );
  
      const response = await axios.patch(`${apiUrl}/auth/updateUser/${user.idUser}`, cleanedUpdateData, { headers });

    console.log('Respuesta del servidor:', response.data);

    return response.data;
     // const response = await updateUserServiceFetch(user.idUser, updateData);
      

    } catch (error) {
      console.error('Error en la actualización:', error);
    }
  };
  

  return (
    <div className="flex flex-col text-center h-full mx-auto px-2">
      <div><h1>Perfil {user.role}</h1></div>
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-1">  {/** DIV 1 */}  </div>
        <div className="col-span-3 bg-gray-300 h-full w-full rounded-t-xl p-8">
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="flex flex-col">
                <div>{user.name} : 
                  <input 
                  name="name"
                    type="text" 
                    placeholder="Cambiar nombre" 
                    className="bg-gray-200 rounded-lg p-2 "
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <button className="bg-green-300 rounded-lg p-2" onClick={() => handleUpdate('name')}>Cambiar</button>
                  </div>
              </div>
            </li>

            <li className="flex items-center">
              <div className="flex flex-col">
                <div>{user.email} : 
                  <input 
                  name="email"
                    type="email" 
                    placeholder="Cambiar E-mail" 
                    className="bg-gray-200 rounded-lg p-2 "
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                  <button className="bg-green-300 rounded-lg p-2" onClick={() => handleUpdate('email')}>Cambiar</button>
                  </div>
              </div>
            </li>

            <li className="flex items-center">
              <div className="flex flex-col">
                <div>  
                  Cambiar Password : 
                  <input 
                  name="newPassword"
                    type="password" 
                    placeholder="Cambiar Password" 
                    className="bg-gray-200 rounded-lg p-2 "
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button className="bg-green-300 rounded-lg p-2" onClick={() => handleUpdate('password')}>Cambiar</button>
                </div>
              </div>
            </li>

            <li className="flex items-center">
              <div className="flex flex-col">
                <div>  
                  Cambiar palabra secreta : 
                  <input 
                  name="secretWord"
                    type="password" 
                    placeholder="Cambiar palabra secreta" 
                    className="bg-gray-200 rounded-lg p-2 "
                    onChange={(e) => setNewSecretWord(e.target.value)}
                  />
                  
                  <button className="bg-green-300 rounded-lg p-2" onClick={() => handleUpdate('secretWord')}>Cambiar</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-span-1">    {/** DIV 3 */}         </div>
      </div>
    </div>
  );
}

export default ProfilePage;

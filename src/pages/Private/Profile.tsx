
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { useState } from "react";

function ProfilePage() {
  const user = useSelector((state: AppStore) => state.user);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  
const handleUpdateMail = () => {
  alert(newEmail);
  alert(newPassword);
  
}


  return (
    <div className="flex flex-col text-center h-full mx-auto px-2">
      <div><h1>Perfil</h1></div>





      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-1">  {/** DIV 1 */}  </div>
        
        <div className="col-span-3 bg-gray-300 h-full w-full rounded-t-xl p-8">
          Bienvenido: {user.name}
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="flex flex-col">
                <div>{user.email}</div>
                <div>  
                  <input 
                  name="email"
                    type="email" 
                    placeholder="Escriba el nombre del proyecto" 
                    className="bg-gray-200 rounded-lg p-2 "
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                  <button className="bg-green-300 rounded-lg p-2" onClick={handleUpdateMail}>Cambiar</button>
                </div>
                <div>  
                  Cambiar Password
                  <input 
                  name="newPassword"
                    type="password" 
                    placeholder="Escriba el nombre del proyecto" 
                    className="bg-gray-200 rounded-lg p-2 "
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button className="bg-green-300 rounded-lg p-2" onClick={handleUpdateMail}>Cambiar</button>
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

import { useState } from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";

function ProfilePage() {
  const user = useSelector((state: AppStore) => state.user);
  const [isInputVisible, setIsInputVisible] = useState(false);

  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
  };

  return (
    <div className="flex flex-col text-center h-full mx-auto px-2">
      <div><h1>Perfil</h1></div>

      <div className="grid grid-cols-3 gap-2">
        {/** DIV 1 */}
        <div className="h-full w-full rounded-e-xl"></div>

        {/** DIV 2 */}
        <div className="bg-gray-300 h-full w-full rounded-t-xl p-8">
          Bienvenido: {user.name}

          <ul className="space-y-4">
            <li className="flex items-center">
              <svg
                className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2 cursor-pointer"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={toggleInputVisibility}
              >
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <div className="flex flex-col">
                <div>
                  {user.email}
                </div>
                <div
                  className={`mt-2 ${isInputVisible ? 'block' : 'hidden'} transition-all duration-500 ease-in-out transform ${isInputVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
                >
                  <input
                    type="email"
                    placeholder="Escriba el nuevo correo"
                    className="border rounded-md px-2 py-1"
                  />
                </div>
              </div>
            </li>

            <li className="flex items-center">
              <svg
                className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">
                Extracting classes with
                <code className="text-sm font-bold text-gray-900">@apply</code>
              </p>
            </li>
            
            <li className="flex items-center">
              <svg
                className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">Code completion with instant preview</p>
            </li>
          </ul>
        </div>

        {/** DIV 3 */}
        <div className="h-full w-full rounded-s-xl">
          Elemento 3
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

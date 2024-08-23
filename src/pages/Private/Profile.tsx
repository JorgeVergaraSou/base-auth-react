import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";

function ProfilePage() {
  const user = useSelector((state: AppStore) => state.user);








  return ( 
    <div className="flex flex-col text-center h-full mx-auto px-2 ">
      <div><h1>Perfil</h1></div>

      <div className="grid grid-cols-3 gap-2 ">

        {/** DIV 1 */}
        <div className="bg-gray-200 h-full w-full  rounded-e-xl">
          Bienvenido: {user.name}
        


          <ul className="space-y-4">
            <li className="flex items-center">
              <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">
              {user.email}
              </p>
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">
                Extracting classes with
                <code className="text-sm font-bold text-gray-900">@apply</code>
              </p>
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">Code completion with instant preview</p>
            </li>
          </ul>


        </div>
        {/** DIV 2 */}
        <div className="bg-gray-300 h-full w-full rounded-t-xl">
          <form action="">


          </form>
        </div>
        {/** DIV 3 */}
        <div className="bg-gray-200 h-full w-full  rounded-s-xl">
          Elemento 3
        </div>

      </div>
    </div>
  )
}
export default ProfilePage
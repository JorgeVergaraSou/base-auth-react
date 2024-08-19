import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes, Roles } from '../../models';
import { createUser } from '../../redux/states/user';
import { loginService } from '../../services/auth.service';

function Login() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailInput || !passwordInput) {
      return setError('Todos los campos son obligatorios');
    }
    setLoading(true);
    setError('');
    try {
      const { token, email, role, name } = await loginService(emailInput, passwordInput);

      dispatch(createUser({ email, role, token, name }));
      localStorage.setItem('token', token);

      switch (role) {
        case Roles.ADMIN:
          navigate(`/${PrivateRoutes.ADMIN}`, { replace: true });
          break;
        case Roles.USER:
          navigate(`/${PrivateRoutes.USER}`, { replace: true });
          break;
        case Roles.GUEST:
          navigate(`/${PrivateRoutes.GUEST}`, { replace: true });
          break;
        default:
          navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
      }
    } catch (error: any) {
      setError(error.message); // Mostrar el mensaje de error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col text-center">
      <div className="grid grid-cols-3 gap-4 pt-10 ">

        <div className=" h-full w-full "></div>

        <div className=" h-full w-full bg-slate-300 bg-opacity-50">      
          <h2>LOGIN</h2>
          <form onSubmit={handleLogin} className='font-sans space-y-4 w-full max-w-lg'>
            <div>
              <label htmlFor='email' className='block text-blue-600 text-md font-bold mb-2'>
                Correo electrónico
              </label>
              <input
                name='email'
                id='email'
                className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='email@email.com'
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <label htmlFor='password' className='block text-blue-600 text-md font-bold mb-2'>
                Contraseña
              </label>
              <input
                name='password'
                id='password'
                className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='password'
                placeholder='******'
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' type="submit" disabled={loading}>Entrar</button>
            {error && <p className='text-red-600 mt-4'>{error}</p>} {/* Mostrar el error */}
          </form>
        </div>
      </div>

      <div className=" h-full w-full"></div>

    </div>

  );
}
export default Login;
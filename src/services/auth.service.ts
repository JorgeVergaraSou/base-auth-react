import axios from "axios";
import {jwtDecode} from "jwt-decode";

const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;

interface DecodedToken {
  name: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export const loginService = async (email: string, password: string) => {
  try {
    const res = await axios.post(apiUrl + `/auth/login`, { email, password });
    const token = res.data.token; 

    // Aseguramos que el token tiene el formato esperado
    const decoded: DecodedToken = jwtDecode<DecodedToken>(token); 
   
    return { token, ...decoded };
  } catch (error: any) {
    // Capturamos el mensaje de error del backend
    const errorMessage = error.response?.data?.message || 'Error desconocido';
    console.error("Error durante el login:", errorMessage);
    throw new Error(errorMessage);
  }
};

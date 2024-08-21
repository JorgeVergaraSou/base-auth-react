import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../interfaces/decode.token.interface";

const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;


export const registerService = async (nameInput: string, emailInput: string, passwordInput: string, secretWord: string) => {
  try {
    const res = await axios.post(apiUrl + `/auth/register`, { name: nameInput, email: emailInput, password: passwordInput, secretWord });

    if (res.data && res.data.token) {
      const decodedToken: DecodedToken = jwtDecode(res.data.token);
      localStorage.setItem("token", res.data.token); // Guardar el token en localStorage
      return decodedToken;
    } else {
      throw new Error("No se recibió un token válido.");
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Error desconocido";
    console.error("Error durante el registro:", errorMessage);
    throw new Error(errorMessage);
  }
};

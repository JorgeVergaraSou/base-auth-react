import axios from "axios";


const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;

export const updateUserServiceAxios = async (idUser: number, updateData: { name?: string, newEmail?: string, newPassword?: string, newSecretWord?: string }) => {
  try {
    const token = localStorage.getItem("token"); // Obtener el token de localStorage

    if (!token) {
      throw new Error('No se encontró el token. Por favor, inicia sesión nuevamente.');
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Configurar el encabezado Authorization
    };
    
    console.log('Cabeceras enviadas:', headers); // Imprime las cabeceras en la consola
    

    const cleanedUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, v]) => v != null)
    );

    const res = await axios.patch(`${apiUrl}/auth/updateUser/${idUser}`, cleanedUpdateData, { headers });

    console.log('Respuesta del servidor:', res.data);

    return res.data;

  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Error desconocido';
    console.error('Error en la actualización:', errorMessage);
    throw new Error(errorMessage);
  }
};

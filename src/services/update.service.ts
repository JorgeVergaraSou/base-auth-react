//const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;

export const updateUserServiceFetch = async (idUser: number, updateData: { name?: string, newEmail?: string, newPassword?: string, newSecretWord?: string }) => {
  try {
    const token = localStorage.getItem("token"); // Obtener el token de localStorage

    if (!token) {
      throw new Error('No se encontró el token. Por favor, inicia sesión nuevamente.');
    }


    // Eliminar propiedades undefined de updateData
    const cleanedUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, v]) => v != null)
    );
  
    const responseUpdate = await fetch( ` http://localhost:3006/api/auth/updateUser/`+ idUser,
        // `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify(cleanedUpdateData)
        }
      )


    if (!responseUpdate.ok) {
      const errorData = await responseUpdate.json();
      throw new Error(errorData.message || 'Error desconocido');
    }

    const data = await responseUpdate.json();
    console.log('Respuesta del servidor:', data);

    return data;

  } catch (error: any) {
    const errorMessage = error.message || 'Error desconocido';
    console.error('Error en la actualización:', errorMessage);
    throw new Error(errorMessage);
  }
};

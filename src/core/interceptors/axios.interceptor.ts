import axios from 'axios';
const API_URL = 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

apiClient.interceptors.request.use(
  (config) => {
    const dataUser = localStorage.getItem('data_user');
    if (dataUser) {
      // Parsea el valor para obtener el objeto y luego extraer el token
      const parsedData = JSON.parse(dataUser);
      const token = parsedData.userToken;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => response,
  error => {
    // Si el token expiró (401)
    if (error.response?.status === 401) {
      clearAuthData();
      window.location.href = '/login';
      return Promise.reject(error);
    }
    // Para otros errores del servidor
    if (error.response?.status >= 500) {
      alert('Ocurrió un error en el servidor. Por favor, intente más tarde.');
    }
    return Promise.reject(error);
  }
);

const clearAuthData = () => {
  localStorage.removeItem('data_user');
};

// export const AxiosInterceptor = () => {
//   axios.interceptors.request.use(
//     (config) => {
//       const dataUser = localStorage.getItem('data_user');
//       if (dataUser) {
//         // Parsea el valor para obtener el objeto y luego extraer el token
//         const parsedData = JSON.parse(dataUser);
//         const token = parsedData.userToken;
//         if (token) {
//           config.headers['Authorization'] = `Bearer ${token}`;
//         }
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   axios.interceptors.response.use(
//     response => response,
//     error => {
//       // Si el token expiró (401)
//       if (error.response?.status === 401) {
//         clearAuthData();
//         window.location.href = '/login';
//         return Promise.reject(error);
//       }

//       // Para otros errores del servidor
//       if (error.response?.status >= 500) {
//         alert('Ocurrió un error en el servidor. Por favor, intente más tarde.');
//       }

//       return Promise.reject(error);
//     }
//   );
// };

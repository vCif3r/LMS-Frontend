import axios from 'axios';

export const AxiosInterceptor = () => {
  axios.interceptors.request.use(
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
};

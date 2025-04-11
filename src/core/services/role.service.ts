import { apiClient } from "../interceptors/axios.interceptor";

export const getRoles = async () => {
    const response = await apiClient.get("/roles");
    const result = response.data;
    return result;
};
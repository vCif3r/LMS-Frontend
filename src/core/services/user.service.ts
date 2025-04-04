import { apiClient } from "../interceptors/axios.interceptor"
import { PaginatedResponse } from "../types/pagination";
import { User, UserFilters } from "../types/user";
const USER_URL = "/users"

export const UsersApi = {
  getAll: async (filters: UserFilters = { page: 1, limit: 10}): Promise<PaginatedResponse<User>> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });
    const { data } = await apiClient.get(USER_URL, {params: filters});
    return data;
  },

  create: async (userData: FormData) => {
    await apiClient.post(USER_URL, userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },


}
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

  create: async (user: Omit<User, 'id' | 'createdAt' | 'updateAt'>) => {
    return await apiClient.post(USER_URL, user)
  },

  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get(`${USER_URL}/${id}`)
    return response.data
  },

  update: async (id: string, user: FormData) => {
    return await apiClient.patch(`${USER_URL}/${id}`, user, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  delete: async (id: number) => {
    return await apiClient.delete(`${USER_URL}/${id}`)
  }
}
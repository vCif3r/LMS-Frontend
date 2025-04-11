import { GradeLevel } from "../types/grade-level";
import { apiClient } from "../interceptors/axios.interceptor";
import { PaginatedResponse } from "../types/pagination";
const API_GRADE_LEVEL = '/grade-level';

export const gradeLevelApi = {
  getAll: async (filters: any = {}): Promise<PaginatedResponse<GradeLevel>> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });
    const { data } = await apiClient.get(API_GRADE_LEVEL, { params });
    return data;
  },

  create: async (gradeLevel: Omit<GradeLevel, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await apiClient.post(API_GRADE_LEVEL, gradeLevel);
  },

  getById: async (id: string): Promise<GradeLevel> => {
    const response = await apiClient.get(`${API_GRADE_LEVEL}/${id}`);
    return response.data;
  },

  update: async (id: string, gradeLevel: GradeLevel) => {
    return await apiClient.patch(`${API_GRADE_LEVEL}/${id}`, gradeLevel);
  },

  softDelete: async (id: number) => {
    return await apiClient.delete(`${API_GRADE_LEVEL}/${id}`);
  },

  findByName: async (name?: string) => {
    let url = `${API_GRADE_LEVEL}/search`;
    if (name) {
      url += `?name=${encodeURIComponent(name)}`;
    }
    return apiClient.get(url);
  }
}

// export const getGradeLevels = async () => {
//   const response = await axios.get(API_GRADE_LEVEL);
//   return response.data;
// }

// export const saveGradeLevel = async (gradeLevel: Omit<GradeLevel, 'id'>) => {
//   try {
//     const response = await axios.post(API_GRADE_LEVEL, gradeLevel);
//     return response.data;
//   } catch (error) {
//     console.error("Error saving grade level:", error);
//     throw error;

//   }
// }

// export const updateGradeLevel = async (gradeLevel: GradeLevel) => {
//   try {
//     const response = await axios.patch(`${API_GRADE_LEVEL}/${gradeLevel.id}`, gradeLevel);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating grade level:", error);
//     throw error;
//   }
// }

// export const findByNameGradeLevel = async (name?: string) => {
//   let url = `${API_GRADE_LEVEL}/search`;
//   if (name) {
//     url += `?name=${encodeURIComponent(name)}`;
//   }
//   return axios.get(url);
// }


// export const softDeleteGradeLevel = async (id: number) => {
//   try {
//     return axios.delete(`${API_GRADE_LEVEL}/${id}`)
//   } catch (error) {
//     throw error;
//   }

// }
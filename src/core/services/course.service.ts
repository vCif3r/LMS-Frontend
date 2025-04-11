import { Course, CourseFilters, CreateCourse } from "../types/course";
import { apiClient } from "../interceptors/axios.interceptor";
import { PaginatedResponse } from "../types/pagination";
const API_COURSES = '/courses';

export const courseApi = {
  getAll: async (filters: CourseFilters = { page: 1, limit: 10 }): Promise<PaginatedResponse<Course>> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value != null && value !== '') {
        params.append(key, value.toString())
      }
    });
    const { data } = await apiClient.get(API_COURSES, { params: filters })
    console.log('datos de cursos: ', data.data)
    return data;
  },

  create: async (course: CreateCourse, image?: File) => {
    const formData = new FormData();
    formData.append('name', course.name)
    formData.append('description', course.description)
    formData.append('gradeLevelId', course.gradeLevelId)
    formData.append('startDate', course.startDate.toString())
    formData.append('endDate', course.endDate.toString())
    if (image) {
      formData.append('imagen', image)
    }
    const response = await apiClient.post(API_COURSES, formData, {
      headers: { 
        "Content-Type": "multipart/form-data"
      }
    })
    return response.data;
  },

  findById: async (id: string): Promise<Course> => {
    try {
      const { data } = await apiClient.get(`${API_COURSES}/${id}`)
      return data;
    } catch (error) {
      throw error
    }
  }
}

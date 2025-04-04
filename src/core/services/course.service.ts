import axios from "axios";
import { Course } from "../types/course";
const API_URL = 'http://localhost:3000/';
const API_COURSES = API_URL + 'courses';

export const getCourses = async () => {
  const response = await axios.get(API_COURSES);
  return response.data;
}

export const createCourse = async (course: Omit<Course, 'id'>) => {
  try {
    const response = await axios.post(API_COURSES, course);
    return response.data;
  } catch (error) {
    throw error;
  }
};
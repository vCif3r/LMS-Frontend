import axios from "axios";
import { GradeLevel } from "../types/grade-level";
const API_URL = 'http://localhost:3000/';
const API_GRADE_LEVEL = API_URL + 'grade-level';

export const getGradeLevels = async () => {
  const response = await axios.get(API_GRADE_LEVEL);
  return response.data;
}

export const saveGradeLevel = async (gradeLevel: Omit<GradeLevel, 'id'>) => {
  try {
    const response = await axios.post(API_GRADE_LEVEL, gradeLevel);
    return response.data;
  } catch (error) {
    console.error("Error saving grade level:", error);
    throw error; 
    
  }
}

export const updateGradeLevel = async (gradeLevel: GradeLevel) => {
  try {
    const response = await axios.patch(`${API_GRADE_LEVEL}/${gradeLevel.id}`, gradeLevel);
    return response.data;
  } catch (error) {
    console.error("Error updating grade level:", error);
    throw error;
  }
}

export const findByNameGradeLevel = async (name?: string) => {
  let url = `${API_GRADE_LEVEL}/search`;
  if(name){
    url += `?name=${encodeURIComponent(name)}`;
  }
  return axios.get(url);
}


export const softDeleteGradeLevel = async (id: number) => {
  try {
    return axios.delete(`${API_GRADE_LEVEL}/${id}`)
  } catch (error) {
    throw error;
  }
 
}
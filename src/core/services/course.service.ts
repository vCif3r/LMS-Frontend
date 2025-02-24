import axios from "axios";
const API_URL = 'https://localhost:3000/';
const API_COURSES = API_URL + 'courses';

export const getCourses = async () => {
    const response = await axios.get(API_COURSES);
    return response.data;
}
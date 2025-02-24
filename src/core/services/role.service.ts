import axios from "axios";

export const getRoles = async () => {
    const response = await axios.get("http://localhost:3000/roles");
    const result = response.data;
    return result;
};
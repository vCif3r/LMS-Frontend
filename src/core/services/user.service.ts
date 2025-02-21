const baseUrl = "https://localhost:3000/"
const userUrl = baseUrl+ "users/"
import axios from "axios"

export const getUsers = () =>{
    return axios.get(userUrl)
}
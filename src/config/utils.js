import axios from "axios";
import { API } from "./enviroment";

export function getVarSsn() {
    let session = localStorage.getItem("token");
    let rsp = null;
    if (session !== undefined && session !== null) {
        try {
            rsp = unwrap(session, getTag());
            return rsp;
        } catch (error) {
            cleanVarSsn();
        }
    }
    return rsp;
}

export async function reqtsApiForm(
    urlApi,
    method,
    params = {},
    withToken = false,
) {
    let token = localStorage.getItem("token");
    // Set up headers
    const headers = {
        "Content-Type": "application/json",
    };
    if (withToken) {
        // Assuming the token is stored in localStorage
        if (token) {
            headers['authorization'] = `Bearer ${token}`;
        }
    }
    try {
        // Make the API request using axios
        const response = await axios({
            method: method,
            url: `${API}${urlApi}`,
            headers: headers,
            data: params
        });

        return response.data;
    } catch (error) {
        return error.response.data
    }
}

export async function reqtsApiFormData(
    urlApi,
    method,
    params = {},
    withToken = false,
) {
    // Set up headers
    const headers = {};
    if (withToken) {
        // Assuming the token is stored in localStorage
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    try {

        // Make the API request using axios
        const response = await axios({
            method: method,
            url: `${API}${urlApi}`,
            headers: {
                ...headers,
            },
            data: params
        });

        return response.data;
    } catch (error) {
        // Handle error
        return error.response ? error.response.data : { message: 'Unknown error occurred' };
    }
}

export function setLogin(data,id_usuario) {
    localStorage.setItem("token", data);
    localStorage.setItem("id_usuario", id_usuario);
}

export function cleanVarSsn(navigate) {
    localStorage.removeItem("token");
    localStorage.removeItem("id_usuario");
   return  navigate("/")
}

export const formatDateInput = (date) => {
    if (!date) return '';
  
    const d = new Date(date);
    
    // Ensure the date is valid
    if (isNaN(d.getTime())) return '';
  
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(d.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
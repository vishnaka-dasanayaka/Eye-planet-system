import axios from "axios";
import { url } from "../config";
import { toast } from 'sonner';
import { useAuthToken } from './useAuthToken'; // Adjust the path accordingly

const getConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

const getUsers = async (token) => {

    const config = getConfig(token);

    try {
        return await axios.get(`${url}/api/users/getall`, config);
    } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again.");
    }
};

const getUser = async (token) => {

    const config = getConfig(token);

    try {
        return await axios.get(`${url}/api/users/me`, config);
    } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again.");
    }
};

const updateUser = async (id, token, data) => {
    const config = getConfig(token);

    try {
        return await axios.put(`${url}/api/users/${id}`, data, config)
    } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again.");
    }

}

const updatePassword = async (token, data) => {
    const config = getConfig(token);

    try {
        const response = await axios.put(`${url}/api/users`, data, config)
        toast.success('Password Changed')
        return response
    } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again.");
    }

}



export { getUsers, updateUser, getUser, updatePassword };

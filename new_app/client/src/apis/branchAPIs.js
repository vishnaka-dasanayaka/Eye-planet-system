import axios from "axios";
import { url } from "../config";
import { toast } from 'sonner';

const getConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

const addBranch = async (token, data) => {

    const config = getConfig(token, data);

    try {
        const response = await axios.post(`${url}/api/branches`, data, config);
        toast.success('Branch Added')
        return response
    } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again.");
    }
}

const getBranches = async (token) => {

    const config = getConfig(token);

    try {
        return await axios.get(`${url}/api/branches/getall`, config);
    } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again.");
    }
};

const updateBranch = async (id, token, data) => {
    const config = getConfig(token);

    try {

        return await axios.put(`${url}/api/branches/${id}`, data, config)
    } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again.");
    }

}


export { addBranch, getBranches, updateBranch }
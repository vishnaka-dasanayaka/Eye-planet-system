import axios from "axios";
import { url } from "../config/config";
import { toast } from 'sonner';
import { useAuthToken } from './useAuthToken'; // Adjust the path accordingly

const getConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});


const getPrescriptions = async (token, [id]) => {
    const config = getConfig(token);
    try {
        const response = await axios.post(`${url}/api/prescriptions`, id, config)
        if (response.data.length === 0) {
            toast.info(`${response.data.length} prescriptions found`)
        } else {
            toast.success(`${response.data.length} prescriptions found`)
        }
        return response;
    } catch (error) {
        console.log(error);
        toast.error('An error occured')
    }
}

const addPrescription = async (token, pId, oId, data) => {
    const config = getConfig(token)

    try {
        const response = await axios.post(`${url}/api/prescriptions/add-prescription/${pId}/${oId}`, data, config)
        toast.success('prescription added succesfully')
        return response
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
    }
}

export { getPrescriptions, addPrescription }
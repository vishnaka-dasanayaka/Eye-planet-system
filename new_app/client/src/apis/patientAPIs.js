import axios from "axios";
import { url } from "../config/config";
import { toast } from 'sonner';
import { useAuthToken } from './useAuthToken'; // Adjust the path accordingly

const getConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

const addPatient = async (token, data) => {
    const config = getConfig(token)
    try {
        const response = await axios.post(`${url}/api/patients`, data, config)
        toast.success('Patient Added')
        return response
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
    }
}


const getPatients = async (token) => {

    const config = getConfig(token);

    try {
        return await axios.get(`${url}/api/patients`, config);
    } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again.");
    }
};

const findPatients = async (token, data) => {
    const config = getConfig(token)
    try {
        const response = await axios.post(`${url}/api/patients/findpatients`, data, config)
        if (response.data.length === 0) {
            toast.info(`${response.data.length} patients found`)
        } else {
            toast.success(`${response.data.length} patients found`)
        }
        return response;
    } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again.");
    }
}

const findPatient = async (token, id) => {
    const config = getConfig(token)
    try {
        return await axios.get(`${url}/api/patients/findpatient/${id}`, config)
    } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again.");
    }
}

const updatePatient = async (token, id, data) => {
    const config = getConfig(token)

    try {
        await axios.put(`${url}/api/patients/${id}`, data, config)
        toast.success('Patient Details Updated')
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
    }
}

const deletePatientt = async (token, id) => {
    const config = getConfig(token);

    try {
        await axios.delete(`${url}/api/patients/${id}`, config)
        toast.success('Patient Deleted Successfully')
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
    }
}

const getOrderNum = async (token) => {
    const config = getConfig(token);

    try {
        return await axios.get(`${url}/api/patients/get-new-order-number`, config)
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
    }
}

export { addPatient, getPatients, findPatients, findPatient, updatePatient, deletePatientt, getOrderNum }
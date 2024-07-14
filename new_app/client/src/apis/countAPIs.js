import axios from "axios";
import { url } from "../config/config";
import { toast } from 'sonner';



const getConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,

    },
});


const getCounts = async (token) => {
    const config = getConfig(token);

    try {
        const response = await axios.get(`${url}/api/counts`, config);
        return response

    } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
    }
}

export { getCounts }
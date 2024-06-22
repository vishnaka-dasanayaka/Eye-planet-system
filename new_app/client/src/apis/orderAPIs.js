import axios from "axios";
import { url } from "../config";
import { toast } from 'sonner';



const getConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

const getOrders = async (token) => {
    const config = getConfig(token);

    try {
        const response = await axios.get(`${url}/api/orders/getall`, config)
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again.");

    }

}

const findOrders = async (token, data) => {
    const config = getConfig(token)
    try {
        const response = await axios.post(`${url}/api/orders/findOrders`, data, config)
        if (response.data.length === 0) {
            toast.info(`No orders found`)
        } else {
            toast.success(`${response.data.length} orders found`)
        }

        return response;
    } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again.");
    }
}

export { getOrders, findOrders }
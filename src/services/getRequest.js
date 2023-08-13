import axios from "../api/axios";


export default async (url, headers = {}) => {
    try {
        const response = await axios.get(url, headers);
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
}

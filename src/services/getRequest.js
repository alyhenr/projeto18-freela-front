import axios from "../api/axios";


export default async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
}

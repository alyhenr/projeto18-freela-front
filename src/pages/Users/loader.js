import getRequest from "../../services/getRequest";

export default async () => {
    try {
        const data = await getRequest("/samurais");
        return data
    } catch (err) {
        throw new Error(err);
    }
};
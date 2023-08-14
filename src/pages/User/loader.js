import getRequest from "../../services/getRequest";

export default async ({ id }) => {
    try {
        const data = await getRequest(`/samurai/${id}`);
        return data
    } catch (err) {
        throw new Error(err);
    }
};
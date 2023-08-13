import getRequest from "../../services/getRequest";

export default async ({ userId = undefined }) => {
    try {
        const data = await getRequest("/explore", {
            headers: {
                userId
            }
        });
        return data
    } catch (err) {
        throw new Error(err);
    }
};
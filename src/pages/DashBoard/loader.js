import { axiosPrivate } from "../../api/axios";

export default async (id) => {
    try {
        const controller = new AbortController();
        const response = await axiosPrivate.get("/dashboard", {
            headers: {
                id
            },
            signal: controller.signal,
        });
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
};
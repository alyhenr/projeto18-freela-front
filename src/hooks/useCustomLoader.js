import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useCustomLoader = ({ loaderFunction }) => {
    const { auth } = useAuth();
    const [response, setResponse] = useState({
        data: undefined,
        err: false,
        loading: true,
    });

    useEffect(() => {
        loaderFunction()
            .then(data => setResponse({
                data,
                err: false,
                loading: false,
            })).catch(() => setResponse({ data: null, err: true, loading: false }));
    }, [auth]);

    return response;
}

export default useCustomLoader;
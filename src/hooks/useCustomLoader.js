import { useEffect, useState } from "react";

const useCustomLoader = ({ loaderFunction }) => {
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
    }, []);

    return response;
}

export default useCustomLoader;
import { useNavigate } from "react-router-dom";

import useAuth from "./useAuth";
import axios from "../api/axios";
import protectedRoutes from "../helpers/protectedRoutes";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const refresh = async () => {
        try {
            const response = await axios.get('/refresh', {
                withCredentials: true
            });

            console.log("Getting a new access token... ");
            setAuth({ ...response.data, loggedIn: true });

            return response.data.newAccessToken;
        } catch (err) {
            setAuth({ loggedIn: false });
            if (protectedRoutes.includes(location.pathname)) {
                navigate("/auth");
            }
            console.log(err.response);
        }
    }
    return refresh;
}

export default useRefreshToken;
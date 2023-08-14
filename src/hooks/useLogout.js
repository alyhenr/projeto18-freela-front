import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({ loggedIn: false });
        try {
            await axios('/logout', {
                withCredentials: true
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    return logout;
}

export default useLogout;
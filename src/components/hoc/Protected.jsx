import { useEffect } from "react";
import PropTypes from 'prop-types';

import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

const Protected = ({ children }) => {
    const { auth } = useAuth();
    const refresh = useRefreshToken();

    //Get user data only when page reloads since it's not stored locally,
    // The app stores the access token on it's state, and a refresh token is kept
    // in memory http only, which is used when the access token expires or
    // the page is reloaded
    useEffect(() => {
        if (Object.keys(auth).length === 0) {
            const getUserData = async () => { await refresh(); }
            getUserData();
        }
    }, []);

    return (
        <>
            {children}
        </>
    )
}

Protected.propTypes = {
    children: PropTypes.object,
}

export default Protected;
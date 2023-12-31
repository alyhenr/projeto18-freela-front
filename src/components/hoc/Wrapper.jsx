import { useEffect } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container } from '@mui/material';

import { AnimatePresence } from 'framer-motion';

import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';

const Wrapper = ({ children }) => {
    const location = useLocation();
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    //Get user data only when page reloads since it's not stored locally,
    // The app stores the access token on it's state, and a refresh token is kept
    // in memory http only, which is used when the access token expires or
    // the page is reloaded
    useEffect(() => {
        const getUserData = async () => { await refresh(); }
        getUserData();
    }, [auth.loggedIn]);

    return (
        <Container sx={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            mt: 6,
            p: 3,
        }}>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    {children}
                </Routes>
            </AnimatePresence>
        </Container>
    )
}

Wrapper.propTypes = {
    children: PropTypes.array,
}

export default Wrapper;
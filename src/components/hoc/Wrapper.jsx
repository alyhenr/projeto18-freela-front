import { Routes, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container } from '@mui/material';

import { AnimatePresence } from 'framer-motion';

const Wrapper = ({ children }) => {
    const location = useLocation();

    return (
        <Container sx={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            mt: 10,
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
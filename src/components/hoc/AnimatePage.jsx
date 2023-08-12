import { useEffect } from "react";
import PropTypes from "prop-types";

import { motion } from "framer-motion";

import VanillaTilt from "vanilla-tilt";

const AnimatePage = ({ children }) => {

    useEffect(() => {
        VanillaTilt.init(document.querySelectorAll(".card"), {
            max: 5,
            speed: 10,
            glare: true,
            // 'max-glare': 0.2,
        });

    }, []);

    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{
                transition: {
                    duration: 0.1
                }, width: window.innerWidth
            }}
        >
            {children}
        </motion.div>
    )
}

AnimatePage.propTypes = {
    children: PropTypes.object,
};

export default AnimatePage;
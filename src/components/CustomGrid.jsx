import PropTypes from 'prop-types';

import { Grid } from '@mui/material';

const CustomGrid = ({ children }) => {

    return (
        <Grid container sx={{
            margin: { xs: '0px auto', md: '64px auto' },
            width: { xs: '100%', lg: '80%' },
            height: 'fit-content',
            padding: '40px',
            bgcolor: "#fbfbf8",
            backdropFilter: "blur(10px)",
            boxShadow: "10px 10px 10px rgba(30, 30, 30, 0.5)",
            borderRadius: '20px',
        }}>{children}</Grid>
    )
}

CustomGrid.propTypes = {
    children: PropTypes.any,
    bgColor: PropTypes.string
}

export default CustomGrid;
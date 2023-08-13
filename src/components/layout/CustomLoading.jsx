import PropTypes from "prop-types";

import { Box, CircularProgress, Typography } from "@mui/material";

import CustomError from "./CustomError";

const CustomLoading = ({ err = false, loading = true, message, children }) => {
    return (
        loading ?
            <Box sx={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                height: "60vh", gap: 2
            }}>
                <Typography variant="h5" textAlign="center" color="HighlightText">
                    {message}
                </Typography>
                <CircularProgress color="error" size={100} />
            </Box >
            : err ? <CustomError /> : children
    )
};

CustomLoading.propTypes = {
    err: PropTypes.bool,
    loading: PropTypes.bool,
    message: PropTypes.string,
    children: PropTypes.object,
}

export default CustomLoading;
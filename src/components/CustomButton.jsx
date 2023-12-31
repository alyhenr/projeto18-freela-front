import PropTypes from "prop-types";
import { Button, styled } from "@mui/material";

const CustomButton = ({
    backgroundColor,
    color,
    buttonText,
    heroBtn,
    guideBtn,
    getStartedBtn,

    //callback to be executed when button is clicked, passed
    //as props from the parent Component
    callback
}) => {
    const CustomButton = styled(Button)(({ theme }) => ({
        backgroundColor: backgroundColor,
        color: color,
        fontWeight: "700",
        fontSize: "14px",
        cursor: "pointer",
        padding: "0.5rem 1.25rem",
        borderRadius: "7px",
        textTransform: "none",
        display: "block",
        border: "2px solid transparent",
        "&:hover": {
            backgroundColor: color,
            color: backgroundColor,
            borderColor: backgroundColor,
        },
        [theme.breakpoints.down("md")]: {
            margin: (heroBtn || getStartedBtn) && theme.spacing(0, "auto", 3, "auto"),
            width: (heroBtn || getStartedBtn) && "90%",
        },
        [theme.breakpoints.down("sm")]: {
            marginTop: guideBtn && theme.spacing(3),
            width: guideBtn && "90%",
        },
    }));



    return <CustomButton onClick={callback}>{buttonText}</CustomButton>;
};

CustomButton.propTypes = {
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    buttonText: PropTypes.string,
    heroBtn: PropTypes.bool,
    guideBtn: PropTypes.bool,
    getStartedBtn: PropTypes.bool,
    callback: PropTypes.func,
};

export default CustomButton;
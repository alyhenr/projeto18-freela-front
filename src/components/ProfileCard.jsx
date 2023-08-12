import PropTypes from "prop-types";

import { styled } from "styled-components";
import CustomButton from "./CustomButton";

import itSupp from "../assets/itSupp.jpg"
import { Typography } from "@mui/material";

const ProfileCard = ({ username, description }) => {
    return (
        <CardContainer>
            <div className="gradient"></div>
            <div className="profile">
                <img src={itSupp} alt="profile pic" />
                <Typography variant="h5">{username}</Typography>
                <Typography color="ActiveBorder" mb={2}>
                    {description}
                </Typography>
                <CustomButton
                    backgroundColor="#0F1B4C"
                    color="#fff"
                    buttonText="Contact me"
                    heroBtn={true}
                />
            </div>
        </CardContainer>
    )
};

const CardContainer = styled.div`
    width: 100%;
    margin: 20px;
    border-radius: 5px;
    padding-bottom: 20px;
    background: #FFF;
    position: relative;

    .gradient {
        background-image: linear-gradient(#91baff, #205fff);
        height: 125px;
        border-radius: 5px 5px 0 0;
    }

    .profile {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            width: 150px;
            height: 150px;
            border-radius: 100px;
            margin-top: -75px;
            padding: 5px;
            background: #FFF;
        }

        h5 {
            text-align: center;
        }

        p {
            padding-left: 20px;
        }

        button {
            margin-bottom: -8px;
        }
    }
`;

ProfileCard.propTypes = {
    username: PropTypes.string,
    description: PropTypes.string,
}

export default ProfileCard;
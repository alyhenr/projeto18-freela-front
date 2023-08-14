import { useState } from "react";
import PropTypes from "prop-types";

import { styled } from "styled-components";
import CustomButton from "../CustomButton";

import itSupp from "../../assets/itSupp.jpg"
import { Typography } from "@mui/material";
import ContactMe from "./ContactMe";

const ProfileCard = ({ id, username, city, phone, email }) => {
    const [showContact, setShowContact] = useState(false);

    return (
        <>
            {showContact && <ContactMe
                setShowContact={setShowContact}
                id={id}
                username={username}
                email={email}
                phone={phone}
            />}
            <CardContainer>
                <div className="gradient"></div>
                <div className="profile">
                    <img src={itSupp} alt="profile pic" />
                    <Typography variant="h5">{username}</Typography>
                    <Typography color="ActiveBorder" mb={2} textAlign="start">
                        <strong>City</strong>: {city} <br />
                        <strong>Phone</strong>: {phone}
                    </Typography>
                    <CustomButton
                        callback={() => setShowContact(true)}
                        backgroundColor="#0F1B4C"
                        color="#fff"
                        buttonText="Contact me"
                        heroBtn={true}
                    />
                </div>
            </CardContainer>
        </>
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

        button {
            margin-bottom: -8px;
        }
    }
`;

ProfileCard.propTypes = {
    id: PropTypes.number,
    username: PropTypes.string,
    city: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
}

export default ProfileCard;
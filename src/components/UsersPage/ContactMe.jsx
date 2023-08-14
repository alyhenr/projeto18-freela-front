import { useNavigate } from "react-router-dom";
import { useState } from "react";

import PropTypes from "prop-types";

import { styled } from "styled-components"
import { Box, Typography } from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const ContactMe = ({ setShowContact, id, username, phone, email }) => {
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [requestResult, setRequestResult] = useState({
        err: false,
        success: false,
        message: "",
    });

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const showRequestResult = (result, message) => {
        setRequestResult(prev => ({ ...prev, [result]: true, message }));
        setTimeout(() => {
            setRequestResult(prev => ({ ...prev, [result]: false, message }))
        }, 2000);
        setSubmitting(false);
    };

    const sendMessage = async () => {
        setSubmitting(true);
        if (message === "") {
            showRequestResult("err", "You cannot send an empty message.");
            return;
        }

        try {
            await axiosPrivate.post("/messages", {
                senderId: auth.userId,
                receiverId: id,
                message,
            });
            showRequestResult("success");
        } catch (err) {
            showRequestResult("err", "There was a problemn sending the message, try again in some seconds...");
            console.log(err);
        }
    };

    return (
        <>
            <OverLay
                onClick={() => setShowContact(false)}></OverLay>
            <Container>
                <h2>Get in touch with this samurai 👋</h2>
                <p>Send a message to <strong>{username}</strong></p>
                <p><strong>Phone: </strong>{phone} -  <strong>Email: </strong>{email}</p>
                {requestResult.err && <Typography color="red">{requestResult.message}</Typography>}
                {requestResult.success && <Typography color="green">Message sent!</Typography>}
                <Box sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    }
                }}>
                    <textarea
                        onChange={(ev) => setMessage(ev.target.value)}
                        value={message}
                        name="message"
                    />
                    <Box pl={2} pr={2}
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" }
                        }}
                    >
                        <button
                            disabled={submitting}
                            onClick={() => sendMessage()}>Send</button>
                        <button onClick={() => navigate(`/user/${id}`)}>Profile</button>
                    </Box>
                </Box>
            </Container >
        </>
    )
}

const Container = styled.div`
    position: fixed;
    top: 15%;
    left: 0;
    right: 0;
    width: 90vw;
    max-width: 600px;
    height: fit-content;
    margin: 0 auto;
    padding: 30px;
    overflow: hidden;
    box-shadow: 0 2px 20px grey;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background-color: #FFF;
    z-index: 10;

    div {
        display: flex;
        align-items: center;
        justify-content: space-between;

        textarea {
            width: 100%;
            height: 60px;
            font-size: 20px;
        }

        button: {
            width: 50px;
        }
    }

    h2 {
        margin: 0;
        padding: 1rem;
    }

    p {
        padding: 0 1rem;
    }

     button {
        width: 100%;
        min-width: 100px;
        padding: 1rem;
        font-family: inherit;
        font-weight: bold;
        font-size: 1rem;
        margin: 1rem;
        border: 2px solid #A32728;
        background: transparent;
        color: #A32728;
        border-radius: 5px;
        transition: background 200ms ease-in, color 200ms ease-in;

        &:hover {
            background: #A32728;
            color: #FFF;
            cursor: pointer;

        }
    }
`;

const OverLay = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;
    z-index: 5;

    background-color: grey;
    opacity: 0.4;
`;

ContactMe.propTypes = {
    setShowContact: PropTypes.func,
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
}

export default ContactMe;
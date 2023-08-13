import { Link } from "react-router-dom";

import { styled } from "styled-components";
import { Button } from "@mui/material";

const DropDownUser = () => {

    const handleLogout = async () => {

    };

    return (
        <Container>
            <Link to={"/profile"}>
                <Button variant="outlined">Edit Profile</Button>
            </Link>
            <Link to={"/inbox"}>
                <Button variant="outlined">Inbox</Button>
            </Link>
            <Button
                onClick={() => handleLogout()}
                variant="outlined">Logout</Button>
        </Container>
    )
};

const Container = styled.div`
    position: fixed;
    top: 70px;
    right: 10px;

    display: flex;
    flex-direction: column;
    gap: 5px;

    button {
        width: 100%;
        background: #FFF;
    }
`;

export default DropDownUser;
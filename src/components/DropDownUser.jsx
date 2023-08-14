import { Link, useNavigate } from "react-router-dom";

import { styled } from "styled-components";
import { Button } from "@mui/material";

import useLogout from "../hooks/useLogout";

const DropDownUser = () => {
    const logout = useLogout();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (err) {
            console.log(err);
        }
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
                onClick={handleLogout}
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
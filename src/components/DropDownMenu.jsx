import { Button } from "@mui/material";
import { styled } from "styled-components";

const DropDownMenu = () => {
    return (
        <Container>
            <Button variant="outlined">Edit Profile</Button>
            <Button variant="outlined">Logout</Button>
        </Container>
    )
};

const Container = styled.div`
    position: fixed;
    top: 20px;
    right: 80px;

    display: flex;
    flex-direction: column;
    gap: 5px;

    button {
        background: #FFF;
    }
`;

export default DropDownMenu
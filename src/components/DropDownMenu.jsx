import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import { styled } from "styled-components";
import { Button, Stack } from "@mui/material";

const DropDownMenu = ({ loggedIn }) => {
    return (
        <Stack sx={{
            display: { xs: 'inherit', sm: 'none' }
        }}>
            <Container>
                <Link to={"/catalog"}>
                    <Button variant="outlined">
                        EXPLORE
                    </Button>
                </Link>
                <Link to={"/users"}>
                    <Button variant="outlined">
                        FIND A SAMURAI
                    </Button>
                </Link>
                {loggedIn && <>
                    <Link to={"/new-service"}>
                        <Button variant="outlined">
                            ADD A NEW SERVICE
                        </Button>
                    </Link>
                    <Link to={"/dashboard"}>
                        <Button variant="outlined">
                            DASHBOARD
                        </Button>
                    </Link>
                </>}
            </Container>
        </Stack>
    )
};

const Container = styled.div`
    position: fixed;
    top: 70px;
    left: 10px;

    display: flex;
    flex-direction: column;
    gap: 5px;

    button {
        width: 100%;
        background: #FFF;
    }
`;

DropDownMenu.propTypes = {
    loggedIn: PropTypes.bool,
};

export default DropDownMenu;
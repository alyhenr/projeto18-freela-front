import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AppBar, CssBaseline, Toolbar, Stack, Button, Divider, Typography, Avatar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import useAuth from "../hooks/useAuth";
import DropDownUser from "./DropDownUser";

import '@fontsource/roboto/500.css';
import DropDownMenu from "./DropDownMenu";

const NavBar = () => {
    const navigate = useNavigate();

    const { auth } = useAuth();
    const [dropDown, setDropDown] = useState({
        user: false,
        menu: false,
    });

    useEffect(() => {
        setDropDown({
            user: false,
            menu: false,
        })
    }, [location.pathname])

    return (
        <>
            <CssBaseline />
            <AppBar sx={{
                position: "fixed",
                backgroundColor: "#191F4D",
                borderEndEndRadius: "10px",
                borderBottomLeftRadius: "10px",
                opacity: '0.85',
            }}>
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Stack
                        sx={{
                            display: {
                                xs: 'none',
                                sm: 'flex'
                            },
                        }}
                        direction="row"
                        spacing={2}
                        divider={<Divider orientation="vertical" flexItem />}
                    >
                        <Link to={"/catalog"}>
                            <Button color="inherit">
                                EXPLORE
                            </Button>
                        </Link>
                        <Link to={"/users"}>
                            <Button color="inherit">
                                FIND A SAMURAI
                            </Button>
                        </Link>
                        {auth.loggedIn && <>
                            <Link to={"/new-service"}>
                                <Button color="inherit">
                                    ADD A NEW SERVICE
                                </Button>
                            </Link>
                            <Link to={"/dashboard"}>
                                <Button color="inherit">
                                    DASHBOARD
                                </Button>
                            </Link>
                        </>}
                    </Stack>
                    <MenuIcon
                        onClick={() => {
                            setDropDown(prev => ({
                                ...prev,
                                menu: !prev.menu,
                            }));
                        }}
                        sx={{
                            display: {
                                xs: 'inline',
                                sm: 'none'
                            },
                            cursor: "pointer",
                        }}
                        fontSize="large"
                    />
                    {dropDown.menu && <DropDownMenu loggedIn={auth.loggedIn} />}
                    {!auth.loggedIn ? <Typography
                        onClick={() => { navigate("/auth"); }}
                        variant="body2"
                        color="AppWorkspace"
                        sx={{ cursor: 'pointer', }}
                    >SignIn / SignUp</Typography>
                        :
                        <Avatar variant="circular" sx={{
                            position: "absolute",
                            top: "5%",
                            right: "1%",
                            border: "2px solid #FFF",
                            width: '50px',
                            height: '50px',
                            cursor: 'pointer'
                        }} onClick={() => {
                            setDropDown(prev => ({
                                ...prev,
                                user: !prev.user,
                            }));
                        }}>
                            {auth.username?.split(" ").length > 1
                                ? auth.username.split(" ")[0][0] + auth.username.split(" ")[1][0]
                                : auth.username.slice(0, 2)}
                        </Avatar>
                    } {dropDown.user && auth.loggedIn && <DropDownUser />}
                </Toolbar>
            </AppBar >
        </>
    )
}

export default NavBar
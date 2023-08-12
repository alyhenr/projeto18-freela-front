import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, CssBaseline, Toolbar, Stack, Button, Divider, Typography, Avatar } from "@mui/material";

import '@fontsource/roboto/500.css';
import useAuth from "../hooks/useAuth";

const NavBar = () => {
    const navigate = useNavigate();

    const { auth, auth: { username } } = useAuth();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => { setLoggedIn(Object.keys(auth).length > 0) }, [auth])

    return (
        <>
            <CssBaseline />
            <AppBar sx={{
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
                        {loggedIn && <>
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
                    <Button onClick={() => { loggedIn ? navigate("/profile") : navigate("/auth"); }}>
                        {!loggedIn && <Typography
                            variant="body2"
                            color="AppWorkspace"
                            sx={{
                                display: {
                                    xs: 'none',
                                    sm: 'inline'
                                }
                            }}
                        >SignIn / SignUp</Typography>}
                        {
                            loggedIn && <>
                                <Avatar variant="circular" sx={{
                                    display: { xs: 'none', sm: 'inherit' },
                                    border: "2px solid #FFF",
                                    width: '50px',
                                    height: '50px'
                                }}>
                                    {username?.split(" ").length > 1
                                        ? username.split(" ")[0][0] + username.split(" ")[1][0]
                                        : username.slice(0, 2)}
                                </Avatar>
                            </>
                        }
                    </Button>
                </Toolbar>
            </AppBar >
        </>
    )
}

export default NavBar
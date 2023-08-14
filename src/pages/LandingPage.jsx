import { useNavigate } from "react-router-dom";
import { Container, Box, styled, Typography } from "@mui/material";

import CustomButton from "../components/CustomButton";
import Form from "../components/Form";
import useAuth from "../hooks/useAuth";

const LandingPage = () => {
    const CustomBox = styled(Box)(({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        gap: theme.spacing(5),
        marginTop: theme.spacing(3),
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
        },
    }));

    const Title = styled(Typography)(({ theme }) => ({
        fontSize: "64px",
        color: "#000336",
        fontWeight: "bold",
        margin: theme.spacing(4, 0, 4, 0),
        [theme.breakpoints.down("sm")]: {
            fontSize: "40px",
        },
    }));
    const { auth } = useAuth();
    const navigate = useNavigate();

    return (
        <Box sx={{ backgroundColor: "#E6F0FF", height: "fit-content", p: '2px 20px 25px', borderRadius: '30px', mt: 2 }}>
            <Container>
                <CustomBox>
                    <Box sx={{ flex: "1" }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: "18px",
                                color: "#687690",
                                fontWeight: "500",
                                mt: 1,
                                mb: 2,
                            }}
                        >
                            Welcome to GETSAMURAIS
                        </Typography>
                        <Title variant="h1">
                            Find the best Samurai to get the job done.
                        </Title>
                        <Typography
                            variant="body2"
                            sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
                        >
                            Create your account, become a samurai, offer your services and find other samurais to team up!
                        </Typography>
                        <div onClick={() => { navigate("/catalog"); }}>
                            <CustomButton
                                backgroundColor="#0F1B4C"
                                color="#fff"
                                buttonText="Explore the skill-set available in our site"
                                heroBtn={true}
                            />
                        </div>
                    </Box>
                    <Box sx={{ flex: "1.25", width: { sm: '100%' } }}>
                        {auth.loggedIn
                            ? <> <Title textAlign="center" variant="h1" p={2}>
                                Welcome {auth.username}!
                            </Title>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    onClick={() => { navigate("/dashboard"); }}>
                                    <CustomButton
                                        backgroundColor="#0F1B4C"
                                        color="#fff"
                                        buttonText="Go to my dashboard"
                                        heroBtn={true}
                                    />
                                </Box></>
                            : <Form />
                        }
                    </Box>
                </CustomBox>
            </Container>
        </Box>
    );
};

export default LandingPage;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Stack } from "@mui/material";

import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ActionsList from "../components/ActionsList";
import UserInfo from "../components/UserInfo";

import findANerd from "../assets/findANerd.jpg";
import itSupp from "../assets/itSupp.jpg";
import Globe from "../components/Globe";
import { Canvas } from "@react-three/fiber";

const UserPage = () => {
    const navigate = useNavigate();
    const { auth: { userId } } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const controller = new AbortController();

        const getUserData = async () => {
            try {
                const response = await axiosPrivate.get(`/profile/${userId}`, {
                    signal: controller.signal,
                })
                console.log(response.data);
            } catch (err) {
                navigate("/auth");
            }
        }

        getUserData();
    }, [axiosPrivate]);

    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{
            position: "relative",
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: { xs: "center", sm: "flex-start" }
        }} spacing={{ xs: 1, sm: 3 }}  >
            <Box width={{ xs: '60%', md: '30%' }} minWidth='250px'>
                <ActionsList />
                <UserInfo />
            </Box>
            <Stack spacing={{ xs: 2, sm: 12, md: 4 }} direction={{ xs: 'column', sm: 'column', md: 'row' }}>
                <Box justifyContent="center" alignItems="center">
                    <Box className="card">
                        <img src={itSupp} alt="samurai" />
                    </Box>
                    <Button fullWidth variant="contained" color="error" sx={{ mt: 5 }}>Add a new service</Button>
                </Box>
                <Box justifyContent="center" alignItems="center">
                    <Box className="card">
                        <img src={findANerd} alt="samurai" />
                    </Box>
                    <Button fullWidth variant="contained" color="error" sx={{ mt: 5 }}>Add a new products</Button>
                </Box>
            </Stack>
            <Box sx={{
                display: { xs: 'none', sm: 'none', md: 'block' },
                position: 'absolute',
                bottom: { md: '80px', lg: '80px' },
                right: { md: '40px', lg: '100px' },
                height: '250px'
            }}><Canvas><Globe /></Canvas></Box>
        </Stack>
    )
}

export default UserPage
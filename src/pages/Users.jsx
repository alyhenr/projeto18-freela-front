import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import getRequest from "../services/getRequest";

import ProfileCard from "../components/ProfileCard";


const Users = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        getRequest("/samurais")
            .then(data => { setUsers(data); })
            .catch(err => { console.log(err.response); })
    }, []);
    console.log(users);
    return (
        <Grid container gap={2} justifyContent="center">
            {users && users.map(user => (<Box key={user.id} width={
                { xs: 1, sm: 0.45 }
            }>
                <ProfileCard
                    username={user.username.split(" ")[0] + " " +
                        (user.username.split(" ")[1] ? user.username.split(" ")[1] : "")}
                    description={"kmldasmklsdaklmsda"}
                />
            </Box>))}
        </Grid>
    )
}

export default Users;
import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import ProfileCard from "../../components/UsersPage/ProfileCard";
import useCustomLoader from "../../hooks/useCustomLoader";
import loader from "./loader";
import CustomLoading from "../../components/layout/CustomLoading";

const Users = () => {
    const [users, setUsers] = useState([]);
    const { data, err, loading } = useCustomLoader({ loaderFunction: () => loader() })
    useEffect(() => {
        if (data) {
            setUsers(() => ([...data]));
        }
    }, [data, err]);

    return (
        <CustomLoading
            err={err}
            loading={loading}
            message={"The samurais of our team are on their way..."}
        >
            <Grid container gap={2} justifyContent="center" alignItems="center">
                {users && users.map(user => (<Box key={user.id} width={
                    { xs: 0.8, sm: 0.5, md: 0.4, lg: 0.3 }
                } sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <ProfileCard
                        id={user.id}
                        username={user.username.split(" ")[0] + " " +
                            (user.username.split(" ")[1] ? user.username.split(" ")[1] : "")}
                        city={user.city}
                        email={user.email}
                        phone={user.phone}
                    />
                </Box>))}
            </Grid>
        </CustomLoading>
    )
}

export default Users;
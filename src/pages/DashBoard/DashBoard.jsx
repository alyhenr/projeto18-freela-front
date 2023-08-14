import { useEffect, useState } from "react";

import { Grid, Typography } from "@mui/material";

import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useCustomLoader from "../../hooks/useCustomLoader";
import loader from "./loader";

import CustomLoading from "../../components/layout/CustomLoading";
import ServicesList from "../../components/DashBoard/ServicesList";
import Contracts from "../../components/DashBoard/Contracts";

const DashBoard = () => {
    const { auth: { userId } } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [userData, setUserData] = useState();

    const { data, err, loading } = useCustomLoader({
        loaderFunction: () => loader(userId)
    })

    useEffect(() => {
        if (data) {
            setUserData(data);
        }
    }, [axiosPrivate, data, err]);

    return (
        <CustomLoading
            loading={loading}
            err={err}
            message={"We collecting all of your information..."}
        > {
                userData &&
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography
                            variant="h6"
                            color="#FFF"
                            border="1px solid #FFF"
                            borderRadius={2}
                            padding={1}
                            sx={{
                                background: "grey",
                                cursor: "pointer",
                            }}
                        >Services I&apos;m providing</Typography>
                        <ServicesList
                            services={userData.catalog}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography
                            variant="h6"
                            color="#FFF"
                            border="1px solid #FFF"
                            borderRadius={2}
                            padding={1}
                            sx={{
                                background: "grey",
                                cursor: "pointer",
                            }}
                        >Active Contracts</Typography>
                        <Contracts
                            contracts={{
                                provider: userData.contractsprovider,
                                client: userData.contractsclient
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography
                            variant="h6"
                            color="#FFF"
                            border="1px solid #FFF"
                            borderRadius={2}
                            padding={1}
                            sx={{
                                background: "grey",
                                cursor: "pointer",
                            }}
                        >Messages</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography
                            variant="h6"
                            color="#FFF"
                            border="1px solid #FFF"
                            borderRadius={2}
                            padding={1}
                            sx={{
                                background: "grey",
                                cursor: "pointer",
                            }}
                        >My information</Typography>
                    </Grid>
                </Grid>
            }
        </CustomLoading>
    )
}

export default DashBoard;
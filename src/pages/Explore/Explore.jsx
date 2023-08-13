import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import ServicesCard from "../../components/ExplorePage/ServicesCard";

import useAuth from "../../hooks/useAuth";
import useCustomLoader from "../../hooks/useCustomLoader";
import loader from "./loader";
import CustomLoading from "../../components/layout/CustomLoading";

import '@fontsource/roboto/400.css';

const Explore = () => {
    const [catalog, setCatalog] = useState({
        services: [],
        categoriesMap: {},
        userContracts: [] //Only for authenticated users
    });
    const { auth: { userId } } = useAuth();
    const { data, err, loading } = useCustomLoader({ loaderFunction: () => loader({ userId }) })

    useEffect(() => {
        if (data) {
            setCatalog(prev => ({ ...prev, ...data }));
        }
    }, [data, err]);

    return (
        <CustomLoading
            err={err}
            loading={loading}
            message={"Loading the services provided by our samurais... Almost there!"}
        >
            <Grid container gap={5} justifyContent="center">
                {catalog.services.map(service => (
                    <Box key={service.id} width={
                        { xs: 1, sm: 0.9, md: 0.45, }
                    }>
                        <ServicesCard
                            id={service.id}
                            username={service.username}
                            phone={service.phone}
                            email={service.email}
                            city={service.city}
                            description={service.description}
                            price={service.price}
                            duration={service.duration}
                            categories={service.categories}
                            categoriesMap={catalog.categoriesMap}
                            isProvider={service.id === userId}
                            isClient={Boolean(catalog.userContracts
                                .find(contract =>
                                    contract.client_id === userId
                                    && contract.service_id === service.id))}
                        />
                    </Box>))}
            </Grid>
        </CustomLoading>
    )
};

export default Explore;
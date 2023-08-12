import { useEffect, useState } from "react"

import { Box, Grid } from "@mui/material"

import getRequest from "../services/getRequest";

import ServicesCard from "../components/ServicesCard";

import '@fontsource/roboto/400.css';

const Explore = () => {
    const [catalog, setCatalog] = useState({
        services: [],
        categoriesMap: {},
    });

    useEffect(() => {
        getRequest("/explore")
            .then(data => { setCatalog(data); })
            .catch(err => { console.log(err.response); });
    }, []);
    console.log(catalog);
    return (
        <Grid container gap={5} justifyContent="center">
            {catalog.services.length > 0 ? catalog.services.map(service => (<Box key={service.id} width={
                { xs: 1, sm: 0.9 }
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
                />
            </Box>)) : <></>}
        </Grid>
    )
}

export default Explore
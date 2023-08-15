import { useState } from "react";

import { Box, Button, ListItem, Stack, TextField, Typography } from "@mui/material";
import CurrencyInput from "react-currency-input-field";

import CustomGrid from "../components/CustomGrid";

import categoriesMap from "../helpers/categoriesMap";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useShowRequestResult from "../hooks/useShowRequestResult";

const AddService = () => {
    const [details, setDetails] = useState({
        description: "",
        price: 0,
        duration: 0,
        categories: [],
    });
    const [submitting, setSubmitting] = useState(false);
    const [requestResponse, setRequestResponse] = useState({
        err: false,
        success: false,
        message: "",
    });
    const showRequestResult = useShowRequestResult(setSubmitting, setRequestResponse);

    const axiosPrivate = useAxiosPrivate();

    const handleSubmit = async ev => {
        ev.preventDefault();
        const body = {
            ...details,
            price: Number(details.price),
            duration: Number(details.duration),
        };

        if (body.price > 10000) return;
        try {
            const controller = new AbortController();
            const response = await axiosPrivate
                .post("/new-service", body, {
                    signal: controller.signal,
                })
            showRequestResult("success", "Service added! You can check it the EXPLORE session!");
            console.log(response.data);
        } catch (err) {
            showRequestResult("err", err.response.data[0]);
            console.error(err.response.data);
        }
    };
    console.log(details);
    return (
        <CustomGrid bgColor="#FFF">
            <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
                <ListItem>
                    <TextField
                        name='description'
                        value={details.description || ""}
                        onChange={ev => { setDetails(prev => ({ ...prev, [ev.target.name]: ev.target.value })) }}
                        fullWidth
                        id="standard-basic"
                        label="Description"
                        variant="standard" />
                </ListItem>
                <ListItem sx={{
                    display: 'flex', flexDirection: {
                        xs: 'column', sm: 'row'
                    }, gap: '36px'
                }}>
                    <Box width={{ xs: "90%", sm: "20%" }}>
                        <Typography>Price per day ($): </Typography>
                        {details.price > 10000 && <Typography
                            color="red"
                        >
                            The maximum allowed price per day is 10,000 in the moment...
                        </Typography>}
                        <CurrencyInput
                            className="currency-input"
                            name='price'
                            max={10000}
                            placeholder="$ Daily"
                            decimalsLimit={2}
                            onValueChange={(value, name) => setDetails(prev => ({ ...prev, [name]: value }))}
                        />
                    </Box>
                    <Box width={{ xs: "90%", sm: "40%" }}>
                        <TextField
                            type="number"
                            name='duration'
                            InputProps={{
                                inputProps: { min: 1 }
                            }}
                            value={details.duration || ""}
                            onChange={ev => { setDetails(prev => ({ ...prev, [ev.target.name]: ev.target.value })) }}
                            id="standard-basic"
                            label="Avarage duration (days)"
                            variant="standard" />
                    </Box>
                    <Box width={{ xs: "90%", sm: "40%" }}>
                        <Typography variant="h6">Categories: </Typography>
                        {Object.keys(categoriesMap).map(category =>
                            <Box key={category}
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { xs: "column", md: "row" },
                                    justifyContent: "space-between",
                                }}
                            >
                                <label htmlFor={category} style={{ cursor: "pointer" }}>
                                    {categoriesMap[category]}
                                </label>
                                <input
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        boxShadow: "1px 1px grey",
                                        cursor: "pointer",
                                    }}
                                    type="checkbox" name={category} id={category}
                                    onClick={ev => setDetails(prev => ({
                                        ...prev, categories: ev.target.checked
                                            ? [...prev.categories, categoriesMap[ev.target.name]]
                                            : prev.categories.filter(c => c !== categoriesMap[ev.target.name])
                                    }))}
                                />
                            </Box>
                        )}
                    </Box>
                </ListItem>
                {
                    (requestResponse.err &&
                        <Typography
                            color="red"
                        >{requestResponse.message}</Typography>)
                    || (requestResponse.success &&
                        <Typography
                            color="green"
                        >{requestResponse.message}</Typography>)
                }
            </Stack>
            <Button
                disabled={submitting}
                variant="contained"
                onClick={ev => handleSubmit(ev)}>Add new service</Button>
        </CustomGrid>
    )
}

export default AddService;
import { useState } from "react";

import { Box, Button, Checkbox, FormControlLabel, FormGroup, ListItem, Stack, TextField, Typography } from "@mui/material";
import CurrencyInput from "react-currency-input-field";

import CustomGrid from "../components/CustomGrid";

import categoriesMap from "../helpers/categoriesMap";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const AddService = () => {
    const [categories, setCategories] = useState({
        'ml': false,
        'bc': false,
        'it': false,
    });
    const [details, setDetails] = useState({
        description: "",
        price: "",
        duration: "",
    });

    const axiosPrivate = useAxiosPrivate();
    const handleSubmit = async ev => {
        ev.preventDefault();

        const body = {
            ...details,
            //Convert to cents to store in database
            price: Number(details.price) * 100,
            duration: Number(details.duration),
            categories: Object.keys(categories)
                .filter(category => Object.keys(categoriesMap).includes(category) &&
                    categories[category]).map(cat => categoriesMap[cat])
        };
        console.log(body);
        try {
            const controller = new AbortController();
            const response = await axiosPrivate
                .post("/new-service", body, {
                    signal: controller.signal,
                })
            console.log(response.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

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
                    }, gap: '50px'
                }}>
                    <Box sx={{
                        width: "130px"
                    }}>
                        <Typography>Price per day ($): </Typography>
                        <CurrencyInput
                            className="currency-input"
                            name='price'
                            placeholder="$ Daily"
                            // defaultValue={}
                            decimalsLimit={2}
                            onValueChange={(value, name) => setDetails(prev => ({ ...prev, [name]: value }))}
                        />
                    </Box>
                    <Box>
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
                    <FormGroup onClick={ev => {
                        setCategories(prev => ({
                            ...prev, [ev.target.name]: !prev[ev.target.name]
                        }))
                    }}>
                        <FormControlLabel name="ml" control={<Checkbox color="error" />} label="Machine Learning" />
                        <FormControlLabel name="bc" control={<Checkbox color="error" />} label="BlockChain" />
                        <FormControlLabel name="it" control={<Checkbox color="error" />} label="IT" />
                    </FormGroup>
                </ListItem>
            </Stack>
            <Button variant="contained" onClick={ev => handleSubmit(ev)}>Add new service</Button>
        </CustomGrid>
    )
}

export default AddService
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { Stack, Typography } from "@mui/material";

import dayjs from "dayjs";

import Container from "./Container";

const Contracts = ({ contracts: { provider, client } }) => {
    const [isProvider, setIsProvider] = useState(true);
    const [contractsToRender] = useState(isProvider ? provider : client);

    const navigate = useNavigate();

    return (
        <Stack direction="column">
            <Container style={{ flexDirection: "row" }}>
                <button
                    className={isProvider ? "selected" : ""}
                    onClick={() => setIsProvider(true)}>
                    Provider
                </button>
                <button
                    className={!isProvider ? "selected" : ""}
                    onClick={() => setIsProvider(false)}>
                    Client
                </button>
            </Container>
            {Boolean(contractsToRender) && contractsToRender.map(contract => <Container key={contract.id}>
                <Typography>
                    <strong>Requirements: </strong>{contract.requirements}
                </Typography>
                <Typography>
                    <strong>Start date: </strong>{dayjs(contract.start_date).format("DD/MM/YYYY")}
                </Typography>
                <Typography>
                    <strong>Due date: </strong>{dayjs(contract.due_date).format("DD/MM/YYYY")}
                </Typography>
                <Typography>
                    <strong>To {isProvider ? "receive" : "pay"}: </strong>${contract.total_price / 100}
                </Typography>
            </Container>) || <Container>
                    <Typography>
                        {isProvider ? "No clients yet..." : "You have not contracted any service..."}
                        <button
                            onClick={() => navigate(isProvider ? "/new-service" : "/catalog")}
                        >{isProvider ? "Add a new service!" : "Go check the catalog!"}
                        </button>
                    </Typography>
                </Container>}
        </Stack>
    )
};

Contracts.propTypes = {
    contracts: PropTypes.object,
}

export default Contracts;
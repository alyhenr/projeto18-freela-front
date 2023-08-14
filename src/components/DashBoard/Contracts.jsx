import { useState } from "react";
import PropTypes from "prop-types";

import { Stack, Typography } from "@mui/material";

import dayjs from "dayjs";

import Container from "./Container";
import { Link } from "react-router-dom";

const Contracts = ({ contracts }) => {
    const [provider, setProvider] = useState(true);

    return (
        contracts.provider !== null && contracts.client !== null ?
            <Stack direction="column">
                <Container style={{
                    flexDirection: "row"
                }}>
                    <button
                        className={provider ? "selected" : ""}
                        onClick={() => setProvider(true)}>Provider</button>
                    <button
                        className={!provider ? "selected" : ""}
                        onClick={() => setProvider(false)}>Client</button>
                </Container>
                {(provider ? contracts.provider : contracts.client)
                    .map(contract => Boolean(contract) && contract?.length > 0 ? <Container key={contract.id}>
                        <Typography><strong>Requirements:</strong>
                            {contract.requirements}</Typography>
                        <Typography><strong>Start date:</strong>
                            {dayjs(contract.start_date).format("DD/MM/YYYY")}</Typography>
                        <Typography><strong>Due date:</strong>
                            {dayjs(contract.due_date).format("DD/MM/YYYY")}</Typography>
                        <Typography><strong>To {provider ? "receive" : "pay"}:</strong>
                            ${contract.total_price / 100}</Typography>
                    </Container> : <></>)}
            </Stack>
            : <Container>
                <Typography>
                    You don&apos;t have any active contracts.
                </Typography>
                <Link to="/explore">
                    <button style={{
                        width: "80%"
                    }}>
                        Explore what our samurais can do!
                    </button>
                </Link>
            </Container>
    )
};

Contracts.propTypes = {
    contracts: PropTypes.object,
}

export default Contracts;
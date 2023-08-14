import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Stack, Typography } from "@mui/material";

import Container from "./Container";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useShowRequestResult from "../../hooks/useShowRequestResult";

const Service = ({ service }) => {
    const axiosPrivate = useAxiosPrivate();

    const [waitResponse, setWaitResponse] = useState(false);
    const [requestResult, setRequestResult] = useState({
        err: false,
        success: false,
        message: ""
    })
    const showRequestResult = useShowRequestResult(setWaitResponse, setRequestResult);
    const handleDelete = async (id) => {
        try {
            const controller = new AbortController();
            await axiosPrivate
                .delete(`/delete-service/${id}`, {
                    headers: {
                        userid: service.user_id
                    },
                    signal: controller.signal,
                })
            showRequestResult("success", "Service deleted!")
            setTimeout(() => {
                location.reload();
            }, 1500);
        } catch (err) {
            if (err.response.status === 403 || err.response.status === 401) {
                showRequestResult("err", err.response.data.message)
                return;
            }
            // console.error(err.response.data);
            showRequestResult("err", "We had a problemn deleting this service... Try again in some minutes");
        }
    };
    return (
        <>
            <Typography><strong>Description: </strong>
                {service.description}</Typography>
            <Typography><strong>Duration: </strong>
                {service.duration} {service.duration > 1 ? "days" : "day"}</Typography>
            <Typography><strong>Price: </strong>
                ${service.price / 100}</Typography>
            {
                (requestResult.err || requestResult.success) &&
                <Typography color={requestResult.err && "red"
                    || requestResult.success && "green"}
                >
                    {requestResult.message}
                </Typography>
            }
            <button
                disabled={waitResponse}
                onClick={() => handleDelete(service.id)}>Delete</button>
        </>
    )
}

Service.propTypes = {
    service: PropTypes.object,
}

const ServicesList = ({ services }) => {
    return (
        services !== null ?
            <Stack direction="column">
                {services.map(service => <Container key={service.id}>
                    <Service service={service} />
                </Container>)}
            </Stack> :
            <Container>
                <Typography>
                    You are not providing any services right now...
                </Typography>
                <Link to="/new-service">
                    <button >
                        Add a new one!
                    </button>
                </Link>
            </Container>
    )
};

ServicesList.propTypes = {
    services: PropTypes.array,
}

export default ServicesList;
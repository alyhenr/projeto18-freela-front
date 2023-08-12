import { useState } from "react";
import PropTypes from "prop-types";

import { styled } from "styled-components";
import { TextField } from "@mui/material";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

const InitialContent = ({
    name, description, price, duration, categories, categoriesMap, setClicked
}) => {

    return (
        <div onClick={() => setClicked()} className="initial">
            <img src="src/assets/landing.jpg" alt="" />
            <h2>SAMURAI: {name}</h2>
            <p>Price per day: <strong>${price / 100}</strong></p>
            <p>Avarage duration: <strong>
                {duration} {duration > 1 ? "days" : "day"}
            </strong></p>
            <p><strong>Details:</strong> {description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, quidem! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi fugit odio tenetur consectetur quos quis, laboriosam temporibus. Voluptatibus, iste tenetur!</p>
            <div>
                <button>SEE MORE DETAILS</button>
                <strong>
                    <p>{categories.map(categoryId => categoriesMap[categoryId]).join(" - ")}</p>
                </strong>
            </div>
        </div>
    )
};

InitialContent.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    duration: PropTypes.number,
    categories: PropTypes.array,
    categoriesMap: PropTypes.object,
    setClicked: PropTypes.func,
};


const ContractService = ({
    name, email, phone, description, price, duration, setClicked, setFinishProposal, form, setForm
}) => {

    return (
        <div className="contract">
            <h2>SAMURAI: {name}</h2>
            <p>
                Email: <strong>{email} </strong><br />
                Phone: <strong>{phone}</strong>
            </p>
            <p>Avarage duration of this type of job: <strong>
                {duration} {duration > 1 ? "days" : "day"}
            </strong></p>
            <p>Total: <strong>${price / 100 * duration}</strong></p>
            <p><strong>Details:</strong> {description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, quidem! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi fugit odio tenetur consectetur quos quis, laboriosam temporibus. Voluptatibus, iste tenetur!</p>
            <p>Specify the job&apos;s requirements: (Required)</p>
            <TextField
                name="requirements"
                value={form.requirements}
                onChange={ev => setForm(prev => ({ ...prev, [ev.target.name]: ev.target.value }))} />
            <p>Send a private message to the Samurai: (Optional) </p>
            <TextField
                name="message"
                value={form.message}
                onChange={ev => setForm(prev => ({ ...prev, [ev.target.name]: ev.target.value }))} />
            <div>
                <button
                    id="cancel-btn"
                    onClick={() => setClicked()}
                >BACK</button>
                <button
                    onClick={() => { setFinishProposal(true) }}
                >GET THE JOB DONE</button>
            </div>
        </div>
    )
};

ContractService.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    duration: PropTypes.number,
    setClicked: PropTypes.func,
    setFinishProposal: PropTypes.func,
    form: PropTypes.object,
    setForm: PropTypes.func,
};

const FinalCard = ({
    name, email, phone, description, total, setClicked, setFinishProposal, form, handleSubmit
}) => {
    return (
        <div className="contract">
            <h2>SAMURAI: {name}</h2>
            <p>
                Email: <strong>{email} </strong><br />
                Phone: <strong>{phone}</strong>
            </p>
            <p>Total: <strong>${total}</strong></p>
            <p><strong>Details:</strong> {description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, quidem! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi fugit odio tenetur consectetur quos quis, laboriosam temporibus. Voluptatibus, iste tenetur!</p>
            <p><strong>My requirements: </strong>
                {form.requirements !== ""
                    ? <span> {form.requirements}</span>
                    : <span style={{
                        color: "red"
                    }}>You need to provide some requirements for the job.</span>}
            </p>
            {form.message !== "" && <p><strong>Private message:</strong> {form.message}</p>}
            <div
                style={{
                    display: "flex", justifyContent: "center", flexWrap: "wrap",
                }}
            >
                <button
                    id="cancel-btn"
                    onClick={() => { setClicked(), setFinishProposal() }}
                >CANCEL</button>
                <button
                    id="change-btn"
                    onClick={() => setFinishProposal()}
                >CHANGE DETAILS</button>
                <button
                    className={form.requirements === "" ? "disabled-btn" : ""}
                    disabled={form.requirements === ""}
                    onClick={() => handleSubmit()}
                >SEND</button>
            </div>
        </div>
    )
}

FinalCard.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    description: PropTypes.string,
    total: PropTypes.number,
    setClicked: PropTypes.func,
    setFinishProposal: PropTypes.func,
    handleSubmit: PropTypes.func,
    form: PropTypes.object,
};

const ServicesCard = ({ id, username, email, phone, description, price, duration, categories, categoriesMap }) => {
    const [clicked, setClicked] = useState(false);
    const [finishProposal, setFinishProposal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        requirements: "",
        message: "",
    })

    const axiosPrivate = useAxiosPrivate();

    let name = username.split(" ");
    name = name.length > 1 ? name[0] + " " + name[1] : name[0];

    const handleSubmit = () => {
        if (submitting) return;

        setSubmitting(true);

        axiosPrivate.post(`/service/${id}`, { ...form })
            .then(res => console.log(res))
            .catch(err => console.log(err.response));

        setSubmitting(false);
    }

    return (
        <CardContainer>
            {finishProposal ?
                <FinalCard
                    form={form}
                    handleSubmit={handleSubmit}
                    setClicked={() => setClicked(false)}
                    setFinishProposal={() => setFinishProposal(false)}
                    name={name} email={email} phone={phone}
                    description={description} total={price * duration}
                /> :
                !clicked ? <InitialContent
                    setClicked={() => setClicked(prev => !prev)}
                    name={name} description={description} price={price}
                    duration={duration} categories={categories} categoriesMap={categoriesMap}
                />
                    : <ContractService
                        form={form}
                        setForm={setForm}
                        setClicked={() => setClicked(prev => !prev)}
                        setFinishProposal={setFinishProposal}
                        name={name} email={email} phone={phone}
                        description={description} price={price}
                        duration={duration}
                    />
            }
        </CardContainer>
    )
}

const CardContainer = styled.div`
    overflow: hidden;
    box-shadow: 0 2px 20px grey;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    cursor: pointer;

    transition: transform 200ms ease-in;
    background-color: #FFF;

    img {
        height: 15rem;
        width: 100%;
        object-fit: cover;
    }

    h2 {
        margin: 0;
        padding: 1rem;
    }

    p {
        padding: 0 1rem;
    }

    div>div {
        display: flex;
        justify-content: space-between;
        padding: 0 1rem;
    }

    .contract {
        cursor: default;
    }

    &:hover {
        transform: scale(1.01);
    }

    button {
        width: 25%;
        min-width: 100px;
        padding: 1rem;
        font-family: inherit;
        font-weight: bold;
        font-size: 1rem;
        margin: 1rem;
        border: 2px solid #A32728;
        background: transparent;
        color: #A32728;
        border-radius: 5px;
        transition: background 200ms ease-in, color 200ms ease-in;

        &:hover {
            background: #A32728;
            color: #FFF;
            cursor: pointer;

        }
    }

    #cancel-btn {
        color: #FFF;
        background: #A32728;

        &:hover {
            color: #A32728;
            background: #FFF;
        }
    }

    #change-btn {
        border-color: #FFA500;
        color: #FFF;
        background: #FFA500;

        &:hover {
            color: #FFA500;
            background: #FFF;
        }
    }
`;

ServicesCard.propTypes = {
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    duration: PropTypes.number,
    categories: PropTypes.array,
    categoriesMap: PropTypes.object,
};

export default ServicesCard;
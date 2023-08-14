import { useState } from "react";
import PropTypes from "prop-types";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useShowRequestResult from "../../hooks/useShowRequestResult";

import CardFront from "./CardFront";
import DetailsCard from "./DetailsCard";
import FinalCard from "./FinalCard";
import CardContainer from "./CardContainer";



const ServicesCard = (
    { id, username, email, phone, description, price, duration, categories, categoriesMap, isProvider, isClient }
) => {
    const [clicked, setClicked] = useState(false);
    const [finishProposal, setFinishProposal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        requirements: "",
        message: "",
        duration,
        totalPrice: price * duration,
    });
    const [requestResult, setRequestResult] = useState({
        err: false,
        success: false,
        message: "",
    });
    const showRequestResult = useShowRequestResult(setSubmitting, setRequestResult);

    const axiosPrivate = useAxiosPrivate();

    let name = username.split(" ");
    name = name.length > 1 ? name[0] + " " + name[1] : name[0];

    const handleSubmit = async () => {
        if (submitting) return;
        setSubmitting(true);

        if (isProvider) {
            showRequestResult("err", "You cannot contract the services you provide!");
            return;
        }

        try {
            await axiosPrivate.post(`/service/${id}`, { ...form })

            showRequestResult("success", `You have successfully contracted ${username}'s service!`);

            setTimeout(() => {
                setClicked(false);
                setFinishProposal(false);
            }, 1500);
        } catch (err) {
            console.log(err.response);
        }
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
                    requestResult={requestResult}
                /> :
                !clicked ? <CardFront
                    setClicked={() => setClicked(prev => !prev)}
                    name={name} description={description} price={price}
                    duration={duration} categories={categories} categoriesMap={categoriesMap}
                    isClient={isClient} isProvider={isProvider}
                />
                    : <DetailsCard
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
    isProvider: PropTypes.bool,
    isClient: PropTypes.bool,
};

export default ServicesCard;
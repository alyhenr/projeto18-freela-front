import PropTypes from "prop-types";

const FinalCard = ({
    name, email, phone, description, total, setClicked, setFinishProposal, form, handleSubmit, requestResult
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
            {requestResult.err
                && <p style={{
                    color: "red"
                }}>{requestResult.message}</p>}
            {requestResult.success
                && <p style={{
                    color: "green"
                }}>{requestResult.message}</p>}
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
    requestResult: PropTypes.object,
};

export default FinalCard;
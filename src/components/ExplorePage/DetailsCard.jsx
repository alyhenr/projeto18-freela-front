import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const DetailsCard = ({
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

DetailsCard.propTypes = {
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

export default DetailsCard;
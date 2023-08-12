import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';
import { Box, Button, Typography } from '@mui/material';

import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

import { signInSchema, signUpSchema } from '../helpers/schemas';
import converToTitleCase from "../helpers/convertToTitleCase";

import CustomGrid from './CustomGrid';

const reducer = (prevState, { type, target, checkbox = false }) => {
    if (type === 'toggle_form') {
        return {
            login: !prevState.login,
            data: prevState.login ? {
                ...prevState.data
            } : {
                email: prevState.data.email || "",
            },
        }
    } else if (type === "update_field") {
        return {
            ...prevState, data: {
                ...prevState.data,
                [target.name]: checkbox ? target.checked : target.value
            }
        }
    }
}

const Form = () => {
    const [formState, dispatch] = useReducer(reducer, {
        login: true,
        data: {},
    });
    const [submitting, setSubmitting] = useState(false);

    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async ev => {
        ev.preventDefault();
        setSubmitting(true);

        const schema = formState.login ? signInSchema : signUpSchema;
        try {
            await schema.validate(formState.data);

            if (formState.login) {
                try {
                    const response = await axios.post("/signin",
                        { ...formState.data },
                        {
                            headers: { 'Content-Type': 'application/json' },
                            withCredentials: true
                        }
                    );

                    setAuth(response.data);
                    navigate("/dashboard");
                } catch (err) {
                    console.log(err.response);
                }
            } else {
                try {
                    const body = { ...formState.data, name: converToTitleCase(formState.data.name) };
                    delete body.confirmPassword;

                    await axios.post("/signup", { ...body });

                    dispatch({ type: 'toggle_form' })
                } catch (err) {
                    console.log(err.response);
                }
            }
        } catch (err) {
            console.log(err.response);
        }

        setSubmitting(false);
    };

    return (
        <CustomGrid>
            <FormContainer onSubmit={handleSubmit}>
                <Typography variant='h5' color="#000">Let&apos;s get started 👋</Typography>
                {!formState.login && <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" placeholder='Enter your name'
                        onChange={ev => dispatch({ type: 'update_field', target: ev.target })}
                        value={formState.data.name || ""} />
                </div>}

                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" placeholder='Enter your email'
                        onChange={ev => dispatch({ type: 'update_field', target: ev.target })}
                        value={formState.data.email || ""} />
                </div>

                {!formState.login && <div>
                    <label htmlFor="city">City: </label>
                    <input type="text" name="city" id="city" placeholder='Enter your city'
                        onChange={ev => dispatch({ type: 'update_field', target: ev.target })}
                        value={formState.data.city || ""} />
                </div>}

                {!formState.login && <div>
                    <label htmlFor="phone">Phone: </label>
                    <input type="text" name="phone" id="phone" placeholder='Enter your phone'
                        onChange={ev => dispatch({ type: 'update_field', target: ev.target })}
                        value={formState.data.phone || ""} />
                </div>}

                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" placeholder='Enter your password'
                        onChange={ev => dispatch({ type: 'update_field', target: ev.target })}
                        value={formState.data.password || ""} />
                </div>

                {!formState.login && <div>
                    <label htmlFor="confirmPassword">Confirm password: </label>
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm your password'
                        onChange={ev => dispatch({ type: 'update_field', target: ev.target })}
                        value={formState.data.confirmPassword || ""} />
                </div>}
                {!formState.login && <div>
                    <Typography variant='overline' sx={{ display: "block" }}>Are you a samurai too?</Typography>
                    <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                        <label style={{ display: "inline", width: "fit-content" }}
                            htmlFor="samurai">
                            <strong>I want to provide services: </strong>
                            <p style={{
                                display: "inline", fontSize: "12px"
                            }}>(You can change it later)</p>
                        </label>
                        <input style={{ display: "inline", width: "20px", hieght: "20px", cursor: "pointer" }}
                            type="checkbox" name="samurai" id="samurai"
                            onChange={ev => dispatch({ type: 'update_field', target: ev.target, checkbox: true })}
                            value={formState.data.samurai} />
                    </Box>
                </div>}
                {formState.data?.samurai && <div>
                    <label htmlFor="description">
                        Give us a short description of your skills and the services you&apos;re going to provide:
                        <br /><p style={{
                            display: "inline", fontSize: "12px"
                        }}>(Optional field, min of 100 chacracteres if used)</p>
                    </label>
                    <textarea style={{ height: "70px", textAlign: "start" }}
                        type="text" name="description" id="description" placeholder='Description'
                        onChange={ev => dispatch({ type: 'update_field', target: ev.target })}
                        value={formState.data.description || ""} />
                </div>}
                <Typography alignSelf="center" variant='h6' color="InfoBackground" sx={{
                    cursor: 'pointer',
                    ":hover": {
                        color: "CaptionText"
                    }
                }} onClick={() => { dispatch({ type: 'toggle_form' }) }}
                >
                    {formState.login ? "Don't" : "Already"} have an account? {formState.login ? "Sign Up" : "Sign In"}
                </Typography>
                <Button
                    disabled={submitting}
                    type="submit"
                    variant='contained'>{formState.login ? "Sign In" : "Sign Up"}</Button>
            </FormContainer>
        </CustomGrid>
    )
};

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    label {
        display: block;
        padding-bottom: 2px;
    }
    input, textarea {
        width: 100%;
        height: 35px;
        padding: 10px;
        border: 2px solid grey;
        border-radius: 5px;

        &:focus {
            border: 2px solid #23a6d5;
            outline: none;
        }
    }
`;

export default Form;
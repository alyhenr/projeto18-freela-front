import { object, ref, string } from 'yup';

export const signInSchema = object({
    email: string().email().required(),
    password: string().min(5).required(),
});

export const signUpSchema = object({
    name: string().min(5).required(),
    email: string().email().required(),
    city: string().required(),
    phone: string().min(8).max(10).required(),
    password: string().min(5).required(),
    confirmPassword: string().oneOf([ref('password'), null], "Passwords must match")
});
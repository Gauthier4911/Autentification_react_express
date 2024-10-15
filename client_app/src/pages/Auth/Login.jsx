import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from '@tanstack/react-query';
import axios from "axios";
import { toast } from 'sonner';
import useAuthUser from "../../../store.jsx"; // Assurez-vous que l'importation est correcte

const schema = yup
    .object({
        email: yup.string().trim().required("Champ obligatoire").email("Entrer un email valide"),
        password: yup.string().trim().required("Champ obligatoire").min(4, 'minimum 4 caractères'),
    })
    .required();

export default function Login() {
    const navigate = useNavigate();
    const loginUser = useAuthUser((state) => state.loginUser);
    const logoutUser = useAuthUser((state) => state.logoutUser);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const mutation = useMutation({
        mutationFn: (data) => {
            return axios.post(`${import.meta.env.VITE_API_URL}/login`, data);
        },
        onSuccess: (data) => {
            loginUser(data.data.user);
            setTimeout(() => {
                logoutUser();
            }, 3600000);
            navigate('/');
        },
        onError: () => {
            toast.error('Identifiant incorrect...');
        }
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    }

    return (
        <main className="container">
            <section className="row d-flex justify-content-center align-items-center vh-100">
                <div className="col-lg-4 shadow rounded p-5">
                    <h3 className="text-center">
                        Se connecter à HIGH TECH SCHOOL
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <input type="text" className="form-control" {...register("email")} placeholder="Email..." />
                            <small className="text-danger">{errors.email?.message}</small>
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" {...register("password")} placeholder="Mot de passe.." />
                            <small className="text-danger">{errors.password?.message}</small>
                        </div>
                        <p className="text-center my-3">
                            Pas de compte? 
                            <Link to="/register"> S'inscrire</Link>
                        </p>
                        <button type="submit" className="btn btn-dark w-100">Se connecter</button>
                    </form>
                </div>
            </section>
        </main>
    );
}
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {useMutation,} from '@tanstack/react-query'
import axios from "axios"
import {toast} from 'sonner'

const schema = yup
    .object({
        username: yup.string().trim().required("Champ obligatoire"),
        email: yup.string().trim().required("Champ obligatoire").email("Ebtrer un email valide"),
        password: yup.string().trim().required("Champ obligatoire").min(4,'minimun 4 caracteres'),
        confirmation_password: yup.string().oneOf([yup.ref('password')],'mot de passe different'),
    })
    .required()


export default function Resgister(){

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      })
      
      const mutation = useMutation({
        mutationFn: (data) => {
          //return axios.post('/todos', newTodo)
          return axios.post(`${import.meta.env.VITE_API_URL}/register`, data)
        },
        onSuccess : (data)=>{
            navigate('/login')
        },
        onError: (data) => {
            toast.errors('Email exit deja...')
        }
    })

      const onSubmit = (data) => {
        mutation.mutate(data)
      }


    return(
        <main className="container">
            <section className="row d-flex justify-content-center align-items-center vh-100">
                <div className="col-lg-5 shadow rounded p-5">
                    <h3 className="text-center">
                        S'inscrire à HIGH TECH SCHOOL
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <input type="text" className="form-control" {...register("username")} placeholder="Username..." />
                            <small className="text-danger">{errors.username?.message}</small>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control"  {...register("email")} placeholder="Email..." />
                            <small className="text-danger">{errors.email?.message}</small>
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control"  {...register("password")} placeholder="Mot de passe.." />
                            <small className="text-danger">{errors.password?.message}</small>
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" {...register("confirmation_password")} placeholder="Confirmation mot de passe.." />
                            <small className="text-danger">{errors.confirmation_password?.message}</small>
                        </div>
                        <p className="text-center my-3">
                            Deja un  compte ? Se connecter 
                            <Link to="/login"> ICI</Link>
                        </p>
                        <button type="submit" className="btn btn-dark w-100">
                            {mutation.isPending ? 'Enregistrement...' : "S'inscrire"}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    )
}
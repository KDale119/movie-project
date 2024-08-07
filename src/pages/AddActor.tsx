'use client'
import * as yup from 'yup';
import { useMutation} from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Navigation from '../components/Navigation';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function AddActor(){
    const [isSubmitting, setSubmit]= useState<boolean>(false);

    const {push} = useRouter();
    const schema = yup.object().shape({
        id: yup.number().required('ID is required'),
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        dateOfBirth: yup.string().required("DOB is required")
    })

    const {register, handleSubmit, formState: {errors}} = useForm ({
        resolver: yupResolver(schema),
        defaultValues: {
            id: 0,
            firstName: "",
            lastName: "",
            dateOfBirth: ""
        }
    })
    const mutation = useMutation({
        mutationFn: (createActor: any) => {
            return axios.post(`http://3.149.27.3:8080/api/actors/`, createActor)
        }
    })

    const {mutate, isPending} = mutation

    useEffect(() => {
        if(!isPending && isSubmitting) {
            const backToActors = () => push('/Actors')
            setSubmit(false)
            backToActors();
        }
    }, [isPending, isSubmitting]);

    const onSubmit = (formData: { id: number, firstName: string, lastName: string, dateOfBirth: string }) => {
        setSubmit(true)
        mutate(formData)
    }

    return (
        <>
            <Navigation/>
            <form onSubmit={handleSubmit(onSubmit)}
                  className="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
                    <input {...register('firstName')}
                           className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           name="firstName"
                           type="text"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
                    <input {...register('lastName')}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           name="lastName" type="text"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth:</label>
                    <input {...register('dateOfBirth')}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           name="dateOfBirth" type="text"/>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">Submit
                    </button>
                </div>
            </form>
        </>
    )
}
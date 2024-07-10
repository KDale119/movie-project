'use client'
import * as yup from 'yup';
import {actors} from "../types";
import { useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Navigation from '../components/Navigation';
import {useEffect, useState } from 'react';
import { useRouter } from 'next/router';


export default function UpdateActors(){
    const [isSubmitting, setSubmit]= useState<boolean>(false);

    const router = useRouter();
    const { id, firstName, lastName, dateOfBirth } = router.query as unknown as {
        id: number,
        firstName: string,
        lastName: string,
        dateOfBirth: string
    }

    const { register, handleSubmit} = useForm({
        defaultValues: {
            id: id,
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth
        }
    })

    const mutation = useMutation({
        mutationFn: (formData: any) => {
            return axios.put(`http://3.149.27.3:8080/api/actors/${id}`, formData)
        }
    })

    const {mutate, isPending} = mutation

    useEffect(() => {
        if(!isPending && isSubmitting) {
            const backToActors = () => router.push('/Actors')
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
                    <input defaultValue={firstName} {...register('firstName')}
                           className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           name="firstName"
                           type="text"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
                    <input defaultValue={lastName} {...register('lastName')}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           name="lastName" type="text"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth:</label>
                    <input defaultValue={dateOfBirth} {...register('dateOfBirth')}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           name="dateOfBirth" type="text"/>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">Update
                    </button>
                </div>
            </form>
        </>
    )
}
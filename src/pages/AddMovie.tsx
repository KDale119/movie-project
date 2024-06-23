'use client'
import * as yup from 'yup';
import {actors, directors} from "../types";
import { useMutation} from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Navigation from '../components/Navigation';
import { useRouter } from 'next/router';
import {useEffect, useState } from 'react';

export default function AddMovie(){
    const [directors, setDirectors] = useState<directors[]>();
    const [actors, setActors] = useState<actors[]>();


    const {push} = useRouter();
    const schema = yup.object().shape({
        id: yup.number().required('ID is required'),
        movieLength: yup.number().required("Length name is required"),
        movieTitle: yup.string().required("Title name is required"),
        releaseDate: yup.string().required('Release date is required'),
        trailerUrl: yup.string().required('Link for trailer is required'),
        ratingId: yup.string().required('Rating is required'),
        genre: yup.string().required('Genre is required'),
        director: yup.string().required('Director is required'),
        actor: yup.string().required('Actor is required') //how to make an array cause there might be more than one actor in movie

    })

    const {register, handleSubmit} = useForm ({
        resolver: yupResolver(schema),
        defaultValues: {
            id: 0,
            movieLength: 0,
            movieTitle: "",
            releaseDate: "",
            trailerUrl: "",
            ratingId: "",
            genre: ""
        }
    })
    const mutation = useMutation({
        mutationFn: (createMovie: any) => {
            return axios.post(`http://localhost:8080/api/movies/`, createMovie)
        }
    })

    const {mutate} = mutation

    const onSubmit = (formData: { id: number, movieLength: number, movieTitle: string, releaseDate: string, trailerUrl: string, ratingId: string, genre: string, director: string, actor: string }) => {
        mutate(formData)
        const backToMovies = () => push('/Movies')
        backToMovies();
    }
    useEffect(() => {
        axios.get('http://localhost:8080/api/directors')
            .then(response =>{
                setDirectors(response.data)})
        axios.get('http://localhost:8080/api/actors')
            .then(response =>{
                setActors(response.data)})
    }, []);
    return (
        <>
            <Navigation/>
            <form onSubmit={handleSubmit(onSubmit)}
                  className="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">ID:</label>
                    <input {...register('id')}
                           className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           name="id"
                           type="text"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Length:</label>
                    <input {...register('movieLength')}
                           className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           name="movieLength"
                           type="text"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input {...register('movieTitle')}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           name="movieTitle" type="text"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Release Date:</label>
                    <input {...register('releaseDate')}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           name="releaseDate" type="text"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Select a rating:</label>
                    <select {...register('ratingId')} name="ratingId"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="blank">Select...</option>
                        <option value="G">G</option>
                        <option value="PG">PG</option>
                        <option value="PG-13">PG-13</option>
                        <option value="R">R</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Select a genre:</label>
                    <select {...register('genre')} name="genre"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="blank">Select...</option>
                        <option value="Action/Adventure">Action/Adventure</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Horror">Horror</option>
                        <option value="Drama">Drama</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Western">Western</option>
                        <option value="Romance">Romance</option>
                        <option value="Documentary">Documentary</option>
                        <option value="Crime">Crime</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Director:</label>
                    <select {...register('director')} name="director"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        {directors?.map(d =>
                            <option value="director">{d.firstName} {d.lastName}</option>
                        )}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Actors:</label>
                    <fieldset {...register('actor')} name="actor"
                            className="block w-full mt-1 p-2focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        {actors?.map(a =>
                            <div>
                            <input type="checkbox" name="actors"></input>
                            <label className="px-2 text-base">{a.firstName} {a.lastName}</label>
                            </div>
                        )}
                    </fieldset>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Trailer URL:</label>
                    <input {...register('trailerUrl')}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           name="trailerUrl" type="text"/>
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
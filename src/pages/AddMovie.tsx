'use client'
import * as yup from 'yup';
import {actors, directors, movies} from "../types";
import { useMutation} from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Navigation from '../components/Navigation';
import { useRouter } from 'next/router';
import {AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal,
    useEffect,
    useState
} from 'react';

export default function AddMovie() {
    const [directorsState, setDirectors] = useState<directors[]>();
    const [actorsState, setActors] = useState<actors[]>();
    const [genreState, setGenre] = useState<any>();
    const [ratingState, setRating] = useState<any>();
    const [isSubmitting, setSubmit]= useState<boolean>(false);
    
    const {push} = useRouter();
    const schema = yup.object().shape({
        id: yup.number(),
        movieLength: yup.number().required("Must enter movie length"),
        movieTitle: yup.string().required("Must enter movie name"),
        releaseDate: yup.string().required("Must enter movie release date"),
        trailerUrl: yup.string().required("Must enter movie trailer link"),
        rating: yup.string(),
        genre: yup.string(),
        director: yup.string(),
        actor: yup.array().of(yup.string()).min(1, 'Select at least one actor'),
        overview: yup.string()

    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            id: 0,
            movieLength: 0,
            movieTitle: "",
            releaseDate: "",
            trailerUrl: "",
            rating: "",
            genre: "",
            director: "",

            overview: ""
        }
    })
    const mutation = useMutation({
        mutationFn: async (createMovie: any) => {
            const response = await axios.post('http://3.149.27.3:8080/api/movies/', createMovie);
            return response.data
        }
    })

    const {mutate, isPending} = mutation

    useEffect(() => {
        if(!isPending && isSubmitting) {
            const backToMovies = () => push('/Movies');
            setSubmit(false)
            backToMovies();
        }
    }, [isPending, isSubmitting]);
    
    const onSubmit = (formData: {
        id?: number,
        movieLength: number,
        movieTitle: string,
        releaseDate: string,
        trailerUrl: string,
        rating?: string,
        genre?: string,
        director?: string,
        actor?: (string | undefined)[] | undefined,
        overview?: string
    }) => {

        const director = directorsState?.find(d => `${d.firstName} ${d.lastName}` === formData.director);
        const directorObject = {
            id: director?.id,
            dateOfBirth: director?.dateOfBirth,
            firstName: director?.firstName,
            lastName: director?.lastName
        }

        const genre = genreState?.find((g: any) => `${g.genre}` === formData.genre);
        const genreObject = {
            id: genre?.id,
            genre: formData.genre

        }
        
        const rating = ratingState?.find((r: any) => `${r.rating}` === formData.rating);
        const ratingObject = {
            id: rating?.id,
            genre: formData.rating

        }

        const actorIds = formData.actor?.map(actorName => {
            const actor = actorsState?.find(a => `${a.firstName} ${a.lastName}` === actorName);
            return {
                id: actor?.id,
                dateOfBirth: actor?.dateOfBirth,
                firstName: actor?.firstName,
                lastName: actor?.lastName
            }
        })
        const createMovie = {
            id: formData.id,
            movieLength: formData.movieLength,
            movieTitle: formData.movieTitle,
            releaseDate: formData.releaseDate,
            trailerUrl: formData.trailerUrl,
            overview: formData.overview,
            director: directorObject,
            genre: genreObject,
            rating: ratingObject,
            actors: actorIds
        }
        setSubmit(true)
        mutate(createMovie);
        
    }
    useEffect(() => {
        axios.get('http://3.149.27.3:8080/api/directors')
            .then(response => {
                setDirectors(response.data)
            })
        axios.get('http://3.149.27.3:8080/api/actors')
            .then(response => {
                setActors(response.data)
            })
        axios.get('http://3.149.27.3:8080/api/genres')
            .then(response => {
                setGenre(response.data)
            })
        axios.get('http://3.149.27.3:8080/api/ratings')
            .then(response => {
                setRating(response.data)
            })
    }, []);

    return (
        <>
            <Navigation/>
            <form onSubmit={handleSubmit(onSubmit)}
                  className="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Length:</label>
                    <input {...register('movieLength')}
                           className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           name="movieLength"
                           type="text"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                    <input {...register('movieTitle')}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           name="movieTitle" type="text"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Release Date:</label>
                    <input {...register('releaseDate')}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           name="releaseDate" type="text"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Overview:</label>
                    <textarea {...register('overview')}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              name="overview"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Select a rating:</label>
                    <select {...register('rating')}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        {ratingState?.map((r: { rating: boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | Key | null | undefined; }) => (
                            <option key="rating"
                                    value={`${r.rating}`}>{r.rating}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Select a genre:</label>
                    <select {...register('genre')}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        {genreState?.map((genre: {
                            firstName: boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | Key | null | undefined;
                            genre: any;
                            lastName: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined;
                        }) => (
                            <option key={genre.genre}
                                    value={`${genre.genre}`}>{genre.genre}</option>

                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Director:</label>
                    <select  {...register('director')}
                             className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        {directorsState?.map(d => (
                            <option key={d.firstName} value={`${d.firstName} ${d.lastName}`}>{d.firstName} {d.lastName}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Actors:</label>
                    <div
                        className="block w-full mt-1 p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <select {...register('actor')} multiple={true}
                                className="block w-full p-2 border border-gray-300 rounded-md">
                            {actorsState?.map(a => (
                                <option key={a.firstName + a.lastName} value={`${a.firstName} ${a.lastName}`}>
                                    {a.firstName} {a.lastName}
                                </option>
                            ))}
                        </select >
                    </div>
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
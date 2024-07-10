import {Dispatch, SetStateAction, useEffect, useState } from "react"
import {movies } from "../types";
import Navigation from "../components/Navigation";
import router, { useRouter } from "next/router";
import Link from "next/link";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";



export default function DisplayMovies() {
    const router = useRouter();

    const getMovieById= async () => {
        const resp: AxiosResponse <movies> = await axios.get(`http://3.149.27.3:8080/api/movies/${id}`);
        console.log(resp.data)
        return resp.data;

    }

    const { id} = router.query as unknown as {
        id: number
    }

    const {data} = useQuery({
        queryKey:[`movieWithId${id}`],
        queryFn: getMovieById
    })


    return (
        <>
            <Navigation/>
            <ul className="divide-y divide-gray-200 px-12">
                <li className="py-2">
                    <h2 className="text-xl font-bold">{data?.movieTitle}</h2>
                </li>
                <li className="py-2">
                    <span className="font-semibold">Release Date:</span> {data?.releaseDate}
                </li>
                <li className="py-2">
                    <span className="font-semibold">Rating:</span> {data?.rating?.rating}
                </li>
                <li className="py-2">
                    <span className="font-semibold">Genre:</span> {data?.genre?.genre}
                </li>
                <li className="py-2">
                    <span className="font-semibold">Overview:</span> {data?.overview}
                </li>
                <li className="py-2">
                    <span className="font-semibold">Length:</span> {data?.movieLength}
                </li>
                <li className="py-2">
                    <span className="font-semibold">Trailer:</span> <a href={data?.trailerUrl}
                                                                       className="text-blue-500">Watch Trailer</a>
                </li>
                <ul className="py-2 font-semibold" >Actor(s):
                    {data?.actors.map(actor => (
                        <li key={actor.id}>
                           {actor.firstName}  {actor.lastName}
                        </li>
                    ))}
                </ul>
                <li className="py-2">
                    <span
                        className="font-semibold">Director:</span> {data?.director?.firstName} {data?.director?.lastName}
                </li>
            </ul>
        </>
    )
}
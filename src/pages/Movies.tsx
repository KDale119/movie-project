import {SetStateAction, useEffect, useState} from "react";
import axios from "axios";
import {movies } from "../types";
import DisplayMovies from "../components/DisplayMovies";
import { useQuery } from "@tanstack/react-query";



export default function Movies() {
    const {refetch, data} = useQuery({
        queryKey:["movies"],

        queryFn: getMovies,
        gcTime: 0
    })

    async function getMovies() {
        const response = await axios.get('http://localhost:8080/api/movies');
        return response.data;
    }

    const deleteMovies = (d: movies) => {
        axios.delete(`http://localhost:8080/api/movies/${d?.id}`)
            .then(resp => {
                refetch();
            })
    }
    return (
        <>
            <DisplayMovies dataForMovies={data} deleteMovie={deleteMovies}/>
        </>
    )
}
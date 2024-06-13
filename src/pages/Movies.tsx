import {SetStateAction, useEffect, useState} from "react";
import axios from "axios";
import {movies } from "../types";
import DisplayMovies from "../components/DisplayMovies";
import { useQuery } from "@tanstack/react-query";

interface DataProps{
    data: movies[] | undefined,
}

export default function Movies({data}:DataProps) {
    const [movies, setMovies] = useState<movies[]>();

    function getMovies(){
        axios.get('http://3.149.27.3:8080/api/actors')
            .then(response =>
                setMovies(response.data))
    }
    useQuery({
        queryKey:["directors"],
        queryFn: getMovies
    })

    return (
        <>
            <DisplayMovies data={movies}/>
        </>
    )
}
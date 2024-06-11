import {SetStateAction, useEffect, useState} from "react";
import axios from "axios";
import {movies } from "../types";
import DisplayMovies from "../components/DisplayMovies";

interface DataProps{
    data: movies[] | undefined,
}

export default function Movies({data}:DataProps) {
    const [getMovies, setMovies] = useState<movies[]>();

    useEffect(() => {
        axios.get('http://3.149.27.3:8080/api/movies')
            .then(response => {
                setMovies(response.data)
            })
    }, []);

    return (
        <>
            <DisplayMovies data={getMovies}/>
        </>
    )
}
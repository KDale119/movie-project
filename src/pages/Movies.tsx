import {SetStateAction, useEffect, useState} from "react";
import axios from "axios";
import {movies } from "../types";
import DisplayMovies from "../components/DisplayMovies";
import { useQuery } from "@tanstack/react-query";



export default function Movies() {
    const [movies, setMovies] = useState<movies[]>();

    const {refetch} = useQuery({
        queryKey:["movies"],
        queryFn: getMovies
    })

    function getMovies(){
        axios.get('http://3.149.27.3:8080/api/movies')
            .then(response =>
                setMovies(response.data))
    }

    const deleteMovies = (d: movies) => {
        axios.delete(`http://3.149.27.3:8080/api/movies/${d?.id}`)
            .then(resp => {
                refetch();
            })
    }

    return (
        <>
            <DisplayMovies data={movies} deletePerson={deleteMovies}/>
        </>
    )
}
import {useEffect, useState} from "react";
import axios from "axios";
import {actors, directors} from "../types";
import {useQuery} from "@tanstack/react-query";
import DisplayDirectors from "@/components/DisplayDirectors";

export default function Directors() {
    const {refetch, data} = useQuery({
        queryKey:["directors"],
        queryFn: getDirectors
    })

    async function getDirectors() {
        const response = await axios.get('http://localhost:8080/api/directors');
        return response.data;   
    }
    const deleteDirectors = (d: actors | directors) => {
        axios.delete(`http://localhost:8080/api/directors/${d?.id}`)
            .then(resp => {
                refetch();
            })
    }

    return (
        <>
            <DisplayDirectors data={data} deletePerson={deleteDirectors}/>
        </>
    )
}
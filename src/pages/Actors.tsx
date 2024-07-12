'use client'
import {useState} from "react";
import axios from "axios";
import {actors, directors} from "../types";

import { useQuery} from "@tanstack/react-query";
import DisplayActors from "@/components/DisplayActors";

export default function Actors() {

    const {refetch, data} = useQuery({
        queryKey:["actors"],
        queryFn: getActors
    })

    async function getActors() {
        const response = await axios.get('http://3.149.27.3:8080/api/actors');
        return response.data;
    }

    const deleteActors = (d: actors | directors) => {
        axios.delete(`http://3.149.27.3:8080/api/actors/${d?.id}`)
            .then(resp => {
                refetch();
            })
    }
    return (
        <>
            <DisplayActors data={data} deletePerson={deleteActors}/>
        </>
    )
}
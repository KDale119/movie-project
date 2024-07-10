'use client'
import {useState} from "react";
import axios from "axios";
import {actors, directors} from "../types";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DisplayActors from "@/components/DisplayActors";

interface DataProps{
    actorsData: actors[] | undefined

}

export default function Actors({actorsData}: DataProps) {

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
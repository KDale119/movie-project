'use client'
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import axios from "axios";
import {actors, directors} from "../types";
import DisplayData from "@/components/DisplayData";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface DataProps{
    data: actors[] | directors[] | undefined,

}

export default function Actors({data}: DataProps) {
    const [actors, setActors] = useState<actors[]>();
    // const [returnData, setData] = useState<actors[]>();

    const {refetch} = useQuery({
        queryKey:["actors"],
        queryFn: getActors
    })


    function getActors(){
        axios.get('http://localhost:8080/api/actors')
            .then(response =>
                setActors(response.data))
            }

    const deleteActors = (d: actors | directors) => {
        axios.delete(`http://localhost:8080/api/actors/${d?.id}`)
            .then(resp => {
                refetch();
            })
    }
    return (
        <>
            <DisplayData data={actors} deletePerson={deleteActors}/>
        </>
    )
}
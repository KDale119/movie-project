import {Dispatch, SetStateAction, useEffect, useState} from "react";
import axios from "axios";
import {actors, directors} from "../types";
import DisplayData from "@/components/DisplayData";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


interface DataProps{
    data: actors[] | directors[] | undefined,
    d: actors | directors | undefined

}

export default function Actors({data, d}:DataProps) {
    const [actors, setActors] = useState<actors[]>();
    // const [returnData, setData] = useState<actors[]>();

    function getActors(){
        axios.get('http://3.149.27.3:8080/api/actors')
            .then(response =>
                setActors(response.data))
            }
            useQuery({
                queryKey:["actors"],
                queryFn: getActors
            })
    console.log(d)
    const deleteActors = () => {
        axios.delete(`http://3.149.27.3:8080/api/actors/${d?.id}`)
            .then(resp =>
                setActors(resp.data))

    }


    return (
        <>
            <DisplayData data={actors} deleteActor={deleteActors}/>
        </>
    )
}
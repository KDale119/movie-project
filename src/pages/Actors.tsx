import {SetStateAction, useEffect, useState} from "react";
import axios from "axios";
import {actors, directors} from "../types";
import DisplayData from "@/components/DisplayData";


interface DataProps{
    data: actors[] | directors[] | undefined,
}

export default function Actors({data}:DataProps) {
    const [getActors, setActors] = useState<actors[]>();

    useEffect(() => {
        axios.get('http://3.149.27.3:8080/api/actors')
            .then(response => {
                setActors(response.data)
            })
    }, []);
    
    return (
        <>
            <DisplayData data={getActors}/>
        </>
    )
}
import {SetStateAction, useEffect, useState} from "react";
import axios from "axios";
import {actors, directors} from "../types";

import DisplayData from "@/pages/DisplayData";

interface DataProps{
    data: actors[] | directors[] | undefined,
}

export default function Delete({data}:DataProps) {
    const [getActors, setActors] = useState<actors[]>();

    useEffect(() => {
        axios.delete('http://3.149.27.3:8080/api/actors/{actor.id}')
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
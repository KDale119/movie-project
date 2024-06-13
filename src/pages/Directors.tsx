import {useEffect, useState} from "react";
import axios from "axios";
import {directors} from "../types";
import DisplayData from "@/components/DisplayData";
import { useQuery } from "@tanstack/react-query";

export default function Directors(){
    const [directors, setDirectors] = useState<directors[]>();
    
    function getDirectors(){
        axios.get('http://3.149.27.3:8080/api/actors')
            .then(response =>
                setDirectors(response.data))
    }
    useQuery({
        queryKey:["directors"],
        queryFn: getDirectors
    })
    return (
        <>
            <DisplayData data={directors}/>
        </>
    )
}
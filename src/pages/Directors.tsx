import {useEffect, useState} from "react";
import axios from "axios";
import {directors} from "../types";
import DisplayData from "@/components/DisplayData";

export default function Directors(){
    const [directors, setDirectors] = useState<directors[]>();

    useEffect(() => {
        axios.get('http://3.149.27.3:8080/api/directors')
            .then(response => {
                setDirectors(response.data)
            })
    }, []);
    return (
        <>
            <DisplayData data={directors}/>
        </>
    )
}
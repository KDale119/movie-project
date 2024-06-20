import {useEffect, useState} from "react";
import axios from "axios";
import {actors, directors} from "../types";
import DisplayData from "@/components/DisplayData";
import {useQuery} from "@tanstack/react-query";

export default function Directors() {
    const [directors, setDirectors] = useState<directors[]>();

    const {refetch} = useQuery({
        queryKey:["actors"],
        queryFn: getDirectors
    })

    function getDirectors() {
        axios.get('http://3.149.27.3:8080/api/directors')
            .then(response =>
                setDirectors(response.data))
    }
    const deleteDirectors = (d: actors | directors) => {
        axios.delete(`http://3.149.27.3:8080/api/directors/${d?.id}`)
            .then(resp => {
                refetch();
            })
    }

    return (
        <>
            <DisplayData data={directors} deletePerson={deleteDirectors}/>
        </>
    )
}
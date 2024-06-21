import {useEffect, useState} from "react";
import axios from "axios";
import {actors, directors} from "../types";
import {useQuery} from "@tanstack/react-query";
import DisplayDirectors from "@/components/DisplayDirectors";

export default function Directors() {
    const [directors, setDirectors] = useState<directors[]>();

    const {refetch} = useQuery({
        queryKey:["directors"],
        queryFn: getDirectors
    })

    function getDirectors() {
        axios.get('http://localhost:8080/api/directors')
            .then(response =>
                setDirectors(response.data))
    }
    const deleteDirectors = (d: actors | directors) => {
        axios.delete(`http://localhost:8080/api/directors/${d?.id}`)
            .then(resp => {
                refetch();
            })
    }

    return (
        <>
            <DisplayDirectors data={directors} deletePerson={deleteDirectors}/>
        </>
    )
}
import {Dispatch, SetStateAction } from "react"
import {movies } from "../types";
import Navigation from "./Navigation";


interface DataProps{
    data: movies[] | undefined,
    deletePerson: (d: movies) => void;
}
export default function DisplayMovies({data, deletePerson}:DataProps) {
    return (
        <>
            <Navigation/>
            <div className="relative mx-60">
                <button className=" absolute top-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded">ADD</button>
            </div>
            <table className="my-20">
                <tr className="flex justify-center flex-row">
                <th key="tableHead" className="px-36 py-3 text-xl font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-36 py-3 text-xl font-medium text-gray-500 uppercase ">Length</th>
                    <th className="px-40 py-3 text-xl font-medium text-gray-500 uppercase ">Title</th>
                    <th className="px-64 py-3 text-xl font-medium text-gray-500 uppercase ">Release Date</th>
                    <th className="px-32 py-3"></th>
                    <th className="px-32 py-3"></th>
                </tr>
                <div>{data?.map(d =>
                    <div key ="wrapper" className="bg-white divide-y divide-gray-200">
                    <td key={d.id} className="px-36 py-8 whitespace-nowrap text-xl">{d.id}</td>
                    <td key={d.id} className="px-36 py-8 whitespace-nowrap text-xl">{d.movieLength} hours</td>
                    <td key={d.id} className="px-36 py-8 whitespace-nowrap text-xl">{d.movieTitle}</td>
                    <td key={d.id} className="px-28 py-8 whitespace-nowrap text-xl">{d.releaseDate}</td>
                    <td key="button" className="px-10"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => deletePerson(d)}>DELETE</button></td>
                    </div>)}
                </div>
            </table>
        </>
    )
}
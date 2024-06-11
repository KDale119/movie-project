import {Dispatch, SetStateAction } from "react"
import {movies } from "../types";
import Navigation from "./Navigation";


interface DataProps{
    data: movies[] | undefined,

}
export default function DisplayMovies({data}:DataProps) {
    return (
        <>
            <Navigation/>
            <div className="relative mx-40">
                <button className=" absolute top-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded">ADD</button>
            </div>
            <table className="my-20">
                <tr className="flex justify-center flex-row">
                <th className="px-36 py-3 text-xl font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-36 py-3 text-xl font-medium text-gray-500 uppercase ">Length</th>
                    <th className="px-40 py-3 text-xl font-medium text-gray-500 uppercase ">Title</th>
                    <th className="px-64 py-3 text-xl font-medium text-gray-500 uppercase ">Release Date</th>
                    <th className="px-32 py-3"></th>
                    <th className="px-32 py-3"></th>
                </tr>
                <div>{data?.map(data =>
                    <tbody className="bg-white divide-y divide-gray-200">
                    <td key={data.id} className="px-36 py-8 whitespace-nowrap text-xl">{data.id}</td>
                    <td key={data.id} className="px-36 py-8 whitespace-nowrap text-xl">{data.movieLength} hours</td>
                    <td key={data.id} className="px-36 py-8 whitespace-nowrap text-xl">{data.movieTitle}</td>
                    <td key={data.id} className="px-28 py-8 whitespace-nowrap text-xl">{data.releaseDate}</td>
                    <td className="px-10"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">DELETE</button></td>
                    <td><button className="px-36 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">UPDATE</button></td>
                    </tbody>)}
                </div>
            </table>
        </>
    )
}
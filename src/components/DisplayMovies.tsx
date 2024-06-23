import {Dispatch, SetStateAction } from "react"
import {movies } from "../types";
import Navigation from "./Navigation";
import { useRouter } from "next/router";
import Link from "next/link";


interface DataProps{
    data: movies[] | undefined,
    deleteMovie: (d: movies) => void;
}
export default function DisplayMovies({data, deleteMovie}:DataProps) {
    const router = useRouter();
    const passingData = (d: movies) => {
        router.push({
            pathname: "/UpdateDirectors",
            query: {
                id: d.id,
                firstName: d.movieLength,
                lastName: d.movieTitle,
                dateOfBirth: d.releaseDate
            }
        })
    }
    return (
        <>
            <Navigation/>
            <div className="relative mx-60">
                <Link href="/AddMovie">
                    <button className=" absolute top-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded">
                        ADD
                    </button>
                </Link>            
            </div>
            <table className="my-20">
                <thead>
                <tr className="flex justify-center flex-row">
                    <th className="px-36 py-3 text-xl font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-36 py-3 text-xl font-medium text-gray-500 uppercase ">Length</th>
                    <th className="px-40 py-3 text-xl font-medium text-gray-500 uppercase ">Title</th>
                    <th className="px-64 py-3 text-xl font-medium text-gray-500 uppercase ">Release Date</th>
                    <th className="px-32 py-3"></th>
                    <th className="px-32 py-3"></th>
                </tr>
                </thead>
                <tbody>
                <tr key="mapper row">{data?.map(d =>
                    <tr key="table wrapper" className="bg-white divide-y divide-gray-200">
                        <td key={d.id} className="px-36 py-8 whitespace-nowrap text-xl">{d.id}</td>
                        <td key={d.movieLength} className="px-36 py-8 whitespace-nowrap text-xl">{d.movieLength} hours</td>
                        <td key={d.movieTitle} className="px-36 py-8 whitespace-nowrap text-xl">{d.movieTitle}</td>
                        <td key={d.releaseDate} className="px-36 py-8 whitespace-nowrap text-xl">{d.releaseDate}</td>
                        <td className="px-10" key="deleteButton">
                            <button key="button"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => deleteMovie(d)}>
                                DELETE
                            </button>
                        </td>
                        <td key="wrapper">
                            <button key="updateButton"
                                    className="px-36 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => passingData(d)}>
                                UPDATE
                            </button>
                        </td>
                    </tr>)}
                </tr>
                </tbody>
            </table>
        </>
    )
}
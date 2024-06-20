
'use client'
import {Dispatch, SetStateAction } from "react"
import { actors, directors } from "../types";
import Navigation from "./Navigation";
import Update from "@/pages/Update";
import { useRouter } from "next/router";
import Link from "next/link";

interface DataProps{
    data: actors[] | directors[] | undefined,
    deletePerson: (d: actors | directors) => void;
}
export default function DisplayData({data, deletePerson}:DataProps) {

    const router = useRouter();
    const updatePage = [
        {href: 'Update', name: "UPDATE"}]
    
    return (
        <>
            <Navigation/>
            <div className="relative mx-60">
                <button
                    className=" absolute top-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded"><Link href="/AddActor">ADD</Link>
                </button>
            </div>
            <table className="my-20">
                <tr className="flex justify-center flex-row">
                    <th className="px-36 py-3 text-xl font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-36 py-3 text-xl font-medium text-gray-500 uppercase ">DOB</th>
                    <th className="px-40 py-3 text-xl font-medium text-gray-500 uppercase ">First name</th>
                    <th className="px-36 py-3 text-xl font-medium text-gray-500 uppercase ">Last name</th>
                    <th className="px-32 py-3"></th>
                    <th className="px-32 py-3"></th>
                </tr>
                <div>{data?.map(d =>
                    <tbody className="bg-white divide-y divide-gray-200">
                    <td key={d.id} className="px-36 py-8 whitespace-nowrap text-xl">{d.id}</td>
                    <td key={d.id} className="px-36 py-8 whitespace-nowrap text-xl">{d.dateOfBirth}</td>
                    <td key={d.id} className="px-36 py-8 whitespace-nowrap text-xl">{d.firstName}</td>
                    <td key={d.id} className="px-36 py-8 whitespace-nowrap text-xl">{d.lastName}</td>
                    <td className="px-10">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => deletePerson(d)}>
                            DELETE
                        </button>
                    </td>
                    <td>
                        <button
                            className="px-36 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                <Link href="/Update">UPDATE</Link> </button>
                        
                    </td>
                    </tbody>)}
                </div>
            </table>
        </>
    )
}
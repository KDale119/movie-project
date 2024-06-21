
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

                <Link href="/AddActor">
                    <button className=" absolute top-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded">
                        ADD
                    </button>
                </Link>
            </div>
            <table  suppressHydrationWarning={true} className="my-20">
                <thead>
                    <tr className="flex justify-center flex-row">
                        <th className="px-36 py-3 text-xl font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-36 py-3 text-xl font-medium text-gray-500 uppercase ">DOB</th>
                        <th className="px-40 py-3 text-xl font-medium text-gray-500 uppercase ">First name</th>
                        <th className="px-36 py-3 text-xl font-medium text-gray-500 uppercase ">Last name</th>
                        <th className="px-32 py-3"></th>
                        <th className="px-32 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                <tr>{data?.map(d =>
                    <tr  key="tr" className="bg-white divide-y divide-gray-200">
                    <td key={d.id} className="px-36 py-8 whitespace-nowrap text-xl">{d.id}</td>
                    <td key={d.dateOfBirth} className="px-36 py-8 whitespace-nowrap text-xl">{d.dateOfBirth}</td>
                    <td key={d.firstName} className="px-36 py-8 whitespace-nowrap text-xl">{d.firstName}</td>
                    <td key={d.lastName} className="px-36 py-8 whitespace-nowrap text-xl">{d.lastName}</td>
                    <td className="px-10" key="deleteButton">
                        <button key="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => deletePerson(d)}>
                            DELETE
                        </button>
                    </td>
                    <td>
                        <Link key= "updateButtonLink" href="/Update">
                            <button key="updateButton" className="px-36 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                UPDATE
                            </button>
                        </Link>
                    </td>
                    </tr>)}
                </tr>
                </tbody>
            </table>
        </>
    )
}
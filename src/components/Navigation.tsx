'use client'
import Link from "next/link";

export default function Navigation(){
    
    const navigation = [
        {href: '/', name: "Home"},
        {href: 'Actors', name: "Actors"},
        {href: 'Directors', name: "Directors"},
        {href: 'Movies', name: "Movies"}

    ]
    return (
        <div>
            {navigation.map((item, index) =>
                <Link key={index} href={item.href} className="text-3xl"> | {item.name} |</Link>)}
            <div className="bg-gray-900 solid"></div>

        </div>
    )
}
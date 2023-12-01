"use client";
import Link from "next/link";

Lars.displayName = "Lars";

export default function Lars() {
    return (
        <div className="pt-5 pl-5">
            <Link className="border-gray-500 border p-2" href='/'>Tilbage</Link>
            <div className="flex min-h-screen flex-col items-center p-24">Lars playground</div>
        </div>
    ) 
}
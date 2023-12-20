"use client";
import React from 'react';

import Link from "next/link";
import App from '../components/App';

Lars.displayName = "Lars";

export default function Lars() {
    return (
        <div className="flex w-full flex-col flex-1 min-h-screen bg-slate-200">
            <div className="grid grid-cols-2">
            <div className="p-5">
                <Link className="border-gray-500 border p-2" href='/'>Tilbage</Link>
            </div>
            <div className="p-5 text-right">Lars playground</div>

            </div>
            <div className="flex w-full flex-1 flex-col items-center">
                <div className="flex flex-1 w-full flex-col bg-slate-400 items-center">
                    {<App />}
                </div>
            </div>
        </div>
    ) 
}
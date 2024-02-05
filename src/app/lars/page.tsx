"use client";
import React, {useEffect, useState} from 'react';

import Link from "next/link";
import App from '@/app/components/App';

const Lars: React.FC = () => {

    return (

        <div className="flex w-full flex-col flex-1 min-h-screen">
            
            <div className="grid grid-cols-2 bg-slate-200">
                <div className="p-5">
                    <Link className="border-gray-500 border p-2" href='/'>Tilbage</Link>
                </div>
                <div className="p-5 text-right">Lars playground</div>
            </div>

            <div className="flex w-full flex-1 flex-col items-center">
                <div className="flex flex-1 w-full flex-col items-center">
                    {<App/>}
                </div>
            </div>
        </div>
   
    )
}

export default Lars;

Lars.displayName = "Lars";

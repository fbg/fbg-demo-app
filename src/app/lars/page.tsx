"use client";
import React, {useEffect, useState} from 'react';

import Link from "next/link";
import App from '@/app/components/App';
import FormTest from '../components/form-test';

const Lars: React.FC = () => {

    const [isVisible, setIsVisible] = useState(true);

    return (

        <div className="flex w-full flex-col flex-1 min-h-screen bg-slate-200">
            
            <div className="grid grid-cols-2">
                <div className="p-5">
                    <Link className="border-gray-500 border p-2" href='/'>Tilbage</Link>
                </div>
                <div className="p-5 text-right">Lars playground</div>

                <FormTest></FormTest>

            </div>

            <button onClick={() => {
                setIsVisible(!isVisible);
            }}>Toggle
            </button>

            {isVisible ? <div className="flex w-full flex-1 flex-col items-center">
                <div className="flex flex-1 w-full flex-col bg-slate-400 items-center">
                    {<App/>}
                </div>
            </div> : <div>Not visible</div>}
        </div>
   
    )
}

export default Lars;

Lars.displayName = "Lars";

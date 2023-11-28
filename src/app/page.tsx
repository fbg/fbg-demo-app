"use client";

import { useState } from "react";
import Headline from "./components/Headline";
import * as Icons from "./icons/Icons";


function Niko() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-col items-center gap-[11px] text-red-500 m-5 p-3 border-blue-300 border rounded-sm shadow-sm">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Welcome to this App</h1>
      <button 
        className="bg-gray-100 py-1 px-5 rounded shadow" 
        onClick={() => setIsVisible(!isVisible)}
      >
        Toggle
      </button>

      {isVisible ? <p>Hello World</p> : null}
    </div>
  );
}

function Thomas() {
  return <div>Thomas</div>;
}

function Lars() {
  return <div>Lars er her</div>;
}

function Anj() {
  return <div>Hr. Jensen er awsome. Nyt batteri tak!!!</div>;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Headline>Hejsa</Headline>

      <Icons.Star color="orange" />

      <Niko />
      <Niko />
      <Niko />
      <Niko />
      <Niko />
      <Niko />
      <Niko />

      <Thomas />
      <Lars />
      <Anj />

      <p>Hejsa</p>
    </main>
  );
}

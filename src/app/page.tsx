"use client";

import { useEffect, useState } from "react";
import Headline from "./components/Headline";
import * as Icons from "./icons/Icons";

function Niko({
  id,
  toggleVisibility,
  isVisible,
}: {
  id: number;
  toggleVisibility: (id: number) => void;
  isVisible: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-[11px] text-red-500 m-5 p-3 border-blue-300 border rounded-sm shadow-sm">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
        Welcome to this App
      </h1>
      <button
        className="bg-gray-100 py-1 px-5 rounded shadow"
        onClick={() => toggleVisibility(id)}
      >
        Toggle
      </button>

      {isVisible ? <p>Hello World</p> : null}
    </div>
  );
}

function Rasmus() {
  return <div className="text-niko">Rasmus</div>
}

function Thomas() {
  return <div>Thomas</div>;
}

function Lars() {
  return <div>Lars er her</div>;
}

function Anj() {
  return <div>Hr. Jensen er awsome. Nyt batteri tak!!! Vi prøver lykken med et nuke batteri</div>;
}

export default function Home() {
  const [visibleNikoId, setVisibleNikoId] = useState<number | null>(null);

  const toggleVisibility = (id: number) => {
    if (visibleNikoId === id) {
      setVisibleNikoId(null);
    } else {
      setVisibleNikoId(id);
    }
  };

  const nikos = [...Array(7)];

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      Hej FBG.

      <Headline>Hejsa</Headline>

      <Thomas />
      <Lars />
      <Anj />
      <Rasmus />

      <ul className="mt-12">
        <li>Navn</li>
        <li>Navn</li>
        <li>Navn</li>
        <li>Navn</li>
      </ul>
    </main>
  );
}

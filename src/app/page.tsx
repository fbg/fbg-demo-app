<<<<<<< Updated upstream
function Niko() {
  return <div className="text-niko">Brok</div>
}

function Thomas() {
  return <div>Thomas</div>
}

function Lars() {
  return <div>Lars er her</div>
}

export default function Home() {
=======
"use client";

import { useEffect, useState } from "react";
import Headline from "./components/Headline";
import Person from "./components/Person";

export default function Home() {
  type person = {
    name: string,
    isPresent: boolean
  }

  const togglePresent = (p: person[], index: number) => {
    let pe = p;
    pe[index].isPresent = !pe[index].isPresent;
    setPersoner(pe);
  };

  const [personer, setPersoner] = useState<person[]>([
    { name: 'Lars', isPresent: false },
    { name: 'Anders', isPresent: false },
    { name: 'Nicolai', isPresent: false },
    { name: 'Rasmus', isPresent: false },
    { name: 'Thomas', isPresent: false },
    { name: 'Kjeldsen', isPresent: false }
  ]);

>>>>>>> Stashed changes
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Headline>FBG Medier</Headline>

<<<<<<< Updated upstream
      <Niko />
      <Niko />
      <Niko />
      <Niko />
      <Niko />
      <Niko />

      <Thomas />
      <Lars />
=======
      {personer.map((p: person, index) => {
        return <Person 
          key={index}
          name={p.name} 
          id={index} 
          toggleTilmeldt={() => togglePresent(personer, index)} 
          erTilmeldt={p.isPresent} 
        />
      })}

      <ul className="mt-12 border-gray-500 border p-12">
        <li>Navn</li>
        <li>Navn</li>
        <li>Navn</li>
        <li>Navn</li>
      </ul>
>>>>>>> Stashed changes
    </main>
  )
}

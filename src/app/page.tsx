"use client";

import { useEffect, useState } from "react";
import Person from "./components/Person";

export default function Home() {
  type person = {
    name: string,
    isPresent: boolean
  }

  const [personer, setPersoner] = useState<person[]>([
    { name: 'Lars', isPresent: false },
    { name: 'Anders', isPresent: false },
    { name: 'Nicolai', isPresent: false },
    { name: 'Rasmus', isPresent: false },
    { name: 'Thomas', isPresent: false },
    { name: 'Kjeldsen', isPresent: false }
  ]);

  const togglePresent = (p: person[], index: number) => {
    let pe = [...p];
    pe[index].isPresent = !pe[index].isPresent;
    setPersoner(pe); 
  };

  const presentPersons = personer.filter(p => p.isPresent);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">

      {personer.map((p, index) => {
        return <Person 
          key={index}
          name={p.name} 
          id={index} 
          toggleTilmeldt={() => togglePresent(personer, index)} 
          erTilmeldt={p.isPresent} 
        />
      })}

      {presentPersons.length > 0 ? <ul className="mt-2 border-gray-500 border p-12">
        {presentPersons.map((p, index) => <li>{p.name}</li>)}
      </ul> : "Der er ingunneren tilmeldte"}
    </main>
  )
}

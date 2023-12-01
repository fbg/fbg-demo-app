"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Person from "./../components/Person";

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
    <>
      <div className="pt-5 pl-5">
        <Link className="border-gray-500 border p-2" href='/'>Tilbage</Link>
      </div>
      <div className="flex min-h-screen flex-col items-center p-24">


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
        </ul> : <div className="border-gray-500 border p-2 mt-10">Der er ingen tilmeldte</div>}
      </div>
    </>
  )
}
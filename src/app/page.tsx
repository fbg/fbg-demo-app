"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {

  const [personer, setPersoner] = useState<person[]>([
    { name: 'Lars', isPresent: false },
    { name: 'Anders', isPresent: false },
    { name: 'Rasmus', isPresent: false },
    { name: 'Thomas', isPresent: false },
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">

      {personer.map((p, index) => {
        return (<div className="flex gap-[5px] m-2 p-3 border-black border rounded-sm shadow-sm">
          <Link href={p.name.toLowerCase()}>{p.name} playground</Link>
        </div>)
      })}

    </main>
  )

}
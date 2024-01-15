"use client";

import Link from "next/link";

export default function Home() {
  const [personer] = Array([
    'Anders',
    'Thomas',
    'Lars',
    'Rasmus',
    'Example',
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">

      {personer.map((name, index) => {
        return (<div key={index} className="flex gap-[5px] m-2 p-3 border-black border rounded-sm shadow-sm">
          <Link href={name.toLowerCase()}>{name} playground</Link>
        </div>)
      })}

    </main>
  )

}

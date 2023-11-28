function Niko() {
  return <div className="text-niko">Brok</div>
}

function Rasmus() {
  return <div className="text-niko">Rasmus</div>
}

function Thomas() {
  return <div>Thomas</div>
}

function Lars() {
  return <div>Lars er her</div>
}

function Anj() {
  return <div>Hr. Jensen er awsome. Nyt batteri tak!!! Vi prøver lykken med et nuke batteri</div>
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      Hej FBG.
      <Rasmus />
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
  )
}

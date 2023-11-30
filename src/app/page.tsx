"use client";

import App from './components/App';


<<<<<<< Updated upstream
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

      

      <ul className="mt-12 border-gray-500 border p-12">
        <li>Navn</li>
        <li>Navn</li>
        <li>Navn</li>
        <li>Navn</li>
      </ul>
    </main>
  );
}
=======
export default () => <App />
>>>>>>> Stashed changes

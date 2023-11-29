import * as Icons from "./../icons/Icons";

const Person = ({ name, id, toggleTilmeldt, erTilmeldt }: { name: string, id: number; toggleTilmeldt: (id: number) => void; erTilmeldt: boolean; }) => {
    return (
        <div className="flex gap-[11px] m-5 p-3 border-black border rounded-sm shadow-sm">
            <h2 className="font-bold">{name}</h2>
            <button onClick={() => toggleTilmeldt(id)}><Icons.Star color={erTilmeldt ? 'yellow' : 'black'} width={25} height={25} /></button>
        </div>
    );
}

export default Person;
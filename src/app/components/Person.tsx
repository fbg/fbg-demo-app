import * as Icons from "./../icons/Icons";

const Person = ({ name, id, toggleTilmeldt, erTilmeldt }: { name: string, id: number; toggleTilmeldt: (id: number) => void; erTilmeldt: boolean; }) => {
    return (
        <div onClick={() => toggleTilmeldt(id)} className="flex gap-[5px] m-2 p-3 border-black border rounded-sm shadow-sm">
            <h2 className="font-bold">{name}</h2>
            <button><Icons.Star color={erTilmeldt ? 'yellow' : 'black'} width={25} height={25} /></button>
        </div>
    );
}

export default Person;
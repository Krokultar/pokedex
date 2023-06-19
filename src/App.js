import { useState } from 'react';
import './App.css';

function App() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [validResponse, setValidResponse] = useState(false);
    const [body, setBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(name);

        setLoading(true);

        try {
            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${name}`
            );

            console.log(res);

            if (res.status === 200) {
                setValidResponse(true);
                const body = await res.json();
                setBody(body);
                console.log(body);
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoading(false);
        }
        /* try {
            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon-species/80`
            );
            console.log(res);
            const body = await res.json();
            console.log('species', body);
        } catch (error) {
            console.log(error);
        }
        try {
            const res = await fetch(
                `https://pokeapi.co/api/v2/evolution-chain/33`
            );
            console.log(res);
            const body = await res.json();
            console.log('evo-chain', body);
        } catch (error) {
            console.log(error);
        } */
    };
    return (
        <div className="App">
            <>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="searchBar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    ></input>
                    <input
                        type="submit"
                        value={'Enviar'}
                        disabled={loading}
                    ></input>
                </form>
                <div hidden={!validResponse}>
                    <p>{`#${body?.id} ${body?.name}`}</p>
                    <img src={body?.sprites?.front_default} />
                    <ul>
                        {body?.stats?.map((stat) => {
                            const statName = stat.stat.name;
                            const statValue = stat.base_stat;
                            return <li>{`${statName}: ${statValue}`}</li>;
                        })}
                    </ul>
                </div>
            </>
        </div>
    );
}

export default App;

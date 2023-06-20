import { useState } from 'react';
import './App.css';

function App() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [validResponse, setValidResponse] = useState(false);
    const [body, setBody] = useState('');
    const [statName, setStatName] = useState([]);
    const [statValue, setStatValue] = useState([]);

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
                const pruebaLng = await body.stats.map(async (stat) => {
                    const prueba = await fetch(stat.stat.url);
                    const bodyPrueba = await prueba.json();
                    console.log('bodyPrueba', bodyPrueba);
                    return bodyPrueba.names.filter(
                        (a) => a.language.name === 'es'
                    )[0].name;
                });
                console.log(pruebaLng);
                console.log('statName', pruebaLng[0]);
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoading(false);
        }
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
                            return (
                                <li
                                    key={statName}
                                >{`${statName}: ${statValue}`}</li>
                            );
                        })}
                    </ul>
                </div>
            </>
        </div>
    );
}

export default App;

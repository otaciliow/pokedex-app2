import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { PokemonCard } from '../../components/PokemonCard';

import { db } from '../../services/firebaseconnection';
import { getDocs, collection, orderBy, query, limit } from 'firebase/firestore';

import { IPokemonsProps } from '../../shared/pokemonsProps.interface';

import slugify from 'slugify';

export function Home() {

    let pokedexInitialLimit = Number(sessionStorage.getItem('@pokedex-app-limit'));
    
    const [pokemonsList, setPokemonsList] = useState<IPokemonsProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonsLimit, setPokemonsLimit] = useState(Number(pokedexInitialLimit));
    
    if (!pokedexInitialLimit) {
        setPokemonsLimit(12);
        sessionStorage.setItem('@pokedex-app-limit', pokemonsLimit.toString());
    }

    useEffect(() => {
        const fetchedPokemon = sessionStorage.getItem('@pokedex-app');

        if (fetchedPokemon) {
            setPokemonsList(JSON.parse(...[fetchedPokemon]));
            setIsLoading(false);
        } else {
            loadPokemons();
        }
        function loadPokemons() {

            const listRef = collection(db, 'Kanto');
            const queryRef = query(listRef, orderBy('id', 'asc'), limit(Number(pokemonsLimit)));
    
            getDocs(queryRef)
            .then((snapshot) => {
                let pokemon = [] as IPokemonsProps[];
    
                snapshot.forEach((doc) => {
                    pokemon.push({
                        id: doc.data().id,
                        nome: doc.data().nome,
                        tipo1: doc.data().tipo1,
                        tipo2: doc.data().tipo2,
                        descricao: doc.data().descricao
                    })
                })
                setPokemonsList(...[pokemon]);
                sessionStorage.setItem('@pokedex-app', JSON.stringify(pokemon));
                sessionStorage.setItem('@pokedex-app-limit', pokemonsLimit.toString());
            })
            .then(() => {
                setIsLoading(false);
            })
        }
    }, [pokemonsLimit])

    function handleLoadMore() {
        sessionStorage.removeItem('@pokedex-app');
        setIsLoading(true);
        setPokemonsLimit(pokemonsLimit + 12);
    }

    return (
        <main className="container">
            <ul className="card-wrapper">
                <div className={`loading-banner${isLoading ? ' visible' : '' }`}></div>
                <h2>Olá! Você encontrará abaixo uma lista com os Pokémons descobertos na região de Kanto! Você pode clicar em seus cards para ver mais informações!</h2>
                    {pokemonsList.map((pokemon) => {
                        return (
                            <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                                <li>
                                <PokemonCard                   
                                    nome={pokemon.nome}
                                    id={pokemon.id} 
                                    tipo1={slugify(`${pokemon.tipo1}`, { lower: true, strict: true })}
                                    tipo2={slugify(`${pokemon.tipo2}`, { lower: true, strict: true })}
                                />
                                </li>
                            </Link>
                        )
                    })}
            </ul>
            { pokemonsLimit < 152 && 
                <button onClick={handleLoadMore}>Ver mais</button>
            }
      </main>
    )
}
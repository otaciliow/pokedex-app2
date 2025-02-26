import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { PokemonCard } from '../../components/PokemonCard';

import { db } from '../../services/firebaseconnection';
import { getDocs, collection, orderBy, query, limit } from 'firebase/firestore';

import { IPokemonsProps } from '../../interfaces/pokemonsProps.interface';

import slugify from 'slugify';
import { LoadingBanner } from '../../components/LoadingBanner';

export function Home() {

    let pokedexInitialLimit = Number(sessionStorage.getItem('@pokedex-app-limit'));
    
    const [pokemonsList, setPokemonsList] = useState<IPokemonsProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonsLimit, setPokemonsLimit] = useState(Number(pokedexInitialLimit));
    
    if (!pokedexInitialLimit) {
        setPokemonsLimit(9);
        sessionStorage.setItem('@pokedex-app-limit', `${pokemonsLimit}`);
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
                sessionStorage.setItem('@pokedex-app-limit', `${pokemonsLimit}`);
            })
            .then(() => {
                setIsLoading(false);
            })
        }
        window.speechSynthesis.cancel();
    }, [pokemonsLimit])

    function handleLoadMore() {
        sessionStorage.removeItem('@pokedex-app');
        setIsLoading(true);
        setPokemonsLimit(pokemonsLimit + 9);
    }

    return (
        <main className="container">
            <h2>Olá! Você encontrará abaixo uma lista com os Pokémons descobertos na região de Kanto! Você pode clicar em seus cards para ver mais informações!</h2>
            <ul className="card-wrapper">
                <LoadingBanner status={isLoading} />
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
                <button className="load-more-button" onClick={handleLoadMore}>Ver mais</button>
            }
      </main>
    )
}
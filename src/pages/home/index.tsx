import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { PokemonCard } from '../../components/PokemonCard';

import { db } from '../../services/firebaseconnection';
import { getDocs, collection, orderBy, query } from 'firebase/firestore';

import slugify from 'slugify';

interface IPokemonsProps {
    id: number;
    nome: string;
    tipo1: string;
    tipo2: string | null;
    descricao: string;
}

export function Home() {

    const [pokemonsList, setPokemonsList] = useState<IPokemonsProps[]>([]);

    useEffect(() => {
        function loadPokemons() {
            const listRef = collection(db, 'Kanto');
            const queryRef = query(listRef, orderBy('id', 'asc'));
    
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
            })

        }
        loadPokemons();
    }, [])

    return (
        <div>
            <ul className="card-wrapper">
                <div className="loading-banner"></div>
                <h2>Olá! Você encontrará abaixo uma lista com os Pokémons descobertos na região de Kanto! Você pode clicar em seus cards para ver mais informações!</h2>
                    {pokemonsList.map((pokemon) => {
                        if (pokemon.id <=12) {

                            return (
                                <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                                    <li>
                                    <PokemonCard                   
                                        pokeNome={pokemon.nome} 
                                        pokeNumero={pokemon.id} 
                                        pokeTipo1={slugify(`${pokemon.tipo1}`, { lower: true, strict: true })}
                                        pokeTipo2={slugify(`${pokemon.tipo2}`, { lower: true, strict: true })}
                                    />
                                    </li>
                                </Link>
                            )

                        }
                    })}
            </ul>
      </div>
    )
}
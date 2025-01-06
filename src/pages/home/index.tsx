import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { db } from '../../services/firebaseconnection';
import { getDocs, collection, orderBy, query } from 'firebase/firestore';


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
        <>
            <h1>Hello Kanto!</h1>
            <ol>
                {pokemonsList.map((pokemon) => (
                    <li>
                        {pokemon.nome}
                    </li>
                ))}
            </ol>
        </>
    )
}
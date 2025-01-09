import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../services/firebaseconnection';

import slugify from 'slugify';

import returnIcon from '../../assets/images/icons/ireturn.svg';
import { IPokemonsProps } from '../../shared/pokemonsProps.interface';

export function Pokemon() {

    const pokemonParams = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const [numeroPokemon, setNumeroPokemon] = useState("");
    const [nomePokemon, setNomePokemon] = useState("");
    const [tipoPokemon1, setTipoPokemon1] = useState("");
    const [tipoPokemon2, setTipoPokemon2] = useState("");
    const [descricaoPokemon, setDescricaoPokemon] = useState("");

    const [nomeTipoSlug1, setNomeTipoSlug1] = useState("");
    const [nomeTipoSlug2, setNomeTipoSlug2] = useState("");
    
    useEffect(() =>{
        const fetchedPokemon = sessionStorage.getItem('@pokedex-app');

        function setPokemonInfos(pokemon: IPokemonsProps) {
            setNumeroPokemon(pokemon.id.toString());
            setNomePokemon(pokemon.nome);
            setTipoPokemon1(pokemon.tipo1);
            setNomeTipoSlug1(slugify(`${pokemon.tipo1}`, { lower: true, strict: true }));
            setTipoPokemon2(pokemon.tipo2 ? pokemon.tipo2 : '');
            setNomeTipoSlug2(slugify(`${pokemon.tipo2}`, { lower: true, strict: true }))
            setDescricaoPokemon(pokemon.descricao ? pokemon.descricao : '');
        }

        if (fetchedPokemon) {
            let pokemons = JSON.parse(fetchedPokemon);
            let targetPokemon: IPokemonsProps =  pokemons.find((obj: IPokemonsProps) => Number(obj.id) === Number(pokemonParams.id));
            setPokemonInfos(targetPokemon);
            setIsLoading(false);
        } else {
            loadPokemon()
        }
        
        function loadPokemon() {
            const docRef = doc(db, 'Kanto', `${pokemonParams.id}`);
            getDoc(docRef)
            .then((snapshot) => {
                if (snapshot.data() !== undefined) {
                    setPokemonInfos(snapshot.data() as IPokemonsProps);
                }
            })
            .catch(e => {
                console.log(`Pokémon não encontrado... Erro: ${e}`)
            })
            setIsLoading(false);
        }
    }, [])

    return (
        <main className="container">
            <div className="pokemon-page-wrapper">
                <div className={`loading-banner${isLoading ? ' visible' : '' }`}></div>
                <div className="pokeDescHeader">
                    <Link to="/">
                        <img src={returnIcon} alt="Ícone de retorno" />
                    </Link>
                    <div className="pokeInfo">
                        <span>{`# ${numeroPokemon}`}</span>
                        <span>{nomePokemon}</span>
                        <div className="pokeTypes">
                        { nomeTipoSlug1 && nomeTipoSlug2 &&
                        <img src={`/images/tipos/${nomeTipoSlug1}.svg`} alt={`Icone de tipo ${nomeTipoSlug1}`} className={`${nomeTipoSlug1}`} />
                        }
                        { (tipoPokemon2 !== '') ? (
                            <img src={`/images/tipos/${nomeTipoSlug2}.svg`} alt={`Icone de tipo ${nomeTipoSlug2}`} className={`${nomeTipoSlug2}`} />
                        ) : (<></>) }
                    </div>
                    </div>
                </div>
                <div className="pokeSprite">
                    <img src={`/images/pokemons/${numeroPokemon}.gif`} alt={`Imagem de um ${nomePokemon}`} />
                </div>
                <div className="pokeTypesNames">
                    <span>Tipo(s):&nbsp;</span>
                    <span>{tipoPokemon1}</span>
                    {(tipoPokemon2 !== '') ? (
                        <span> / {tipoPokemon2}</span>
                    ) : (<></>)}
                </div>
                <div className="pokeDescription">
                    <p>{descricaoPokemon}</p>
                </div>
            </div>
        </main>
    )
}
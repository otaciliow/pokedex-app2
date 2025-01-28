import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../services/firebaseconnection';

import slugify from 'slugify';

import returnIcon from '../../assets/images/icons/ireturn.svg';
import { IPokemonsProps } from '../../interfaces/pokemonsProps.interface';
import { LoadingBanner } from '../../components/LoadingBanner';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { AiFillSound } from "react-icons/ai";

export function Pokemon() {

    const pokemonParams = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const [targetPokemon, setTargetPokemon] = useState<IPokemonsProps>();

    const [allowPrevNavigation, setAllowPrevNavigation] = useState(true);
    const [allowNextNavigation, setAllowNextNavigation] = useState(true);
    
    useEffect(() =>{
        const fetchedPokemon = sessionStorage.getItem('@pokedex-app');

        function setPokemonInfos(pokemon: IPokemonsProps) {

            setTargetPokemon({
                id: pokemon.id,
                nome: pokemon.nome,
                tipo1: pokemon.tipo1,
                tipo2: pokemon.tipo2,
                descricao: pokemon.descricao
            });

            
            setIsLoading(false);
        }

        function loadPokemon() {
            const docRef = doc(db, 'Kanto', `${pokemonParams.id}`);
            getDoc(docRef)
            .then((snapshot) => {
                if (snapshot.data() !== undefined) {
                    setPokemonInfos(snapshot.data() as IPokemonsProps);
                }
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`Pokémon não encontrado... Erro: ${e}`)
            })
        }

        if (fetchedPokemon) {
            let pokemons = JSON.parse(fetchedPokemon);
            let targetPokemon: IPokemonsProps =  pokemons.find((obj: IPokemonsProps) => Number(obj.id) === Number(pokemonParams.id));

            targetPokemon ? setPokemonInfos(targetPokemon) : loadPokemon();
        } else {
            loadPokemon()
        }
        

        Number(pokemonParams.id) <= 1 ? setAllowPrevNavigation(false) : setAllowPrevNavigation(true);
        Number(pokemonParams.id) >= 151 ? setAllowNextNavigation(false) : setAllowNextNavigation(true);
        
        window.speechSynthesis.cancel();
        
    }, [pokemonParams]);
    
    function handleSpeakText() {
        const utterance = new SpeechSynthesisUtterance(targetPokemon?.descricao);
        utterance.lang = "pt-BR";
        utterance.rate = 3;
        utterance.pitch = 0.1;
        utterance.volume = 0.5;

        window.speechSynthesis.speak(utterance);
    }

    function handleSlug(text: string) {
        const slug = slugify(`${text}`, { lower: true, strict: true });

        return slug;
    }

    return (
        <main className="container">
            <div className="pokemon-page-wrapper">
                <LoadingBanner status={isLoading} />
                { targetPokemon ? (
                    <>
                        <div className="pokeDescHeader">
                            <Link to="/" className="return-button">
                                <img src={returnIcon} alt="Ícone de retorno" />
                                <span>Voltar</span>
                            </Link>
                            <div className="pokeInfo">
                                <span>{`# ${targetPokemon.id}`}</span>
                                <span>{targetPokemon.nome}</span>
                                <div className="pokeTypes">
                                { targetPokemon.tipo1 &&
                                <img src={`/images/tipos/${handleSlug(targetPokemon.tipo1)}.svg`} alt={`Icone de tipo ${handleSlug(targetPokemon.tipo1)}`} className={`${handleSlug(targetPokemon.tipo1)}`} />
                                }
                                { (targetPokemon.tipo2 !== null) ? (
                                    <img src={`/images/tipos/${handleSlug(targetPokemon.tipo2)}.svg`} alt={`Icone de tipo ${handleSlug(targetPokemon.tipo2)}`} className={`${handleSlug(targetPokemon.tipo2)}`} />
                                ) : (<></>) }
                            </div>
                            </div>
                        </div>
                        <div className="pokeSprite">

                            <Link to={`/pokemon/${Number(targetPokemon.id)-1}`} style={{ pointerEvents: !allowPrevNavigation ? 'none' : 'auto', opacity: !allowPrevNavigation ? 0.7 : 1 }}>
                                <FaAngleLeft size={32} color="#fff" />
                            </Link>

                            <img src={`/images/pokemons/${targetPokemon.id}.gif`} alt={`Imagem de um ${targetPokemon.nome}`} />

                            <Link to={`/pokemon/${Number(targetPokemon.id)+1}`} style={{ pointerEvents: !allowNextNavigation ? 'none' : 'auto', opacity: !allowNextNavigation ? 0.7 : 1 }} >
                                <FaAngleRight size={32} color="#fff" />
                            </Link>

                        </div>
                        <div className="pokeTypesNames">
                            <span>Tipo(s):&nbsp;</span>
                            <span>{targetPokemon.tipo1}</span>
                            {(targetPokemon.tipo2 !== null) ? (
                                <span> / {targetPokemon.tipo2}</span>
                            ) : (<></>)}
                        </div>
                        <div className="pokeDescription">
                            { targetPokemon.descricao !== '' && (
                                <button onClick={handleSpeakText}>
                                    <AiFillSound size={16} color="#FFF" />
                                </button>
                            )}
                            <p>{targetPokemon.descricao}</p>
                        </div>
                    </>
                ) : (
                    <div className="pokemon-page-wrapper">
                        <h1 className="page-title">Ops, parece que esse pokémon ainda não foi registrado!</h1>
                        <Link to="/" className="error-return-button">
                            Voltar para a página inicial
                        </Link>
                    </div>
                ) }
            </div>
        </main>
    )
}
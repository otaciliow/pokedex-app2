import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../services/firebaseconnection';

import slugify from 'slugify';

import returnIcon from '../../assets/images/icons/ireturn.svg';

import venusaurImg from '../../assets/images/pokemons/1.gif'
import grassIcon from '../../assets/images/tipos/grama.svg';
import poisonIcon from '../../assets/images/tipos/venenoso.svg';

export function Pokemon() {

    const pokemonParams = useParams();

    const [numeroPokemon, setNumeroPokemon] = useState("");
    const [nomePokemon, setNomePokemon] = useState("");
    const [tipoPokemon1, setTipoPokemon1] = useState("");
    const [tipoPokemon2, setTipoPokemon2] = useState("");
    const [descricaoPokemon, setDescricaoPokemon] = useState("");
    
    useEffect(() =>{
        function loadPokemon() {
            const docRef = doc(db, 'Kanto', `${pokemonParams.id}`);
            getDoc(docRef)
            .then((snapshot) => {
                if (snapshot.data() !== undefined) {
                    setNumeroPokemon(snapshot.data()?.id);
                    setNomePokemon(snapshot.data()?.nome);
                    setTipoPokemon1(snapshot.data()?.tipo1);
                    setTipoPokemon2(snapshot.data()?.tipo2);
                    setDescricaoPokemon(snapshot.data()?.descricao);
                }
            })
            .catch(e => {
                console.log(`Pokémon não encontrado... Erro: ${e}`)
            })

        }
        loadPokemon()
    }, [])

    return (
        <main className="container">
            <div className="pokemon-page-wrapper">
                <div className="loading-banner"></div>
                <div className="pokeDescHeader">
                    <Link to="/">
                        <img src={returnIcon} alt="Ícone de retorno" />
                    </Link>
                    <div className="pokeInfo">
                        <span>{`# ${numeroPokemon}`}</span>
                        <span>{nomePokemon}</span>
                        <div className="pokeTypes">
                        {/* <img src={`./assets/images/tipos/${slugify(`${tipoPokemon1}`, { lower: true, strict: true })}.svg`} alt={`Icone de tipo ${slugify(`${tipoPokemon1}`, { lower: true, strict: true })}`} className={slugify(`${tipoPokemon1}`, { lower: true, strict: true })} /> */}
                        <img src={grassIcon} alt={`Icone de tipo ${slugify(`${tipoPokemon1}`, { lower: true, strict: true })}`} className={slugify(`${tipoPokemon1}`, { lower: true, strict: true })} />
                        {(tipoPokemon2 !== null) ? (
                            // <img src={`./assets/images/tipos/${slugify(`${tipoPokemon2}`, { lower: true, strict: true })}.svg`} alt={`Icone de tipo ${slugify(`${tipoPokemon2}`, { lower: true, strict: true })}`} className={slugify(`${tipoPokemon2}`, { lower: true, strict: true })} />
                            <img src={poisonIcon} alt={`Icone de tipo ${slugify(`${tipoPokemon2}`, { lower: true, strict: true })}`} className={slugify(`${tipoPokemon2}`, { lower: true, strict: true })} />
                        ) : (
                        <></>
                        )}
                    </div>
                    </div>
                </div>
                <div className="pokeSprite">
                    {/* <img src={`./assets/images/pokemons/${numeroPokemon}.gif`} alt={`Imagem de um ${nomePokemon}`} /> */}
                    <img src={venusaurImg} alt={`Imagem de um ${nomePokemon}`} />
                </div>
                <div className="pokeTypesNames">
                    <span>Tipo(s):&nbsp;</span>
                    <span>{tipoPokemon1}</span>
                    {(tipoPokemon2 !== null) ? (
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
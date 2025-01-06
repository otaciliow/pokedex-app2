export function PokemonCard(props) {
    
    const pokemon = props.pokeNome;
    const pokeNum = props.pokeNumero;
    const pokeType1 = props.pokeTipo1;
    const pokeType2 = props.pokeTipo2;

        return(            
        <div className={`poke-wrapper ${pokeType1}`}>
            <img src={`./assets/images/pokemons/${pokeNum}.gif`} alt={`Imagem de um ${pokemon}`} />
            <div className="pokeInfos">
                <span>{pokemon}</span>
                <div className="pokeTypes">
                    <img src={`./assets/images/tipos/${pokeType1}.svg`} alt={`Icone de tipo ${pokeType1}`} className={pokeType1} />
                    {(pokeType2 !== 'null') ? (
                        <img src={`./assets/images/tipos/${pokeType2}.svg`} alt={`Icone de tipo ${pokeType2}`} className={pokeType2} />
                    ) : (
                    <></>
                    )}
                    <span className="poke-num-fixed">{`# ${pokeNum}`}</span>
                    <div className="pokeball-bg"></div>
                </div>
            </div>
        </div>
    )
}
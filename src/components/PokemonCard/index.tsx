import { IPokemonsProps } from "../../shared/pokemonsProps.interface";

export function PokemonCard(props: IPokemonsProps) {
    
    const pokemon = props.nome;
    const pokeNum = props.id;
    const pokeTipo1 = props.tipo1;
    const pokeTipo2 = props.tipo2;

        return(            
        <div className={`poke-wrapper ${pokeTipo1}`}>
            <img src={`../../assets/images/pokemons/${pokeNum}.gif`} alt={`Imagem de um ${pokemon}`} />
            <div className="pokeInfos">
                <span>{pokemon}</span>
                <div className="pokeTypes">
                    <img src={`../../assets/images/tipos/${pokeTipo1}.svg`} alt={`Icone de tipo ${pokeTipo1}`} className={`${pokeTipo1}`} />
                    {pokeTipo2 !== "null" && (
                            <img src={`../../assets/images/tipos/${pokeTipo2}.svg`} alt={`Icone de tipo ${pokeTipo2}`} className={`${pokeTipo2}`} />
                        )
                    }
                    <span className="poke-num-fixed">{`# ${pokeNum}`}</span>
                    <div className="pokeball-bg"></div>
                </div>
            </div>
        </div>
    )
}
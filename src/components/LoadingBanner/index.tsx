import slowpokeLoading from '../../assets/images/slowpoke-loading.gif';

interface IisLoading {
    status: boolean;
}

export function LoadingBanner(props: IisLoading) {
    return (
        <div className={`loading-banner${props.status ? ' visible' : ''}`}>
            <img src={slowpokeLoading} alt="Imagem de um slowpoke com círculo em sua cabeça" />
        </div>
    )
}
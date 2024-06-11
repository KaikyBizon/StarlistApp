import { HeaderLp } from '../components/LandingPage/HeaderLp'
import { Principal } from '../components/LandingPage/Principal';
import { Conheca } from '../components/LandingPage/Conheca';
import { SobreNos } from '../components/LandingPage/SobreNos';
import { Avaliacao } from '../components/LandingPage/Avaliacao';
import { Planos } from '../components/LandingPage/Planos';
import { CadastroSecundario } from '../components/LandingPage/CadastroSecundario';
import { Suporte } from '../components/LandingPage/Suporte';
import { Rodape } from '../components/LandingPage/Rodape';

function Home() {
    return (
        <>
            <HeaderLp />
            <Principal />
            <Conheca />
            <SobreNos />
            <Avaliacao />
            <Planos />
            <CadastroSecundario />
            <Suporte />
            <Rodape />
        </>
    )
}

export { Home }
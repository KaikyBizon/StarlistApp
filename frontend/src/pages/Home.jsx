import { HeaderLp } from '../components/HeaderLp'
import { Principal } from '../components/Principal';
import { Conheca } from '../components/Conheca';
import { SobreNos } from '../components/SobreNos';
import { Avaliacao } from '../components/Avaliacao';
import { Planos } from '../components/Planos';
import { CadastroSegundario } from '../components/CadastroSegundario';
import { Suporte } from '../components/Suporte';
import { Rodape } from '../components/Rodape';

function Home() {
    return (
        <>
            <HeaderLp />
            <Principal />
            <Conheca />
            <SobreNos />
            <Avaliacao />
            <Planos />
            <CadastroSegundario />
            <Suporte />
            <Rodape />
        </>
    )
}

export { Home }
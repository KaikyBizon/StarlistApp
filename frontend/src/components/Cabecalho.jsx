/*Nome do componente: Cabecalho
Autor: Nathan de Oliveira Costa
Data de criação: 27/08/2024
Descrição: Esse componente engloba os componentes Menu e Options, responsáveis por nosso cabeçalho geral.
Observações pertinentes: O motivo da criação desse componente foi para uma melhor manipulção do nosso Header*/


import Menu from '../components/Menu';
import Options from '../components/Options';
import '../StylesPages/Cabecalho.css'

function Cabecalho() {
    return (
        <>
            <div id='cabecalho'>
                <Menu />
                <Options />
            </div>

        </>
    )
}

export default Cabecalho;
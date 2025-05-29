/**
 * Nome do Componente: CadastroSecundario
 *
 * Descrição Detalhada:
 *   O componente funcional `CadastroSecundario` apresenta uma seção de 
 *   cadastro secundário na Landing Page. O objetivo principal é incentivar 
 *   o usuário a se inscrever em um grupo após conhecer os recursos ou 
 *   informações da aplicação.
 *
 * Estrutura JSX:
 *   - O componente é envolvido por uma seção `<section className="cadastro">`, 
 *     que contém uma imagem, um título e um formulário com um botão de cadastro.
 *
 */

import { Link } from 'react-router-dom';
import '../LandingPage/CadastroSecundario.css'
function CadastroSecundario(){
    return(
        <section className="cadastro">


            <div className="cadastro2">
                <h1 id="cad-txt">Pronto para transformar sua rotina?<br/> Junte-se a nós e comece agora mesmo.</h1>
            </div>
            <form className="botao">
                <input type="hidden" name="acao"/>
                <Link to="/cadastro">
                    <div className="submit_btn">
                        <span> Cadastre-se agora</span>
                    </div>
                </Link>
            </form>

        </section>
    )
}

export { CadastroSecundario };
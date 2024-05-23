import { Link } from 'react-router-dom';
import '../components/CadastroSecundario.css'
function CadastroSegundario(){
    return(
        <>
           <section className="cadastro">
        <img src="" alt=""/>


        <div className="cadastro2">
            <h1 id="cad-txt">Agora que você<br/>já conheceu tudo<br/> venha fazer parte<br/> do nosso grupo</h1>
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
        </>
    )
}

export { CadastroSegundario };
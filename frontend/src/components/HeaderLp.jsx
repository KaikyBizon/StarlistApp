import '../App.css'
import '../components/HeaderLp.css'
import { Link } from 'react-router-dom';
function HeaderLp() {
    return (
        <>

            <header className="cabeca">
                <div>
                    <img id="logo" src="/public/images/logo_starlist.png" alt="starefinha" />
                </div>

                {/*Itens do Menu*/}
                <ul>
                    <a href="#sobre">
                        <li className="itn-menu">Sobre</li>
                    </a>
                    <a href="#suporte">
                        <li className="itn-menu">Suporte</li>
                    </a>
                    <a href="#avl">
                        <li className="itn-menu">Avaliações</li>
                    </a>
                    <Link to="/login" id="login-btn">
                        <li className="itn-menu">Login</li>
                    </Link>
                    <Link to="/cadastro" id="cadastro-btn">
                        <li className="itn-menu1">Cadastre-se</li>
                    </Link>
                </ul>
            </header>
        </>
    )
}

export { HeaderLp };
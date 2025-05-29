import './Principal.css';
import { Link } from 'react-router-dom';
import { motion } from "motion/react"

function Principal() {
    return (
        <div className='container-hero'>
            {/* Cabeçalho com Navegação */}
            <header className="menu-home">
                <div className="cabeca">
                    <Link to="/" style={{ height: "100%" }}>
                        <img id="logo" src="../public/images/logo.png" alt="Logo Starlist" />
                    </Link>

                    {/* Menu de Navegação */}
                    <nav>
                        <ul className="main-menu">
                            <li><a href="#sobre" className="itn-menu">Sobre</a></li>
                            <li><a href="#suporte" className="itn-menu">Suporte</a></li>
                            <li><a href="#avl" className="itn-menu">Avaliações</a></li>
                            <li><Link to="/login" id="login-btn" className="itn-menu">Login</Link></li>
                            <li><Link to="/cadastro" id="cadastro-btn">Cadastre-se</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Seção Principal */}
            <motion.main className="hero" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <article className="text-intro">
                    <h1 className="txt-1"><span>Sua Vida Organizada</span></h1>
                    <h1 className="txt-1">Em Um Único</h1>
                    <h1 className="txt-1">APP!</h1>
                </article>

                {/* Botões Login e Cadastro (agora ficam aqui no mobile) */}
                <div className="buttons-container">
                    <Link to="/login" id="login-btn">Login</Link>
                    <Link to="/cadastro" id="cadastro-btn">Cadastre-se</Link>
                </div>

                
                <div className="img-hero">
                    <img src="../../assets/Calendar-hero.svg" alt="Imagem calendário" />
                </div>
            </motion.main>
        </div>
    );
}

export { Principal };

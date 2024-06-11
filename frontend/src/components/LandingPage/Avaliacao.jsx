import './Avaliacao.css'
function Avaliacao() {
    return (
        <>
            <section id="avl">
                <div className="av">
                    <h1 className="titulo">AVALIAÇÕES</h1>
                    <div className="avl-geral">


                        <div className="avaliações">
                            <div className="nome">
                                <img src="/public/images/user.png" className="usuário" alt="" />
                                <h3 className='nome-usuario'>Júnior Santos</h3>
                                <img id="estrela" src="/public/images/5estrelas.png" alt="5estrela" />
                            </div>

                            <p className="mensagem-avl">O site é muito fácil de usar, e muito prático, minha rotina ficou muito mais
                                organizada</p>
                        </div>

                        <div className="avaliações">
                            <div className="nome">
                                <img src="/public/images/user.png" className="usuário" alt="" />
                                <h3 className='nome-usuario'>Flávio Castro</h3>
                                <img id="estrela" src="/public/images/5estrelas.png" alt="5estrela" />
                            </div>

                            <p className="mensagem-avl">A aba de usuário é totalmente reinventada e facilita na hora de ver os
                                afazeres, depois de começar a usar aumentei minha produtividade</p>
                        </div>

                        <div className="avaliações">
                            <div className="nome">
                                <img src="/public/images/user.png" className="usuário" alt="" />
                                <h3 className='nome-usuario'>Arthur Souza</h3>
                                <img id="estrela" src="/public/images/4estrelas.png" alt="4estrela" />
                            </div>

                            <p className="mensagem-avl">Consegui me organizar melhor usando essa lista de tarefas, meu dia fica mais
                                organizado</p>
                        </div>

                        <div className="avaliações">
                            <div className="nome">
                                <img src="/public/images/user.png" className="usuário" alt="" />
                                <h3 className='nome-usuario'>Gabriel Macedo</h3>
                                <img id="estrela" src="/public/images/5estrelas.png" alt="5estrela" />
                            </div>

                            <p className="mensagem-avl">Superou nossas expectativas, e cumpriu o que prometeu</p>
                        </div>



                    </div>
                </div>
            </section>
        </>
    )
}

export { Avaliacao };
/**
 * Nome do Componente: Avaliacao
 *
 * Descrição Detalhada:
 *   O componente funcional `Avaliacao` exibe uma seção de depoimentos e avaliações
 *   de usuários sobre um serviço ou produto. Ele apresenta uma nota geral, uma
 *   distribuição de notas detalhada e uma lista de depoimentos de usuários.
 *
 * Estrutura JSX:
 *   - O componente é organizado em uma estrutura HTML que inclui um título, uma
 *     caixa de nota geral e uma seção de depoimentos.
 *
 */

import './Avaliacao.css'
function Avaliacao() {
    return (
        <>
            <section id="avl">
                <div className="main-content">
                    <div className="general-rating">
                        <div className="rating-box">
                            <h2>NOTA GERAL</h2>

                            <div className="score">
                                <span className="rating-number">4.9</span>
                                <span className="stars">★★★★★</span>
                            </div>
                        </div>


                        <div className='rating-details'>
                            <h3>NOTAS</h3>
                            <div className='notas'>
                                <div className='valor'>5.0</div>
                                <img className='nota-estrelas' src="/public/images/5estrelas.png" alt="" />
                                <p className='porcentagem'>91%</p>
                            </div>
                            <div className='notas'>
                                <div className='valor'>4.0</div>
                                <img className='nota-estrelas' src="/public/images/4estrelas.png" alt="" />
                                <p className='porcentagem'>8%</p>
                            </div>
                            <div className='notas'>
                                <div className='valor'>3.0</div>
                                <img className='nota-estrelas' src="/public/images/3estrelas.png" alt="" />
                                <p className='porcentagem'>1%</p>
                            </div>
                            <div className='notas'>
                                <div className='valor'>2.0</div>
                                <img className='nota-estrelas' src="/public/images/2estrelas.png" alt="" />
                                <p className='porcentagem'>0%</p>
                            </div>
                            <div className='notas'>
                                <div className='valor'>1.0</div>
                                <img className='nota-estrelas' src="/public/images/1estrela.png" alt="" />
                                <p className='porcentagem'>0%</p>
                            </div>
                        </div>
                    </div>

                    <div className="linha-separadora"></div>

                    <div className="testimonials">
                        <div className="testimonial-box">
                            <div className="header-box">
                                <h3 className='nome-usuario'>Gabriel Macedo</h3>
                                <img className='estrelas' src="/public/images/5estrelas.png" alt="" />
                            </div>
                            <p className="mensagem-avl">Superou nossas expectativas, e cumpriu o que prometeu</p>
                        </div>
                        <div className="testimonial-box">
                            <div className="header-box">
                                <h3 className='nome-usuario'>Arthur Souza</h3>
                                <img className='estrelas' src="/public/images/5estrelas.png" alt="" />
                            </div>
                            <p className="mensagem-avl">Consegui me organizar melhor usando essa lista de tarefas, meu dia fica mais organizado</p>
                        </div>
                        <div className="testimonial-box">
                            <div className="header-box">
                                <h3 className='nome-usuario'>Flávio Castro</h3>
                                <img className='quatro_estrelas' src="/public/images/4estrelas.png" alt="" />
                            </div>
                            <p className="mensagem-avl">A aba de usuário é totalmente reinventada e facilita na hora de ver os afazeres, depois de começar a usar aumentei minha produtividade</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export { Avaliacao };
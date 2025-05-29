/**
 * Nome do Componente: Rodape
 *
 * Descrição Detalhada:
 *   O componente funcional `Rodape` representa o rodapé da aplicação,
 *   fornecendo informações relevantes, links e ícones de contato para
 *   os usuários. Este componente é ideal para melhorar a navegação
 *   e a acessibilidade, conectando os usuários a recursos importantes
 *   e a comunidade.
 *
 * Estrutura JSX:
 *   - O componente é encapsulado em um `<footer>` com a classe `rodape-3`,
 *     indicando que é uma seção de rodapé.
 *
 */

import './Rodape.css'

function Rodape() {
    return (
        <>
            <footer className="rodape-background">
                <div className="container-rodape">
                    <div className="rodape-5">
                        <p>Junte-se à nossa comunidade</p>
                        <p>Planeje do seu jeito, no seu ritmo!</p>
                    </div>



                    <div className="rodape-4">
                        <div className="para você">
                            <h3>Para Você</h3>
                        </div>

                        <div className="rodape-1">
                            <a href="#avl">
                                <p>Avaliações</p>
                            </a>
                            <a href="#suporte">
                                <p>Ajuda</p>
                            </a>
                        </div>
                    </div>

                    <div className="contato">
                        <h3>Contatos</h3>

                        <div className="rodape-2">
                            <a href="https://www.whatsapp.com/?lang=pt_br" target="_blank">
                                <img className='redes-sociais' src="/images/whatsapp.png" alt="whatsapp" />
                            </a>

                            <a href="https://www.instagram.com" target="_blank">
                                <img className='redes-sociais' src="/images/instagram.png" alt="instagram" />
                            </a>

                            <a href="https://pt-br.facebook.com" target="_blank">
                                <img className='redes-sociais' src="/images/facebook.png" alt="facebook" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export { Rodape };
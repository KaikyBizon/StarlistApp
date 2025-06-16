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

import './Footer.css'

export default function Footer() {
    return (
        <>
            <footer className="background-footer">
                <div className="container-footer">
                    <div>
                        <p>Junte-se à nossa comunidade. <br />
                        Planeje do seu jeito, no seu ritmo!</p>
                    </div>

                    <div className="contato">
                        <h3>Contatos</h3>

                        <div className="social-medias">
                            <a href="https://www.whatsapp.com/?lang=pt_br" target="_blank">
                                <img className='socialmedias-icon' src="/images/whatsapp.png" alt="whatsapp" />
                            </a>

                            <a href="https://www.instagram.com" target="_blank">
                                <img className='socialmedias-icon' src="/images/instagram.png" alt="instagram" />
                            </a>

                            <a href="https://pt-br.facebook.com" target="_blank">
                                <img className='socialmedias-icon' src="/images/facebook.png" alt="facebook" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}
/**
 * Nome do Componente: Conheca
 *
 * Descrição Detalhada:
 *   O componente funcional `Conheca` apresenta uma seção na página que
 *   destaca as principais características e benefícios do serviço ou produto
 *   oferecido. A seção é organizada em um layout de grade que inclui cards
 *   com títulos, descrições e imagens para cada benefício.
 *
 * Estrutura JSX:
 *   - O componente é encapsulado por uma `<section>` com o ID `conhecer`, que
 *     inclui um título principal e uma grade de cards.
 *
 */

import './Conheca.css'
function Conheca() {
    return (
        <>
        
            <section id="conhecer">
                <h1>CONHEÇA-NOS</h1>
                
                <div className="conhecer-grid">
                    <div className="conhecer-cards">
                        <h2>Suporte</h2>
                        <p className="explicação">Ajuda e suporte 24h para auxiliar nas suas dúvidas e problemas.</p>
                        <img className="img-conhecer" src="/public/images/Active Support-bro.png" alt="" />
                    </div>

                    <div className="conhecer-cards">
                        <h2>Usabilidade</h2>
                        <p className="explicação"> Tem um design simples que ajuda na visualização
                            das tarefas e faz com que o usuario tenha uma experiencia rapida e pratica.
                        </p>
                        <img className="img-conhecer" src="/public/images/Search engines-bro.png" alt="" />
                    </div>

                    <div className="conhecer-cards">
                        <h2>Utilidades</h2>
                        <p className="explicação">Te ajuda a planejar, organizar e gerenciar as suas ideias com
                            o principal foco em te ajudar a aproveitar melhor seu tempo. </p>
                        <img className="img-conhecer" src="/public/images/To do list-bro.png" alt="" />
                    </div>

                    <div className="conhecer-cards">
                        <h2>Segurança</h2>
                        <p className="explicação">Seus planejamentos e dados protegidos com total segurança.</p>
                        <img className="img-conhecer" src="/public/images/Security On-bro.png" alt="" />
                    </div>


                </div>
            </section>

        </>
    )
}

export { Conheca };
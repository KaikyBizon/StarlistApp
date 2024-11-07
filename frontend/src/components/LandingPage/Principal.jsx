/**
 * Nome do Componente: Principal
 *
 * Descrição Detalhada:
 *   O componente funcional `Principal` serve como a seção principal da
 *   página inicial (Landing Page), apresentando uma introdução que destaca
 *   o propósito do aplicativo, que é ajudar os usuários a organizar suas vidas
 *   de forma eficaz. O componente é construído utilizando elementos semânticos
 *   para garantir acessibilidade e SEO.
 *
 * Estrutura JSX:
 *   - O componente é encapsulado em uma `<main>` com a classe `pg-1`.
 *
 */

import './Principal.css'
function Principal() {
    return (
        <>
            <main className="pg-1">
                {/*Texto da introdução*/}
                <article className="text-intro">
                    <h1 className="txt-1"><span>Sua Vida Organizada</span></h1>
                    <h1 className="txt-1">Em Um Único</h1>
                    <h1 className="txt-1">APP!</h1>
                </article>
                {/*imagem da introdução*/}

            </main>
        </>
    )
}

export { Principal };
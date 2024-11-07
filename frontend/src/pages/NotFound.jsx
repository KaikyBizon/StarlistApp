/**
 * Nome do Componente: NotFound
 *
 * Descrição Detalhada:
 *   Componente funcional que representa uma página de erro 404.
 *   Exibe uma mensagem quando o usuário tenta acessar uma página que não existe.
 *
 * Estrutura e Funcionamento:
 *   - Renderiza um título "404" e uma mensagem informativa.
 *   - É utilizado para melhorar a experiência do usuário, informando que a página desejada não foi encontrada.
 *
 * Observações Pertinentes:
 *   1. Pode ser estilizado conforme necessário para se integrar ao tema geral da aplicação.
 *   2. Pode ser expandido com um link para retornar à página inicial ou outras seções úteis do site.
 */

import React from "react";

const NotFound = props =>(
    <div className="NotFound">
        <h1>404</h1>
        <h2>Eita. Não encontramos essa página!!!</h2>
    </div>
)

export default NotFound
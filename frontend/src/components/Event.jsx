/**
 * Nome do Componente: Event
 *
 * Descrição Detalhada:
 *   Componente funcional React que representa um evento em uma interface.
 *   Recebe uma propriedade chamada `title`, que é utilizada para exibir o nome do evento.
 *
 * Observações Pertinentes:
 *   1. O componente é bastante simples e se concentra em renderizar
 *      apenas o título do evento dentro de uma div.
 *   2. A classe CSS 'event' é aplicada para possibilitar a estilização do evento.
 *
 * Estrutura JSX:
 *   - Uma única div que contém o título do evento.
 *
 * Parâmetros de Entrada:
 *   - `title` (string): O título do evento a ser exibido.
 *
 * Estilo e Estrutura:
 *   - O componente utiliza a classe CSS 'event', que deve ser definida em um arquivo
 *     CSS externo para estilizar a apresentação do evento.
 *
 */

import React from 'react';

const Event = ({ title }) => {
  return <div className="event">{title}</div>;
};

export default Event;
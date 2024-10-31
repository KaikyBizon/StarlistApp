/**
 * Nome do Componente: BarraProgresso
 *
 * Descrição Detalhada:
 *   Componente funcional React que renderiza uma barra de progresso utilizando o componente
 *   ProgressBar do pacote react-bootstrap. A barra de progresso é configurada para mostrar um
 *   valor atual de 60%, indicando o progresso de uma tarefa ou operação.
 *
 * Observações Pertinentes:
 *   1. A barra de progresso é estilizada pelo pacote react-bootstrap, que fornece estilos
 *      pré-definidos e responsivos.
 *   2. O valor da propriedade 'now' pode ser alterado para refletir o progresso real em outras
 *      partes do aplicativo.
 *
 * Estrutura JSX:
 *   - Renderiza um componente ProgressBar com o valor atual definido como 60%.
 *
 */

import ProgressBar from 'react-bootstrap/ProgressBar';

function Progresso() {
  return <ProgressBar now={60} />;
}

export default Progresso; 
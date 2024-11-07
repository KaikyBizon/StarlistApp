/**
 * Nome do Componente: Tabela
 *
 * Descrição Detalhada:
 *   O componente funcional `Tabela` renderiza uma tabela utilizando o componente `Table` do React Bootstrap.
 *   Ele exibe informações sobre tarefas, incluindo seu status, descrição, time responsável e progresso.
 *   A tabela utiliza um estilo visual adequado para uma melhor legibilidade e experiência do usuário.
 *
 * Estrutura JSX:
 *   - O componente consiste em uma estrutura de tabela que é composta por um cabeçalho (`thead`) e um corpo (`tbody`).
 *   - Cada linha do corpo da tabela representa uma tarefa específica com suas respectivas informações.
 *
 * Elementos Principais:
 *   - `Table`: Componente principal que encapsula a tabela.
 *   - `thead`: Contém os cabeçalhos das colunas, que são "Tarefas", "Status", "Sobre", "Time" e "Progresso".
 *   - `tbody`: Contém múltiplas linhas (`tr`), cada uma representando uma tarefa, com células (`td`) que armazenam os dados.
 *   - `Progresso`: Um componente separado que é usado na coluna de progresso para exibir visualmente o estado de conclusão da tarefa.
 *
 * Estilos:
 *   - A tabela é estilizada através de classes CSS definidas em um arquivo separado ('Tabela.css').
 *   - As classes `tcabeca` e `txt-cabeca` são aplicadas aos cabeçalhos para estilização, e `linha-tabela` é aplicada às células do corpo da tabela.
 *
 * Notas Importantes:
 *   - No momento, a tabela contém linhas de exemplo com dados estáticos. Para um uso mais dinâmico, 
 *     seria benéfico integrar dados provenientes de um estado ou de um backend.
 *   - O componente `Progresso` deve ser implementado de maneira que reflita corretamente o progresso das tarefas, 
 *     possivelmente utilizando props para receber dados dinâmicos.
 *
 */

import Table from 'react-bootstrap/Table';
import Progresso from './BarraProgresso';
import '../StylesPages/Tabela.css'

function Tabela() {
  return (
    <div className="tabela">
      <Table hover>
        <thead className='tcabeca' >
          <tr>
            <th className='txt-cabeca'>Tarefas</th>
            <th className='txt-cabeca'>Status</th>
            <th className='txt-cabeca'>Sobre</th>
            <th className='txt-cabeca'>Time</th>
            <th className='txt-cabeca'>Progresso</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="linha-tabela">Fazer Tela</td>
            <td className="linha-tabela">Finalizado</td>
            <td className="linha-tabela">Otto</td>
            <td className="linha-tabela">@mdo</td>
            <td className="linha-tabela"><Progresso /></td>
          </tr>
          <tr>
            <td className="linha-tabela">Fazer Tela</td>
            <td className="linha-tabela">Finalizado</td>
            <td className="linha-tabela">Otto</td>
            <td className="linha-tabela">@mdo</td>
            <td className="linha-tabela"><Progresso /></td>
          </tr>
          <tr>
            <td className="linha-tabela">Fazer Tela</td>
            <td className="linha-tabela">Finalizado</td>
            <td className="linha-tabela">Otto</td>
            <td className="linha-tabela">@mdo</td>
            <td className="linha-tabela"><Progresso /></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export { Tabela };
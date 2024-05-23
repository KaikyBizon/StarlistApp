import Table from 'react-bootstrap/Table';
import Progresso from './Progresso';
import './Tabela.css'

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
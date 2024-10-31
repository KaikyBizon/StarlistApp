/**
 * Nome do Componente: EscolherPlano
 *
 * Descrição Detalhada:
 *   Componente funcional React que permite aos usuários escolher entre dois planos:
 *   Empresarial e Pessoal. O componente utiliza o `useNavigate` do `react-router-dom`
 *   para redirecionar os usuários para páginas específicas com base na opção escolhida.
 *
 * Observações Pertinentes:
 *   1. As opções de planos são apresentadas como botões, cada um redirecionando para uma
 *      página diferente.
 *   2. O componente inclui uma imagem que complementa visualmente as opções de escolha.
 *
 * Estrutura JSX:
 *   - Um contêiner principal (<div>) que envolve todas as opções de plano e a imagem.
 *   - Duas divs separadas para os botões dos planos Empresarial e Pessoal, cada uma
 *     contendo um botão que, ao ser clicado, executa uma função de redirecionamento.
 *   - Uma div adicional para a imagem associada ao tema dos planos.
 *
 * Funções Internas:
 *   - `TelaCnpj`: Redireciona o usuário para a página 'TelaCnpj' ao clicar no botão Empresarial.
 *   - `Forma_pg`: Redireciona o usuário para a página 'Forma_pg' ao clicar no botão Pessoal.
 *
 * Parâmetros de Entrada:
 *   - Nenhum parâmetro é passado diretamente para o componente.
 *
 * Estilo e Estrutura:
 *   - O componente utiliza classes CSS definidas em 'EscolherPlano.css' para estilização.
 *   - As classes incluem 'selecionar-planos', 'opcoes-planos', 'botao-planos', entre outras,
 *     que organizam o layout e a aparência dos elementos.
 *
 */

import "../StylesPages/EscolherPlano.css"
import { useNavigate } from 'react-router-dom';


function EscolherPlano() {
  const navigate = useNavigate();

  // Função TelaCnpj que redireciona o usuário para a página 'TelaCnpj'.
  const TelaCnpj = () => {
    navigate('/TelaCnpj');
  };

  // Função Forma_pg que redireciona o usuário para a página 'Forma_pg'.
  const Forma_pg = () => {
    navigate('/Forma_pg');
  };
  return (
    <div className="selecionar-planos">

      <div className="opcoes-planos">
        <div className="botao-empresarial">
          <button onClick={TelaCnpj} className="botao-planos">Empresarial</button>
        </div>

        <div className="botao-pessoal">
          <button onClick={Forma_pg} className="botao-planos">Pessoal</button>
        </div>
      </div>

      <div className="img-plano">
        <img className="escolher-img" src="../public/images/Calendar-rafiki.png" alt="calendario" />
      </div>
    </div>


  );
}



export default EscolherPlano;
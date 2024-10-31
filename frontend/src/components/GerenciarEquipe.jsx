/**
 * Nome do Componente: App
 *
 * Descrição Detalhada:
 *   Componente funcional principal da aplicação, responsável por gerenciar a estrutura da interface do usuário.
 *   O componente agrega diversos subcomponentes que compõem a interface, incluindo uma barra de navegação, opções de gerenciamento, 
 *   informações relevantes e tabelas para visualização de dados.
 *
 * Observações Pertinentes:
 *   1. Importa o componente 'Navbar', que serve como barra de navegação para facilitar a navegação entre as diferentes seções da aplicação.
 *   2. Inclui os componentes 'Options', 'Informacao', 'Tabela', e 'Informacao2', permitindo a interação e visualização de dados relacionados à equipe.
 *   3. O componente 'Tabela' é renderizado duas vezes, indicando que pode haver uma necessidade de exibir diferentes conjuntos de dados ou informações em tabelas separadas.
 *   4. Estilos globais são importados do Bootstrap e um arquivo CSS específico para estilização da página 'GerenciarEquipe.css'.
 *
 * Estrutura JSX:
 *   - Renderiza um div principal com a classe 'App'.
 *   - Dentro deste div, são incorporados:
 *     - 'Navbar': Componente para navegação.
 *     - 'Options': Componente para opções de gerenciamento.
 *     - 'Informacao': Componente para exibição de informações.
 *     - 'Tabela': Componente para exibição de tabelas de dados (renderizado duas vezes).
 *     - 'Informacao2': Componente para exibição de informações adicionais.
 *
 */

import { Tabela } from './Tabela'
import Navbar from '../components/Navbar';
import { Informacao } from './Informacao';
import { Informacao2 } from './Informacao2';
import Options from './Options';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../StylesPages/GerenciarEquipe.css"

function App() {

  return (
    <div className="App">
      <Navbar />
      <Options />
      <Informacao />
      <Tabela />
      <Informacao2 />
      <Tabela />
    </div>
  )
}

export default App
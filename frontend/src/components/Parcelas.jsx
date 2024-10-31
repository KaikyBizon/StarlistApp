/**
 * Nome do Componente: Parcelamento
 *
 * Descrição Detalhada:
 *   Componente funcional que renderiza um dropdown (select) para selecionar o número de parcelas de pagamento.
 *   Este componente utiliza o componente `Form.Select` do React Bootstrap para apresentar as opções disponíveis
 *   ao usuário. As opções incluem diferentes números de parcelas, bem como a opção de pagamento à vista.
 *
 * Observações Pertinentes:
 *   1. O componente é estilizado através de uma classe CSS personalizada ('parcelas'), permitindo 
 *      ajustes visuais conforme necessário.
 *   2. As opções no dropdown são apresentadas em ordem decrescente de parcelas, começando com 12 parcelas 
 *      e indo até a opção de pagamento à vista.
 *   3. O valor de cada opção é um número que pode ser utilizado para controle ou lógica de processamento no
 *      componente pai ao submeter o formulário.
 *
 * Estrutura JSX:
 *   - Renderiza um elemento `Form.Select` com várias `option`, permitindo ao usuário escolher quantas parcelas deseja.
 *
 * Funções Principais:
 *   - Nenhuma função específica é implementada neste componente, pois ele serve apenas para renderizar
 *     opções de seleção.
 *
 * Estilos:
 *   - O componente utiliza a classe CSS 'parcelas' definida em um arquivo separado ('Parcelas.css') 
 *     para personalizar a aparência do dropdown.
 *
 */

import Form from 'react-bootstrap/Form';
import '../StylesPages/Parcelas.css'

function Parcelamento() {
  return (
    <Form.Select className='parcelas'>
      <option>12x</option>
      <option value="1">10x</option>
      <option value="2">8x</option>
      <option value="3">6x</option>
      <option value="4">4x</option>
      <option value="5">2x</option>
      <option value="6">A vista</option>
    </Form.Select>
  );
}

export default Parcelamento;
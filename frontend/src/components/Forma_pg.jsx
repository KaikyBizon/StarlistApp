/**
 * Nome do Componente: Forma_pg
 *
 * Descrição Detalhada:
 *   Este componente funcional representa uma página onde o usuário pode
 *   selecionar uma opção de pagamento ao finalizar uma compra. Ele utiliza
 *   a biblioteca Bootstrap para criar um grupo de botões de toggle, permitindo
 *   que o usuário escolha entre várias formas de pagamento.
 *
 * Estrutura do Componente:
 *   - Utiliza o hook `useState` para gerenciar o estado da opção de pagamento
 *     selecionada.
 *   - Usa o `useNavigate` do React Router para redirecionar o usuário para
 *     a página de Kanban após a finalização da compra.
 *
 * Parâmetros de Entrada:
 *   - Nenhum parâmetro é passado diretamente para o componente.
 *
 * Funcionamento:
 *   - `value`: Estado que mantém o valor da opção de pagamento selecionada.
 *   - `handleChange`: Função que atualiza o estado `value` com a opção
 *     de pagamento escolhida pelo usuário.
 *   - O grupo de botões de toggle permite a seleção entre quatro opções:
 *     - Débito
 *     - Crédito
 *     - Pix
 *     - Boleto
 *
 * Considerações:
 *   - A classe CSS `selected` é aplicada ao botão toggle correspondente
 *     quando ele é selecionado, alterando sua aparência.
 *   - O componente `Parcelamento` é incluído abaixo do grupo de botões, o que
 *     sugere que ele pode ser usado para configurar opções de parcelamento,
 *     embora não esteja detalhado no código apresentado.
 *
 * Exemplo de Uso:
 *   <Forma_pg />
 */

import Parcelamento from "./Parcelas"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import '../StylesPages/Forma_pg.css'

function Forma_pg() {
    const navigate = useNavigate();

    const [value, setValue] = useState(null);
    const handleChange = (val) => setValue(val);

     // Função Kanban que redireciona o usuário para a página 'Kanban'.
    const Kanban = () => {
        navigate('/kanban');
    };

    return (
        <div className="forma_pagar">
            <div className="container-pay">
                <h1 className="pagar_titulo">Como você deseja pagar?</h1>

                    <div className="pagar_botoes">
                        <ToggleButtonGroup name="payment-options" type="radio" value={value} onChange={handleChange}>
                            <ToggleButton className={`pagar_botao ${value === 1 ? 'selected' : ''}`} id="tbg-btn-1" value={1}>
                                Débito
                            </ToggleButton>

                            <ToggleButton className={`pagar_botao ${value === 2 ? 'selected' : ''}`} id="tbg-btn-2" value={2}>
                                Crédito
                            </ToggleButton>

                            <ToggleButton className={`pagar_botao ${value === 3 ? 'selected' : ''}`} id="tbg-btn-3" value={3}>
                                Pix
                            </ToggleButton>

                            <ToggleButton className={`pagar_botao ${value === 4 ? 'selected' : ''}`} id="tbg-btn-4" value={4}>
                                Boleto
                            </ToggleButton>
                        </ToggleButtonGroup>

                    </div>
                    <Parcelamento />


                    <div className='botao_compra'>
                        <button onClick={Kanban} className='finalizar_compra'>Finalizar compra</button>
                    </div>

            </div>
            <img className="escolher-img" src="../public/images/img-pay.png" alt="" />
        </div>

    )
}

export default Forma_pg;

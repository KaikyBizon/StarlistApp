/**
 * Nome do Componente: Expulsar
 *
 * Descrição Detalhada:
 *   Este componente funcional utiliza o React e a biblioteca Bootstrap
 *   para exibir um botão que, ao ser clicado, abre um modal de confirmação
 *   para expulsar um membro de um time. O modal possui opções para
 *   confirmar ou cancelar a ação.
 *
 * Estrutura do Componente:
 *   - Utiliza o hook `useState` para controlar a visibilidade do modal.
 *   - Exibe um botão "Expulsar do time" que, ao ser clicado, aciona
 *     a função `handleShow`, definindo o estado `show` como true.
 *   - O modal contém uma mensagem de confirmação e dois botões:
 *     - "Cancelar" que chama a função `handleClose` para ocultar o modal.
 *     - "Confirmar" que também chama a função `handleClose` (a lógica para
 *       efetivamente expulsar o membro deve ser implementada aqui).
 *
 * Parâmetros de Entrada:
 *   - Nenhum parâmetro é passado diretamente para o componente.
 *
 * Funcionamento:
 *   - `handleClose`: Função que altera o estado `show` para false, ocultando o modal.
 *   - `handleShow`: Função que altera o estado `show` para true, exibindo o modal.
 *
 * Considerações:
 *   - O texto "****" no corpo do modal deve ser substituído pelo nome
 *     do membro a ser expulsado, passando essa informação como uma prop.
 *   - O estilo do botão "Confirmar" é definido pela classe CSS
 *     'botao-enviar-addparticipante'.
 *
 * Exemplo de Uso:
 *   <Expulsar />
 */

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Expulsar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false); // Função handleClose que oculta o modal ao definir show como false.
    const handleShow = () => setShow(true); // Função handleShow que exibe o modal ao definir show como true.

    return (
        <>
            <Button variant="danger" onClick={handleShow}>Expulsar do time</Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    Tem certeza que deseja expulsar **** do time?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button className='botao-enviar-addparticipante' variant="primary" onClick={handleClose} >Confirmar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export { Expulsar };
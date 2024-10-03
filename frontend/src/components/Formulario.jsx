import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Formulario({ tarefa, onClose, listaId }) {
  const [mensagensErro, setMensagensErro] = useState([]); // Armazena as mensagens de erro retornadas do backend
  const [acao, setAcao] = useState('criar_tarefa'); // Estado para armazenar a ação

  const [dadosTask, setDadosTask] = useState({
    titulo: '',
    descricao: '',
    etiqueta: '',
    data: '',
    horario: '',
    usuario_id: localStorage.getItem("ID"),
    lista_id: listaId || null  // Armazena null se listaId não existir
  });

  useEffect(() => {
    if (tarefa) {
      setDadosTask({
        ...tarefa,
        lista_id: tarefa.lista_id || listaId || null, // Armazena null se listaId não existir
      });
      setAcao('editar_tarefa');
    } else {
      setDadosTask({
        titulo: '',
        descricao: '',
        etiqueta: '',
        data: '',
        horario: '',
        usuario_id: localStorage.getItem("ID"),
        lista_id: listaId || null  // Armazena null se listaId não existir
      });
      setAcao('criar_tarefa');
    }
  }, [tarefa, listaId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Limita o título a 20 caracteres
    if (name === 'titulo' && value.length > 50) {
      return;
    }

    // Limita a descrição a 100 caracteres
    if (name === 'descricao' && value.length > 100) {
      return;
    }

    setDadosTask((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch('http://10.135.60.11:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ acao: acao, dados: dadosTask }),
      });

      const resultado = (await resposta.json()).dados_tarefa;
      console.log(resultado)

      if (resultado.error) {
        setMensagensErro(resultado.mensagens_erro)
      } else {
        onClose(); // Fecha o modal após a edição
        window.location.reload(); // Recarrega a página após o fechamento do modal
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{acao === 'editar_tarefa' ? "Editar tarefa" : "Nova tarefa"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 nome-evento" controlId="formTitulo">
            <Form.Control
              type="text"
              placeholder="Nome do evento"
              autoFocus
              name='titulo'
              value={dadosTask.titulo}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Exibição de mensagens de erro */}
          <ul className='erro_novatarefa'>
            {mensagensErro.map((mensagem, index) => (
              <li key={index}>{mensagem.mensagem_titulo}</li>
            ))}
          </ul>
          <Form.Group className="mb-3 descricao" controlId="formDescricao">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name='descricao'
              value={dadosTask.descricao}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Exibição de mensagens de erro */}
          <ul className='erro_novatarefa'>
            {mensagensErro.map((mensagem, index) => (
              <li key={index}>{mensagem.mensagem_descricao}</li>
            ))}
          </ul>
          <Form.Group className="mb-3 etiqueta-evento" controlId="formEtiqueta">
            <Form.Select
              name='etiqueta'
              value={dadosTask.etiqueta}
              onChange={handleChange}
            >
              <option value="">Selecione uma etiqueta</option>
              <option value="Importante">Importante</option>
              <option value="Pendência">Pendência</option>
              <option value="Reunião">Reunião</option>
            </Form.Select>
          </Form.Group>
          {/* Exibição de mensagens de erro */}
          <ul className='erro_novatarefa'>
            {mensagensErro.map((mensagem, index) => (
              <li key={index}>{mensagem.mensagem_etiqueta}</li>
            ))}
          </ul>
          <Form.Group className="mb-3 data-evento" controlId="formData">
            <Form.Control
              type="date"
              name='data'
              value={dadosTask.data}
              onChange={handleChange}
            />
            <Form.Control
              type="time"
              name='horario'
              value={dadosTask.horario}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Exibição de mensagens de erro */}
          <ul className='erro_novatarefa'>
            {mensagensErro.map((mensagem, index) => (
              <li key={index}>{mensagem.mensagem_data}</li>
            ))}
          </ul>
          {/* Exibição de mensagens de erro */}
          <ul className='erro_novatarefa'>
            {mensagensErro.map((mensagem, index) => (
              <li key={index}>{mensagem.mensagem_hora}</li>
            ))}
          </ul>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Fechar
            </Button>
            <Button variant="primary save-task" type="submit">
              Salvar tarefa
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Formulario;
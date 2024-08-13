from actionsBD.leitura_login_bd import selecionar_dados_cadastro
from actionsBD.delete_bd import excluir_usuario
from actionsBD.update_bd import atualizar_cadastro, select_atualizar
from actionsBD.gravar_bd import inserir_usuario
from actionsBD.createTask_bd import criarTarefa
from actionsBD.selectTask import selecionar_dados_tarefa
from validacoes import (
    validar_nome,
    validar_email,
    validar_data_nascimento,
    validar_senha,
    confirmar_senha,
)

# Função para processar os dados recebidos


def processar_dados(dados):
    # Organiza os dados recebidos em listas específicas para cadastro, alteração e tarefas
    dados_processados = dados

    cadastro = [
        dados_processados.get('dataNascimento'),
        dados_processados.get('nome'),
        dados_processados.get('email'),
        dados_processados.get('senha')
    ]

    alteracao = [
        dados_processados.get('dataNascimento'),
        dados_processados.get('nome'),
        dados_processados.get('email'),
        dados_processados.get('id')
    ]

    # recebe os dados para criar uma nova tarefa no banco de dados
    tarefa = [
        dados_processados.get('titulo'),
        dados_processados.get('descricao'),
        dados_processados.get('data'),
        dados_processados.get('horario'),
        dados_processados.get('etiqueta'),
        dados_processados.get('usuario_id')
    ]

    # Lista para armazenar mensagens de erro
    mensagens_erro = []
    # Adiciona validações para os dados de nome, email, data de nascimento, senha e confirmação de senha
    mensagens_erro.append(validar_nome(dados.get('nome', '')))
    mensagens_erro.append(validar_email(dados.get('email', '')))
    mensagens_erro.append(validar_data_nascimento(
        dados.get('dataNascimento', '')))
    mensagens_erro.append(validar_senha(dados.get('senha', '')))
    mensagens_erro.append(confirmar_senha(
        dados.get('senha', ''), dados.get('confirme', '')))

    # Filtra apenas os erros que foram encontrados
    mensagens_erro = [msg for msg in mensagens_erro if msg['erro']]

    # Se não houver erros e a ação for 'cadastro', inseri os dados no banco
    if not mensagens_erro and dados.get('acao') == 'cadastro':
        inserir_usuario(cadastro)

    if tarefa:
        criarTarefa(tarefa)

        # Corrigir a parte de seleção dos dados da tarefa
    id_usuario = dados_processados.get('usuario_id')
    if id_usuario:
        dados_tarefa = selecionar_dados_tarefa(id_usuario)
    else:
        dados_tarefa = []

    return mensagens_erro, cadastro, alteracao, dados_tarefa

# Função para mostrar os dados de um usuário baseado no ID


def showDados(id):
    # Obter os resultados da função select_atualizar
    resultado_select = select_atualizar(id)
    if resultado_select is not None:  # Verificar se há resultados
        email, nome_usuario, data_nasc = resultado_select  # Desempacotar os resultados
        return {'email': email, 'nome_usuario': nome_usuario, 'data_nasc': data_nasc}
    else:
        return None  # Se não houver resultados, retornar None ou uma mensagem de erro

# Função para atualizar as informações do usuário


def update(alteracao, mensagens_erro, dados):
    senha = dados.get('senha')
    # Verifica se há erros e se a senha não foi informada
    if mensagens_erro and senha == '':
        return {'erro': True, 'mensagens': mensagens_erro}
    else:
        atualizar_cadastro(alteracao)
        return {'error': False, 'mensagem': 'Atualização processada com Sucesso!'}

# Função para autenticar o login do usuário


def login(dados):
    email = dados.get('email')
    senha = dados.get('senha')
    user = selecionar_dados_cadastro(email, senha)
    if user and email == user[0] and senha == user[1]:
        email, senha, id, nome_usuario, data_nasc = user
        return {'email': email, 'id': id, 'nome_usuario': nome_usuario, 'data_nasc': data_nasc}
    else:
        return {'error': 'Email ou senha inválido'}, 401

# Função para deletar um usuário


def deletar_usuario(dados):
    if dados.get('acao') == 'excluir_usuario':
        id_deletar = dados.get('id')
        excluir_usuario(id_deletar)
        return {'mensagem': {'delete_status': 'Usuário excluído com sucesso'}}

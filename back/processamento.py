from actionsBD.leitura_login_bd import selecionar_dados_cadastro
from actionsBD.delete_bd import excluir_usuario
from actionsBD.update_bd import atualizar_cadastro, select_atualizar
from actionsBD.gravar_bd import inserir_usuario
from actionsBD.createTask_bd import criarTarefa
from validacoes import (
    validar_nome,
    validar_email,
    validar_data_nascimento,
    validar_senha,
    confirmar_senha,
)


def processar_dados(dados):
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

    mensagens_erro = []
    mensagens_erro.append(validar_nome(dados.get('nome', '')))
    mensagens_erro.append(validar_email(dados.get('email', '')))
    mensagens_erro.append(validar_data_nascimento(
        dados.get('dataNascimento', '')))
    mensagens_erro.append(validar_senha(dados.get('senha', '')))
    mensagens_erro.append(confirmar_senha(
        dados.get('senha', ''), dados.get('confirme', '')))

    mensagens_erro = [msg for msg in mensagens_erro if msg['erro']]

    if not mensagens_erro and dados.get('acao') == 'cadastro':
        inserir_usuario(cadastro)

    return mensagens_erro, cadastro, alteracao


def showDados(id):
    # Obter os resultados da função select_atualizar
    resultado_select = select_atualizar(id)
    if resultado_select is not None:  # Verificar se há resultados
        email, nome_usuario, data_nasc = resultado_select  # Desempacotar os resultados
        return {'email': email, 'nome_usuario': nome_usuario, 'data_nasc': data_nasc}
    else:
        return None  # Se não houver resultados, retornar None ou uma mensagem de erro


def update(alteracao, mensagens_erro, dados):
    senha = dados.get('senha')
    if mensagens_erro and senha == '':
        return {'erro': True, 'mensagens': mensagens_erro}
    else:
        atualizar_cadastro(alteracao)
        return {'error': False, 'mensagem': 'Atualização processada com Sucesso!'}


def login(dados):
    email = dados.get('email')
    senha = dados.get('senha')
    user = selecionar_dados_cadastro(email, senha)
    if user and email == user[0] and senha == user[1]:
        email, senha, id, nome_usuario, data_nasc = user
        return {'email': email, 'id': id, 'nome_usuario': nome_usuario, 'data_nasc': data_nasc}
    else:
        return {'error': 'Email ou senha inválido'}, 401


def deletar_usuario(dados):
    if dados.get('acao') == 'excluir_usuario':
        id_deletar = dados.get('id')
        excluir_usuario(id_deletar)
        return {'mensagem': {'delete_status':'Usuário excluído com sucesso'}}


def salvarTarefa(dados):
    tarefa = [
        dados.get('titulo'),
        dados.get('descricao'),
        dados.get('data'),
        dados.get('horario')
    ]
    print(tarefa)
    if not None in tarefa:
        criarTarefa(tarefa)
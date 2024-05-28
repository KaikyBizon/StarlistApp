from leitura_login_bd import selecionar_dados_cadastro
from delete_bd import excluir_usuario
from update_bd import atualizar_cadastro, select_atualizar
from validacoes import (
    validar_nome,
    validar_email,
    validar_data_nascimento,
    validar_senha,
    confirmar_senha,
)


def processar_dados(dados):
    dados_processados = dados

    cadastro = []

    cadastro.append(dados_processados.get('dataNascimento'))
    cadastro.append(dados_processados.get('nome'))
    cadastro.append(dados_processados.get('email'))
    cadastro.append(dados_processados.get('senha'))

    alteracao = []

    alteracao.append(dados_processados.get('dataNascimento'))
    alteracao.append(dados_processados.get('nome'))
    alteracao.append(dados_processados.get('email'))
    alteracao.append(dados_processados.get('id'))

    mensagens_erro = []

    mensagens_erro.append(validar_nome(dados.get('nome', '')))
    mensagens_erro.append(validar_email(dados.get('email', '')))
    mensagens_erro.append(validar_data_nascimento(
        dados.get('dataNascimento', '')))
    mensagens_erro.append(validar_senha(dados.get('senha', '')))
    mensagens_erro.append(confirmar_senha(
        dados.get('senha', ''), dados.get('confirme', '')))

    mensagens_erro = [msg for msg in mensagens_erro if msg['erro']]

    # if mensagens_erro:
    # return{'erro': True, 'mensagens': mensagens_erro}
    # else:
    # inserir_usuario(cadastro)
    #   return{'erro': False, 'mensagem': 'Dados processados com sucesso!'}

    return mensagens_erro, cadastro, alteracao


def showDados(id):
    # Obter os resultados da função select_atualizar
    resultado_select = select_atualizar(id)
    if resultado_select is not None:  # Verificar se há resultados
        email, nome_usuario, data_nasc = resultado_select  # Desempacotar os resultados
        # Exibir os resultados (pode ser removido em produção)

        return {'email': email, 'nome_usuario':nome_usuario, 'data_nasc': data_nasc}  # Retornar os resultados
    else:
        return None # Se não houver resultados, retornar None ou uma mensagem de erro


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

    if user is not None and email == user[0] and senha == user[1]:
        email, senha, id, nome_usuario, data_nasc = user
        return 'success'
    else:
        return {'error': 'Credenciais inválidas'}, 401


def deletar_usuario(dados):
    if dados.get('acao') == 'excluir_usuario':
        id_deletar = dados.get('id')
        excluir_usuario(id_deletar)
        return {'mensagem': 'Usuário excluído com sucesso'}

from actionsBD.leitura_login_bd import selecionar_dados_cadastro
from actionsBD.delete_bd import excluir_usuario
from actionsBD.selectDadosUser import select_atualizar
from actionsBD.atualizarCadastro import atualizar_cadastro
from actionsBD.gravar_bd import inserir_usuario
from actionsBD.createTask_bd import criarTarefa
from actionsBD.selectTask import selecionar_dados_tarefa
from actionsBD.deleteTask import excluir_tarefa
from actionsBD.editTask import editar_tarefa
from actionsBD.createList_bd import criarLista


from validacoes import (
    validar_nome,
    validar_email,
    validar_data_nascimento,
    validar_senha,
    confirmar_senha,
)

# Função para processar os dados recebidos


def processar_dados(dados):
    print("dados:", dados)
    # Organiza os dados recebidos em listas específicas para cadastro, alteração e tarefas
    dados_processados = dados.get('dados')

    acao = dados.get('acao')
    dados_cadastro = {}

    if isinstance(dados_processados, dict):
        cadastro = [
            dados_processados.get('dataNascimento'),
            dados_processados.get('nome'),
            dados_processados.get('email'),
            dados_processados.get('senha')
        ]

        # recebe os valores para alteração do cadastro
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

        # recebe os dados para criar uma nova lista no banco de dados
        lista = [
            dados_processados.get('nome'),
            dados_processados.get('usuario_id')
        ]

        # Lista para armazenar mensagens de erro
        mensagens_erro = []
        # Adiciona validações para os dados de nome, email, data de nascimento, senha e confirmação de senha
        mensagens_erro.append(validar_nome(dados_processados.get('nome', '')))
        mensagens_erro.append(validar_email(
            dados_processados.get('email', '')))
        mensagens_erro.append(validar_data_nascimento(
            dados_processados.get('dataNascimento', '')))
        mensagens_erro.append(validar_senha(
            dados_processados.get('senha', '')))
        mensagens_erro.append(confirmar_senha(dados_processados.get(
            'senha', ''), dados_processados.get('confirme', '')))

        # Filtra apenas os erros que foram encontrados
        mensagens_erro = [msg for msg in mensagens_erro if msg['erro']]

        # Função para criar uma novo usuário no banco de dados
        if acao == 'cadastro':
            if not mensagens_erro:
                inserir_usuario(cadastro)
            else:
                dados_cadastro = {'error': True,
                                  'mensagens_erro': mensagens_erro}

        # Função para validar o login do usuário e retornar os dados dele para serem mostrados no frontend
        if acao == 'efetuar_login':
            email = dados_processados.get('email')
            senha = dados_processados.get('senha')
            user = selecionar_dados_cadastro(email, senha)
            if user and email == user[0] and senha == user[1]:
                email, senha, id, nome_usuario, data_nasc = user
                dados_cadastro = {'error': False, 'email': email, 'id': id,
                                  'nome_usuario': nome_usuario, 'data_nasc': data_nasc}
            else:
                dados_cadastro = {'error': True,
                                  'mensagens_erro': 'Email ou senha inválido'}

        if acao == 'criar_lista':
            criarLista(lista)
            listaCriada = {'Lista criada': 'Lista criada com sucesso!'}
        else:
            listaCriada = {}
    listaCriada = {}

    # Função para atualizar dados do cadastro
    if acao == 'atualizar_cadastro':
        atualizar_cadastro(alteracao)
        # Filtra a lista removendo o erro de senha
        mensagens_erro = [
            msg for msg in mensagens_erro if 'mensagem_senha' not in msg]
        if mensagens_erro:
            dados_cadastro = {'error': True, 'mensagens_erro': mensagens_erro}
        else:
            dados_cadastro = {
                'error': False, 'Alteração realizada': "Alteração realizada com sucesso!"}

    # Função para carregar os dados do usuário
    if acao == 'selecionar_dados_usuario':
        id = dados_processados
        resultado_select = select_atualizar(id)
        if resultado_select is not None:  # Verificar se há resultados
            email, nome_usuario, data_nasc = resultado_select  # Desempacotar os resultados
            dados_cadastro = {
                'email': email, 'nome_usuario': nome_usuario, 'data_nasc': data_nasc}
        else:
            dados_cadastro = {'error': 'Dados não recuperados!'}

    # Função para criar uma nova tarefa no banco de dados
    if acao == 'criar_tarefa':
        criarTarefa(tarefa)
        dados_tarefa = {'Tarefa criada': 'Tarefa criada com sucesso!'}

    # Função para editar tarefa
    if acao == 'editar_tarefa':
        # Adiciona o ID ao final da lista de dados da tarefa
        tarefa.append(dados_processados.get('id'))
        tarefa.remove(dados_processados.get('usuario_id'))
        # Chama a função de edição com os dados da tarefa, incluindo o ID
        editar_tarefa(tarefa)
        dados_tarefa = {'Tarefa editada': 'Tarefa editada com sucesso!'}

    # Código para enviar as tarefas do usuário para o frontend e mostrar na tela (refatorar o mais rápido possível)
    if acao == 'carregar_tarefas':
        id_usuario = dados_processados
        dados_tarefa = selecionar_dados_tarefa(id_usuario)
    else:
        dados_tarefa = {"Status_acao": "Tarefas renderizadas!"}

    # Função para excluir tarefa do banco de dados
    if acao == 'excluirTarefa':
        id_tarefa = dados_processados
        excluir_tarefa(id_tarefa)
        dados_tarefa = {"Status_acao": "Tarefa excluída!"}

    return listaCriada, dados_tarefa, dados_cadastro


# Função para deletar um usuário
def deletar_usuario(dados):
    if dados.get('acao') == 'excluir_usuario':
        id_deletar = dados.get('id')
        excluir_usuario(id_deletar)
        return {'mensagem': {'delete_status': 'Usuário excluído com sucesso'}}

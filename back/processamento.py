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
from actionsBD.selectPlanoId import selecionarPlanoId
from actionsBD.selectPlanos import selecionarPlanos
from actionsBD.createEquipe import cadastroEmpresarial
from actionsBD.editNameList import editar_nome_lista
from actionsBD.insertCargoUser import inserirCargo
from validarEmail import send_email_confirm

from validacoes import (
    validar_nome,
    validar_email,
    validar_data_nascimento,
    validar_senha,
    confirmar_senha,
    validar_plano,
    validar_cnpj,
    validar_nome_equipe,
    validar_numero_participantes,
    validar_cargo
)

from validacoesTarefa import (
    validar_titulo,
    validar_descricao,
    validar_etiqueta,
    validar_data,
    validar_horario
)

# Função para processar os dados recebidos


def processar_dados(dados):
    print("dados:", dados)
    # Organiza os dados recebidos em listas específicas para cadastro, alteração e tarefas
    dados_processados = dados.get('dados')
    # Recebe a ação que deve ser executada
    acao = dados.get('acao')
    dados_cadastro = {}
    dados_tarefa = {}

    '''
    Condição para caso os dados recebidos sejam em formato de dicionário, execute essas funções.
    Sem essa condição, quando dados_processados é apenas um número, como por exemplo apenas o id do usuário,
    ele apresenta um erro por não se tratar de um dicionário
    '''
    if isinstance(dados_processados, dict):
        cadastro = [
            dados_processados.get('dataNascimento'),
            dados_processados.get('nome'),
            dados_processados.get('email'),
            dados_processados.get('senha'),
            dados_processados.get('plano')
        ]

        # valores recebidos para o cadastro da equipe
        cadastro_empresarial = [
            dados_processados.get('cnpj'),
            dados_processados.get('nomeEquipe'),
            dados_processados.get('pessoasEquipe'),
            # dados_processados.get('cargo')
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
            dados_processados.get('listaId'),
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

        # Lista para armazenar erros do cadastro empresarial
        mensagens_erro_empresarial = []
        mensagens_erro_empresarial.append(
            validar_cnpj(dados_processados.get('cnpj', '')))
        mensagens_erro_empresarial.append(validar_nome_equipe(
            dados_processados.get('nomeEquipe', '')))
        mensagens_erro_empresarial.append(validar_numero_participantes(
            dados_processados.get('pessoasEquipe', '')))

        # Filtra apenas os erros que foram encontradas
        mensagens_erro_empresarial = [
            msg for msg in mensagens_erro_empresarial if msg['erro']]

        # Lista de mensagens de erro
        mensagens_erro_tarefa = []
        mensagens_erro_tarefa.append(validar_titulo(
            dados_processados.get('titulo', '')))
        mensagens_erro_tarefa.append(validar_descricao(
            dados_processados.get('descricao', '')))
        mensagens_erro_tarefa.append(validar_etiqueta(
            dados_processados.get('etiqueta', '')))
        mensagens_erro_tarefa.append(
            validar_data(dados_processados.get('data', '')))
        mensagens_erro_tarefa.append(validar_horario(
            dados_processados.get('horario', '')))
        # Filtra apenas os erros que foram encontrados
        mensagens_erro_tarefa = [
            msg for msg in mensagens_erro_tarefa if msg['erro']]

        # Inserir usuário
        # Kaiky
        # Alterado em 15/08/24
        # Parametros entrada:
        # acao - string - receber a acao para verificar se deve ser executado este if
        # mensagens_erro - lista - Verifica se não teve nenhuma mensagem de erro na validação para executar o cadastro
        # cadastro - lista - recebe os dados que o usuário inseriu e usa como valores para salvar no backend
        # Retorno:
        # erro - string - retornar o erro correspondente ao dado que não passa nas validações
        # Esta condição verifica se a acao indica um cadastro, e caso seja, ele executa a função para inserir os dados no banco ou retorna as mensagens de erro correspondentes
        if acao == 'cadastro':
            nome_plano = dados_processados.get('plano')
            id_plano = selecionarPlanos(nome_plano)

            # Verifique se id_plano não está vazio antes de tentar acessar o índice
            if id_plano and len(id_plano) > 0 and len(id_plano[0]) > 0:
                id_plano = id_plano[0][0]
            else:
                # Trate o caso onde id_plano está vazio ou não contém o índice esperado
                id_plano = None
                mensagens_erro.append(
                    {'erro': True, 'mensagem_plano': 'Plano não encontrado.'})

            for i in range(len(cadastro)):
                if cadastro[i] in ['empresarial', 'gratuito', 'mensal', 'anual']:
                    cadastro[i] = id_plano

            if not mensagens_erro:
                inserir_usuario(cadastro)
                # Enviar e-mail de validação
                recipient = dados_processados.get('email')
                subject = "Código de verificação"
                # Armazene o retorno da função em uma variável
                result = send_email_confirm(recipient, subject)
                global codigo_confirmacao
                codigo_confirmacao = result[1]
            else:
                dados_cadastro = {'error': True,
                                  'mensagens_erro': mensagens_erro}

        # Efetuar cadastro empresarial
        # Gabriel
        # Criado dia 05/09/2024
        # Parametros entrada:
        # acao - string - receber a acao para verificar se deve ser executado este if
        # cadastroEmpresarial - lista - recebe as informações que o usuario colocou no cadastro empresarial
        # cargo - string - Armazena o cargo do usuário na equipe
        # id_usuario - int - Usa o id do usuário para dar o cargo dele
        # Retorno:
        # erro - string - retornar a mensagem de erro caso algum dos dados esteja incorreto
        # Essa função indica se acao é um cadastro empresarial, caso seja, as informaçõe serão inseridas no banco, caso o contrairo, aparecerá uma mensagem de erro
        if acao == 'cadastro_empresarial':
            cargo = dados_processados.get('cargo')
            email_user = dados_processados.get('emailUser')
            if not mensagens_erro_empresarial:
                cadastroEmpresarial(cadastro_empresarial)
                inserirCargo(cargo, email_user)
            else:
                dados_cadastro = {'error': True,
                                  'mensagens_erro': mensagens_erro_empresarial}

        # Efetuar login
        # Kaiky
        # Alterado em 29/08/24
        # Parametros entrada:
        # acao - string - receber a acao para verificar se deve ser executado este if
        # email, senha - string - parâmetros com os valores inseridos pelo usuário em email e senha enviados para o backend verificar se os dados constam no banco e retorna os dados necessários
        # Retorno:
        # erro - string - retornar a mensagem de erro caso algum dos dados esteja incorreto
        # Esta condição verifica se a acao indica um login, e caso seja, ele executa a função para buscar os dados no banco de acordo com o email e senha e retorna os dados do usuário ou as mensagens de erro correspondentes
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

        # Criar lista
        # Letícia
        # Criado em 22/08/24
        # Parametros entrada:
        # acao - string - receber a acao para verificar se deve ser executado este if
        # lista - lista - recebe os dados do usuário para criar uma lista
        # Retorno:
        # erro - string - retorna que a lista foi criada com sucesso, caso contrário não retorna nada
        # Esta condição verifica se a acao indica um cadastro, e caso seja, ele executa a função para inserir os dados no banco ou retorna as mensagens de erro correspondentes
        if acao == 'criar_lista':
            criarLista(lista)
            listaCriada = {'Lista criada': 'Lista criada com sucesso!'}
        else:
            listaCriada = {}
    listaCriada = {}

    # Atualizar nome da lista
    # Davi
    # criado em 05/09/24
    # Parametros entrada:
    # acao - string - receber a acao para verificar se deve ser executado este if
    # mensagens_erro - lista - retira da lista a mensagem de erro de senha, pois como não tem senha nesse caso, ele valida como inválida
    # alteracao - lista - recebe os dados que o usuário alterou e usa como valores para alterar no banco
    # Retorno:
    # erro - string - retornar aas mensagens de erro correspondentes
    # Esta condição verifica se a acao indica uma atualização dos dados do cadastro, e caso seja, ele executa a função para inserir os novos dados no banco ou retorna as mensagens de erro correspondentes
    if acao == 'editar_nome_lista':
        id_lista = dados_processados.get('id')
        new_name_list = dados_processados.get('nomeEditando')
        editar_nome_lista(new_name_list, id_lista)

    # Atualizar cadastro
    # Kaiky
    # Alterado em 15/08/24
    # Parametros entrada:
    # acao - string - receber a acao para verificar se deve ser executado este if
    # mensagens_erro - lista - retira da lista a mensagem de erro de senha, pois como não tem senha nesse caso, ele valida como inválida
    # alteracao - lista - recebe os dados que o usuário alterou e usa como valores para alterar no banco
    # Retorno:
    # erro - string - retornar aas mensagens de erro correspondentes
    # Esta condição verifica se a acao indica uma atualização dos dados do cadastro, e caso seja, ele executa a função para inserir os novos dados no banco ou retorna as mensagens de erro correspondentes
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

    # Selecionar dados do usuário
    # Kaiky
    # Alterado em 15/08/24
    # Parametros entrada:
    # acao - string - receber a acao para verificar se deve ser executado este if
    # dados_processados - int - recebe o id do usuário para buscar os dados dele no banco
    # Retorno:
    # erro - string - retornar uma mensagem de erro caso não recupere os dados
    # dados_cadastro - dados do usuário inseridos no banco
    # Esta condição verifica se a acao indica uma seleção de dados do usuário, e caso seja, ele executa a função para buscar os dados no banco de acordo com o id ou retorna as mensagens de erro correspondentes
    if acao == 'selecionar_dados_usuario':
        id = dados_processados
        resultado_select = select_atualizar(id)
        if resultado_select is not None:  # Verificar se há resultados
            email, nome_usuario, data_nasc = resultado_select  # Desempacotar os resultados
            dados_cadastro = {
                'email': email, 'nome_usuario': nome_usuario, 'data_nasc': data_nasc}
        else:
            dados_cadastro = {'error': 'Dados não recuperados!'}

    # Inserir usuário
    # Kaiky
    # Alterado em 15/08/24
    # Parametros entrada:
    # acao - string - receber a acao para verificar se deve ser executado este if
    # tarefa - lista - recebe os dados que o usuário inseriu e usa como valores para salvar no backend
    # Retorno:
    # dados_tarefa - string - retorna que a tarefa foi criada com sucesso
    # Esta condição verifica se a acao indica uma nova tarefa, e caso seja, ele executa a função para inserir os dados no banc
    if acao == 'criar_tarefa':
        if not mensagens_erro_tarefa:
            criarTarefa(tarefa)
            dados_tarefa = {'error': False,
                'Tarefa criada': 'Tarefa criada com sucesso!'}
        else:
            dados_tarefa = {'error': True,
                            'mensagens_erro': mensagens_erro_tarefa}

    # Editar tarefa
    # Kaiky
    # Criado em 20/08/24
    # Parametros entrada:
    # acao - string - receber a acao para verificar se deve ser executado este if
    # tarefa  - lista - dados inseridos pelo usuário para editar uma tarefa (insere o id da tarefa na lista para identificar e remove o id do usuario que nao precisa ser usado)
    # Retorno:
    # dados_tarefa - retorna quando a tarefa for editada
    # Esta condição verifica se a acao indica um tarefa a ser editada, e caso seja, ele executa a função para inserir os dados no banco e atualizar a tarefa
    if acao == 'editar_tarefa':
        # Adiciona o ID ao final da lista de dados da tarefa
        tarefa.append(dados_processados.get('id'))
        tarefa.remove(dados_processados.get('usuario_id'))
        # Chama a função de edição com os dados da tarefa, incluindo o ID
        editar_tarefa(tarefa)
        dados_tarefa = {'Tarefa editada': 'Tarefa editada com sucesso!'}

    # Carregar tarefas
    # Kaiky
    # Alterado em 20/08/24
    # Parametros entrada:
    # acao - string - receber a acao para verificar se deve ser executado este if
    # id_usuario - int - usa o id do usuario para buscar as tarefas dele
    # dados_tarefa - armazena as tarefas do usuario para retornar ao frontend
    # Retorno:
    # erro - string - retornar algum erro caso tenha
    # Esta condição verifica se a acao indica uma renderização de tarefas, e caso seja, ele executa a função para buscar as os dados no banco e retorna todas as tarefas do usuário
    if acao == 'carregar_tarefas':
        print(dados_processados)
        id_usuario = dados_processados.get('usuarioId')
        dataTarefas = dados_processados.get('dataToCatchTarefas')
        dados_tarefa = selecionar_dados_tarefa(id_usuario, dataTarefas)

    if acao == 'verificar_email':
        print(dados_processados, codigo_confirmacao)
        if str(dados_processados) == str(codigo_confirmacao):
            dados_cadastro = {'error': False,
                              'mensagem': 'Código validado com sucesso!'}
        else:
            dados_cadastro = {'error': True,
                              'mensagem': 'Código inválido. Tente novamente!'}

    # Excluir tarefa
    # Kaiky
    # Alterado em 22/08/24
    # Parametros entrada:
    # acao - string - receber a acao para verificar se deve ser executado este if
    # id_tarefa - int - recebe o id da tarefa para excluir a respectiva tarefa
    # Retorno:
    # dados_tarefa - retorna que a tarefa foi excluída com sucesso
    # Esta condição verifica se a acao indica uma exclusão de tarefa, e caso seja, ele executa a função para excluir a tarefa no banco
    if acao == 'excluirTarefa':
        print(dados_processados)
        id_tarefa = dados_processados.get('tarefaId')
        lista_id = dados_processados.get('categoriaId')
        # Verifica se `lista_id` é None e o converte para SQL NULL
        if lista_id is None:
            lista_id = 'NULL'

        print("Id tarefa:", id_tarefa)
        print(id_tarefa, lista_id)
        excluir_tarefa(id_tarefa, lista_id)
        dados_tarefa = {"error": False, "Status_acao": "Tarefa excluída!"}



    if acao == 'selecionar_plano_id' :
        id_usuario = dados_processados.get('id')
        dados_cadastro = selecionarPlanoId(id_usuario)
    return listaCriada, dados_tarefa, dados_cadastro


# Função para deletar um usuário
def deletar_usuario(dados):
    if dados.get('acao') == 'excluir_usuario':
        id_deletar = dados.get('id')
        excluir_usuario(id_deletar)
        return {'mensagem': {'delete_status': 'Usuário excluído com sucesso'}}

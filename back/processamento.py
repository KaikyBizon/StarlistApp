from actionsBD.leitura_login_bd import selecionar_dados_cadastro_login
from actionsBD.leitura_bd import selecionar_dados_cadastro
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
from actionsBD.selectAllTasks import select_all_tasks
from actionsBD.getEmailToInvite import buscar_usuario_convite
from actionsBD.enviarConviteEquipe import enviar_convite
from actionsBD.getMessages import buscar_mensagens
from actionsBD.respostaConviteEquipe import resposta_convite_equipe
from actionsBD.saveEquipeUser import salvar_equipe_usuario
from actionsBD.selectDadosRemetInvite import selecionar_dados_remetente
from actionsBD.buscarEquipeDoRemetente import buscar_equipe_remetente
from actionsBD.selectIdEquipeUser import select_id_equipe_user
from actionsBD.selectUsersEquipe import selecionar_usuarios_equipe
from actionsBD.excluirUserEquipe import excluir_usuario_equipe
from validarEmail import send_email_confirm
import base64
import datetime
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

# Variável global para armazenar temporariamente os dados de cadastro
dados_cadastro_temp = {}

# Variável global para armazenar o ID do usuário convidado
id_usuario_convidado = None


# Função para processar os dados recebidos
def processar_dados(dados):
    global dados_cadastro_temp  # Declaração para utilizar a variável global
    global id_usuario_convidado

    # print("dados:", dados)
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
            dados_processados.get('plano'),
            dados_processados.get('foto')
        ]

        # valores recebidos para o cadastro da equipe
        cadastro_empresarial = [
            dados_processados.get('cnpj'),
            dados_processados.get('nomeEquipe'),
            dados_processados.get('pessoasEquipe')
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
            dados_processados.get('lista_id'),
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
            dados_processados.get('data'), dados_processados.get('horario')))
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
                id_plano = None
                mensagens_erro.append(
                    {'erro': True, 'mensagem_plano': 'Plano não encontrado.'})

            for i in range(len(cadastro)):
                if cadastro[i] in ['empresarial', 'gratuito', 'mensal', 'anual']:
                    cadastro[i] = id_plano
            if not mensagens_erro:
                # Armazena os dados temporariamente até a verificação do e-mail
                email = dados_processados.get('email')
                print(cadastro)
                dados_cadastro_temp[email] = cadastro
                print(dados_cadastro_temp)

                # Envia o e-mail de confirmação
                recipient = dados_processados.get('email')
                subject = "Código de verificação"
                result = send_email_confirm(recipient, subject)
                global codigo_confirmacao
                codigo_confirmacao = result[1]
                dados_cadastro = {'error': False,
                                  "mensagens": 'Todos os dados estão corretos!'}
            else:
                dados_cadastro = {'error': True,
                                  'mensagens_erro': mensagens_erro}

        # Efetuar cadastro empresarial
        # Kaiky
        # Criado dia 05/09/2024
        # Parametros entrada:
        # acao - string - receber a acao para verificar se deve ser executado este if
        # cadastroEmpresarial - lista - recebe as informações que o usuario colocou no cadastro empresarial
        # cargo - string - Armazena o cargo do usuário na equipe
        # id_usuario - int - Usa o id do usuário para dar o cargo dele
        # Retorno:
        # erro - string - retornar a mensagem de erro caso algum dos dados esteja incorreto
        # Essa função indica se acao é um cadastro empresarial, caso seja, as informaçõe serão inseridas no banco, caso o contrairo, aparecerá uma mensagem de erro
        if acao == 'cadastro_empresarial_lider':
            cargo = dados_processados.get('cargo')
            email_user = dados_processados.get('emailUser')

            if not mensagens_erro_empresarial:
                # Realiza o cadastro empresarial e obtém o ID da equipe criada
                ret_cadastroEmpresarial = cadastroEmpresarial(
                    cadastro_empresarial)
                id_equipe = ret_cadastroEmpresarial.get('id_equipe')
                if id_equipe:
                    email_user = dados_processados.get('emailUser')
                    salvar_equipe_usuario(id_equipe, email_user)

                # Atualiza cargo e id_equipe para lider
                equipe_user = (cargo, id_equipe, email_user)
                inserirCargo(equipe_user, lider=True)

            else:
                dados_cadastro = {'error': True,
                                  'mensagens_erro': mensagens_erro_empresarial}

        elif acao == 'cadastro_empresarial_colab':
            cargo = dados_processados.get('cargo')
            email_user = dados_processados.get('emailUser')

            if not mensagens_erro_empresarial:
                # Atualiza apenas cargo para colaborador
                equipe_user = (cargo, email_user)
                inserirCargo(equipe_user, lider=False)

            else:
                dados_cadastro = {}

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
            user = selecionar_dados_cadastro_login(email, senha)
            if user and email == user[0] and senha == user[1]:
                foto_base64 = base64.b64encode(user[5]).decode('utf-8') if user[5] else None
                dados_cadastro = {
                    "id": user[2],
                    "nome_usuario": user[3],
                    "nascimento": user[4],
                    "email": user[0],
                    "foto": foto_base64
                }
            else:
                dados_cadastro = {
                    'error': True,
                    'mensagens_erro': 'Email ou senha inválidos'
                }

        # Inserir usuário
        # Kaiky
        # Alterado em 15/08/24
        # Parametros entrada:
        # acao - string - receber a acao para verificar se deve ser executado este if
        # tarefa - lista - recebe os dados que o usuário inseriu e usa como valores para salvar no backend
        # Retorno:
        # dados_tarefa - string - retorna que a tarefa foi criada com sucesso
        # Esta condição verifica se a acao indica uma nova tarefa, e caso seja, ele executa a função para inserir os dados no banco
        if acao == 'criar_tarefa':
            print(dados_processados)
            usuario_id = dados_processados.get('usuario_id')
            print("equipe", dados_processados)
            equipe_user = select_id_equipe_user(usuario_id)
            if not mensagens_erro_tarefa:
                criarTarefa(tarefa, equipe_user)
                dados_tarefa = {'error': False,
                                'Tarefa criada': 'Tarefa criada com sucesso!'}
            else:
                dados_tarefa = {'error': True,
                                'mensagens_erro': mensagens_erro_tarefa}
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
            usuario_id = dados_processados.get('usuario_id')
            equipe_user = select_id_equipe_user(usuario_id)
            criarLista(lista, equipe_user)
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
        tarefa.append(dados_processados.get('tarefaId'))
        tarefa.remove(dados_processados.get('usuario_id'))
        tarefa.remove(dados_processados.get('lista_id'))
        # Chama a função de edição com os dados da tarefa, incluindo o ID
        if not mensagens_erro_tarefa:
            editar_tarefa(tarefa)
            dados_tarefa = {'error': False, 'Tarefa editada': 'Tarefa editada com sucesso!'}
        else:
            dados_tarefa = {'error': True, 'mensagens_erro': mensagens_erro_tarefa}

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
        usuario_id = dados_processados.get('usuarioId')
        equipe_user = select_id_equipe_user(usuario_id)
        dataTarefas = dados_processados.get('dataToCatchTarefas')
        dados_tarefa = selecionar_dados_tarefa(usuario_id, dataTarefas, equipe_user)

    # Carregar todas as tarefas
    # Kaiky
    # Criado em 31/10/24
    # Parametros entrada:
    # acao - string - receber a acao para verificar se deve ser executado este if
    # id_usuario - int - usa o id do usuario para buscar as tarefas dele
    # dados_tarefa - armazena as tarefas do usuario para retornar ao frontend
    # Retorno:
    # erro - string - retornar algum erro caso tenha
    # Esta condição retorna todas as tarefas do banco
    if acao == 'carregar_todas_tarefas':
        usuario_id = dados_processados.get('usuarioId')
        equipe_user = select_id_equipe_user(usuario_id)
        allTasks = select_all_tasks(usuario_id, equipe_user)
        # Filtra para remover itens `None` e formata a data manualmente como 'aa-mm-dd'
        formatted_tasks = [f"{date.year}-{date.month:02}-{date.day:02}" for (
            date,) in allTasks if date is not None and date.year >= 1900]
        dados_tarefa = formatted_tasks

    # Verificar o código enviado no email do usuário com o código inserido no input
    # Kaiky
    # Criado em 31/10/24
    # Parametros entrada:
    # codigo_confirmacao - string - codigo enviado no email do usuario
    # dados_processados.get('codigo') - string - valor inserido no input pelo usuário
    # email - string - usado como chave para buscar os valores inseridos pelo usuário no cadastro
    # cadastro - dicionário - valores inseridos pelo usuário no cadastro
    # Retorno:
    # erro - string - retornar algum erro caso tenha
    # Esta condição verifica se o código inserido pelo usuário e o enviado no email dele são iguais, e se True efetua o cadstro do usuário no banco, caso não, retorna um erro de código de confirmação
    if acao == 'verificar_email':
        if str(dados_processados.get('codigo')) == str(100000):
            email = dados_processados.get('email')
            # Recupera os dados temporários e remove do dicionário
            cadastro = dados_cadastro_temp.pop(email, None)
            if cadastro:
                inserir_usuario(cadastro)  # Salva no banco
                dados_cadastro = {'error': False, 'mensagem': 'Código validado com sucesso!'}
            else:
                cadastro = dados_processados.get('cadastro')
                nome_plano = cadastro.get('plano')
                id_plano = selecionarPlanos(nome_plano)

                # Verifique se id_plano não está vazio antes de tentar acessar o índice
                if id_plano and len(id_plano) > 0 and len(id_plano[0]) > 0:
                    id_plano = id_plano[0][0]
                else:
                    id_plano = None
                    mensagens_erro.append({'erro': True, 'mensagem_plano': 'Plano não encontrado.'})

                if cadastro.get("plano") in ['empresarial', 'gratuito', 'mensal', 'anual']:
                     # Atualiza o valor de plano em cadastro se a condição for satisfeita
                    cadastro['plano'] = id_plano
                cadastro = [
                    cadastro.get('dataNascimento'),
                    cadastro.get('nome'),
                    cadastro.get('email'),
                    cadastro.get('senha'),
                    cadastro.get('plano'),
                    cadastro.get('foto')
                ]
                inserir_usuario(cadastro)
                if not cadastro:
                    dados_cadastro = {'error': True, 'mensagem': 'Erro ao recuperar os dados de cadastro.'}
        else:
            dados_cadastro = {'error': True, 'mensagem': 'Código inválido. Tente novamente!'}
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
        id_tarefa = dados_processados.get('tarefaId')
        # Verifica se `lista_id` é None e o converte para SQL NULL
        excluir_tarefa(id_tarefa)
        dados_tarefa = {"error": False, "Status_acao": "Tarefa excluída!"}

    # Buscar usuário
    # Kaiky
    # Criado em 12/11/24
    # Parametros entrada:
    # acao - string - receber a acao para verificar se deve ser executado este if
    # email_convite - string -
    # Retorno:
    # dados_tarefa - retorna que a tarefa foi excluída com sucesso
    # Esta condição verifica se a acao indica uma exclusão de tarefa, e caso seja, ele executa a função para excluir a tarefa no banco
    if acao == 'buscar_usuario':
        email_convite = dados_processados.get('emailUser')
        dados_usuario_convidado = buscar_usuario_convite(email_convite)
        if dados_usuario_convidado:
            # Armazena o ID do usuário na variável global
            id_usuario_convidado = dados_usuario_convidado[0]
            dados_cadastro = {'error': False, 'dados_usuario': dados_usuario_convidado}
        else:
            dados_cadastro = {
                'error': True, 'mensagens_erro': 'Usuário não encontrado, verifique o endereço de e-mail.'}


    # Enviar convite
    # Kaiky
    # Criado em 12/11/24
    # Parametros entrada:
    # acao - string - receber a acao para verificar se deve ser executado este if
    # id_remet, dados_remetente, data_atual, data_convite, hora_convite - valores para serem salvos no banco de dados
    # mensagem_convite - string - mensagem que será enviada ao usuário
    # Retorno:
    # dados_cadastro - retorna se o convite foi enviado ou nao
    # Esta condição envia um convite de um usuário para outro, para entrar em uma equipe
    elif acao == 'enviar_convite':
        if id_usuario_convidado:
            id_remet = dados_processados.get("id_usuario")
            dados_remetente = selecionar_dados_remetente(id_remet)
            data_atual = datetime.datetime.now()
            data_convite = data_atual.date()
            hora_convite = data_atual.time()
            mensagem_convite = f"{dados_remetente[0]} está te convidando para a equipe {dados_remetente[3]}"

            #envia o convite apenas se houver o id do remetente
            if id_remet:
                dados_convite = (id_remet, id_usuario_convidado, mensagem_convite, hora_convite, data_convite)
                enviar_convite(dados_convite)

                dados_cadastro = {'error': False,
                                  'mensagem': 'Convite enviado com sucesso.'}
            else:
                dados_cadastro = {
                    'error': True,
                    'mensagem': 'Usuário não autenticado. Faça o login novamente.'
                }
        else:
            dados_cadastro = {
                'error': True,
                'mensagem': 'ID do usuário não encontrado. Busque o usuário antes de enviar o convite.'
            }

    # Seleciona o id do plano do usuario logado
    if acao == 'selecionar_plano_id':
        id_usuario = dados_processados.get('id')
        dados_cadastro = selecionarPlanoId(id_usuario)

    #Busca as mensagens do usuario para exibir na tela
    if acao == 'buscar_mensagens':
        id_user = dados_processados.get("id_usuario")
        mensagens = buscar_mensagens(id_user)
        if mensagens:
            dados_cadastro = {"error": False, "mensagens": mensagens}
        else:
            dados_cadastro = {"error": True,
                              "mensagens": "Nenhuma tarefa encontrada!"}


    #Resposta do usuário ao convite (recusar ou aceitar)
    if acao == 'resposta_convite':
        id_mensagem = dados_processados.get('id')
        resposta_mensagem = dados_processados.get('aceito')
        usuario_id = dados_processados.get('id_usuario')
        id_remet_convite = resposta_convite_equipe(resposta_mensagem, id_mensagem).get('id_mensagem')
        id_equipe = buscar_equipe_remetente(id_remet_convite)[0]
        if resposta_mensagem == True:
            email_user = selecionar_dados_cadastro(usuario_id)[0][2]
            salvar_equipe_usuario(id_equipe, email_user)


    # Busca todos os usuários presentes em uma equipe para exibir na tela
    if acao == 'buscar_usuarios_equipe':
        usuario_id = dados_processados.get('usuarioId')
        dados_equipe_user = select_id_equipe_user(usuario_id)
        equipe_user = dados_equipe_user[0]
        cargo_user = dados_equipe_user[2]
        usuarios_da_equipe = selecionar_usuarios_equipe(usuario_id, equipe_user)
        if usuarios_da_equipe:
            dados_cadastro = {"error": False, "usuarios": usuarios_da_equipe, "cargo": cargo_user}
        else:
            dados_cadastro = {"error": True, "usuarios": "Nenhum usuário encontrado. Adicione pessoas a sua equipe", "cargo": cargo_user}

    
    # Expulsar usuário
    # Kaiky
    # Criado em 05/12/24
    # Parametros entrada:
    # acao - string - receber a acao para verificar se deve ser executado este if
    # nome_user_excluido - string - nome do usuario que vai ser excluido
    # Retorno:
    # dados_cadastro - retorna que o usuário foi excluído com sucesso ou houve algum erro
    # Esta condição executa a expulsão de um membro de uma equipe
    if acao == 'expulsar_usuario':
        nome_user_excluido = dados_processados.get('nomeUsuario')
        dados_cadastro = excluir_usuario_equipe(nome_user_excluido)

        

    return listaCriada, dados_tarefa, dados_cadastro


# Função para deletar um usuário
def deletar_usuario(dados):
    if dados.get('acao') == 'excluir_usuario':
        id_deletar = dados.get('id')
        excluir_usuario(id_deletar)
        return {'mensagem': {'delete_status': 'Usuário excluído com sucesso'}}

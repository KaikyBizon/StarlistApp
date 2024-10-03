# validacoes
# Leticia
# Alterado em 01/12/23
# Este componente está sendo importado pelo componente "processamento" para receber e validar os dados enviados

import re
from datetime import datetime

# validaremail
# davi
# 01/12/2023
# Alterações:19/09/24
# Autor da alteração: Nathan
# parametros de entrada
# email-string-validar email
# retorno
# atendendo as caracteristicas das caracteres
# Esse código contém uma função chamada validar_email que utiliza expressões regulares para verificar se um endereço de e-mail
# está em um formato válido. Essa função tem como objetivo retornar um dicionário indicando se o e-mail é válido ou não.


def validar_email(email):
    # Verifica se o campo de e-mail está vazio
    if not email.strip():
        return {'erro': True, 'mensagem_email': 'E-mail inválido. Formato incorreto.'}

    # Verifica se há múltiplos @
    if email.count('@') != 1:
        return {'erro': True, 'mensagem_email': 'E-mail inválido. Apenas um "@" é permitido.'}

    # Divide o e-mail em partes
    parte_local, dominio = email.split('@', 1)

    # Verifica se a parte local tem apenas caracteres especiais
    if not re.search(r'[a-zA-Z0-9]', parte_local):
        return {'erro': True, 'mensagem_email': 'E-mail inválido. A parte local não pode conter apenas caracteres especiais.'}

    # Validação da parte local para pontos
    if parte_local.startswith('.') or parte_local.endswith('.'):
        return {'erro': True, 'mensagem_email': 'E-mail inválido. A parte local não pode começar ou terminar com um ponto.'}
    if '..' in parte_local:
        return {'erro': True, 'mensagem_email': 'E-mail inválido. A parte local não pode conter pontos consecutivos.'}

    # Validação da parte local para hífen
    if parte_local.startswith('-') or parte_local.endswith('-'):
        return {'erro': True, 'mensagem_email': 'E-mail inválido. A parte local não pode começar ou terminar com hífen.'}

    # Valida o domínio
    if dominio.startswith('-'):
        return {'erro': True, 'mensagem_email': 'E-mail inválido. O domínio não pode começar com hífen.'}
    if dominio.endswith('-'):
        return {'erro': True, 'mensagem_email': 'E-mail inválido. O domínio não pode terminar com hífen.'}
    if dominio.startswith('.'):
        return {'erro': True, 'mensagem_email': 'E-mail inválido. O domínio não pode começar com um ponto.'}
    if dominio.endswith('.'):
        return {'erro': True, 'mensagem_email': 'E-mail inválido. O domínio não pode terminar com um ponto.'}

    # Verifica se não há hífens ou pontos duplicados no domínio
    if '--' in dominio:
        return {'erro': True, 'mensagem_email': 'E-mail inválido. O domínio não pode ter hífens duplos.'}
    if '..' in dominio:
        return {'erro': True, 'mensagem_email': 'E-mail inválido. O domínio não pode ter pontos duplos.'}

    # Utilizando uma expressão regular para validar o formato básico do e-mail
    padrao_email = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(padrao_email, email):
        return {'erro': True, 'mensagem_email': 'E-mail inválido. Formato incorreto.'}

    return {'erro': False, 'mensagem_email': ''}

# validar_nome
# Nathan de Oliveira Costa
# 01/12/23
# Alteração: 19/09/24
# parametros de entrada: nome - string - recebe nome do usuário e faz a validção (mais de 3 caracteres e sobrenome)
# Retorna "erro : True" quando, nome inserido no campo "Nome" não atende os requisitos (mais de 3 caracteres e sobrenome), aparece menssagem de erro
# Retorna "erro : False" quando, nome inserido no campo "Nome" atende os requisitos (mais de 3 caracteres e sobrenome), não aparece menssagem  de erro
# Função que irá validar nome de usuário, se correto, não aparecerá mensagem, se incorreto, aparecerá a mensagem de erro.


def validar_nome(nome):
    # Verificar se o nome tem ao menos 3 caracteres e contém espaço (nome e sobrenome)
    if len(nome) < 3 or ' ' not in nome:
        return {'erro': True, 'mensagem_nome': 'O nome deve conter ao menos 3 caracteres e sobrenome.'}

    # Dividir o nome completo em partes (nome e sobrenomes)
    partes_nome = nome.split()

    # Verificar cada parte do nome (nome e sobrenome)
    for parte in partes_nome:
        if len(parte) > 1 and parte[0].lower() == parte[1].lower():
            return {'erro': True, 'mensagem_nome': 'Nome ou sobrenome não podem iniciar com letras iguais.'}

        # Verificar se há caracteres especiais ou acentos
        if not re.match(r'^[a-zA-ZÀ-ÿ\s]+$', parte):
            return {'erro': True, 'mensagem_nome': 'O nome pode conter apenas letras.'}

    # Verificar se há três ou mais letras repetidas consecutivamente, ignorando maiúsculas/minúsculas
    if re.search(r'(.)\1{2,}', nome, re.IGNORECASE):
        return {'erro': True, 'mensagem_nome': 'O nome não pode conter 3 letras repetidas em sequência.'}

    return {'erro': False, 'mensagem_nome': ''}

# validar_senha
# Letícia Bueno e Thainá
# 01/12/2023
# Parâmetros entrada
# senha-string-A senha fornecida pelo usuário.
# confirmar-string- A senha de confirmação fornecida pelo usuário.


def validar_senha(senha):
    # Garantir que a senha contenha pelo menos um caractere maiúsculo, um minúsculo, um número, um caractere especial e no mínimo 8 caracteres
    if not any(c.isupper() for c in senha) or not any(c.islower() for c in senha) or not any(c.isdigit() for c in senha) or not any(c in "!@#$%^&*()-_=+[]{}|;:'\",.<>/?`~" for c in senha) or len(senha) < 3:
        # Retorno
        # erro-string-Retorna quando a senha não atende aos requisitos especifícos
        # erro-string-Retorna quando a senha atende as requisitos específicos
        return {'erro': True, 'mensagem_senha': 'A senha deve atender aos requisitos específicos'}
    return {'erro': False, 'mensagem_senha': ''}


def confirmar_senha(senha, confirme):
    # Garantir que o campo confirmar senha esteja igual ao da senha
    if confirme != senha:
        # Retorno
        # erro-string-Retorna quando o campo confirmar senha não estiver igual ao da senha
        # erro-string-Retorna quando o campo confirmar senha estiver igual ao da senha
        return {'erro': True, 'mensagem_confirmar': 'Este campo deve ser igual ao da senha.'}
    return {'erro': False, 'mensagem_confirmar': ''}

# validar_data_nascimento
# Kaiky
# Criado em 01/12/23
# Esta função verifica a data de nascimento inserida em um input, verificando dia, ano e mes
# Parametros entrada
# data_nascimento - string - receber a data de nascimento no formato "YYYY-MM-DD"
# Retorno
# erro - string - retornar algum erro caso tenha
# Esta função verifica a data de nascimento de uma pessoa e caso ela tenha menos de 15 anos, irá retornar um erro


def validar_data_nascimento(dataNascimento):
    try:
        # Converter a string para o formato de data
        data_nasc = datetime.strptime(dataNascimento, '%Y-%m-%d')

        # Definir a data mínima permitida (01/01/1900)
        data_minima = datetime.strptime('1900-01-01', '%Y-%m-%d')

        # Verificar se a data é anterior a 01/01/1900
        if data_nasc < data_minima:
            return {'erro': True, 'mensagem_idade': 'A data de nascimento não pode ser anterior a 01/01/1900.'}

        # Calcular a idade apenas pelo ano
        idade = datetime.now().year - data_nasc.year

        # Verificar se a pessoa ainda não fez aniversário neste ano, subtrair 1 da idade
        if (datetime.now().month < data_nasc.month) or (datetime.now().month == data_nasc.month and datetime.now().day < data_nasc.day):
            idade -= 1

        # Verificar se a pessoa tem menos de 15 anos
        if idade < 15:
            return {'erro': True, 'mensagem_idade': 'Você deve ter pelo menos 15 anos.'}

        return {'erro': False, 'mensagem_idade': ''}

    except ValueError:
        return {'erro': True, 'mensagem_idade': 'Data de nascimento inválida.'}

# validar_plano
# Gabriel
# Criado em 03/09/24
# Parâmetros de entrada: plano - string - O plano selecionado pelo usuário.
# Retorno: erro retorna True se o plano for inválido, caso contrário, False.
# Mensagem de erro aparece se o plano não atender aos requisitos.
# Esta função valida o plano selecionado. Verifica se o plano está na lista de planos válidos.
# Se o plano não estiver na lista, retorna um erro e uma mensagem de erro.
# Se o plano for válido, retorna False para erro e uma mensagem vazia.

def validar_plano(plano):
    planos_validos = ['gratuito', 'mensal', 'anual', 'empresarial']
    if plano not in planos_validos:
        return {'erro': True, 'mensagem_plano': 'Por favor, selecione um plano válido.'}
    return {'erro': False, 'mensagem_plano': ''}

# validar_cnpj
# Nathan
# Criado em 05/09/24
# Esta função faz com que apenas números sejam permitidos no campo CNPJ, verifica se possui 14 caracteres e faz o cálculo dos 2 digitos verificadores
# Parâmetros de entrada:
# cnpj - string - recebe o CNPJ no formato "XX.XXX.XXX/XXXX-XX" ou sem pontuação, apenas números
# Retorno:
# erro retorna True se o CNPJ for inválido, e uma mensagem explicando o erro ou confirmando a validade.
# Esta função remove os caracteres não numéricos do CNPJ, valida o número de dígitos,
# e realiza os cálculos dos dígitos verificadores. Caso o CNPJ não seja válido, retorna um erro.


def validar_cnpj(cnpj):
    # Remove qualquer caractere não numérico
    cnpj = re.sub(r'\D', '', cnpj)

    # Verifica se o CNPJ tem 14 dígitos
    if len(cnpj) != 14:
        return {'erro': True, 'mensagem_cnpj': 'CNPJ deve conter 14 dígitos.'}

    # Cálculo dos dois dígitos verificadores do CNPJ
    def calcular_digito(cnpj, peso):
        soma = 0
        for i in range(len(peso)):
            soma += int(cnpj[i]) * peso[i]
        resto = soma % 11
        return 0 if resto < 2 else 11 - resto

    # Pesos para cálculo do primeiro e segundo dígitos verificadores
    peso1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    peso2 = [6] + peso1

    # Verifica o primeiro dígito verificador
    digito1 = calcular_digito(cnpj[:12], peso1)
    if digito1 != int(cnpj[12]):
        return {'erro': True, 'mensagem_cnpj': 'CNPJ inválido.'}

    # Verifica o segundo dígito verificador
    digito2 = calcular_digito(cnpj[:13], peso2)
    if digito2 != int(cnpj[13]):
        return {'erro': True, 'mensagem_cnpj': 'CNPJ inválido.'}
    return {'erro': False, 'mensagem_cnpj': ''}

# validar_nome_equipe
# Nathan
# Criado em 05/09/2024
# Esta função verifica se o nome da equipe tem o comprimento mínimo necessário
# Parâmetros de entrada:
# nome_equipe - string - recebe o nome da equipe como input
# Retorno:
# erro retorna True se o nome for inválido, e uma mensagem explicando o erro ou confirmando a validade.
# Esta função verifica se o nome da equipe contém pelo menos 2 caracteres. Caso não atenda a esse critério, retorna um erro.


def validar_nome_equipe(nome_equipe):
    # Verifica se o nome da equipe tem pelo menos 2 caracteres
    if len(nome_equipe) < 2:
        return {'erro': True, 'mensagem_nome_equipe': 'O nome da equipe deve conter 2 ou mais caracteres.'}
    return {'erro': False, 'mensagem_nome_equipe': ''}


# validar_numero_participantes
# Nathan
# Criado em 05/09/2024
# Esta função verifica se o número de participantes é válido e maior que zero
# Parâmetros de entrada:
# numero_participantes - string - recebe o número de participantes como input
# Retorno:
# erro retorna True se o número for inválido, e uma mensagem explicando o erro ou confirmando a validade.
# Esta função primeiro verifica se o campo está vazio e se o valor inserido é maior que 0. Caso contrário, retorna um erro.
def validar_numero_participantes(numero_participantes):
    # Verifica se o campo está vazio
    if not numero_participantes:
        return {'erro': True, 'mensagem_numero_participantes': 'Você deve definir o número de participantes.'}

    # Verifica se o número de participantes é igual a 0
    if int(numero_participantes) <= 0:
        return {'erro': True, 'mensagem_numero_participantes': 'O número de participantes deve ser no mínimo 1.'}

    return {'erro': False, 'mensagem_numero_participantes': ''}


# validar_cargo
# Nathan
# Criado em 05/09/2024
# Esta função verifica se o cargo selecionado é válido
# Parâmetros de entrada:
# cargo - string - recebe o cargo selecionado como input
# Retorno:
# erro retorna True se o cargo for inválido,e uma mensagem explicando o erro ou confirmando a validade.
# Esta função verifica se o cargo inserido está dentro da lista de cargos válidos (Líder ou Colaborador).
# Caso contrário, retorna um erro.
def validar_cargo(cargo):
    cargos_validos = ['Líder', 'Colaborador']

    if cargo not in cargos_validos:
        return {'erro': True, 'mensagem_cargo': 'Você precisa escolher um cargo.'}
    return {'erro': False, 'mensagem_cargo': ''}

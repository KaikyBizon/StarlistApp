# validacoes
# Leticia
# Alterado em 01/12/23
# Este componente está sendo importado pelo componente "processamento" para receber e validar os dados enviados

import re
from datetime import datetime

# validaremail
# davi
# 01/12/2023
# parametros de entrada
# email-string-validar email
# retorno
# atendendo as caracteristicas das caracteres
# Esse código contém uma função chamada validar_email que utiliza expressões regulares para verificar se um endereço de e-mail
# está em um formato válido. Essa função tem como objetivo retornar um dicionário indicando se o e-mail é válido ou não.


def validar_email(email):
    # Utilizando uma expressão regular simples para validar o formato do e-mail
    padrao_email = r'^\S+@\S+\.\S+$'
    if not re.match(padrao_email, email):
        return {'erro': True, 'mensagem_email': 'E-mail inválido.'}
    return {'erro': False, 'mensagem_email': ''}

# validar_nome
# Nathan de Oliveira Costa
# 01/12/23
# parametros de entrada: nome - string - recebe nome do usuário e faz a validção (mais de 3 caracteres e sobrenome)
# Retorna "erro : True" quando, nome inserido no campo "Nome" não atende os requisitos (mais de 3 caracteres e sobrenome), aparece menssagem de erro
# Retorna "erro : False" quando, nome inserido no campo "Nome" atende os requisitos (mais de 3 caracteres e sobrenome), não aparece menssagem  de erro
# Função que irá validar nome de usuário, se correto, não aparecerá mensagem, se incorreto, aparecerá a mensagem de erro.


def validar_nome(nome):
    if len(nome) < 3 or ' ' not in nome:
        return {'erro': True, 'mensagem_nome': 'O nome deve conter ao menos 3 caracteres e sobrenome.'}
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
        return {'erro': True, 'mensagem_confirmar': 'Este campo deve ser igual ao anterior.'}
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
        data_nasc = datetime.strptime(dataNascimento, '%Y-%m-%d')
        # verifica a idade apenas pelo ano
        idade = datetime.now().year - data_nasc.year

        # se a pessoa ainda nao fez aniversario neste ano, retira 1 da idade
        if datetime.now().month < data_nasc.month:
            idade -= 1
        elif datetime.now().month == data_nasc.month:
            if datetime.now().day < data_nasc.day:
                idade -= 1

        # se a pessoa tiver menos de 15 anos, retorna um erro
        if idade < 15:
            return {'erro': True, 'mensagem_idade': 'Você deve ter pelo menos 15 anos.'}
        return {'erro': False, 'mensagem_idade': ''}
    except ValueError:
        return {'erro': True, 'mensagem_idade': 'Data de nascimento inválida.'}

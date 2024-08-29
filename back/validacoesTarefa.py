#validações das tarefas
#Gabriel
#Criado em 22/08/24

from datetime import datetime

# validar_titulo
# Gabriel
# 22/08/24
# parametros de entrada: titulo - string - recebe o titulo da tarefa e faz a validção (mais de 3 caracteres)
# Retorna "erro : True" quando, titulo inserido no campo "Titulo" não atende os requisitos (mais de 3 caracteres), aparece menssagem de erro
# Retorna "erro : False" quando, titulo inserido no campo "Titulo" atende os requisitos (mais de 3 caracteres), não aparece menssagem  de erro
# Função que irá validar o titulo da tarefa, se correto, não aparecerá mensagem, se incorreto, aparecerá a mensagem de erro.

def validar_titulo(titulo):
    if len(titulo) < 3:
        return {'erro': True, 'mensagem_titulo': 'O titulo deve conter ao menos 3 caracteres.'}
    return {'erro': False, 'mensagem_titulo': ''}


# validar_descricao
# Gabriel
# 22/08/24
# parametros de entrada: descricao - string - recebe a descricao da tarefa e faz a validção (mais de 3 caracteres)
# Retorna "erro : True" quando, descricao inserido no campo "Descrição" não atende os requisitos (mais de 3 caracteres), aparece menssagem de erro
# Retorna "erro : False" quando, descricao inserido no campo "Descrição" atende os requisitos (mais de 3 caracteres), não aparece menssagem  de erro
# Função que irá validar a descricao da tarefa, se correto, não aparecerá mensagem, se incorreto, aparecerá a mensagem de erro.

def validar_descricao(descricao):
    if len(descricao) < 3:
        return {'erro': True, 'mensagem_descricao': 'a descrição deve conter ao menos 3 caracteres.'}
    return {'erro': False, 'mensagem_descricao': ''}

# validar_etiqueta
# Gabriel
# 22/08/24
# parametros de entrada: etiqueta - string - recebe a etiqueta da tarefa e faz a validção (Deve selecionar uma etiqueta)
# Retorna "erro : True" quando, etiqueta não é selecionado no campo "Etiqueta", aparece menssagem de erro
# Retorna "erro : False" quando, etiqueta é selecionado no campo "Etiqueta", não aparece menssagem  de erro
# Função que irá validar a etiqueta da tarefa, se selecionado, não aparecerá mensagem, se não, aparecerá a mensagem de erro.

def validar_etiqueta(etiqueta):
    if not etiqueta or etiqueta == 'Selecione uma etiqueta':
        return {'erro': True, 'mensagem_etiqueta': 'Precisa colocar uma etiqueta'}
    return {'erro': False, 'mensagem_etiqueta': ''}


# validar_data
# Gabriel
# 22/08/24
# parametros de entrada: data - date - recebe a data da tarefa e faz a validção (Deve ser o dia de hoje ou posteriores)
# Retorna "erro : True" quando, data é selecionado dias anteriores ao dia de hoje no campo "Data", aparece menssagem de erro
# Retorna "erro : False" quando, data é selecionado o dia de hoje ou posteriores  no campo "Data", não aparece menssagem  de erro
# Função que irá validar a data da tarefa, se selecionado corretamente, não aparecerá mensagem, se não, aparecerá a mensagem de erro.

def validar_data(data):

    data_selecionada = datetime.strptime(data, '%d/%m/%y').date()

    # Obtém a data atual
    data_atual = datetime.now().date()
    
    # Verifica se a data selecionada é anterior à data atual
    if data_selecionada < data_atual:
        return {'erro': True, 'mensagem_data': 'A data não pode ser anterior ao dia de hoje.'}
    return {'erro': False, 'mensagem_data': ''}


# validar_horario
# Gabriel
# 22/08/24
# parametros de entrada: horario - time - recebe o horario da tarefa e faz a validção (Deve ser um horario posterior ao atual)
# Retorna "erro : True" quando, a hora selecionada é anterior ao horario atual, aparece menssagem de erro
# Retorna "erro : False" quando, a hora selecionada é posterior ao horario atual, não aparece menssagem  de erro
# Função que irá validar o horario da tarefa, se selecionado corretamente, não aparecerá mensagem, se não, aparecerá a mensagem de erro.


def validar_horario(horario):
    try:
        # Converte o horário selecionado para um objeto datetime com a data atual
        hora_selecionada = datetime.strptime(horario, '%H:%M').replace(
            year=datetime.now().year, 
            month=datetime.now().month, 
            day=datetime.now().day
        )
        
        # Obtém o horário atual
        hora_atual = datetime.now().replace(microsecond=0, second=0, minute=0)
        
        # Verifica se a hora selecionada é anterior ao momento atual
        if hora_selecionada < hora_atual:
            return {'erro': True, 'mensagem_horario': 'O horário não pode ser anterior ao horário atual.'}
        
        return {'erro': False, 'mensagem_horario': ''}
    
    except ValueError:
        return {'erro': True, 'mensagem_horario': 'Formato de hora inválido.'}



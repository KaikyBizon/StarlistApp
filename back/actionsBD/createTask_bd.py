import conexao


def criarTarefa(tarefa, equipe_user):
    conex = conexao.conectar()
    cursor = conex.cursor()

    # Verifica a condição para incluir o campo ID_EQUIPE
    if equipe_user[1] == 4:
        sql = """INSERT INTO tarefa 
                 (TITULO, TEXTO, DATA_TASK, HORA, ETIQUETA, ID_LISTA, ID_USUARIO, ID_EQUIPE) 
                 VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"""
        val = (*tarefa, equipe_user[0])  # Adiciona equipe_user[0] aos valores
    else:
        sql = """INSERT INTO tarefa 
                 (TITULO, TEXTO, DATA_TASK, HORA, ETIQUETA, ID_LISTA, ID_USUARIO) 
                 VALUES (%s, %s, %s, %s, %s, %s, %s)"""
        val = tarefa  # Usa os valores originais

    cursor.execute(sql, val)
    conex.commit()
    conex.close()

    return {'erro': False, 'mensagem_cadastro': 'Tarefa criada com sucesso.'}

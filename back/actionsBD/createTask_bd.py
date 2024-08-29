import conexao


def criarTarefa(tarefa):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "INSERT INTO tarefa (TITULO, TEXTO, DATA_TASK, HORA, ETIQUETA, ID_LISTA, ID_USUARIO) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    val = (tarefa)
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {'erro': False, 'mensagem_cadastro': 'Tarefa criada com sucesso.'}
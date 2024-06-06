import conexao


def criarTarefa():
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "INSERT INTO usuario ( TITULO, TEXTO, DATA_TASK, HORA) VALUES (%s, %s, %s, %s)"
    cursor.execute(sql)
    conex.commit()
    conex.close()
    return {'erro': False, 'mensagem_cadastro': 'Tarefa criada com sucesso.'}

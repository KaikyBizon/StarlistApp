import conexao


def criarLista(lista):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "INSERT INTO lista (NOME, ID_TAREFA) VALUES (%s, %s)"
    val = (lista)
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {'erro': False, 'mensagem_cadastro': 'Lista criada com sucesso.'}
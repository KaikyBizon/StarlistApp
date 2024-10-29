import conexao


def select_all_tasks(id_usuario):
    print("ID usuario: ", id_usuario)
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT * tarefas WHERE ID_USUARIO = %s"
    val = (id_usuario, )
    cursor.execute(sql, val)
    dados_usuario = cursor.fetchall()
    conex.close()
    print(dados_usuario)
    return dados_usuario

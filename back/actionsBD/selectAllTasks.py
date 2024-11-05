import conexao


def select_all_tasks(id_usuario):
    print("ID usuario: ", id_usuario)
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT DATA_TASK FROM tarefa WHERE ID_USUARIO = %s"
    val = (id_usuario, )
    cursor.execute(sql, val)
    dados_tarefa = cursor.fetchall()
    conex.close()
    #print(dados_tarefa)
    return dados_tarefa

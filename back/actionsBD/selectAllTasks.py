import conexao


def select_all_tasks(usuario_id, equipe_user):
    conex = conexao.conectar()
    cursor = conex.cursor()

    # Define a query com base no valor de equipe_user[1]
    if equipe_user[1] == 4:
        sql = "SELECT DATA_TASK FROM tarefa WHERE ID_EQUIPE = %s"
        val = (equipe_user[0], )  # Usa o ID da equipe
    else:
        sql = "SELECT DATA_TASK FROM tarefa WHERE ID_USUARIO = %s"
        val = (usuario_id, )  # Usa o ID do usuário

    cursor.execute(sql, val)
    dados_tarefa = cursor.fetchall()
    conex.close()

    return dados_tarefa

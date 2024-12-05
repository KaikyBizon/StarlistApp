import conexao


def selecionar_dados_tarefa(usuario_id, dataTarefas, equipe_user):
    print(usuario_id, dataTarefas, equipe_user)
    conex = conexao.conectar()
    cursor = conex.cursor()

    # Define a query com base no valor de equipe_user[1]
    if equipe_user[1] == 4:
        sql = """
            SELECT DISTINCT tarefa.TITULO, tarefa.ETIQUETA, tarefa.TEXTO,
                            DATE_FORMAT(tarefa.DATA_TASK, '%d/%m/%Y') as data,
                            DATE_FORMAT(tarefa.HORA, '%H:%i') as horario, tarefa.ID
            FROM tarefa
            JOIN usuario ON usuario.ID = tarefa.ID_USUARIO
            WHERE tarefa.ID_EQUIPE = %s
              AND tarefa.DATA_TASK = %s
            ORDER BY tarefa.HORA
        """
        val = (equipe_user[0], dataTarefas)  # Inclui o ID_EQUIPE como parâmetro
    else:
        sql = """
            SELECT DISTINCT tarefa.TITULO, tarefa.ETIQUETA, tarefa.TEXTO,
                            DATE_FORMAT(tarefa.DATA_TASK, '%d/%m/%Y') as data,
                            DATE_FORMAT(tarefa.HORA, '%H:%i') as horario, tarefa.ID
            FROM tarefa
            JOIN usuario ON usuario.ID = tarefa.ID_USUARIO
            WHERE tarefa.ID_USUARIO = %s
              AND tarefa.DATA_TASK = %s
            ORDER BY tarefa.HORA
        """
        val = (usuario_id, dataTarefas)  # Apenas o ID_USUARIO e data

    cursor.execute(sql, val)
    dados_tarefa = cursor.fetchall()
    conex.close()

    print(dados_tarefa)
    return dados_tarefa

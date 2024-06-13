import conexao


def selecionar_dados_tarefa(usuario_id):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT DISTINCT tarefa.TITULO, DATE_FORMAT(tarefa.DATA_TASK, '%Y-%m-%d'), DATE_FORMAT(tarefa.HORA, '%H:%i') FROM tarefa JOIN usuario ON usuario.ID = tarefa.ID_USUARIO WHERE tarefa.ID_USUARIO = %s"
    val = (usuario_id)
    cursor.execute(sql, val)
    dados_tarefa = cursor.fetchall()
    conex.close()
    return dados_tarefa

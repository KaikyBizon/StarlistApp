import conexao


def selecionar_dados_tarefa(id_usuario):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT DISTINCT tarefa.TITULO, DATE_FORMAT(tarefa.DATA_TASK, '%Y-%m-%d') as data, DATE_FORMAT(tarefa.HORA, '%H:%i') as data2 FROM tarefa JOIN usuario ON usuario.ID = tarefa.ID_USUARIO WHERE tarefa.ID_USUARIO = %s"
    val = (id_usuario,)
    cursor.execute(sql, val)
    dados_tarefa = cursor.fetchall()
    conex.close()
    return dados_tarefa

import conexao


def selecionar_dados_tarefa(id_usuario):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT DISTINCT tarefa.TITULO, tarefa.ETIQUETA, tarefa.TEXTO, DATE_FORMAT(tarefa.DATA_TASK, '%d/%m/%Y') as data, DATE_FORMAT(tarefa.HORA, '%H:%i') as horario, tarefa.ID FROM tarefa JOIN usuario ON usuario.ID = tarefa.ID_USUARIO WHERE tarefa.ID_USUARIO = %s"
    val = (id_usuario,)
    cursor.execute(sql, val)
    dados_tarefa = cursor.fetchall()
    conex.close()
    return dados_tarefa

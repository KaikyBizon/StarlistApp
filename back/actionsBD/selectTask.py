import conexao


def selecionar_dados_tarefa(id_usuario, dataTarefas):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT DISTINCT tarefa.TITULO, tarefa.ETIQUETA, tarefa.TEXTO, DATE_FORMAT(tarefa.DATA_TASK, '%d/%m/%Y') as data, DATE_FORMAT(tarefa.HORA, '%H:%i') as horario, tarefa.ID FROM tarefa JOIN usuario ON usuario.ID = tarefa.ID_USUARIO WHERE tarefa.ID_USUARIO = %s AND tarefa.DATA_TASK = %s ORDER BY tarefa.HORA"
    val = (id_usuario, dataTarefas)
    cursor.execute(sql, val)
    dados_tarefa = cursor.fetchall()
    conex.close()
    print(dados_tarefa)
    return dados_tarefa

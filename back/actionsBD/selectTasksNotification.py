import conexao

def tarefas_notificacao(now_date_str, now_time_str, one_minute_later_time):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT ID, TITULO, DATE_FORMAT(tarefa.HORA, '%H:%i') FROM tarefa WHERE DATA_TASK = %s AND HORA BETWEEN %s AND %s"
    val = (now_date_str, now_time_str, one_minute_later_time)
    cursor.execute(sql, val)
    notificacoes = cursor.fetchall()
    conex.close()
    return notificacoes
import conexao

def editar_tarefa(tarefa):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = f"UPDATE tarefa SET TITULO = %s, TEXTO = %s, ETIQUETA = %s, DATA_TASK = %s, HORA = %s WHERE ID = %s"
    val = (tarefa)
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {'erro': False, 'mensagem_alter': 'Alteração realizada com sucesso.'}
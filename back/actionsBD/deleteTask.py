import conexao

def excluir_tarefa(id_tarefa):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "DELETE FROM tarefa WHERE ID = %s"
    val = (id_tarefa,)
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {'erro': False, 'excluir_tarefa': 'Tarefa excluída!'}
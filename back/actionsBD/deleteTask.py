import conexao

def excluir_tarefa(id_tarefa, lista_id):
    print(id_tarefa, lista_id)
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "DELETE FROM tarefa WHERE ID = %s AND ID_LISTA = %s"
    val = (id_tarefa, lista_id)
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {'erro': False, 'excluir_tarefa': 'Tarefa excluída!'}
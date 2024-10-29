import conexao

def editar_tarefa(tarefa):
    print('tarefa: ', tarefa)
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = f"UPDATE tarefa SET TITULO = %s, TEXTO = %s,  DATA_TASK = %s, HORA = %s, ETIQUETA = %s WHERE ID_LISTA = %s AND ID = %s"
    val = (tarefa)
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {'erro': False, 'mensagem_alter': 'Alteração realizada com sucesso.'}
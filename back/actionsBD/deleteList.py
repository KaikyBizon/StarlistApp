import conexao

def excluir_lista(id_lista):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "DELETE FROM lista WHERE ID = %s"
    val = (id_lista,)
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {'erro': False, 'excluir_lista': 'Lista excluída!'}
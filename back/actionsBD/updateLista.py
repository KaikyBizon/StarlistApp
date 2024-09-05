import conexao

def updateLista(lista):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = f"UPDATE lista SET NOME = %s WHERE ID = %s"
    val = (lista)
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {'erro': False, 'mensagem_alter': 'Alteração realizada com sucesso.'}
import conexao

def atualizar_cadastro(alteracao):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = f"UPDATE usuario SET DATA_NASC = %s, NOME_USUARIO = %s, EMAIL = %s WHERE ID = %s"
    val = (alteracao)
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {'erro': False, 'mensagem_alter': 'Alteração realizada com sucesso.'}
import conexao

def select_atualizar(id):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT EMAIL, NOME_USUARIO, DATE_FORMAT(DATA_NASC, '%Y-%m-%d') FROM usuario WHERE ID = %s"
    val = (id,)
    cursor.execute(sql, val)
    result = cursor.fetchone()
    conex.close()
    return result

def atualizar_cadastro(alteracao):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = f"UPDATE usuario SET DATA_NASC = %s, NOME_USUARIO = %s, EMAIL = %s WHERE ID = %s"
    val = (alteracao)
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {'erro': False, 'mensagem_alter': 'Alteração realizada com sucesso.'}
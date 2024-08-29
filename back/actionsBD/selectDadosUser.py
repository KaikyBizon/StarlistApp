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
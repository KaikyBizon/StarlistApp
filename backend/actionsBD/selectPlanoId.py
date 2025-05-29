import conexao

def selecionarPlanoId(id_usuario):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT PLANO_ID from usuario WHERE ID = %s"
    val = (id_usuario,)
    cursor.execute(sql, val)
    plano_usuario = cursor.fetchone()
    conex.close()
    return plano_usuario

import conexao


def buscar_usuario_convite(email_convite):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT ID, NOME_USUARIO FROM usuario WHERE EMAIL = %s"
    val = (email_convite, )
    cursor.execute(sql, val)
    dados_usuario = cursor.fetchone()
    conex.close()
    return dados_usuario

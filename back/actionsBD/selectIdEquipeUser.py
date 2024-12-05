import conexao


def select_id_equipe_user(usuario_id):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT ID_EQUIPE, PLANO_ID FROM usuario WHERE ID = %s"
    val = (usuario_id, )
    cursor.execute(sql, val)
    dados_usuario = cursor.fetchone()
    conex.close()
    print(dados_usuario)
    return dados_usuario

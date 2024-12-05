import conexao

def selecionar_usuarios_equipe(usuario_id, equipe_user):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT NOME_USUARIO FROM usuario WHERE ID_EQUIPE = %s AND ID <> %s"
    val = (equipe_user, usuario_id)
    cursor.execute(sql, val)
    usuariosNaEquipe = cursor.fetchall()
    conex.close()
    return usuariosNaEquipe
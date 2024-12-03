import conexao


def buscar_mensagens(id_user):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT ID, TXT_MSG FROM mensagens WHERE ID_DEST = %s ORDER BY data_envio, hora_envio"
    val = (id_user, )
    cursor.execute(sql, val)
    dados_mensagens = cursor.fetchall()
    conex.close()
    return dados_mensagens

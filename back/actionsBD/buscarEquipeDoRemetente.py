import conexao

def buscar_equipe_remetente(id_remet_convite):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT ID_EQUIPE FROM usuario WHERE ID = %s AND CARGO = 'lider'"
    val = (id_remet_convite, )
    cursor.execute(sql, val)
    dados_usuario = cursor.fetchone()
    conex.close()
    return dados_usuario
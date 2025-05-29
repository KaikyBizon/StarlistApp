import conexao

def selecionar_dados_cadastro(usuario_id):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT DATE_FORMAT(DATA_NASC, '%d/%m/%Y'), NOME_USUARIO, EMAIL, SENHA FROM usuario WHERE ID = %s"
    val = (usuario_id, )
    cursor.execute(sql, val)
    dados_usuario = cursor.fetchall()
    conex.close()
    return dados_usuario
import conexao

def selecionar_dados_lista2(id_usuario):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT DISTINCT lista.NOME, lista.ID FROM lista JOIN usuario ON usuario.ID = lista.ID_USUARIO WHERE lista.ID_USUARIO = %s"
    val = (id_usuario,)
    cursor.execute(sql, val)
    listaCriada = cursor.fetchall()
    conex.close()
    return listaCriada
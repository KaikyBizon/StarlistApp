import conexao

def excluir_usuario(id_deletar):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "DELETE FROM USUARIO WHERE ID = %s"
    val = (id_deletar,)
    cursor.execute(sql, val)
    conex.commit()
    print("Usuario excluído com sucesso")
    conex.close()
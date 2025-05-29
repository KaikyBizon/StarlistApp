import conexao

def selecionarPlanos(nome_plano):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT ID from plano WHERE NOME_PLANO = %s"
    val = (nome_plano,)
    cursor.execute(sql, val)
    plano = cursor.fetchall()
    conex.close()
    return plano
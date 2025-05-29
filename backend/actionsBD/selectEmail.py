import conexao


def selecionar_email():
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = 'SELECT EMAIL from usuario'
    cursor.execute(sql,)
    emails = cursor.fetchall()
    conex.close()
    return [email[0] for email in emails]

import conexao

def salvar_equipe_usuario(id_equipe, email_user):
    print(id_equipe, email_user)
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE usuario SET ID_EQUIPE = %s WHERE EMAIL = %s"
    val = (id_equipe, email_user)
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {'erro': False, 'mensagem_alter': 'Resposta salva com sucesso.'}
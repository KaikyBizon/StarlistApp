import conexao


def excluir_usuario_equipe(nome_user_excluido):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = f"UPDATE usuario SET ID_EQUIPE = NULL WHERE NOME_USUARIO = %s"
    val = (nome_user_excluido, )
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {'erro': False, 'mensagem_alter': 'Usuário excluído com sucesso.'}

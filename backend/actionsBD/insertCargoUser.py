import conexao


def inserirCargo(equipe_user, lider):
    conex = conexao.conectar()
    cursor = conex.cursor()

    if lider:
        # Atualiza `cargo` e `id_equipe` para lider
        sql = 'UPDATE `usuario` SET `CARGO` = %s, `ID_EQUIPE` = %s WHERE EMAIL = %s'
        val = (equipe_user)  # Exemplo: ('lider', 1, 'email@dominio.com')
    else:
        # Atualiza apenas `cargo` para colaborador
        sql = 'UPDATE `usuario` SET `CARGO` = %s WHERE EMAIL = %s'
        val = (equipe_user)  # Exemplo: ('colaborador', 'email@dominio.com')

    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {'erro': False, 'mensagem_alter': 'Cargo inserido!'}

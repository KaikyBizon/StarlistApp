import conexao

def inserirCargo(cargo, email_user):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = 'UPDATE `usuario` SET `CARGO` = %s WHERE EMAIL = %s'
    val = (cargo, email_user)
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {'erro': False, 'mensagem_alter': 'Cargo inserido!'}

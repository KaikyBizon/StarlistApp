import conexao


def inserir_usuario(cadastro):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "INSERT INTO usuario (DATA_NASC, NOME_USUARIO, EMAIL, SENHA, PLANO_ID, ID_EQUIPE) VALUES (%s, %s, %s, %s, %s, 1)"
    cursor.execute(sql, cadastro)
    conex.commit()
    conex.close()
    return {'erro': False, 'mensagem_cadastro': 'Cadastro realizado com sucesso.'}

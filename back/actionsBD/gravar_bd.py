import conexao


def inserir_usuario(cadastro):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "INSERT INTO usuario (DATA_NASC, NOME_USUARIO, EMAIL, SENHA) VALUES (%s, %s, %s, %s)"
    cursor.execute(sql, cadastro)
    conex.commit()
    print("Usuario cadastrado")
    conex.close()
    return {'erro': False, 'mensagem_cadastro': 'Cadastro realizado com sucesso.'}

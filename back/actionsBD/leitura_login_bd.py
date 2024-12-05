import conexao


def selecionar_dados_cadastro_login(email, senha):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT EMAIL, SENHA, ID, NOME_USUARIO, DATE_FORMAT(DATA_NASC, '%Y-%m-%d') FROM usuario WHERE EMAIL = %s AND SENHA = %s"
    val = (email, senha)
    cursor.execute(sql, val)
    dados_usuario = cursor.fetchone()
    conex.close()
    print(dados_usuario)
    return dados_usuario

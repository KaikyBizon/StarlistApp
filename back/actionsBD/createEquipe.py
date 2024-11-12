import conexao


def cadastroEmpresarial(cadastro_empresarial):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = 'INSERT INTO equipe (CNPJ, NOME_EQUIPE, PESSOA_EQUIPE) VALUES (%s, %s, %s)'
    cursor.execute(sql, cadastro_empresarial)
    conex.commit()

    # Obtendo o ID da equipe criada
    cursor.execute('SELECT LAST_INSERT_ID()')
    equipe_id = cursor.fetchone()[0]

    conex.close()
    return {'erro': False, 'mensagem_cadastro': 'cadastro realizado com sucesso', 'id_equipe': equipe_id}
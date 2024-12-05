import conexao


def criarLista(lista, equipe_user):
    conex = conexao.conectar()
    cursor = conex.cursor()

    if equipe_user[1] == 4:
        # Query com ID_EQUIPE quando a pessoa está em alguma equipe
        sql = "INSERT INTO lista (NOME, ID_USUARIO, ID_EQUIPE) VALUES (%s, %s, %s)"
        val = (lista[0], lista[1], equipe_user[0])
    else:
        # Query padrão quando equipe_user[1] não é igual a 4
        sql = "INSERT INTO lista (NOME, ID_USUARIO) VALUES (%s, %s)"
        val = lista

    cursor.execute(sql, val)
    conex.commit()
    conex.close()

    return {'erro': False, 'mensagem_cadastro': 'Lista criada com sucesso.'}

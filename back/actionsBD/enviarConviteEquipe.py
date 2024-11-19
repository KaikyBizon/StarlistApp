import conexao


def enviar_convite(dados_convite):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "INSERT INTO mensagens (ID_REMET, ID_DEST, TXT_MSG, HORA_ENVIO, DATA_ENVIO, STATUS_MSG) VALUES (%s, %s, %s, %s, %s, %s)"
    val = (dados_convite)
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {'erro': False, 'mensagem_cadastro': 'Tarefa criada com sucesso.'}

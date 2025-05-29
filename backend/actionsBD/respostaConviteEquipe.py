import conexao

def resposta_convite_equipe(resposta_mensagem, id_mensagem):
    conex = conexao.conectar()
    cursor = conex.cursor()

    # Executa o UPDATE
    sql = "UPDATE mensagens SET convite = %s WHERE ID = %s"
    val = (resposta_mensagem, id_mensagem)
    cursor.execute(sql, val)

    # Busca o id do remetente que enviou o convite
    sql_select = "SELECT ID_REMET FROM mensagens WHERE ID = %s"
    cursor.execute(sql_select, (id_mensagem,))
    remet_id = cursor.fetchone()[0]

    conex.commit()
    conex.close()

    return {'erro': False, 'mensagem_alter': 'Resposta salva com sucesso.', 'id_mensagem': remet_id}

import conexao 

def editar_nome_lista(new_name_list, id_lista):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = 'UPDATE lista SET NOME = %s WHERE ID = %s'
    val = (new_name_list, id_lista)
    cursor.execute(sql,val)
    conex.commit()
    conex.close()
    return {'erro': False, 'mensagem_alter': 'Titulo alterado com sucesso'}
    
    
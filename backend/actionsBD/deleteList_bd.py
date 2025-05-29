import conexao

def deleteList_bd(lista_id):
    # Conecta ao banco de dados
    conex = conexao.conectar()
    cursor = conex.cursor()
    
    try:
        # Exclui todas as tarefas associadas à lista
        sql_delete_tarefas = "DELETE FROM tarefa WHERE ID_LISTA = %s"
        cursor.execute(sql_delete_tarefas, (lista_id,))
        
        # Exclui a lista
        sql_delete_lista = "DELETE FROM lista WHERE ID = %s"
        cursor.execute(sql_delete_lista, (lista_id,))
        
        # Confirma as exclusões no banco de dados
        conex.commit()
        
        return {'erro': False, 'mensagem': 'Lista e tarefas associadas excluídas com sucesso!'}

    except Exception as e:
        # Em caso de erro, retorna a mensagem de erro
        return {'erro': True, 'mensagem': str(e)}
    
    finally:
        # Fecha a conexão com o banco de dados
        cursor.close()
        conex.close()


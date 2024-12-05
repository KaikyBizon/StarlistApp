import conexao


def selecionar_dados_lista(id_usuario, equipe_user):
    conex = conexao.conectar()
    cursor = conex.cursor()

    if equipe_user[1] == 4:
        # Query com WHERE ID_EQUIPE
        sql = "SELECT id, nome FROM lista WHERE lista.ID_EQUIPE = %s ORDER BY id"
        val = (equipe_user[0], )
    else:
        # Query padrão
        sql = "SELECT id, nome FROM lista WHERE lista.ID_USUARIO = %s ORDER BY id"
        val = (id_usuario,)

    cursor.execute(sql, val)
    listaCriada = cursor.fetchall()
    conex.close()
    print(listaCriada)
    return listaCriada


def selecionar_lista_tarefa(id_lista, equipe_user):
    conex = conexao.conectar()
    cursor = conex.cursor()

    if equipe_user[1] == 4:
        # Query usando ID_EQUIPE
        sql = """
            SELECT tarefa.id, titulo, etiqueta, texto, 
                   DATE_FORMAT(data_task, '%d/%m/%Y') as data_task, 
                   DATE_FORMAT(hora, '%H:%i') as hora, 
                   id_lista, nome 
            FROM tarefa 
            JOIN lista ON tarefa.id_lista = lista.id 
            WHERE lista.ID_EQUIPE = %s 
            ORDER BY DATA_TASK, HORA
        """
        val = (equipe_user[0],)
    else:
        # Query padrão usando ID_LISTA
        sql = """
            SELECT tarefa.id, titulo, etiqueta, texto, 
                   DATE_FORMAT(data_task, '%d/%m/%Y') as data_task, 
                   DATE_FORMAT(hora, '%H:%i') as hora, 
                   id_lista, nome 
            FROM tarefa 
            JOIN lista ON tarefa.id_lista = lista.id 
            WHERE lista.ID = %s 
            ORDER BY DATA_TASK, HORA
        """
        val = (id_lista,)

    cursor.execute(sql, val)
    listaTarefa = cursor.fetchall()
    conex.close()
    return listaTarefa

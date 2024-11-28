import conexao

def selecionar_dados_lista(id_usuario):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT  id, nome FROM lista  WHERE lista.ID_USUARIO = %s ORDER BY id"
    val = (id_usuario,)
    cursor.execute(sql, val)
    listaCriada = cursor.fetchall()
    conex.close()
    print(listaCriada)
    return listaCriada

def selecionar_lista_tarefa(id_lista):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT tarefa.id, titulo, etiqueta, texto, DATE_FORMAT(data_task, '%d/%m/%Y') as data_task, DATE_FORMAT(hora, '%H:%i') as hora, id_lista, nome FROM tarefa JOIN lista ON tarefa.id_lista = lista.id WHERE lista.ID = %s ORDER BY DATA_TASK, HORA"
    val = (id_lista,)
    cursor.execute(sql, val)
    listaTarefa = cursor.fetchall()
    conex.close()
    return listaTarefa
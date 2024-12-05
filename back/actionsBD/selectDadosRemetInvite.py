import conexao


def selecionar_dados_remetente(id_remet):
    conex = conexao.conectar()
    cursor = conex.cursor()

    try:
        # Primeira consulta para buscar dados do usuário
        sql = "SELECT NOME_USUARIO, ID_EQUIPE, CARGO FROM usuario WHERE ID = %s"
        val = (id_remet,)
        cursor.execute(sql, val)
        dados_usuario = cursor.fetchall()

        # Verifica se há ID_EQUIPE associado e realiza a segunda consulta
        # Verifica se o resultado existe e se há ID_EQUIPE
        if dados_usuario and dados_usuario[0][1]:
            sql = "SELECT NOME_EQUIPE FROM equipe WHERE ID = %s"
            val = (dados_usuario[0][1],)  # Passa o ID_EQUIPE como tupla
            cursor.execute(sql, val)
            equipe = cursor.fetchone()  # Apenas uma equipe deve ser retornada

            # Adiciona o nome da equipe ao resultado
            if equipe:
                # Converte para lista para edição
                dados_usuario = list(dados_usuario[0])
                dados_usuario.append(equipe[0])  # Adiciona o nome da equipe

    except Exception as e:
        print("Erro ao buscar dados:", e)
        return None

    finally:
        cursor.close()
        conex.close()

    return dados_usuario

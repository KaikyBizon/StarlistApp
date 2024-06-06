import conexao

def selecionar_dados_cadastro(usuario_id):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT DATE_FORMAT(DATA_NASC, '%d/%m/%Y'), NOME_USUARIO, EMAIL, SENHA FROM usuario WHERE ID = %s"
    val = (usuario_id, )
    cursor.execute(sql, val)
    dados_usuario = cursor.fetchall()
    conex.close()
    return dados_usuario

if __name__ == "__main__":
    busca_id = int(input("Digite o ID que você deseja verificar os dados: "))
    for dados in selecionar_dados_cadastro(busca_id):
        print(dados)
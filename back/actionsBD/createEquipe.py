import conexao

def cadastroEmpresarial(cadastro_empresarial):
    conex = conexao.conectar() 
    cursor = conex.cursor()
    sql = 'INSERT INTO equipe (CNPJ, PESSOA_EQUIPE, NOME_EQUIPE) VALUES (%s, %s, %s)' 
    cursor.execute(sql, cadastro_empresarial)
    conex.commit()
    conex.close()
    return {'erro': False, 'mensagem_cadastro': 'cadastro realizado com sucesso'}
def gravar_em_arquivo(dados, nome_arquivo='dados.txt'):
    #Nome da Função: gravar_em_arquivo
    #Autor: Letcia Bueno
    #Data de criação/alteração:01/12/2023
    #Descrição Detalhada:
        #Esta função tem como objetivo processar e gravar dados em um arquivo de texto.
        #Ela recebe um dicionário 'dados' contendo informações como nome, e-mail, cidade, data de nascimento e senha.
        #Os dados são processados e gravados no arquivo especificado, com um formato predefinido.
        #A função imprime uma mensagem indicando se a operação foi concluída com sucesso ou se ocorreu algum erro.

    #Observações:
        #2. No bloco try, os dados são processados e gravados no arquivo 'nome_arquivo' no formato predefinido.
        #3. Se ocorrer um erro durante o processo, uma mensagem de erro é impressa no bloco except.
        #4. O arquivo é aberto em modo 'a' (append), garantindo que os dados sejam adicionados ao final do arquivo.
        #5. No exemplo, o teste do código é realizado ao verificar a condição 'if __name__ == "__main__":',
           #onde dados fictícios são utilizados para verificar o correto funcionamento da função de gravação em arquivo.

    #Parâmetros:
        #- nome_arquivo (str): Opcional. O nome do arquivo de texto onde os dados serão gravados. O padrão é 'dados.txt'.
    # Função para processar e gravar dados em um arquivo de texto
    try:
        # Processa os dados

        # Grava os dados em um arquivo de texto
        with open(nome_arquivo, 'a') as arquivo:
            arquivo.write("\nDados Gravados:\n")
            arquivo.write(f"Nome: {dados.get('nome')}\n")
            arquivo.write(f"E-mail: {dados.get('email')}\n")
            arquivo.write(f"Cidade: {dados.get('cidade')}\n")
            arquivo.write(f"Data de Nascimento: {dados.get('dataNascimento')}\n")
            arquivo.write(f"Senha: {dados.get('senha')}\n")
            arquivo.write("\n")

        print(f"Os dados foram gravados no arquivo '{nome_arquivo}' com sucesso!")
    except Exception as e:
        print(f"Erro ao gravar dados no arquivo: {e}")

if __name__ == "__main__":
    # Teste: Chame a função com dados fictícios para verificar a gravação
    dados_teste = {
        "nome": "John Doe",
        "email": "john.doe@example.com",
        "cidade": "Cityville",
        "dataNascimento": "1990-01-01",
        "senha": "senha123",
    }

    gravar_em_arquivo(dados_teste)

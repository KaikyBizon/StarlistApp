import socket
from flask import Flask, request, jsonify
from flask_cors import CORS
# Importe a função deletarUsuario
from processamento import processar_dados, deletar_usuario
app = Flask(__name__)
CORS(app)  # Permita solicitações CORS


@app.route('/receber-dados', methods=['POST'])
def receber_dados():
    dados = request.json
    listaCriada, dados_tarefa, dados_cadastro = processar_dados(dados)
    response_data = {"listaCriada": listaCriada, "dados_tarefa": dados_tarefa, 'dadosCadastro': dados_cadastro}
    return jsonify(response_data)


@app.route('/delete-usuario', methods=['POST'])
def delete_usuario():
    dados = request.json
    ret_delete = deletar_usuario(dados)
    return jsonify(ret_delete)


# Obtendo o endereço IP local
hostname = socket.gethostname()
local_ip = socket.gethostbyname(hostname)

if __name__ == '__main__':
    # app.run(debug=True)
    app.run(port=8085, host=local_ip, debug=True, threaded=True)

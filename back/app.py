from flask import Flask, request, jsonify
from flask_cors import CORS
# Importe a função deletarUsuario
from processamento import processar_dados, login, update, deletar_usuario, showDados

app = Flask(__name__)
CORS(app)  # Permita solicitações CORS


@app.route('/receber-dados', methods=['POST'])
def receber_dados():
    dados = request.json
    mensagens_erro, cadastro, alteracao = processar_dados(dados)
    ret_login = login(dados)
    ret_update = update(alteracao, mensagens_erro, dados)
    response_data = {"dados_processados": {"mensagens_erro": mensagens_erro, "cadastro": cadastro}, "login_status": ret_login, "update_status": ret_update}
    return jsonify(response_data)


@app.route('/delete-usuario', methods=['POST'])
def delete_usuario():
    dados = request.json
    ret_delete = deletar_usuario(dados)
    return jsonify(ret_delete)


@app.route('/dados-atuais', methods=['POST'])
def dados_atuais():
    dados = request.json
    # Obtenha o valor de 'id' dos dados recebidos na solicitação JSON
    id = dados.get('id')
    if id is not None:
        ret_showdados = showDados(id)
        return jsonify(ret_showdados)
    else:
        return jsonify({'error': 'ID não fornecido'}), 400


if __name__ == '__main__':
    #app.run(debug=True)
    app.run(port=8085, host='10.135.60.9', debug=True, threaded=True)
import socket
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
# Importe a função deletarUsuario
from processamento import processar_dados, deletar_usuario
from lista import selecionar_dados_lista, selecionar_lista_tarefa
from actionsBD.selectTasksNotification import tarefas_notificacao
from actionsBD.selectIdEquipeUser import select_id_equipe_user
from actionsBD.deleteList_bd import deleteList_bd

app = Flask(__name__)
# Permita solicitações CORS
CORS(app)  # Permite cookies com CORS

# Configuração de upload de arquivos
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Rota para usar de teste no deploy
@app.route("/")
def home():
    return jsonify({"mensagem": "API funcionando"})

@app.route('/receber-dados', methods=['POST'])
def receber_dados():
    dados = request.json
    listaCriada, dados_tarefa, dados_cadastro = processar_dados(dados)
    response_data = {"listaCriada": listaCriada,
                     "dados_tarefa": dados_tarefa, 'dadosCadastro': dados_cadastro}
    return jsonify(response_data)  # Retorna o Response com os dados


@app.route('/delete-usuario', methods=['POST'])
def delete_usuario():
    dados = request.json
    ret_delete = deletar_usuario(dados)
    return jsonify(ret_delete)

# API para receber dados do cadastro


@app.route('/save-user', methods=['POST'])
def salvar_foto():
    if request.form.get('acao') == 'cadastro':
        nome = request.form.get("nome")
        dataNascimento = request.form.get("dataNascimento")
        email = request.form.get("email")
        senha = request.form.get("senha")
        confirme = request.form.get("confirme")
        plano = request.form.get("plano")
        foto = request.files.get('foto')

        dados = {'acao': request.form.get('acao'), 'dados': {
            'nome': nome, 'email': email, 'dataNascimento': dataNascimento, 'senha': senha, 'confirme': confirme, 'plano': plano}}
        if foto:
            # Salvar a foto no diretório configurado
            filename = secure_filename(foto.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            foto.save(file_path)

            # Ler o conteúdo do arquivo em binário
            with open(file_path, 'rb') as file:
                foto_data = file.read()

            dados['dados']['foto'] = foto_data
            listaCriada, dados_tarefa, dados_cadastro = processar_dados(dados)
            response_data = {
                "listaCriada": listaCriada,
                "dados_tarefa": dados_tarefa,
                'dadosCadastro': dados_cadastro
            }
            listaCriada, dados_tarefa, dados_cadastro = processar_dados(dados)
            return jsonify(response_data)

        else:
            return jsonify({"error": "A foto é obrigatória."}), 400


@app.route('/lista/<int:usuario_id>', methods=['GET'])
def lista(usuario_id):
    try:
        equipe_user = select_id_equipe_user(usuario_id)
        ret_lista = selecionar_dados_lista(usuario_id, equipe_user)
        # Ajustar a estrutura de dados conforme necessário
        resultado = [{'id': item[0],  'nome': item[1]} for item in ret_lista]
        return jsonify(resultado)
    except Exception as e:
        print('Erro ao selecionar dados:', e)
        return jsonify({'error': 'Erro ao recuperar dados'}), 500


@app.route('/tarefas/<int:id_lista>/<int:usuario_id>', methods=['GET'])
def tarefas(id_lista, usuario_id):
    try:
        print(id_lista)
        equipe_user = select_id_equipe_user(usuario_id)
        ret_tarefa = selecionar_lista_tarefa(id_lista, equipe_user)
        # Ajustar a estrutura de dados conforme necessário
        resultado = [{'tarefaId': item[0],  'titulo': item[1], 'etiqueta': item[2], 'descricao': item[3], 'data': item[4], 'horario': item[5]} for item in ret_tarefa]
        print(resultado)
        return jsonify(resultado)
    except Exception as e:
        print('Erro ao selecionar dados:', e)
        return jsonify({'error': 'Erro ao recuperar dados'}), 500


@app.route('/lista/<int:lista_id>', methods=['DELETE'])
def excluir_lista(lista_id):
    try:
        # Chama a função que exclui a lista e as tarefas associadas
        resultado = deleteList_bd(lista_id)
        return jsonify(resultado)
    except Exception as e:
        print('Erro ao excluir lista:', e)
        return jsonify({'erro': True, 'mensagem': 'Erro ao excluir lista'}), 500


@app.route('/api/eventos/proximos', methods=['GET'])
def get_eventos_proximos():
    try:

        # Obter a data e hora atuais
        from datetime import datetime
        now = datetime.now()

        # Converter para strings de data e hora
        now_date_str = now.strftime('%Y-%m-%d')
        now_time_str = now.strftime('%H:%M:%S')

        # Calcular o limite de 1 minuto diretamente com strings
        now_plus_one_minute = (
            now.hour * 3600 + now.minute * 60 + now.second + 60) % 86400
        one_minute_later_time = f"{now_plus_one_minute // 3600:02}:{(now_plus_one_minute % 3600) // 60:02}:{now_plus_one_minute % 60:02}"

        rows = tarefas_notificacao(
            now_date_str, now_time_str, one_minute_later_time)
        # Formatar o resultado
        result = []
        for row in rows:
            result.append({
                "id": row[0],
                "titulo": row[1],
                "hora": str(row[2])
            })
        # print(result)
        return jsonify(result), 200
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


# Obtendo o endereço IP local
hostname = socket.gethostname()
local_ip = socket.gethostbyname(hostname)

if __name__ == '__main__':
    from os import environ
    port = int(environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

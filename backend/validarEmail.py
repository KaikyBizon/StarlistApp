import os
import random
import base64
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from email.mime.text import MIMEText

# Escopos da API do Gmail que você precisa
SCOPES = ['https://www.googleapis.com/auth/gmail.send']


def send_email_confirm(recipient, subject):
    """Autentica e envia um e-mail via API do Gmail"""
    creds = None
    # O arquivo token.json armazena o token de acesso e refresh, criado automaticamente
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # Se não houver credenciais (token.json) ou elas expiraram
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Salva as credenciais para a próxima execução
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    # Cria o serviço da API do Gmail
    service = build('gmail', 'v1', credentials=creds)

    def gerar_codigo():
        return random.randint(100000, 999999)

    # Gera o código de confirmação
    codigo_confirmacao = gerar_codigo()

    # Cria a mensagem
    message = MIMEText(f"Seu código é {codigo_confirmacao}")
    message['to'] = recipient
    message['from'] = "starlisttech@gmail.com"  # Seu e-mail autenticado
    message['subject'] = subject

    # Codifica a mensagem em base64
    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode('utf-8')

    # Cria o corpo da mensagem para a API
    body = {'raw': raw_message}

    try:
        # Envia o e-mail
        sent_message = service.users().messages().send(userId="me", body=body).execute()
        print(f"Message Id: {sent_message['id']}")
        # Retorna o e-mail enviado e o código gerado
        return sent_message, codigo_confirmacao
    except Exception as error:
        print(f"An error occurred: {error}")
        return None, None
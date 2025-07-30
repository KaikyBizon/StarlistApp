import mysql.connector

def conectar():
    return mysql.connector.connect(
        host="s37lph.h.filess.io",
        user="Starlist_industrial",
        password="402fed95e5c58d448acb3dea4306860cec0d9785",
        database="Starlist_industrial"
    )
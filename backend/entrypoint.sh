#!/bin/sh
set -e

echo "Aguardando o banco de dados ficar pronto..."
# Opcional: aguarde alguns segundos ou utilize um mecanismo de healthcheck.
# Exemplo com sleep simples:
sleep 10

echo "Executando o script de população do banco..."
# Se necessário, você pode condicionar a execução apenas se a tabela estiver vazia.
python /app/populate_db.py

echo "Iniciando o servidor FastAPI..."
exec uvicorn app.main:app --host 0.0.0.0 --port 80
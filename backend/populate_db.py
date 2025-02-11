from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base, Lodge  # Supondo que seus modelos estão no arquivo 'models.py'
from sqlalchemy.exc import IntegrityError
import os
from dotenv import load_dotenv

# Carregar as variáveis de ambiente
load_dotenv()

# Configuração do banco de dados
DATABASE_URL = os.getenv("DATABASE_URL")  # Recupera a URL do banco de dados do arquivo .env
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Função para popular o banco de dados
def fill_lodges():
    # Dados de exemplo para inserir na tabela
    lodges_data = [
        {
            "name": "Pusada na Praia do Rosa",
            "description": "Pousada tranquilo perto da praia, com vista para o mar.",
            "city": "Imbituba",
            "state": "SC",
            "image_path": "/images/lodge1.avif",
            "nightly_price": 200.00
        },
        {
            "name": "Pusada na Serra do Rio do Rastro",
            "description": "Pousada localizado nas montanhas, ideal para quem busca aventura.",
            "city": "Bom Jardim da Serra",
            "state": "SC",
            "image_path": "/images/lodge2.avif",
            "nightly_price": 250.00
        },
        {
            "name": "Pusada na Chapada dos Veadeiros",
            "description": "Pousada imerso na natureza, ideal para o ecoturismo.",
            "city": "Alto Paraíso de Goiás",
            "state": "GO",
            "image_path": "/images/lodge3.avif",
            "nightly_price": 300.00
        }
    ]

    # Criando uma sessão para interagir com o banco de dados
    db = SessionLocal()
    try:
        # Preencher a tabela com os dados de exemplo
        for lodge_data in lodges_data:
            lodge = Lodge(**lodge_data)  # Cria um objeto Lodge a partir dos dados
            db.add(lodge)  # Adiciona o objeto na sessão

        # Comitando as transações no banco de dados
        db.commit()
        print("Banco de dados populado com sucesso!")
    except IntegrityError:
        db.rollback()  # Caso haja algum erro, desfaz as alterações
        print("Erro de integridade ao tentar inserir dados.")
    finally:
        db.close()

# Executa a função de preenchimento
if __name__ == "__main__":
    fill_lodges()

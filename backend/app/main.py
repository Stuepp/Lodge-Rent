from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, Form
from pydantic import BaseModel
from typing import Dict, Optional, Annotated, List
from .models import Base, Lodge
from .database import engine, SessionLocal
from sqlalchemy.orm import Session
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from dotenv import load_dotenv
load_dotenv()



app = FastAPI()
Base.metadata.create_all(bind=engine)

app.mount("/images", StaticFiles(directory="images"), name="images")

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

BASE_URL = os.getenv("BASE_URL")
UPLOAD_DIR = "images"  # Pasta onde as imagens serão salvas
os.makedirs(UPLOAD_DIR, exist_ok=True)  # Garante que a pasta exista

class LodgeCreate(BaseModel):
  name: str = Form(...)
  description: str = Form(...)
  city: str = Form(...)
  state: str = Form(...)
  nightly_price: float = Form(...)
  image: UploadFile = File(...) 

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@app.post("/acomodacoes")
async def create_lodge(
  name: str = Form(...),
  description: str = Form(None),
  city: str = Form(...),
  state: str = Form(...),
  nightly_price: float = Form(...),
  image: UploadFile = File(...),  # Agora o parâmetro recebe UploadFile
  db: Session = Depends(get_db),
):
  # Define o caminho onde a imagem será salva
  file_path = f"{UPLOAD_DIR}/{image.filename}"  

  # Salva a imagem na pasta uploads/
  with open(file_path, "wb") as buffer:
    buffer.write(await image.read())  

  # Cria o registro no banco com o caminho da imagem
  db_lodge = Lodge(
    name=name,
    description=description,
    city=city,
    state=state,
    nightly_price=nightly_price,
    image_path=file_path  # Armazena apenas o caminho
  )
  db.add(db_lodge)
  db.commit()
  db.refresh(db_lodge)

  return {"message": "Acomodação criada!", "id": db_lodge.id, "image_url": f"/files/{image.filename}"}

@app.get("/acomodacoes")
def index(
  cidade: Optional[str] = None,
  estado: Optional[str] = None,
  db: Session = Depends(get_db)
):
  query = db.query(Lodge)
  if cidade:
    query = query.filter(Lodge.city.ilike(f"%{cidade}%"))
  if estado:
    query = query.filter(Lodge.state.ilike(f"%{estado}%"))

  lodges = query.all()
  
  lodges_list = []
  for lodge in lodges:
    lodges_list.append({
      "id": lodge.id,
      "name": lodge.name,
      "description": lodge.description,
      "city": lodge.city,
      "state": lodge.state,
      "nightly_price": lodge.nightly_price,
      "image_url": f"{BASE_URL}/images/{lodge.image_path.split('/')[-1]}" if lodge.image_path else None
    })
  return {"lodges": lodges_list}

@app.get("/acomodacoes/{lodge_id}")
async def get_lodge(lodge_id: int, db: db_dependency):
  result = db.query(Lodge).filter(Lodge.id == lodge_id).first()
  
  if not result:
    raise HTTPException(status_code=404, detail="Lodge not found")

  image_url = f"{BASE_URL}/images/{result.image_path.split('/')[-1]}" if result.image_path else None

  return {
      "id": result.id,
      "name": result.name,
      "description": result.description,
      "city": result.city,
      "state": result.state,
      "nightly_price": result.nightly_price,
      "image_url": image_url
  }
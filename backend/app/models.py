from .database import Base
from sqlalchemy import Column, Float, String, LargeBinary, Integer

class Lodge(Base):
  __tablename__ = "lodges"

  id = Column(Integer, primary_key=True, nullable=False, index=True)
  name = Column(String, nullable=False)
  description = Column(String, nullable=False)
  city = Column(String, nullable=False)
  state = Column(String, nullable=False)
  image_path = Column(String, nullable=False) # Guarda apenas o caminho da imagem
  nightly_price = Column(Float, nullable=False)

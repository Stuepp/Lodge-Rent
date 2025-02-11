import requests

print(requests.get("http://127.0.0.1:8000/acomodacoes").json())

print(requests.get("http://127.0.0.1:8000/acomodacoes/0").json())

print("Filter by Floripa")
print(requests.get("http://127.0.0.1:8000/acomodacoes?cidade=Florianópolis").json())

print("Filter by SC")
print(requests.get("http://127.0.0.1:8000/acomodacoes?estado=SC").json())

print("Filter by Floripa and SC")
print(requests.get("http://127.0.0.1:8000/acomodacoes?cidade=Florianópolis&estado=SC").json())



#lodges = {
#  0: Lodge(name="Apartamento Beira-Mar", image="", nightly_price=350, city="Florianópolis", state="SC"),
#  1: Lodge(name="Chalé na Serra", image="", nightly_price=500, city="Campos do Jordão", state="SP"),
#  2: Lodge(name="Hotel Praia", image="", nightly_price=350, city="Rio de Janeiro", state= "RJ"),
#  3: Lodge(name="Chalé da Serra", image="", nightly_price=350, city="Gramado", state= "RS"),
#  4: Lodge(name="Pousada Azul", image="", nightly_price=350, city= "Florianópolis", state= "SC"),
#  5: Lodge(name="Casa do Mel", image="", nightly_price=350, city= "Garopaba", state= "SC"),
#}
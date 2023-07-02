import requests
y = requests.post("http://localhost:8000/", json = {"liquor":"Vodka", "mixer":"lemonade", "percentage":"50%", "servings":"5", "difficulty":"easy","holiday":"christmas" })
print(y.text)
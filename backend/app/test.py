import requests

y = requests.post("http://localhost:8000/", json = 
{"age":"19", "gender":"male", "height":"72", "weight":"175", "days_per_week":"6","experience":"intermediate", "goal":"build muscle"})

print(y.text)
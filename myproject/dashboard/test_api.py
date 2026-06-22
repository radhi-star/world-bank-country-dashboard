import requests

url = "https://api.worldbank.org/v2/country?format=json&per_page=500"

response = requests.get(url)

print(response.status_code)

data = response.json()

print(data[1][0]["name"])
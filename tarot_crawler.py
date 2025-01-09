# === url_crawler.py === #
import requests
from bs4 import BeautifulSoup

urls = []

# Collect links from main page

response = requests.get(f"https://sacred-texts.com/tarot/xr/index.htm")
html_doc = BeautifulSoup(response.text, "html.parser")
print("Loop through each link on the main page")
for link in html_doc.find_all('a', href=True):
    if len(link['href']) <= 9:
            urls.append(link['href'])
    else:
        print("URL rejected: " + link['href'])
if len(urls) != 78:
    print("INCOMPLETE DECK: " + len(urls) + " links stored")
else:
    print("78 links stored.")


# Save the final path segments to cards.txt

with open("cards.txt", "w") as f:
    for url in urls:
        f.write(url + "\n")

# Visit each subpage 

print("visit each link")

for link in urls:
    response = requests.get(f"https://sacred-texts.com/tarot/xr/{link}")
    html_doc2 = BeautifulSoup(response.text, "html.parser")
print(count, "pages visited.")



    


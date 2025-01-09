# === Imports === #
import requests
import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver import ChromeOptions

# === Constants === #
BASE_URL = "https://sacred-texts.com/tarot/xr/index.htm"

# === Function Definitions === #
def scrape_images(urls):
    options = ChromeOptions()
    options.add_argument("--headless=new")
    driver = webdriver.Chrome(options=options)
    #driver = webdriver.Chrome()
    for link in urls:
        driver.get(f"https://sacred-texts.com/tarot/xr/{link}")
        results = []
        content = driver.page_source
        soup = BeautifulSoup(content, "html.parser")
        title = soup.select_one('h1')
        print(title.text)

    
def scrape_urls():
    urls = []

    response = requests.get(BASE_URL)
    html_doc = BeautifulSoup(response.text, "html.parser")
    for link in html_doc.find_all('a'):
        href = link.get('href')
        if len(href) == 8:
            urls.append(href)
    return urls

def save_to_file(urls):
    with open("cards.txt", "w") as f:
        for url in urls:
            f.write(url + "\n")
    
# === Main Function === #
def main():
    print("Starting scraper...")
    urls = scrape_urls()
    print(len(urls), "Urls found.")
    save_to_file(urls)
    print("Saved to file.")
    print("Visiting webpages...")
    scrape_images(urls)
    
    
    

# === Script Entry Point === #
if __name__ == "__main__":
    main()

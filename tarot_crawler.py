# === Imports === #
import io
import requests
import pandas as pd
import hashlib
from PIL import Image
from pathlib import Path
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver import ChromeOptions

# === Constants === #
BASE_URL = "https://sacred-texts.com/tarot/xr/index.htm"

# === Function Definitions === #
# Visits each page and stores the img address
def extract_images(images):
    for i in images:
        image_content = requests.get(i).content
        image_file = io.BytesIO(image_content)
        image = Image.open(image_file).convert("RGB")
        file_path = Path("images/crawler/", hashlib.sha1(image_content).hexdigest()[:10] + ".png")
        image.save(file_path, "PNG", quality=80)
    
    
def scrape_images(urls):
    images = []
    options = ChromeOptions()
    options.add_argument("--headless=new")
    driver = webdriver.Chrome(options=options)
    #driver = webdriver.Chrome()
    for url in urls:
        driver.get(f"https://sacred-texts.com/tarot/xr/{url}")
        content = driver.page_source
        soup = BeautifulSoup(content, "html.parser")
        parent_el = soup.find("table") #ancestor element
        el = parent_el.parent.find("img") #the target element
        src = el.get("src") #element src
        if src not in images:
            address = src.replace("../","https://sacred-texts.com/tarot/")
            images.append(address)
    return images
    


# Collects the url extentions for each card page
def scrape_urls():
    urls = []

    response = requests.get(BASE_URL)
    html_doc = BeautifulSoup(response.text, "html.parser")
    for link in html_doc.find_all('a'):
        href = link.get('href')
        if len(href) == 8:
            urls.append(href)
    return urls

def save_to_file(images):
    with open("images.txt", "w") as f:
        for image in images:
            f.write(image + "\n")
    
# === Main Function === #
def main():
    print("Starting scraper...")
    urls = scrape_urls()
    print(len(urls), "Urls found.")
   
    print("Visiting webpages...")
    images = scrape_images(urls)
    print("Storing addresses in images.txt")
    save_to_file(images)
    print("extracting images")
    extract_images(images)
    

# === Script Entry Point === #
if __name__ == "__main__":
    main()

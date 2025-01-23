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
PATH = "public/images/cards/"

# === Function Definitions === #
def fix_card_num(str):
    match str:
        case "ac":
            str = "01"
        case "pa":
            str = "11"
        case "kn":
            str = "12"
        case "qu":
            str = "13"
        case "ki":
            str = "14"
        case _:
            pass
    return str
# Downloads the img
def extract_images(images):
    for i in images:
        image_content = requests.get(i).content
        image_file = io.BytesIO(image_content)
        image = Image.open(image_file).convert("RGB")
        card_name = i[39:41] + fix_card_num(i[41:43])     
        file_path = Path(PATH + card_name + ".png")
        image.save(file_path, "PNG", quality=80)
    
# Visit each card page and save the src address for img
def collect_images(urls):
    images = []
    options = ChromeOptions()
    options.add_argument("--headless=new")
    driver = webdriver.Chrome(options=options)
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
    driver.quit() return images

# Collects the url extentions for each card page
def collect_urls():
    urls = []

    response = requests.get(BASE_URL)
    html_doc = BeautifulSoup(response.text, "html.parser")
    for link in html_doc.find_all('a'):
        href = link.get('href')
        if len(href) == 8:
            urls.append(href)
    return urls
    
# === Main Function === #
def main():
    print("Starting scraper...")
    urls = collect_urls()
    print(len(urls), "Urls found.")
    print("Visiting webpages. This may take a moment...")
    images = collect_images(urls)
 
    print("extracting images")
    extract_images(images)
    print("Done")
    

# === Script Entry Point === #
if __name__ == "__main__":
    main()

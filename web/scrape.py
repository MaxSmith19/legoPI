import os
import requests
import json
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
#consider proxies to call LEGO, got locked out for a while due to too many requests.

#todo - pandas?
def checkSetPrice(setCode):
    driver = webdriver.Firefox()
    driver.get("https://www.bricklink.com/v2/catalog/catalogitem.page?S=" + setCode + "#T=P")
    driver.implicitly_wait(10)
    listOfData= []
    
    #Find the cookies button and click it
    elem=driver.find_element(By.ID,"js-btn-save")
    elem.find_elements(By.TAG_NAME,"button")[1].click()

    #Exclude incomplete
    driver.find_element(By.ID,"_idchkPGExcludeIncomplete").click()

    #Find the table of prices
    pricingTable=driver.find_elements(By.CLASS_NAME,"pcipgOddColumn")[1] #~Technically the third table 
    pricingElems=pricingTable.find_element(By.TAG_NAME,"table").find_elements(By.TAG_NAME,"tr")
    for price in pricingElems:
        try:
            price.find_elements(By.TAG_NAME,"td")[2]
            listOfData.append(price.find_elements(By.TAG_NAME,"td")[2].text)
        except:
            pass #Ignore the header row, as does not contain the 3rd td element
    driver.quit()
    return listOfData

# Given a set code, return the meta data surrounding the lego set.
#@param setCode - the code of the lego set
#@returns data - a dictionary containing the meta data of the lego set
def getLegoData(setCode):
    #todo - Also add the buying data inc. discount, vendor etc - Requires selenium web driver
    bricksetURL= "https://brickset.com/sets/" + setCode
    response = requests.get(bricksetURL)

    data = {}

    if response.ok:
        soup = BeautifulSoup(response.text, "lxml")
        content = soup.find("div", {"class": "content"})
        subData = content.find("aside", {"role": "complementary"}) #contains all basic info
        metaTitles = subData.find_all("dt")
        metaValues = subData.find_all("dd")

    for i in range(len(metaTitles)):
        data.update({metaTitles[i].get_text(): metaValues[i].get_text()})


    return data

#Scrapes the LEGO website (Last chance page) for their sets due to retire.
#@returns productList of the lego sets within the last chance
#returns a dictionary containg the product title and price of products on the lego website | LAST CHANCE TO BUY  (to be retired)
def legoLastChance():
    #todo - make sure all pages are checked, only initial page is checked.
    legoUrl = "https://www.lego.com/en-gb/categories/last-chance-to-buy" # Last chance lego
    response = requests.get(legoUrl) # reads the request - returns huge array of items
    productList =[] # list of products

    if response.ok: # status 200
        soup = BeautifulSoup(response.text, "lxml")
        productWrapper = soup.find("div", {"class": "ProductListings_list-wrapper__VSyC1"}).ul
        products = productWrapper.find_all("li",{"class":"Grid_grid-item__FLJlN"}) # Product card 
        for product in products:
            title = product.find("h3", {"class": "ProductLeaf_titleRow__KqWbB"}) #product title
            price = product.find("span", {"class": "price-sm-bold"}) #product cost
            if title and price:
                productList.append(
                    {
                        "Title": title.get_text(),
                        "Price": price.get_text()
                    })
        return productList

#Snub functions
def checkUsersSets():
    # When JS API calls Python, it must send a compressed set of the MONGO DB.
    pass

def rewardDeals():
    pass

import os
import requests
from bs4 import BeautifulSoup

#consider proxies

def rewardDeals():
    pass

def getLegoData(setCode):
    #todo - Also add the buying data inc. discount, vendor etc.
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

#returns a dictionary containg the  roduct title and price of products on the lego website | LAST CHANCE TO BUY  (to be retired)
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

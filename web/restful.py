from flask import Flask
from scrape import legoLastChance, getLegoData, checkSetPrice
#Simple Restful API to easily send data to JS
#Should send data in JSON where possible

#TBD if this is run on spare RPI or if the JS is. Both could, but may be unecessary.
app = Flask(__name__)

@app.route('/')
def getLegoLastChance():
    return legoLastChance()

@app.route('/test')
def testAPI():
    return True

@app.route('/<setCode>')
def getLegoSet(setCode):
    return getLegoData(setCode)

@app.route('/price/<setCode>')
def checkSetPrice(setCode):
    return checkSetPrice(setCode)

if __name__ == '__main__':
    app.run(debug=True)
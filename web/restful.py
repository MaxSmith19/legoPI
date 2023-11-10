from flask import Flask
from scrape import legoLastChance, getLegoData
#Simple Restful API to easily send data to JS
#Should send data in JSON where possible

#TBD if this is run on spare RPI or if the JS is. Both could, but may be unecessary.
app = Flask(__name__)

@app.route('/')
def getLegoLastChance():
    return legoLastChance()

@app.route('/<setCode>')
def getLegoSet(setCode):
    return getLegoData(setCode)

if __name__ == '__main__':
    app.run(debug=True)
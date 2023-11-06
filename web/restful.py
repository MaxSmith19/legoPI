from flask import Flask
from scrape import legoLastChance, getLegoData

app = Flask(__name__)

@app.route('/')
def getLegoLastChance():
    return legoLastChance()

@app.route('/<setCode>')
def getLegoSet(setCode):
    return getLegoData(setCode)

if __name__ == '__main__':
    app.run(debug=True)
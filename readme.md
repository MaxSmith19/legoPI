# legoPI

In some cases, Lego sets are worth more than gold! I am currently creating this project to aid automation of monitoring lego sets, including:

- Checking which sets are to eventually be "retired"
- Scraping the current Rrp of a legoset versus the price listed on websites like EBay, Amazon and BrickLink.

This project will be written in Python and JavaScript, utilising MongoDB to contain some data on the user and their current sets.

An Express rest API will be used as the forefront API which will be interacted with by the user (TBD), with another REST Api being written in Python (Flask) to scrape the data.

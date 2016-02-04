import os
import random
from pymongo import MongoClient
from datetime import datetime
from datetime import timedelta
import pprint

client = MongoClient('mongodb://keenan:olinjs@ds055495.mongolab.com:55495/burger')
db = client.get_default_database()

ingredient_coll = db['ingredient']

item_names = ['Tomato', 'APPLES', 'Patty', 'Ketchup', 'Mushroom', 'Mustard', 'Bun', 'Wood Chips', 'Bark', 'Termites', 'Chicken', 'Lettuce']

for name in item_names:
    ingredient = {}
    ingredient['name'] = name
    ingredient['price'] = random.randint(2,50) / 10.0
    ingredient['stock'] = True

    ingredient_coll.insert(ingredient)

    pprint.pprint(ingredient)
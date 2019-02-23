MONGO_HOST = 'localhost'
MONGO_PORT = 27017
MONGO_DBNAME = 'legranddebat'
ITEM_METHODS = ['GET']
RESOURCE_METHODS = ['GET']

ecologie = {
    'datasource': {
        'projection': {'responses.formattedValue':1,'responses.questionTitle':1}
    }
}

DOMAIN = {
    'ecologie' : ecologie,
}

ALLOW_UNKNOWN = True
MONGO_QUERY_BLACKLIST = ['']
# {"responses.value":{$regex : ".*macron.*"}}, {"responses.questionId":0,"responses.value":0,responses:{$elemMatch:{value:{$regex : ".*macron.*"}}}}
# http://127.0.0.1:5000/ecologie?where={"responses.value":{$regex : ".*macron.*"}
# curl -i http://127.0.0.1:5000/people
# http://127.0.0.1:5000/ecologie?where={%22_id%22:%20%225c692f7b72f3c4c1cd3f2bc0%22}
# http://127.0.0.1:5000/ecologie?embedded={%22responses.formattedValue%22:{%22$regex%22:%22.*macron.*%22}}

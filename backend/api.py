from flask import Flask, jsonify
from flask_cors import CORS
from urllib import request, parse
from collections import deque
import json

app = Flask(__name__)
app.config["DEBUG"] = True

@app.route('/<start>', methods=['GET'])
def find_shortest_path(start):
    goal = "Jeesus"
    articles = deque()
    checked = set()
    predecessors = {}
    
    articles.append(start)
    checked.add(start)
    predecessors[start] = None

    while articles:
        article = articles.popleft()
        if article == goal:
            break
        for link in get_links(article):
            if link not in checked:
                checked.add(link)
                predecessors[link] = article
                articles.append(link)
    return jsonify(form_route(predecessors, goal))

def form_route(predecessors, goal):
    route = [] 
    route.append(goal)
    previous = predecessors[goal]
    while previous:
        route.append(previous)
        previous = predecessors[previous]
    return list(reversed(route))


def get_links(article_name):
    """Returns empty list if title is not available in Wikipedia"""
    URL_BASE = "https://fi.wikipedia.org/w/api.php?"
    URL_PARAMS = "action=query&prop=links&pllimit=100&format=json&origin=*"
    url_to_fetch = URL_BASE+URL_PARAMS+"&titles="+parse.quote(article_name)
    with request.urlopen(url_to_fetch) as url:
        data = json.loads(url.read().decode())
    pageid = list(data['query']['pages'].keys())[0]
    if pageid == "-1":
        return []
    links = data['query']['pages'][pageid]['links']
    return list(map(lambda x: x['title'],links))
    return 

if __name__ == '__main__':
    app.run(port='5000')

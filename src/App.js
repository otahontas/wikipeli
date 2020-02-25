import React, { useState } from 'react'
import axios from 'axios'

const InputForm = ({handleClick, article, handleInput}) => (
  <div>
    <form onSubmit={handleClick}>
      <div>
        Artikkeli: <input value={article}
                     onChange={handleInput} />
      </div>
      <div>
        <button type="submit">Etsi reitti</button>
      </div>
    </form>
  </div>
)

const parseNeighborData = (data) => {
  var pageid = Object.keys(data['query']['pages'])[0]
  var links = data['query']['pages'][pageid]['links']
  return links.map(link => link.title)
}

const getNeighbors = async (node) => {
  const URL_BASE = "https://fi.wikipedia.org/w/api.php?"
  const URL_PARAMS = "action=query&prop=links&pllimit=100&format=json&origin=*"
  const response = await axios.get(`${URL_BASE}${URL_PARAMS}&titles=${node}`)
  const neighbors = parseNeighborData(response.data)
  console.log(neighbors)
}

const App = () => {
  const [ article, setArticle ] = useState('')
  const [ result, setResult ] = useState([])
  var neighbors = []

  const search = () => {
    getNeighbors("Hanau")
  }

  const handleInput = (event) => {
    setArticle(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
    search();
    var res = ['Hanau','Suomi']
    setResult(result.concat(res))
  }
    
  return (
    <div>
      <h1>Wikipeli</h1>
      <p>Anna Wikipedia-artikkelin nimi (esimerkiksi Helsinki) ja Wikipeli löytää nopeimman reitin antamastasi artikkelista <a href="https://fi.wikipedia.org/wiki/Jeesus">Jeesus-artikkeliin</a>.</p>
    <InputForm 
      handleClick={ handleClick }
      article={ article }
      handleInput={ handleInput } />
    </div>
  )
}

export default App

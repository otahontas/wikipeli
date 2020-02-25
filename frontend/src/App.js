import React, { useState } from 'react'
import axios from 'axios'
import loader from './fading-loader.svg'
import './App.css'

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

const Result = ({ results }) => {
  if (results.length === 0) 
    return <div></div>

  return (
    <div>
      <p>Artikkelit järjestyksessä:</p>
      <ol>
      {results.map(r =>
      <li key={r}><a href={`https://fi.wikipedia.org/wiki/${r}`}>{r}</a></li>
      )}
      </ol>
    </div>
  )
}

const Timer = ({timer}) => {
  if (!timer)
    return <div></div>

    return (
      <div>
        <p>Tässä todennäköisesti kestää muutama tovi.</p>
        <img src={loader} className="Loading" alt="loading spinner" /> 
      </div>
    )
}

const App = () => {
  const [ article, setArticle ] = useState('')
  const [ results, setResults ] = useState([])
  const [ timer, setTimer ] = useState(false)

  const getResults = async () => {
    setTimer(true)
    const result = await axios.get(`http://localhost:5000/${article}`)
    console.log(result.data)
    setResults(result.data)
    setTimer(false)
  }

  const handleInput = (event) => {
    setArticle(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
    getResults()
  }
    
  return (
    <div className="App">
      <header className="App-header">
        <h1>Wikipeli</h1>
        <p>Anna Wikipedia-artikkelin nimi (esimerkiksi Helsinki) ja Wikipeli löytää nopeimman reitin antamastasi artikkelista <a href="https://fi.wikipedia.org/wiki/Jeesus">Jeesus-artikkeliin</a>.</p>
        <InputForm 
          handleClick={ handleClick }
          article={ article }
          handleInput={ handleInput } />
        <Result results={ results } />
        <Timer timer={ timer } />
      </header>
    </div>
  )
}

export default App

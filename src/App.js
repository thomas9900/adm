import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router } from "react-router-dom"
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import shipmentsJSON from './shipments.json'

const App = () => {
  const [shipments, setShipments] = useState([])
  const [searchValue, setSearchValue] = useState()
  const [searchedResult, setSearchedResult] = useState()
  const [clickedCompany, setClickedCompany] = useState()

  useEffect(() => {
    shipmentsJSON.map((item) => {
      if (localStorage.getItem(item.id)) {
        const localItem = JSON.parse(localStorage.getItem(item.id))
        setShipments(oldArray => [...oldArray, localItem])
      }
    })
  }, [])

  useEffect(() => {
    filterSearched()
  }, [searchValue])

  useEffect(() => {
    setSearchedResult(shipments)
  }, [shipments])

  const load = () => {
    setShipments(shipmentsJSON)
  }

  const filterSearched = () => {
    if (shipments) {
      const filteredData = shipments.filter((item) => {
        if (item.name.toLowerCase().includes(searchValue)) {
          return item
        }
      })
      setSearchedResult(filteredData)
    }
  }

  return (
    <div>
      <Router>
        <Header 
          load={load} 
          shipments={shipments} 
          search={setSearchValue} 
          searchedResult={searchedResult}
        />
        <div className='container'>
          <Sidebar 
            shipments={searchedResult} 
            activeCompany={setClickedCompany}
          />
          <Main company={clickedCompany} />
        </div>
      </Router>
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search"
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"

const Header = ({ load, search, searchedResult}) => {
    const [searchValue, setSearchValue] = useState()

    useEffect(() => {
        search(searchValue)
    }, [searchValue])

    const saveShipments = () => {
        localStorage.clear()
        searchedResult.map((shipment) => {
            localStorage.setItem(shipment.id, JSON.stringify(shipment))
        })
    }

    return (
        <div className='header'>
            <Link className="header__icon" to='/'>
                <h1>Cargo Planner</h1>
            </Link>
            <div className='header__center'>
                <SearchIcon />
                <input 
                    onChange={(e) => setSearchValue(e.target.value)} 
                    type='text' 
                    placeholder='Search' 
                />
            </div>
            <div className='header__right'>
                <Button 
                    className='header__btn' 
                    variant="contained" 
                    onClick={load}
                >
                    Load
                </Button>
                <Button 
                    className='header__btn' 
                    variant="contained" 
                    onClick={saveShipments}
                >
                    Save
                </Button>
            </div>
        </div>
    )
}

export default Header
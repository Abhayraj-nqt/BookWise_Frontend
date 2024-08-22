import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { GoSearch } from "react-icons/go";
import './Searchbar.css'

const Searchbar = ({placeholder}) => {

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState()

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSerach = () => {
        // TODO - Write logic to show items based on search query
        console.log('Serching for', searchQuery, ' ...');
    }

  return (
    <div className='search-bar'>
        <input onChange={handleChange} type="text" value={searchQuery} placeholder={placeholder} />
        <div onClick={handleSerach} className="search-icon">
            <GoSearch size={20} />
        </div>
    </div>
  )
}

export default Searchbar
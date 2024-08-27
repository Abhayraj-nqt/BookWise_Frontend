import React, { useState } from 'react'
import Popup from './Popup'
import Button from '../button/Button'

const IssuanceFilterPopup = ({ title, isPopupOpen, closePopup, onFilter }) => {

    const [filter, setFilter] = useState({

    })

    const handleChange = (e) => {
        
    }

    const clearFilters = () => {

    }

    return (
        <Popup isOpen={isPopupOpen} title={title} onClose={closePopup} >
            {/* <Select lable={'Category'} name={'category'} value={filter.category} onChange={(e) => handleChange(e)} placeholder={'Select category'} >
                <option value="">Select category</option>
                {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </Select>
            <Select lable={'Author'} name={'author'} value={filter.author} onChange={(e) => handleChange(e)} placeholder={'Select author'} >
                <option value="">Select author</option>
                {authors.map(author => <option key={author} value={author}>{author}</option>)}
            </Select>
            <div className="out-of-stock">
                <input name={'outOfStock'} value={filter.outOfStock} onChange={(e) => handleChange(e)} type='checkbox' checked={filter.outOfStock} />
                <div>Include out of stock</div>
            </div> */}
            <div className="filter-btns">
                <Button onClick={() => onFilter(filter)} varient={'primary'}>Filter</Button>
                <Button onClick={() => clearFilters()} varient={'secondary'}>Clear</Button>
            </div>
        </Popup>
    )
}

export default IssuanceFilterPopup
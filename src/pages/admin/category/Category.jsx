import React, { useState, useEffect } from 'react'

// CSS
import './Category.css'

// Components
import DashboardHOC from '../../../components/HOC/dashboardHOC/DashboardHOC'
import Searchbar from '../../../components/searchbar/Searchbar'
import Button from '../../../components/button/Button'
import Popup from '../../../components/popup/Popup';
import Input from '../../../components/form/input/Input'

import Table from '../../../components/table/Table'

const initialCategories = [
  { id: 1, name: 'History' },
  { id: 2, name: 'Politics' },
  { id: 3, name: 'Geography' },
  { id: 4, name: 'Math' },
  { id: 5, name: 'Science' }
]

const categoryCols = [
  "Id",
  "Name",
]

const Category = () => {

  const [categories, setCategories] = useState(initialCategories);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [name, setName] = useState('');

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleEdit = (categoryObj) => {
    console.log('UPDATE', categoryObj);
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you really want to delete?')) {
      console.log('DELETE', id);
    }
  }

  const handleAddNewCategory = () => {
    console.log('ADD', name);
  }

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredCategories = initialCategories.filter(category => category.name.toLowerCase().includes(query));
    setCategories(filteredCategories);
  };

  return (
    <div className='category-page'>
      <div className="category-header">
        <Searchbar placeholder={'Search category'} />
        <Button onClick={openPopup} varient={'primary'} >Add</Button>
      </div>
      <br />

      <div className="">
        <Table colums={categoryCols} data={initialCategories} addEdit={true} addDelete={true} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <Popup isOpen={isPopupOpen} title={'Add category'} onClose={closePopup} >
        <Input type={'text'} value={name} onChange={(e) => setName(e.target.value)} lable={'Name'} placeholder={'Enter category name'} />
        <div className="cat-update-btn">
          <Button onClick={() => handleAddNewCategory()} varient={'primary'} >Add</Button>
        </div>
      </Popup>

    </div>
  )
}

export default DashboardHOC(Category);
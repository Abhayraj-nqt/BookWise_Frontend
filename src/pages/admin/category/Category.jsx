import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// CSS
import './Category.css'

// Components
import DashboardHOC from '../../../components/HOC/dashboardHOC/DashboardHOC'
import Searchbar from '../../../components/searchbar/Searchbar'
import Button from '../../../components/button/Button'
import Table from '../../../components/table/Table'
import CategoryPopup from '../../../components/popup/CategoryPopup'
import AlertPopup from '../../../components/popup/AlertPopup'

// Functions
import { removeCategory, createCategory, updateCategory, getAllCategories } from '../../../api/services/category'
import { deleteCategory, addCategory, updateCategoryAction } from '../../../redux/category/categoryActions'
import toast from '../../../components/toast/toast'
import { validateNotEmpty } from '../../../libs/utils'

const categoryCols = [
  "Id",
  "Name",
]

const Category = () => {

  const dispatch = useDispatch();

  // const allCategories = useSelector(state => state.categories || []);
  const auth = useSelector(state => state.auth);

  const [totalPages, setTotalPages] = useState(0);

  // const [categories, setCategories] = useState(allCategories);

  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [search, setSearch] = useState('')


  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [categoryData, setCategoryData] = useState({
    id: '',
    name: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  // useEffect(() => {
  //   setCategories(allCategories);
  // }, [allCategories]);

  // useEffect(() => {
  //   loadCategories();
  // }, [page, size, sort]);

  useEffect(() => {
    loadCategories();
  }, [page, size, sortBy, sortDir])

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadCategories();
    }, 1000)

    return () => clearTimeout(timeout);
  }, [search])

  const loadCategories = async () => {
    try {
      const { data } = await getAllCategories(page, size, sortBy, sortDir, search);

      // If no pagination is applied, response.data will be an array, otherwise a Page object
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        setCategories(data.content); // 'content' contains the list of categories
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  }

  // const loadCategories = async () => {
  //   try {
  //     const { data } = await getAllCategories(page, size, sort.key, sort.order, auth?.token);
  //     dispatch(setCategories(data.content));
  //     setTotalPages(data.totalPages);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to load categories.");
  //   }
  // };


  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const openAlert = () => setIsAlertOpen(true);
  const closeAlert = () => setIsAlertOpen(false);

  const handleEdit = async (categoryObj) => {

    try {
      const { data } = await updateCategory(categoryObj.id, { "name": categoryObj?.name }, auth.token);
      // dispatch(updateCategoryAction(data));
      await loadCategories();
      closePopup();
      toast.success(`Successfully updated`);
    } catch (error) {
      console.log(error);
      closePopup();
      toast.error(`Failed to update`);
    }

    console.log('UPDATE', categoryObj);
  }

  const handleDelete = (id) => {
    setDeleteId(id);
    openAlert();

    // if (window.confirm('Are you really want to delete?')) {
    //   try {
    //     const {data} = await removeCategory(id, auth?.token);
    //     // dispatch(deleteCategory(data.id));
    //     await loadCategories();
    //     toast.success(`${data?.name} is deleted`);
    //   } catch (error) {
    //     console.log(error);
    //     toast.error('Failed to delete.')
    //   }
    // }
  }

  const handleConfirmDelete = async (confirm) => {
    if (confirm && deleteId) {
      try {
        const { data } = await removeCategory(deleteId, auth?.token);
        await loadCategories();
        toast.success(`${data?.name} is deleted`);
        setDeleteId(undefined);
      } catch (error) {
        console.log(error);
        toast.error('Failed to delete.');
        setDeleteId(undefined);
      }
    } else {
      setDeleteId(undefined);
    }
  }

  const handleAddNewCategory = async (categoryObj) => {

    // validate
    let isValid = true;
    const newError = { name: '' };

    if (!validateNotEmpty(categoryObj?.name)) {
      newError.name = `Category name can't be empty`
      isValid(false);
    }

    if (!isValid) {
      setErrors(newError);
      return;
    }


    try {
      const { data } = await createCategory({ "name": categoryObj?.name }, auth?.token);
      // dispatch(addCategory(data));
      setCategoryData({
        id: '',
        name: '',
      })
      closePopup();
      await loadCategories();
      toast.success(`${data?.name} is added`);
    } catch (error) {
      console.log(error);
      closePopup();
      toast.error(`Failed to add ${categoryObj?.name}`);
    }
  }

  const handleSort = (col, isDesc) => {

    const colMapping = {
      'Id': 'id',
      'Name': 'name',
    }

    console.log({ "col": colMapping[col], isDesc });

    setSortBy(colMapping[col]);
    if (isDesc) {
      setSortDir('desc')
    } else {
      setSortDir('asc')
    }
  }

  const handleSearch = async (searchQuery) => {
    setSearch(searchQuery);
  };

  return (
    <div className='category-page'>
      <div className="category-header">
        <Searchbar placeholder={'Search category'} onSearch={handleSearch} />
        <Button onClick={openPopup} varient={'primary'} >Add</Button>
      </div>
      <br />

      <div className="">
        <Table colums={categoryCols} data={categories} currentPage={page} totalPages={totalPages} onPageChange={setPage} sortBy={'Id'} onSort={handleSort} addEdit={true} addDelete={true} onEdit={handleEdit} onDelete={handleDelete} type={'category'} />
      </div>

      <CategoryPopup title={'Add category'} isPopupOpen={isPopupOpen} closePopup={closePopup} onAdd={handleAddNewCategory} category={categoryData} type='add' errors={errors} />

      <AlertPopup isOpen={isAlertOpen} onClose={closeAlert} onConfirm={handleConfirmDelete} />

    </div>
  )
}

export default DashboardHOC(Category);
import React from 'react'

const initialCategories = [
    { id: 1, name: 'History' },
    { id: 2, name: 'Politics' },
    { id: 3, name: 'Geography' },
    { id: 4, name: 'Math' },
    { id: 5, name: 'Science' }
  ]

const BookPopup = ({book, onEdit, isPopupOpen, closePopup}) => {

    const [bookData, setBookData] = useState(book);
    const [categories, setCategories] = useState(initialCategories);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // const openPopup = () => setIsPopupOpen(true);
    // const closePopup = () => setIsPopupOpen(false);

    // const _setBookData = (book) => {
    //     setBookData({
    //         id: book.id,
    //       title: book.title,
    //       author: book.author,
    //       avlQty: book.avlQty,
    //       category: book.category.name,
    //       image: book.image,
    //     })
    // }

    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    }

    return (
        <Popup isOpen={isPopupOpen} title={'Edit book'} onClose={closePopup} >
            <Input type={'text'} value={bookData.title} name={'title'} onChange={(e) => handleChange(e)} lable={'Title'} placeholder={'Enter book title'} />
            <Input type={'text'} value={bookData.author} name={'author'} onChange={(e) => handleChange(e)} lable={'Author'} placeholder={'Enter author name'} />
            <Input type={'number'} value={bookData.avlQty} name={'avlQty'} onChange={(e) => handleChange(e)} lable={'Quantity'} placeholder={'Enter book quantity'} />
            <Select lable={'Category'} name={'category'} value={bookData.category} onChange={(e) => handleChange(e)} placeholder={'Select category'} >
                {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </Select>
            {/* <Input type={'text'} value={bookData.image} name={'image'} onChange={(e) => handleChange(e)} lable={'Image'} placeholder={'Upload image'} /> */}
            <div className="book-update-btn">
                <Button onClick={() => onEdit(bookData)} varient={'primary'} >Update</Button>
            </div>
        </Popup>
    )
}

export default BookPopup
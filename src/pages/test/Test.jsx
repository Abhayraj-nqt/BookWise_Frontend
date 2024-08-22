import React, { useState } from 'react'
import './Test.css'

import Popup from '../../components/popup/Popup'
import toast from '../../components/toast/toast'
import Sidebar from '../../components/sidebar/Sidebar'
import Button from '../../components/button/Button'
import Card from '../../components/card/Card'
import Input from '../../components/form/input/Input'


// import AccountIcon from '../../components/icons/AccountIcon'
// import HomeIcon from '../../components/icons/HomeIcon'
// import CategoryIcon from '../../components/icons/CategoryIcon'
// import UserIcon from '../../components/icons/UserIcon'
// import IssuanceIcon from '../../components/icons/IssuanceIcon'
// import BookIcon from '../../components/icons/BookIcon'

import { AccountIcon, BookIcon, CategoryIcon, HomeIcon, IssuanceIcon, UserIcon, ArrowDownIcon, DeleteIcon, EditIcon, InfoIcon, AlertIcon, ErrorIcon, SuccessIcon } from '../../components/icons/Icons'

const Test = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  

  return (
    <div>
      
      <div className="btns" style={{justifyContent: 'center', display: 'flex', gap: '1rem'}}>
        <Button varient={'primary'} c>Button</Button>
        <Button varient={'secondary'}>Button</Button>
        <Button>Button</Button>
      </div>
      <div className="card-demo">
        <Card />
      </div>
      <button onClick={openPopup}>
        Open Popup
      </button>
      <button onClick={() => toast.success("Success")}>
        Toast success
      </button>
      <button onClick={() => toast.error("Error")}>
        Toast error
      </button>
      <button onClick={() => toast.warning("Warning")}>
        Toast warning
      </button>
      <button onClick={() => toast.info("Info")}>
        Toast info
      </button>

      <div className="icon-color-test">
        <AccountIcon />
        <HomeIcon />
        <CategoryIcon />
        <UserIcon />
        <IssuanceIcon />
        <BookIcon />
        <ArrowDownIcon />
        <DeleteIcon />
        <EditIcon />
        <InfoIcon />
        <AlertIcon />
        <ErrorIcon />
        <SuccessIcon />
      </div>

      <Popup isOpen={isPopupOpen} title={'Popup Title'} onClose={closePopup} >
        <p>This is an example of a reusable popup component.</p>
        <button onClick={closePopup} className='button-primary' >Close</button>
      </Popup>

    </div>
  )
}

export default Test
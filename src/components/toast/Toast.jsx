import React from 'react'
import { useDispatch } from 'react-redux'
import { RxCross2 } from "react-icons/rx";

import { toastIcons } from '../../libs/constants'
import { removeToast } from '../../redux/toast/toastActions'

import './ToastContainer.css'

const Toast = ({toast}) => {

    const dispatch = useDispatch();

    const type = toast.type;
    const IconComponent = toastIcons[type].icon;
    const color = toastIcons[type].color;


  return (
    <div className={`toast show`}>
        <div className={`toast-icon toast-${type}`} >
            <IconComponent size={25} />
        </div>
        <div className="toast-body">
            <div className="toast-title">
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
            <div className="toast-message">
                {toast.message}
            </div>
            <div onClick={() => dispatch(removeToast(toast.id))} className="toast-remove-icon">
                <RxCross2 size={20} />
            </div>
        </div>
    </div>
  )
}

export default Toast
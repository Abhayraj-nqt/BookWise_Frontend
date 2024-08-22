import { GoHome, GoAlert, GoChecklist } from "react-icons/go";
import { BiUser, BiCategory } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { AiOutlineCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { MdDone } from "react-icons/md";

import { HomeIcon, CategoryIcon, BookIcon, UserIcon, IssuanceIcon, SuccessIcon, AlertIcon, ErrorIcon, InfoIcon } from "../components/icons/Icons";

import accountIcon from '../assets/images/account.svg'
import alertIcon from '../assets/images/alert.svg'
import bookIcon from '../assets/images/book.svg'
import categoryIcon from '../assets/images/category.svg'
import crossIcon from '../assets/images/cross.svg'
import deleteIcon from '../assets/images/delete.svg'
import doneIcon from '../assets/images/done.svg'
import editIcon from '../assets/images/edit.svg'
import homeIcon from '../assets/images/home.svg'
import infoIcon from '../assets/images/info.svg'
import issuanceIcon from '../assets/images/issuance.svg'
import userIcon from '../assets/images/user.svg'


import logo from '../assets/images/logo.svg'
import favicon from '../assets/images/favicon.svg'

export const images = {
    favicon, logo
}


export const adminSidebarLinks = [
    {
        id: 1,
        name: 'Dashboard',
        url: '/admin/dashboard',
        icon: HomeIcon,
    },
    {
        id: 2,
        name: 'Category',
        url: '/admin/category',
        icon: CategoryIcon,
    },
    {
        id: 3,
        name: 'Book',
        url: '/admin/book',
        icon: BookIcon,
    },
    {
        id: 4,
        name: 'User',
        url: '/admin/user',
        icon: UserIcon,
    },
    {
        id: 5,
        name: 'Issuance',
        url: '/admin/issuance',
        icon: IssuanceIcon,
    },
]

export const toastIcons = {
    success: {
        icon: SuccessIcon,
        color: 'green'
    },
    error: {
        icon: ErrorIcon,
        color: 'red'
    },
    info: {
        icon: InfoIcon,
        color: 'blue'
    },
    warning: {
        icon: AlertIcon,
        color: 'yellow'
    }

}


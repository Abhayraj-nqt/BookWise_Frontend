import React from 'react'
import './BookFilterSheet.css'
import { useSelector } from 'react-redux'

const BookFilterSheet = ({isSheetOpen, onClose}) => {

    const auth = useSelector(state => state.auth);

    const [filter, setFilter] = useState({
        
    })

  return (
    <div>BookFilterSheet</div>
  )
}

export default BookFilterSheet
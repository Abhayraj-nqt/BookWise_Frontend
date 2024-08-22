import React from 'react'
import './User.css'
import DashboardHOC from '../../../components/HOC/dashboardHOC/DashboardHOC'

const User = () => {
  return (
    <div>User</div>
  )
}

export default DashboardHOC(
  User,
)
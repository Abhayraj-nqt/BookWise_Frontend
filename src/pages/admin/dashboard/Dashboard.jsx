import React from 'react'

// Components
import DashboardHOC from '../../../components/HOC/dashboardHOC/DashboardHOC'
import Card from '../../../components/card/Card'
import StatisticCard from '../../../components/card/StatisticCard';
import { GroupIcon, BooksIcon, CategoryIcon } from '../../../components/icons/Icons'

// CSS
import './Dashboard.css'

const Dashboard = () => {

  const totalUsers = 1000;
  const totalBooks = 50000;
  const totalCategories = 10;
  const activeUsers = 800;
  const inHouseUsers = 250;
  const totalTakeawayUsers = 550;

  return (
    <div className='dashboard-page'>
      {/* <h2>User details</h2> */}
      <div className="lib-details">
      
        <StatisticCard heading={'Total users'} data={totalUsers} icon={<GroupIcon size={30} />} />
        <StatisticCard heading={'Active users'} data={activeUsers} icon={<GroupIcon size={30} />} />
        <StatisticCard heading={'In-house users'} data={inHouseUsers} icon={<GroupIcon size={30} />} />

        <StatisticCard heading={'Total books'} data={totalBooks} icon={<BooksIcon size={30} />} />
        <StatisticCard heading={'Total categories'} data={totalCategories} icon={<CategoryIcon size={30} />} />

      </div>
    </div>
  )
}

export default DashboardHOC(
  Dashboard,
)
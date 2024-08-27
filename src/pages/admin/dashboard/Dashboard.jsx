import React, { useEffect, useState } from 'react'

// Components
import DashboardHOC from '../../../components/HOC/dashboardHOC/DashboardHOC'
import Card from '../../../components/card/Card'
import StatisticCard from '../../../components/card/StatisticCard';
import { GroupIcon, BooksIcon, CategoryIcon } from '../../../components/icons/Icons'

// CSS
import './Dashboard.css'
import toast from '../../../components/toast/toast';
import { getCategoryCount } from '../../../api/services/category';
import { getTotalUserCount, getActiveUserCount } from '../../../api/services/user';
import { useSelector } from 'react-redux';
import { getBookTitleCount, getTotalBookCount } from '../../../api/services/book';

const Dashboard = () => {

  // const totalUsers = 1000;
  const totalBooks = 50000;
  // const totalCategories = 10;
  const activeUsers = 800;
  const inHouseUsers = 250;
  const totalTakeawayUsers = 550;

  const auth = useSelector(state => state.auth);

  const [totalCategories, setTotalCategories] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBookTitles, setTotalBookTitles] = useState(0);
  const [totalBooksCount, setTotalBooksCount] = useState(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);

  useEffect(() => {
    loadTotalCategories();
    loadTotalBookTitles();
    loadTotalBooksCount();
    loadTotalUsers();
    loadTotalActiveUsers();
  }, [])

  const loadTotalCategories = async () => {
    try {
      const {data} = await getCategoryCount();
      setTotalCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadTotalUsers = async () => {
    try {
      const {data} = await getTotalUserCount(auth.token)
      setTotalUsers(data);
      console.log('Total users', data);
      
    } catch (error) {
      console.log(error);
    }
  }

  const loadTotalBookTitles = async () => {
    try {
      const {data} = await getBookTitleCount(auth.token);
      setTotalBookTitles(data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadTotalBooksCount = async () => {
    try {
      const {data} = await getTotalBookCount(auth.token);
      setTotalBooksCount(data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadTotalActiveUsers = async () => {
    try {
      const {data} = await getActiveUserCount(auth.token);
      setTotalActiveUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='dashboard-page'>
      {/* <h2>User details</h2> */}
      <div className="lib-details">
      
        {/* <StatisticCard heading={'Active users'} data={activeUsers} icon={<GroupIcon size={30} />} />
        <StatisticCard heading={'In-house users'} data={inHouseUsers} icon={<GroupIcon size={30} />} /> */}

        <StatisticCard heading={'Total books'} data={totalBooksCount} icon={<BooksIcon size={30} />} />
        <StatisticCard heading={'Total book titles'} data={totalBookTitles} icon={<BooksIcon size={30} />} />
        <StatisticCard heading={'Total categories'} data={totalCategories} icon={<CategoryIcon size={30} />} />
        <StatisticCard heading={'Total users'} data={totalUsers} icon={<GroupIcon size={30} />} />
        <StatisticCard heading={'Active users'} data={totalActiveUsers} icon={<GroupIcon size={30} />} />

      </div>
    </div>
  )
}

export default DashboardHOC(
  Dashboard,
)
import React from 'react'
import UserNav from './UserNav'
import UserTripData from './UserTripData'
import UserRouter from '../../routes/UserRouter'
export default function UserDashboard() {
  return (
    <div className='flex'>
      <UserNav/>
      <UserRouter/>
      <div className='flex flex-col md:ml-[20%] flex-1 mt-[20%] md:mt-0'>
        <UserTripData/>
      </div>
    </div>
  )
}


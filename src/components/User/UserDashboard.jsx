import React from 'react'
import UserTripData from './UserTripData'
import UserRouter from '../../routes/UserRouter'



import NoInfo from '../General/NoInfo'

export default function UserDashboard() {
  const [currtripData, setcurrTripData] = React.useState(null);
  
  return (
    <div className='bg-blue-50 flex-col rounded-xl min-h-100 border-1 gap-2 border-slate-700 items-center p-3 flex flex-1 m-2'>
      {currtripData && <h2 className='text-xl font-semibold text-gray-600'>Current Trip</h2>}

      {currtripData ? (
        <div className="flex flex-1 flex-col sm:flex-row w-full gap-2 justify-center">
        <div className='flex-1 rounded-xl border-1 bg-gray-300'>
          Map
        </div>
        <div className='min-w-[40%] h-full'>
          Trip Details
        </div>
      </div>
      ) : (
        <NoInfo title="No Current Trip" description="You are not currently on a trip." />
      )}

    </div>
  )
}


import React, { useEffect, useState } from 'react';
import NoInfo from '../General/NoInfo';
import DynamicRouteMap from '../Map/DynamicRouteMap';

export default function UserDashboard() {
  const [currTripData, setCurrTripData] = useState(null);
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);

  const generateNearbyLocation = (base, maxOffset = 0.05) => {
    const latOffset = (Math.random() - 0.5) * maxOffset;
    const lngOffset = (Math.random() - 0.5) * maxOffset;
    console.log(base)
    return {
      lat: base.lat + latOffset,
      lng: base.lng + lngOffset
    };
  };

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const livePickup = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const liveDrop = generateNearbyLocation(livePickup);

        const trip = {
          pickup: livePickup,
          drop: liveDrop,
          driverName: 'Suresh Sharma',
          vehicle: 'Ola Electric',
          fare: 180,
          status: 'ongoing'
        };

        setCurrTripData(trip);
        setPickup(trip.pickup);
        setDrop(trip.drop);
      },
      (err) => {
        console.error('Location error:', err);
      }
    );
  }, []);

  return (
   <div className="bg-blue-50 rounded-xl border border-slate-700 p-4 m-2 flex flex-col gap-6">
  {currTripData ? (
    <>
      <h2 className="text-xl font-semibold text-gray-700 text-center sm:text-left">
        Current Trip
      </h2>

      {/* Main content: map and trip details */}
      <div className="flex flex-col sm:flex-row gap-6 w-full">
        
        {/* Map Section */}
        <div className="w-full sm:w-2/3 rounded-xl border overflow-hidden max-h-[500px] sm:min-h-[300px] shadow-md">
          <DynamicRouteMap
            pickup={pickup}
            drop={drop}
            onPickupSet={setPickup}
            onDropSet={setDrop}
            interactive={true}
            options={{
    fullscreenControl: true,
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: true,
    scaleControl: true,
    rotateControl: true,
    clickableIcons: true,
  }}
          />
        </div>

        {/* Trip Info Section */}
        <div className="w-full sm:w-1/3 flex flex-col gap-4">
          {/* Coordinates Box */}
          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Selected Locations</h3>
            <p className="text-sm"><strong>Pickup:</strong> {pickup ? `${pickup.lat.toFixed(4)}, ${pickup.lng.toFixed(4)}` : 'Not Set'}</p>
            <p className="text-sm"><strong>Drop:</strong> {drop ? `${drop.lat.toFixed(4)}, ${drop.lng.toFixed(4)}` : 'Not Set'}</p>
          </div>

          {/* Trip Info Box */}
          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Trip Details</h3>
            <p className="text-sm"><strong>Driver:</strong> {currTripData.driverName}</p>
            <p className="text-sm"><strong>Vehicle:</strong> {currTripData.vehicle}</p>
            <p className="text-sm"><strong>Fare:</strong> ₹{currTripData.fare}</p>
            <p className="text-sm"><strong>Status:</strong> {currTripData.status}</p>
          </div>
        </div>
      </div>
    </>
  ) : (
    <NoInfo title="No Current Trip" description="You are not currently on a trip." />
  )}
</div>


  );
}

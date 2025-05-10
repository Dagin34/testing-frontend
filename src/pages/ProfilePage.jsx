import React, { useState } from 'react'
import { Camera } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
// import { useAuthStore } from '../stores/useAuthStore'

const info = {
  name: 'Carole Steward',
  position: 'Chief Executive Officer',
  email: 'carolesteward@gmail.com',
  phone: '+1 (555) 123-4567',
  profilePicture: '../../public/avatar.png',
  bio: 'Carole Steward is a visionary CEO known for her exceptional leadership and strategic acumen. With a wealth of experience in the corporate world, she has a proven track record of driving innovation and achieving remarkable business growth.',
  createdAt: '2023-10-01T12:00:00Z',
  memberStatus: 'active',
}

const ProfilePage = () => {
  const { authUser } = useAuthStore();

  function formatDate(isoDateString) {
    if (!isoDateString) {
      return ""; // Or handle the case where createdAt is null/undefined
    }
  
    const [year, month, day] = isoDateString.split("T")[0].split("-").map(Number);
    const date = new Date(year, month - 1, day); // Month is 0-indexed
  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className=''>
      <div className="w-full px-10 pt-6">
        <div className="relative mb-12 max-w-2xl mx-auto mt-24">
          <div className="rounded overflow-hidden shadow-md bg-info/25 border-blue-300">
            <div className="absolute -mt-20 w-full flex justify-center">
              <div className="h-32 w-32">
                <div className='relative flex justify-end items-end p-2'>
                  <img
                    src={"/avatar.png"}
                    className="rounded-full object-center object-contain shadow-md border-2 border-form"
                    width={240}
                    height={240} />
                </div>
              </div>
            </div>
            <div className="px-6 mt-16 mb-6">
              <h1 className="font-bold text-3xl text-center mb-1">{authUser?.fullName}</h1>
              <p className="text-sm text-center mb-12">{info.position}</p>
              {/* Add functionality to edit users here */}
              <div>
                <div className='relative'>
                  <p className='bg-primary text-primary-content text-sm absolute left-6 px-4 border top-[-10px]'>Email</p>
                </div>
                <p className="text-justify text-base py-4 font-normal bg-white/5 rounded-sm px-4 mt-4">
                  {authUser?.email}
                </p>
              </div>
              <div>
                <div className='relative'>
                  <p className='bg-primary text-primary-content text-sm absolute left-6 px-4 border top-[-10px]'>Phone Number</p>
                </div>
                <p className="text-justify text-base py-4 font-normal bg-white/5 rounded-sm px-4 mt-4">
                  {info.phone}
                </p>
              </div>
              <div>
                <div className='relative'>
                  <p className='bg-primary text-primary-content text-sm absolute left-6 px-4 border top-[-10px]'>Bio</p>
                </div>
                <p className="text-justify text-base py-4 font-normal bg-white/5 rounded-sm px-4 mt-8">
                  {authUser?.bio}
                </p>
              </div>
            </div>
          </div>



          <div className="bg-info/25 overflow-hidden shadow rounded-md mt-8">
            <div className="px-4 py-5 pb-2 sm:px-6">
              <h3 className="leading-6 font-medium text-xl">
                User Profile
              </h3>
              <p className='text-sm mt-2'>Some information about your profile.</p>
            </div>
            <div className="py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-600 px-4">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-normal opacity-80">
                    Member Since
                  </dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                    {formatDate(authUser.createdAt)}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-normal opacity-80">
                    Member Status
                  </dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                    {info.memberStatus === "active" ? (
                      <span className='text-green-600 font-semibold'>Active</span>
                    ) : (
                      <span className='text-red-600 font-semibold'>Inactive</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
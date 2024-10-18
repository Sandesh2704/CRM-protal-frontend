import React from 'react';
import { useAuth } from '../authProvider/AuthProvider';
import Button from '../component/Button';


export default function Profile() {
    const { user } = useAuth();

    return (
        <div className='bg-white shadow-lg shadow-black/5 rounded-2xl mt-5'>
            <div className='px-5 py-6 border-b border-dotted'>
                <h3 className='text-theme1 text-xl'>Profile</h3>
            </div>
            <div className='px-5 py-6'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-7'>
                    <div className='lg:col-span-3 flex justify-center'>
                        <img src={`http://localhost:8000/${user.profileIMG}`} alt='Profile' className='w-[200px] rounded-full' />
                    </div>
                    <div className='lg:col-span-9 p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-5'>
                        <ProfileInfo label='Name' value={user.username} />
                        <ProfileInfo label='Email' value={user.email} />
                        <ProfileInfo label='Phone No' value={`+91 ${user.number || '*********'}`} />
                        <ProfileInfo label='City' value={user.city} />
                        <ProfileInfo label='State' value={user.state} />
                        <ProfileInfo label='Gender' value={user.gender} />
                        <ProfileInfo label='Job Role' value={user.JobPosition} />
                        <ProfileInfo label='Job Role' value={user.jobRole} />
                        <ProfileInfo label='Department' value={user.department} />
                    </div>
                </div>
                <div className='mt-5'>
                    <Button title='Update' />
                </div>
            </div>
        </div>
    );
}


function ProfileInfo({ label, value }) {
    return (
        <div className='flex flex-row md:flex-col gap-x-2 items-center md:items-start'>
            <h1 className='font-bold text-sm'>{label}:</h1>
            <span className='text-base font-light '>{value || 'Unavailable'}</span>
        </div>
    );
}

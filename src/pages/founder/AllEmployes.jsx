import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function AllEmployes() {

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN_URL}/auth/registerUser`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` 
            }
        })
            .then(response => {
                // Log full response to inspect
                setEmployees(response.data.users);  // Make sure to access users correctly
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);
    
    console.log(employees)


    const [registerUser, setRegisterUser] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN_URL}/auth/registerUser`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` // Ensure you're sending the token for authentication
            }
        })
            .then(response => {
                // Log full response to inspect
                setRegisterUser(response.data.users);  // Make sure to access users correctly
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);


    console.log('user', registerUser)


  return (
    <>
    <div className='grid grid-cols-4 gap-4'>
    {
                employees.map((item, index) => {
                    const { JobPosition, username, email, profileIMG, _id } = item;
                    return (
                        <div class="bg-white shadow-md rounded-lg py-3" key={index}>
                            <div class="photo-wrapper p-2">
                                <img class="w-40 h-40 rounded-full mx-auto" src={`${process.env.REACT_APP_DOMAIN_URL}/${profileIMG}`} alt="John Doe" />
                            </div>
                            <div class="p-2">
                                <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{username}</h3>
                                <div class="text-center text-gray-400 text-xs font-semibold">
                                    <p>{JobPosition}</p>
                                </div>
                                <table class="text-xs my-3">
                                    <tbody>
                                        <tr>
                                            <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                            <td class="px-2 py-2">{username}</td>
                                        </tr>
                                        <tr>
                                            <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                            <td class="px-2 py-2">{email}</td>
                                        </tr>
                                    </tbody></table>
                                <div class="text-center mt-3">
                                    <Link to={`/founder/employe-details/${_id}`}
                                        state={{ memberDetails: item }}
                                        class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" >View Profile</Link>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
            </div>
    </>
  )
}

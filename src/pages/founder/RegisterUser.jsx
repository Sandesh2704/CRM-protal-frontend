import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function RegisterUser() {

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
                    registerUser.map((item, index) => (
                        <div class="bg-white shadow-md rounded-lg py-3" key={index}>
                            <div class="photo-wrapper p-2">
                                <img class="w-40 h-40 rounded-full mx-auto" src={`http://localhost:8000/${item.profileIMG}`} alt="John Doe" />
                            </div>
                            <div class="p-2">
                                <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{item.username}</h3>
                                <div class="text-center text-gray-400 text-xs font-semibold">
                                    <p>{item.jobPosition}</p>
                                </div>
                                <table class="text-xs my-3">
                                    <tbody>
                                        <tr>
                                            <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                            <td class="px-2 py-2">{item.username}</td>
                                        </tr>
                                        <tr>
                                            <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                            <td class="px-2 py-2">{item.email}</td>
                                        </tr>
                                    </tbody></table>
                                <div class="text-center mt-3">
                                    <div class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" >View Profile</div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

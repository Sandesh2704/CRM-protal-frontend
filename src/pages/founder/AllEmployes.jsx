import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function AllEmployes() {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN_URL}/auth/registerUser`, {
            headers: {
                Authorization:  `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then(response => {
                setEmployees(response.data.users);  // Ensure correct access to users array
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

  


  return (
    <>
    <div className='grid grid-cols-4 gap-4'>
    {
              employees.map((item, index) => {
                    const { JobPosition, username, email, profileIMG, _id } = item;
                    return (
                        <div className="bg-white shadow-md rounded-lg py-3" key={index}>
                            <div className="photo-wrapper p-2">
                                <img className="w-40 h-40 rounded-full mx-auto" src={`${process.env.REACT_APP_DOMAIN_URL}/${profileIMG}`} alt="John Doe" />
                            </div>
                            <div className="p-2">
                                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{username}</h3>
                                <div className="text-center text-gray-400 text-xs font-semibold">
                                    <p>{JobPosition}</p>
                                </div>
                                <table className="text-xs my-3">
                                    <tbody>
                                        <tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                            <td className="px-2 py-2">{username}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                            <td className="px-2 py-2">{email}</td>
                                        </tr>
                                    </tbody></table>
                                <div className="text-center mt-3">
                                    <Link to={`/founder/employe-details/${_id}`}
                                        state={{ memberDetails: item }}
                                        className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" >View Profile</Link>
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

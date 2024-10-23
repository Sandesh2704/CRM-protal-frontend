import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../authProvider/AuthProvider';
import { Link } from 'react-router-dom';

export default function TeamMember() {


    const { user } = useAuth();
    const teamLeaderId = user?._id;
    const [teamMembers, setTeamMembers] = useState([]);
    useEffect(() => {
        const fetchTeamMembers = async () => {
            if (teamLeaderId) {
                try {
                    console.log('Fetching team members for:', teamLeaderId);
                    const response = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/teamManage/team/${teamLeaderId}`);
                    console.log('Team members fetched:', response.data);
                    setTeamMembers(response.data.teamMembers);
                } catch (error) {
                    console.error('Failed to load team members:', error.response?.data || error.message);
                }
            } else {
                console.log("No team leader ID available");
            }
        };
        fetchTeamMembers();
    }, [teamLeaderId]);


    return (
        <div>

            <div>
                <h2>Your Team Members</h2>
                <div className='grid grid-cols-4 gap-4'>

                    {
                        teamMembers.map((item, index) => {
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
                                            <Link to={`/team-leader/team-member-detail/${_id}`}
                                                state={{ memberDetails: item }}
                                                class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" >View Profile</Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}
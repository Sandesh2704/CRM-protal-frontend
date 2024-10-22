import { useEffect, useState } from "react";

import axios from "axios";
import { useAuth } from "../../authProvider/AuthProvider";

export default function Dashboard() {

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
    <>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-7 mt-5'>
        <div className='bg-white shadow-lg shadow-black/5  rounded-2xl'>
          <div className='px-5 py-6 border-b border-dotted'>
            <h3 className='text-theme1 text-xl'>Total Team Members</h3>
          </div>
          <div className='px-5 py-6'>
            <div>
              {teamMembers !== null ? (
                <div className='flex items-end'>
                  <h1 className='text-9xl font-bold'>{teamMembers.length}</h1>
                </div>
              ) : (
                <>
                  <p>No data available</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
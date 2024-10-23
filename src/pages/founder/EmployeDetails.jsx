import React from 'react'
import { useLocation } from 'react-router-dom';

export default function EmployeDetails() {

    const location = useLocation();
    const memberDetails = location.state?.memberDetails;  
    if (!memberDetails) {
      return <div>No member details available.</div>;
    }
  
    const { username, JobPosition, email, phone, profileIMG, bio, joinedAt } = memberDetails;
  

    return (
        <div>
           <div>
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="photo-wrapper p-4">
          <img className="w-40 h-40 rounded-full mx-auto" src={`http://localhost:8000/${profileIMG}`} alt={username} />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold">{username}</h2>
          <p className="text-gray-600">{JobPosition}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-medium">Member Information</h3>
          <ul className="text-gray-700 mt-2">
            <li><strong>Email:</strong> {email}</li>
            <li><strong>Phone:</strong> {phone}</li>
            <li><strong>Joined:</strong> {new Date(joinedAt).toLocaleDateString()}</li>
            <li><strong>Bio:</strong> {bio}</li>
          </ul>
        </div>
      </div>
    </div>
        </div>
    )
}

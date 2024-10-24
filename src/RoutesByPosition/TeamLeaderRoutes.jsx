import { Route, Routes, } from 'react-router-dom';
import Dashboard from '../pages/teamLeader/Dashboard';
import Profile from '../pages/teamLeader/Profile';
import ProfileCardDetail from '../pages/teamLeader/ProfileCardDetail';
import TeamMember from '../pages/teamLeader/TeamMember';
import AddTeamMember from '../pages/teamLeader/AddTeamMember';
import Layout from '../layout/Layout';
export default function TeamLeaderRoutes() {
  return (
    <>
  <Routes>
      {/* Parent route with Layout component */}
      <Route path="/" element={<Layout />}>
        {/* Nested routes */}
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="team-member-detail/:slug" element={<ProfileCardDetail />} />
        <Route path="team-members" element={<TeamMember />} />
        <Route path="add-team-member" element={<AddTeamMember />} />
      </Route>
    </Routes>
    </>
  )
}

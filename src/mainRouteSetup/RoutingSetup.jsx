import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RagistrationForm from '../pages/RagistrationForm';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import FounderRoutes from '../differentRoutes/FounderRoutes';
import ManagerRoutes from '../differentRoutes/ManagerRoutes';
import TeamLeaderRoutes from '../differentRoutes/TeamLeaderRoutes';
import EmployeeRoutes from '../differentRoutes/EmployeeRoutes';

import { useAuth } from '../authProvider/AuthProvider';

export default function RoutingSetup() {
  const { isLoggedIn, userJobPosition } = useAuth();

  const ProtectedRoute = ({ isLoggedIn, roles, requiredJobPosition, children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }

    // Check if the user's role is allowed to access the route
    if (roles && !roles.includes(requiredJobPosition)) {
      return <Navigate to="/" />; // Redirect to dashboard or another page
    }

    return children;
  };


  // useEffect(() => {
  //   const handleContextMenu = (e) => e.preventDefault();
  //   const handleKeyDown = (e) => {
  //     if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
  //       e.preventDefault();
  //     }
  //   };
  //   document.addEventListener('contextmenu', handleContextMenu);
  //   document.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/ragistrationform" element={<RagistrationForm />} />
        {/* Logout Route accessible to all */}
        <Route path="/logout" element={<Logout />} />
        {/* Default redirect based on role */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              userJobPosition === 'Founder' ? <Navigate to="/founder/" /> :
              userJobPosition === 'Manager' ? <Navigate to="/manager/" /> :
              userJobPosition === 'Team Leader' ? <Navigate to="/team-leader/" /> :
              userJobPosition === 'Employee' ? <Navigate to="/employee/" /> :
              <Navigate to="/login" />
            ) : <Navigate to="/login" />
          }
        />

        {/* Founder Routes */}
        <Route
          path="/founder/*"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              roles={['Founder']}
              requiredJobPosition={userJobPosition}
            >
              <FounderRoutes />
            </ProtectedRoute>
          }
        />

        {/* Manager Routes */}
        <Route
          path="/manager/*"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              roles={['Manager']}
              requiredJobPosition={userJobPosition}
            >
              <ManagerRoutes />
            </ProtectedRoute>
          }
        />

        {/* Team Leader Routes */}
        <Route
          path="/team-leader/*"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              roles={['Team Leader']}
              requiredJobPosition={userJobPosition}
            >
              <TeamLeaderRoutes />
            </ProtectedRoute>
          }
        />


        {/* Employee Routes */}
        <Route
          path="/employee/*"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              roles={['Employee']}
              requiredJobPosition={userJobPosition}
            >
              <EmployeeRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
import logo from '../assets/crm-logo.png'

import { NavLink } from 'react-router-dom';
import { CiGrid41 } from 'react-icons/ci';
import { TbPinnedFilled } from 'react-icons/tb';
import { LuUsers, LuUsers2 } from "react-icons/lu";
import { useAuth } from '../authProvider/AuthProvider';
import { AiOutlineUsergroupAdd } from "react-icons/ai";

export default function SideBar({ isOpen, toggleSidebar }) {

  const { userJobPosition } = useAuth();

  const roleBasedLinks = {
    Founder: [
      { path: '/founder', label: 'Dashboard', icon: <CiGrid41 /> },
      { path: '/founder/employees', label: 'All Employees', icon: <LuUsers /> },
      { path: '/founder/assign-task', label: 'Assign Task', icon: <LuUsers /> },
      { path: '/founder/applications', label: 'View Applications', icon: <LuUsers /> },
    ],
    Manager: [
      { path: '/manager', label: 'Dashboard', icon: <CiGrid41 /> },
      { path: '/manager/team-leaders', label: 'Team Leaders', icon: <CiGrid41 /> },
      { path: '/manager/assign-leader', label: 'Assign Team Leader', icon: <CiGrid41 /> },
      { path: '/manager/attendance', label: 'Attendance Chart', icon: <CiGrid41 /> },
    ],
    'Team Leader': [
      { path: '/team-leader', label: 'Dashboard', icon: <CiGrid41 /> },
      { path: '/team-leader/team-members', label: 'Team Members', icon: <LuUsers2 /> },
      { path: '/team-leader/add-team-member', label: 'Add Team Member', icon: < AiOutlineUsergroupAdd /> },
    ],
    Employee: [
      { path: '/employee', label: 'Dashboard', icon: <CiGrid41 /> },
      { path: '/employee/tasks', label: 'Tasks', icon: <CiGrid41 /> },
      { path: '/employee/leave-application', label: 'Leave Application', icon: <CiGrid41 /> },
    ],
  }

  return (
    <>
      <div
        className={`z-40 bg-white border-r-2 transition-all duration-300 ${isOpen ? 'w-[80%] sm:w-[252px] block' : 'hidden lg:block lg:w-16'}   h-screen fixed`}
        style={{ borderColor: `linear-gradient(266deg, #a54de3 32%, #ff08e9 71%)` }}>
        <div className={` flex items-center  shadow shadow-white/5 justify-center border-b ${!isOpen ? 'py-4' : 'py-2'}`}>
          <div className={`${!isOpen ? 'hidden' : ''}`}>
            <img src={logo} alt="logo" srcset="" className='w-32' />
          </div>


          <div
            onClick={toggleSidebar}
            className={`group p-2 bg-gray-800 rounded-md cursor-pointer  ${!isOpen ? 'flex' : 'hidden'}`} >
            <span className={`text-2xl font-semibold text-white  group-hover:rotate-180 transform duration-500`}>
              <CiGrid41 />
            </span>
          </div>
        </div>

        <div className={`mt-10 flex flex-col  ${isOpen ? ' px-4 lg:px-4 gap-y-1' : 'px-3 gap-y-3'}`}>
          {roleBasedLinks[userJobPosition]?.map((link) => (
            <MenuItem URL={link.path} icon={link.icon} label={link.label} isOpen={isOpen} key={link.path} />
          ))}
        </div>
      </div>
    </>
  )
}


const MenuItem = ({ URL, icon, label, isOpen }) => {
  return (
    <NavLink
      to={URL}
      className={({ isActive }) => ` flex items-center group
        ${!isOpen ? 'justify-center py-2' : 'py-3 px-4 justify-between'} 
        ${isActive ? 'bg-gray-800 text-white  rounded-lg ' : 'text-gray-600'}
        `}
        end>
      <div className='flex items-center'>
        <span className={`text-2xl font-bold ${!isOpen ? 'hidden lg:flex' : ''} duration-600`}>
          {icon}
        </span>
        {isOpen && <span className="ml-4">{label}</span>}
      </div>
      {isOpen &&
        <span className={`hidden group-hover:flex duration-300 text-lg `}>
          <TbPinnedFilled />
        </span>
      }
    </NavLink>
  );
}
import { NavLink } from 'react-router-dom';
import { CiGrid41 } from 'react-icons/ci';
import { TbPinnedFilled } from 'react-icons/tb';
import { AiFillDiff } from 'react-icons/ai';
import { LuUsers } from "react-icons/lu";

export default function SideBar({ isOpen, handleMouseEnter, handleMouseLeave, toggleSidebar, }) {


  return (
    <>
      <div
        className={`z-40 bg-black transition-all duration-300 ${isOpen ? 'w-[80%] sm:w-[252px] block' : 'hidden lg:block lg:w-16'}   h-screen fixed`}>
        <div className={`py-4 flex items-center  shadow shadow-white/5 ${!isOpen ? 'justify-center' : 'px-5  justify-between'}`}>
          <h3 className={`text-white text-2xl ${!isOpen ? 'hidden' : ''}`}>CallCenter</h3>


          <div
            onClick={toggleSidebar}
            className={`group p-2 bg-gray-800 rounded-md cursor-pointer flex `} >
            <span className={`text-2xl font-semibold text-white  group-hover:rotate-180 transform duration-500`}>
              <CiGrid41 />
            </span>
          </div>
        </div>

        <div className={`mt-10 flex flex-col  ${isOpen ? ' px-4 lg:px-4 gap-y-1' : 'px-3 gap-y-3'}`}>
          <MenuItem URL="/" icon={<CiGrid41/>} label="Dashboard" isOpen={isOpen} />
          <MenuItem URL="addnewmembar" icon={< AiFillDiff />} label="Add New Membar" isOpen={isOpen} />
          <MenuItem URL="allmember" icon={<LuUsers />} label="All Member" isOpen={isOpen} />
        </div>
      </div>
    </>
  )
}


const MenuItem = ({ URL, icon, label, isOpen }) => {
  return (
    <NavLink
      to={URL}
      className={({ isActive }) => ` flex items-center group hover:bg-gray-800/60
        ${!isOpen ? 'justify-center py-2' : 'py-3 px-4 justify-between'} 
        ${isActive ? 'bg-gray-800 text-white  rounded-lg ' : 'text-gray-400 '}
        `}>
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
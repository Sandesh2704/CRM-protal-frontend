import { useEffect, useState } from 'react';
import SideBar from '../component/SideBar';
import Navbar from '../component/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../component/Footer';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const [mouseEventsEnabled, setMouseEventsEnabled] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) {
      setMouseEventsEnabled(true);
    } else {
      setMouseEventsEnabled(false);
    }
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (mouseEventsEnabled) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (mouseEventsEnabled) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  return (
    <>
      <div className="flex  bg-blue-100/40 w-full">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} toggleSidebar={toggleSidebar} handleMouseLeave={handleMouseLeave} handleMouseEnter={handleMouseEnter} />
        <div className={`flex-col min-h-screen lg:flex-1  w-full  relative z-0  transition-all duration-300  ${isOpen ? 'xl:ml-[252px]' : 'lg:ml-16'}`}>
          <div className={`relative z-0  h-full w-full `}>
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="px-4 md:px-7 py-10 flex-grow">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}


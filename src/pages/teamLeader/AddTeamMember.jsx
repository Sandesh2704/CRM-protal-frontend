import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../authProvider/AuthProvider';
import { MdClose } from 'react-icons/md';
import { IoCloudUploadOutline } from 'react-icons/io5';
import TextInput from '../../component/TextInput';
import { BiHide, BiShow } from 'react-icons/bi';
import SelectInput from '../../component/SelectInput';
import Button from '../../component/Button';
import Swal from 'sweetalert2';

export default function AddTeamMember() {
    const { user } = useAuth();
    const teamLeaderId = user?._id;

    const [memberData, setMemberData] = useState({
        username: '',
        email: '',
        number: '',
        password: '',
        jobRole: "",
        department: "",
        jobPosition: "",
        profileIMG: null,
        city: '',
        state: '',
        gender: '',
    });

    const [previewSrc, setPreviewSrc] = useState('');

    useEffect(() => {
      if (memberData.profileIMG) {
        const objectUrl = URL.createObjectURL(memberData.profileIMG);
        setPreviewSrc(objectUrl);
        return () => URL.revokeObjectURL(objectUrl); // Clean up the object URL
      }
    }, [memberData.profileIMG]);
  
    const inputHandler = (e) => {
      const { name, value, files } = e.target;
      setMemberData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value
      }));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log('Submitting member data:', memberData);
    //     console.log('Team Leader ID:', teamLeaderId);

    //     const formData = new FormData();

    //     // Append user data to formData
    //     for (const key in memberData) {
    //       formData.append(key, memberData[key]);
    //     }
  

    //     try {
    //         const response = await axios.post(`${process.env.REACT_APP_DOMAIN_URL}/teamManage/team/add-member`, {
    //             teamLeaderId,
    //             memberData
    //         });
    //         console.log('Response from server:', response.data);

    //         setMemberData({ username: '',
    //             email: '',
    //             number: '',
    //             city: '',
    //             state: '',
    //             gender: '',
    //             password: '',
    //             jobRole: "",
    //             profileIMG: null, // Reset the image file
    //             department: "",
    //             jobPosition: "" });

    //             setPreviewSrc('');

    //   Swal.fire({
    //     title: 'Your message has been sent successfully!',
    //     icon: 'success',
    //     confirmButtonText: 'OK',
    //     customClass: {
    //       popup: 'custom-popup'
    //     }
    //   });


    //         const fetchResponse = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/teamManage/team/${teamLeaderId}`);
    //         console.log('Updated team members:', fetchResponse.data.teamMembers);
    //     } catch (error) {
    //         console.error('Error adding new member:', error.response?.data || error.message);
    //     }
    // };


    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Submitting member data:', memberData);
      console.log('Team Leader ID:', teamLeaderId);
  
      const formData = new FormData();
  
      // Append user data to formData
      formData.append('teamLeaderId', teamLeaderId);
      for (const key in memberData) {
        formData.append(key, memberData[key]);
      }
  
      try {
          const response = await axios.post(`${process.env.REACT_APP_DOMAIN_URL}/teamManage/team/add-member`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          console.log('Response from server:', response.data);
  
          setMemberData({
              username: '',
              email: '',
              number: '',
              city: '',
              state: '',
              gender: '',
              password: '',
              jobRole: "",
              profileIMG: null, // Reset the image file
              department: "",
              jobPosition: ""
          });
          setPreviewSrc('');
  
          Swal.fire({
              title: 'Your message has been sent successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
              customClass: {
                  popup: 'custom-popup'
              }
          });
  
          const fetchResponse = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/teamManage/team/${teamLeaderId}`);
          console.log('Updated team members:', fetchResponse.data.teamMembers);
      } catch (error) {
          console.error('Error adding new member:', error.response?.data || error.message);
      }
  };

    const deleteImage = () => {
        console.log('Deleting image');
        setMemberData((prev) => ({
          ...prev,
          profileIMG: null // Correctly set to null
        }));
        setPreviewSrc(''); // Reset preview source
      };
    
    
      const [passwordShow, setPasswordShow] = useState(false);
      const passwordHandler = () => {
        setPasswordShow(!passwordShow);
      };
    

    return (
        <>
            <h1>Team Leader Dashboard</h1>
       


            <div className='w-[100%]    bg-white shadow-lg shadow-black/5 rounded-2xl '>
      <div className='px-7 py-6 border-b border-dotted'>
        <h3 className='text-theme2 font-medium text-xl'>Add New Admin Form</h3>
      </div>
      <div className='py-6 px-7'>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  lg:grid-rows-4 gap-x-7 gap-y-10'>
            <div className='h-full w-full  md:row-span-2 lg:row-span-2'>
              {memberData.profileIMG ? (
                <div className='relative flex justify-center'>
                  <img
                    src={previewSrc}
                    alt='Profile'
                    className='rounded-full h-full'
                  />
                  <button
                    className='absolute right-3 top-3 text-black text-lg bg-blue-50 rounded-full p-2'
                    onClick={deleteImage}
                  >
                    <MdClose />
                  </button>
                </div>
              ) : (
                <div className='h-60 lg:h-full flex items-center rounded-full justify-center w-full border border-gray-400 border-dashed  cursor-pointer'>
                  <label className='flex flex-col items-center justify-center'>
                    <div className='flex flex-col items-center justify-center'>
                      <span className='text-5xl lg:text-5xl text-gray-400 mb-5'>
                        <IoCloudUploadOutline />
                      </span>
                      <p className='text-base text-gray-600 text-center'>
                        <span className='font-semibold text-black'>Click to upload profile image</span> <br />
                        <span>or drag and drop</span>
                      </p>
                    </div>
                    <input
                      id='dropzone-file'
                      type='file'
                      name='profileIMG'
                      className='hidden'
                      onChange={inputHandler} // Attach the inputHandler to onChange
                    />
                  </label>
                </div>
              )}
            </div>

            <TextInput
              type='text'
              placeholder='Name*'
              label='Name*'
              name='username'
              value={memberData.username}
              inputHandler={inputHandler} />
            <TextInput
              type='email'
              label='Email*'
              placeholder='Email*'
              name="email"
              value={memberData.email}
              inputHandler={inputHandler} />

            <TextInput
              type='number'
              placeholder='Number*'
              label='Number*'
              name='number'
              value={memberData.number}
              inputHandler={inputHandler} />

            <div>
              <label className="text-theme5 font-medium">Password*</label>
              <div className='flex items-center justify-between mt-4 w-full bg-white py-[16px] px-6 rounded-sm border'>
                <input
                  name='password'
                  type={passwordShow ? 'text' : 'password'}
                  placeholder='Password'
                  value={memberData.password}
                  onChange={inputHandler}
                  className="placeholder:text-zinc-500 text-theme5 outline-none text-sm"
                />
                <div className='text-zinc-500 text-lg' onClick={passwordHandler}>
                  {passwordShow ? <BiHide /> : <BiShow />}
                </div>
              </div>
            </div>

            <SelectInput
              label="Department*"
              name="department"
              value={memberData.department}
              inputHandler={inputHandler}
              options={[
                { value: 'IT', label: 'IT' },
                { value: 'HR', label: 'HR' },
                { value: 'CSR', label: 'CSR' },
              ]}
            />

            <SelectInput
              label="Job Position*"
              name="jobPosition"
              value={memberData.jobPosition}
              inputHandler={inputHandler}

              options={[
                { value: 'Employee', label: 'Employee' },
                { value: 'Team Leader', label: 'Team Leader' },
                { value: 'Manager', label: 'Manager' },
                { value: 'Founder', label: 'Founder' }
              ]}
            />

            {memberData.jobPosition === 'Employee' && (
              <>
                <TextInput
                  type='text'
                  label='Job Role*'
                  placeholder='Ex:- Developer, HR, Intern'
                  name="jobRole"
                  value={memberData.jobRole}
                  inputHandler={inputHandler} />
              </>
            )}


            <TextInput
              type='text'
              placeholder='City*'
              label='City*'
              name='city'
              value={memberData.city}
              inputHandler={inputHandler} />
            <TextInput
              type='text'
              label='State*'
              placeholder='State*'
              name="state"
              value={memberData.state}
              inputHandler={inputHandler} />

            <div>
              <label className='text-theme2 font-medium'>Gender:</label>
              <div className='flex gap-5 py-[16px] px-6 mt-4'>
                <div className='flex items-center gap-2'>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={memberData.gender === 'male'}
                    onChange={inputHandler}
                    className='text-theme5 placeholder:text-zinc-500 outline-none text-sm text-gray-900'
                  />
                  <label className="text-theme5 font-medium">Male</label>
                </div>

                <div className='flex items-center gap-2'>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={memberData.gender === 'female'}
                    onChange={inputHandler}
                  />
                  <label className="text-theme5 font-medium">Female</label>
                </div>
              </div>
            </div>

          </div>
          <div className='mt-12 flex justify-center'>
            <button onSubmit={handleSubmit}>
              <Button title='Submit' />
            </button>
          </div>
        </form>
      </div>
    </div>
        </>
    );
}


     {/* <div>
                <h2>Add New Team Member</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={memberData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={memberData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="number"
                        placeholder="Phone Number"
                        value={memberData.number}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={memberData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Add Member</button>
                </form>
            </div> */}

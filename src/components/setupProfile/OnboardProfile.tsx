import React, { useEffect, useState } from 'react'
import { styles } from '../styles/style'
import { toast } from 'react-toastify'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { useEditProfileMutation, useGetUserInfoQuery } from '../../redux/features/user/userApi'
import { Link, useNavigate } from 'react-router-dom'
import Modal from './Modal'
import { IoArrowBackOutline } from 'react-icons/io5'
import { FaCloudUploadAlt } from "react-icons/fa";

type Props = {}

export default function OnboardProfile({ }: Props) {
  const { data: x, refetch } = useGetUserInfoQuery({}, { refetchOnMountOrArgChange: true })

  const [editProfile, { data, isLoading, isSuccess, error }] = useEditProfileMutation()
  const navigate = useNavigate()
  const [email, setEmail] = useState(x?.user?.email)
  const [name, setName] = useState(x?.user?.name)
  const [phone_number, setPhone_number] = useState(x?.user?.phone_number)
  const [date_of_birth, setdate_of_birth] = useState(x?.user?.date_of_birth)
  const [gender, setGender] = useState(x?.user?.gender)
  const [occupation, setOccupation] = useState(x?.user?.occupation)
  const [location, setLocation] = useState(x?.user?.location)
  const [country, setCountry] = useState(x?.user?.country)
  const [marrital_status, setMarrital_status] = useState(x?.user?.marrital_status)
  const [address, setAddress] = useState(x?.user?.address)
  const [tithe_number, setTithe_number] = useState(x?.user?.tithe_number);
  const [married_to, setMarried_to] = useState(x?.user?.married_to)
  const [church_name, setChurch_name] = useState(x?.user?.church_name)
  const [church_address, setChurch_address] = useState(x?.user?.church_address)
  const [accountType, setAccountType] = useState(x?.user?.accountType)
  const [church_country, setchurch_country] = useState(x?.user?.church_country)
  const [h_name, setH_name] = useState(x?.user?.h_name)
  const [works_at, setWorks_at] = useState(x?.user?.works_at)
  const [salary_expection, setSalary_Expectation] = useState(x?.user?.salary_expection)
  const [working_since, setWorking_since] = useState(x?.user?.working_since)
  const [service_group, setService_group] = useState([{ title: "" }])
  const [is_employed, setIs_employed] = useState(x?.user?.is_employed)
  const [started_since, setStarted_since] = useState(x?.user?.started_since)
  const [image, setImage] = useState(x?.user?.avatar?.url)


  useEffect(() => {
    if (x) {
      setService_group(x?.user?.service_group);
    }
  }, [x])

  const updateProfile = {
    email,
    name,
    phone_number,
    date_of_birth,
    gender,
    occupation,
    location,
    country,
    marrital_status,
    address,
    tithe_number,
    married_to,
    church_name,
    church_address,
    accountType,
    church_country,
    h_name,
    works_at,
    salary_expection,
    working_since,
    service_group,
    is_employed,
    started_since,
  }


  // Generate Tithe number
  const generateRandomNumber = () => {
    if (tithe_number.length === 0) {
      const newNumber: string = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      setTithe_number(newNumber);
    }
  };

  const clearNumbers = () => {
    setTithe_number("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();


    await editProfile(updateProfile)
  }

  const handleServiceGroupChange = (index: number, value: any) => {
    const updatedServiceGroup = [...service_group];
    updatedServiceGroup[index].title = value;
    setService_group(updatedServiceGroup);
  }

  const handleAddBenefits = () => {
    setService_group([...service_group, { title: "" }])
  }


  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Successfully updated your profile";
      toast.success(message);
      refetch()
      navigate('/profile');
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message)
      }
    }
  }, [isSuccess, error])

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };



  return (
    <div className='w-full flex flex-col '>
      <div className='fixed top-0 right-0 left-0 border-b border-gray-700 shadow-md'>
        <div className='max-container items-center padding-container pb-3 justify-between lg:justify-between flex flex-col lg:flex-row bg-gray-900'>
          <div className='w-full px-4 md:px-0 md:w-[80%] lg:w-[45%] m-auto mt-6 flex flex-row gap-5 items-center'>
            <Link to="/profile">
              <div>
                <IoArrowBackOutline className='text-3xl text-blue-100 cursor-pointer' />
              </div>
            </Link>
            <div className='text-[25px] font-semibold text-white'>Profile Setup</div>
          </div>
        </div>
      </div>
      <div className='w-full px-4 md:px-0 md:w-[80%] lg:w-[45%] m-auto mt-24'>
        <form onSubmit={handleSubmit} className={`${styles.label}`}>
          <div className='flex justify-between items-center gap-3'>
            <div className='w-full'>
              <label htmlFor='' className="text-white text-base">
                Name *
              </label>
              <input
                type='name'
                name=''
                required
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                id="name"
                placeholder="Enter name"
                className={`${styles.input}`}
              />
            </div>
            <div className='my-5 w-full'>
              <label htmlFor='' className="text-white text-base">
                Email
              </label>
              <input
                readOnly
                type='email'
                name=''
                required
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                id="name"
                placeholder="Enter email"
                className={`${styles.input}`}
              />
            </div>
          </div>
          <div className='flex justify-between items-center gap-3'>
            <div className='my-5 w-full'>
              <label htmlFor='' className="text-white text-base">
                Phone
              </label>
              <input
                type='phone'
                name=''
                required
                value={phone_number}
                onChange={(e: any) => setPhone_number(e.target.value)}
                id="name"
                placeholder="Enter phone number"
                className={`${styles.input}`}
              />
            </div>

            <div>
              <label htmlFor='' className="text-white text-base">
                Account Type
              </label>
              <select

                required
                value={accountType}
                onChange={(e: any) => setAccountType(e.target.value)}
                id="category"
                className={`${styles.input} !text-blue-500 custom-select`}
              >
                <option value=''>--Please select account type--</option>
                <option value='Membership'>Membership</option>
                <option value='Ministry'>Ministry</option>
                <option value='Friends of the commission'>Friends of the commission</option>
              </select>
            </div>
          </div>
          <br />


          <div className='w-full flex justify-between items-center'>
            <div className={tithe_number == " " ? 'w-[45%]' : "w-full"}>
              <label htmlFor='' className="text-white text-base">
                Tithe Number
              </label>
              <input
                readOnly
                type='number'
                name=''
                required
                value={tithe_number}
                onChange={(e: any) => setTithe_number(e.target.value)}
                id="name"
                placeholder="Tithe number"
                className={`${styles.input}`}
              />
            </div>
            {tithe_number == "" &&
              <div className='w-[45%]'>
                <div className='flex flex-row gap-2 items-center justify-start'>
                  <button className=' bg-green-700 px-3 py-2 text-white text-[10px] rounded-md' onClick={generateRandomNumber}>Generate Tithe Number</button>
                  <button className=' bg-red-600 py-2 px-2 text-[10px] rounded-md' onClick={clearNumbers}>Clear Numbers</button>
                </div>
              </div>
            }
          </div>

          <div className='flex justify-between items-center gap-3'>
            {accountType == "Membership" &&
              <div className='my-5 w-full'>
                <label htmlFor='' className="text-white text-base">
                  Job Status
                </label>
                <select

                  required
                  value={is_employed}
                  onChange={(e: any) => setIs_employed(e.target.value)}
                  id="category"
                  className={`${styles.input} !text-blue-500 custom-select`}
                >
                  <option value=''>--Please select employement status--</option>
                  <option value='Employed'>Employed</option>
                  <option value='Unemployed'>Unemployed</option>
                </select>

              </div>
            }
            <div className='my-5 w-[30%] justify-cente items-center flex'>
              <div onClick={openModal} className=' bg-green-700 px-3 py-2 text-white text-[10px] rounded-md cursor-pointer flex flex-row items-center'  >Upload Profile Image
                <FaCloudUploadAlt className='text-2xl text-yellow-50 ml-4' />
              </div>
            </div>
          </div>
          {accountType == "Membership" &&
            <div className='flex justify-between items-center gap-3'>

              <div>
                <label htmlFor='' className="text-white text-base">
                  House Fellowship Name
                </label>
                <input
                  type='text'
                  name=''
                  required
                  value={h_name}
                  onChange={(e: any) => setH_name(e.target.value)}
                  id="name"
                  placeholder="House fellowhisp"
                  className={`${styles.input}`}
                />
              </div>
              <div className='my-5 w-full'>
                <label htmlFor='' className="text-white text-base">
                  Started salvation ministries when?
                </label>
                <input
                  type='started_when'
                  name=''
                  required
                  value={started_since}
                  onChange={(e: any) => setStarted_since(e.target.value)}
                  id="name"
                  placeholder="Start when?"
                  className={`${styles.input}`}
                />
              </div>

            </div>
          }
          <div className='flex justify-between items-center gap-3'>
            <div className='my-5 w-full'>
              <label htmlFor='' className="text-white text-base">
                Date of Birth
              </label>
              <input
                type='date_of_birth'
                name=''
                required
                value={date_of_birth}
                onChange={(e: any) => setdate_of_birth(e.target.value)}
                id="name"
                placeholder="Date of Birth"
                className={`${styles.input}`}
              />
            </div>
            {accountType == "Membership" || accountType == "Friends of the commission" &&
              <div className='my-5 w-full'>
                <label htmlFor='' className="text-white text-base">
                  Gender
                </label>
                <select

                  required
                  value={gender}
                  onChange={(e: any) => setGender(e.target.value)}
                  id="category"
                  className={`${styles.input} !text-blue-500 custom-select`}
                >
                  <option value=''>--Please select gender--</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                </select>
              </div>
            }
          </div>
          {accountType == "Membership" &&
            <div className='flex justify-between items-center gap-3'>
              <div className='my-5 w-full'>
                <label htmlFor='' className="text-white text-base">
                  Occupation
                </label>
                <input
                  type='date_of_birth'
                  name=''
                  required
                  value={occupation}
                  onChange={(e: any) => setOccupation(e.target.value)}
                  id="name"
                  placeholder="Date of Birth"
                  className={`${styles.input}`}
                />
              </div>
              {accountType == "Membership" || accountType == "Friends of the commission" &&
                <div className='my-5 w-full'>
                  <label htmlFor='' className="text-white text-base">
                    Marrital Status
                  </label>
                  <select

                    required
                    value={marrital_status}
                    onChange={(e: any) => setMarrital_status(e.target.value)}
                    id="category"
                    className={`${styles.input} !text-blue-500 custom-select`}
                  >
                    <option value=''>--Please select marrital status--</option>
                    <option value='Single'>Single</option>
                    <option value='Married'>Married</option>
                    <option value='Divorced'>Divorced</option>
                    <option value='Widow'>Widow</option>
                    <option value='Widower'>Widower</option>
                  </select>
                </div>
              }
              {marrital_status == "Married" || accountType == "Membership" &&
                <div className='my-5 w-full'>
                  <label htmlFor='' className="text-white text-base">
                    Married to?
                  </label>
                  <input
                    type='married_to'
                    name=''
                    required
                    value={married_to}
                    onChange={(e: any) => setMarried_to(e.target.value)}
                    id="name"
                    placeholder="Married to?"
                    className={`${styles.input}`}
                  />
                </div>
              }
            </div>
          }
          {accountType == "Membership" &&
            <div className='my-5'>
              <label htmlFor='' className="text-white text-base">
                Address
              </label>
              <input
                type='married_to'
                name=''
                required
                value={address}
                onChange={(e: any) => setAddress(e.target.value)}
                id="name"
                placeholder="Address"
                className={`${styles.input}`}
              />
            </div>
          }
          {accountType == "Membership" || accountType == "Friends of the commission" &&
            <div className='flex justify-between items-center gap-3'>
              <div className='my-5 w-full'>
                <label htmlFor='' className="text-white text-base">
                  City
                </label>
                <input
                  type='married_to'
                  name=''
                  required
                  value={location}
                  onChange={(e: any) => setLocation(e.target.value)}
                  id="name"
                  placeholder="City of residence"
                  className={`${styles.input}`}
                />
              </div>
              <div className='my-5 w-full'>
                <label htmlFor='' className="text-white text-base">
                  Country
                </label>
                <input
                  type='married_to'
                  name=''
                  required
                  value={country}
                  onChange={(e: any) => setCountry(e.target.value)}
                  id="name"
                  placeholder="Country"
                  className={`${styles.input}`}
                />
              </div>
            </div>
          }
          <div className={`${styles.label}`}>

            <br />
            {accountType == "Ministry" &&
              <div className={`${styles.label}`}>
                <h2 className='text-xl mb-2 underline '>Church Details</h2>
                <div className='mt-3'>
                <label htmlFor='' className="text-white text-base">
                    Name
                  </label>
                  <input
                    type='text'
                    name=''
                    required
                    value={church_name}
                    onChange={(e: any) => setChurch_name(e.target.value)}
                    id="name"
                    placeholder="Branch Name"
                    className={`${styles.input}`}
                  />
                </div>

                <div className='my-5'>
                <label htmlFor='' className="text-white text-base">
                    Address
                  </label>
                  <input
                    type='text'
                    name=''
                    required
                    value={church_address}
                    onChange={(e: any) => setChurch_address(e.target.value)}
                    id="name"
                    placeholder="Church address"
                    className={`${styles.input}`}
                  />
                </div>
                <div className='my-5'>
                <label htmlFor='' className="text-white text-base">
                    Country
                  </label>
                  <input
                    type='text'
                    name=''
                    required
                    value={church_country}
                    onChange={(e: any) => setchurch_country(e.target.value)}
                    id="name"
                    placeholder="Country of residence"
                    className={`${styles.input}`}
                  />
                </div>
                <br />

              </div>
            }

          </div>


          <div className={`${styles.label}`}>

            {is_employed == "Employed" &&
              <h2 className='text-xl mb-2 underline '>Job Details</h2>
            }
            {is_employed == "Employed" &&
              <div className='flex-col md:flex md:flex-row justify-between gap-5 items-center'>
                <div>
                <label htmlFor='' className="text-white text-base">
                    Works at?
                  </label>
                  <input
                    type='text'
                    name=''
                    required
                    value={works_at}
                    onChange={(e: any) => setWorks_at(e.target.value)}
                    id="name"
                    placeholder="Enter your company name"
                    className={`${styles.input}`}
                  />
                </div>

                <div className='my-5'>
                <label htmlFor='' className="text-white text-base">
                    Monthly Income
                  </label>
                  <input
                    type='text'
                    name=''
                    required
                    value={salary_expection}
                    onChange={(e: any) => setSalary_Expectation(e.target.value)}
                    id="name"
                    placeholder="What is your salary expectation?"
                    className={`${styles.input}`}
                  />
                </div>
                <div className='my-5'>
                <label htmlFor='' className="text-white text-base">
                    Started Working Since ?
                  </label>
                  <input
                    type='text'
                    name=''
                    required
                    value={working_since}
                    onChange={(e: any) => setWorking_since(e.target.value)}
                    id="name"
                    placeholder="When do you start working"
                    className={`${styles.input}`}
                  />
                </div>
              </div>
            }
            {is_employed == "Employed" &&
              <br />
            }
            {accountType == "Membership" &&
              <div>
                <label htmlFor='' className="text-white text-base">
                  What service group are you?
                </label>
                <br />
                {
                  service_group.map((service_group: any, index: number) => (
                    <input
                      type='text'
                      key={index}
                      name='Benefit'
                      placeholder='What service group do you belong...'
                      required
                      className={`${styles.input} my-2`}
                      value={service_group.title}
                      onChange={(e) => handleServiceGroupChange(index, e.target.value)}
                    />
                  ))
                }
                < IoMdAddCircleOutline
                  style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                  onClick={handleAddBenefits}
                />

              </div>
            }
            <br />
          </div>


          <br />

          <br />
          <div className='w-full flex items-center justify-end'>
            <input
              type='submit'
              value="Update profile"
              className='w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer' />
          </div>
        </form>
      </div >
      {isOpen && (
        <Modal setIsOpen={setIsOpen} image={image} refetch={refetch} />
      )}
    </div >


  )
}


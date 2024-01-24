import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hometable from '../Components/Hometable'
import LoadingSpinner from '../Components/LoadingSpinner'
import { registerContext } from './Contextshare'
import Alert from 'react-bootstrap/Alert';
import { allUsers, deleteUser } from '../services/AllApi'


function Home() {

  const{registerData,setregisterData}=useContext(registerContext)


  const[allUserData,setAllUserdata]=useState([])


  const [showspin,setshowspin]=useState(true)

  // search

  const [search,setsearch]=useState("")

  useEffect(() => {

    // call getAllEmployees function

    getAllEmployees()
   
    setTimeout(()=>{
      setshowspin(false)
    },2000);
  
  }, [search])


  // function definition for get all data(all employees)
  
  const getAllEmployees=async()=>{
    const response=await allUsers(search)
    console.log(response);
    setAllUserdata(response.data)
  }

  // delete employee

const removeUser=async(id)=>{
  const response=await deleteUser(id)
  console.log(id);

  if(response.status===200){
    getAllEmployees()
  }else{
    alert('Operation failed!!! please try after some time')
  }
}

  
  return (
    <>

      {
        registerData&&<Alert variant='success' onClose={()=>setregisterData("")} dismissible>
          {registerData.fname.toUpperCase()}registered successfully..........
        </Alert>
      }


        {
          showspin?
          <LoadingSpinner/>:
          <div className='container'>
              <div className='search-all d-flex align-items-center'>
                  <div className='search d-flex align-items-center mt-4'>
                      <span className='fw-bolder'>search</span>
                      <input type="text" onChange={e=>setsearch(e.target.value)} placeholder='Search By Employee Name' className='form-control ms-3' style={{width:"400px"}} />
                  </div>
  
                  <Link to={'/add'} className='btn btn-success ms-auto'>Add<i class="fa-solid fa-user-plus"></i></Link>
  
              </div>
  
             <div className='table mt-5'>
  
              <h1 className='fw-bolder'>List Of All Employees</h1>

              
               <Hometable displayData={allUserData} removeuser={removeUser}/>
  
              </div>
  
          </div>
        }
    </>
  )
}

export default Home
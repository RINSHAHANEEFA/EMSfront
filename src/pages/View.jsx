import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import LoadingSpinner from '../Components/LoadingSpinner'
import { useParams } from 'react-router-dom'
import { allUsers } from '../services/AllApi'
import { BASE_URL } from '../services/baseUrl'


function View() {

  const [showspin, setshowspin] = useState(true)
  const[user,setUser]=useState({})

  const {id}=useParams()
  console.log(id);

// api call for grtting single user details
  const getuser=async()=>{
    const {data}=await allUsers("")
    // console.log(data);
    setUser(data.find(item=>item._id===id))
  }

  useEffect(() => {

    getuser()

    setTimeout(() => {
      setshowspin(false)
    }, 2000);

  }, [])

  return (
    <>

      {
        showspin ?
          <LoadingSpinner /> :
          <div className='container' style={{ height: '80vh' }}>

            {
              user?
              
              <Card className='shadow col-lg-ms-auto mt-5 p-3'>

              {/* image */}

              <div className='text-center'>

                <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src={`${BASE_URL}/uploads/${user.profile}`} alt="no image" />

              </div>

              {/* contents */}

              <div className='text-center'>

                <h3>{user.fname} {user.lname}</h3>
                <h5>{user.email}</h5>
                <h5>{user.mobile}</h5>
                <h5>{user.gender}</h5>
                <h5>{user.status}</h5>
                <h5>{user.location}</h5>
              </div>

            </Card>:""
            }
          </div>

      }


    </>
  )
}

export default View
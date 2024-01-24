import React, { useContext, useEffect, useState } from 'react'
import { Row, Form, Button, FormGroup, FormLabel } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import LoadingSpinner from '../Components/LoadingSpinner';
import { addUser } from '../services/AllApi';
import { registerContext } from './Contextshare';
import { useNavigate } from 'react-router-dom';



function Add() {

// call the context inside usecontext hook for using it in components

    const{registerData,setregisterData}=useContext(registerContext)
    const navigate=useNavigate()

    const [showspin, setshowspin] = useState(true)

    // create state for getting through api and to hold normal input users

    const [normalInput, setNormalUserInput] = useState({
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        gender: "",
        location: ""
    })

    // two state for hold status and profile 

    const [status, setStatus] = useState("")
    const [profile, setProfile] = useState("")

    const [preview, setPreview] = useState("")

    // define normaluser Input function

    const getandsetuserNormalInputs = (e) => {

    // here name is the attribute to get the value in name when onchange event happened

        const { name, value } = e.target
        setNormalUserInput({ ...normalInput, [name]: value })
        // key always encloed in square brackets
    }
    // to define handle file

    const handlefile = (e) => {
        // console.log(e.target.files[0]);
        setProfile(URL.createObjectURL(e.target.files[0]))
        setProfile(e.target.files[0])
    }

    // console.log(normalInput);
    // console.log(status);
    // console.log(profile);



    useEffect(() => {

        if (profile) {
            URL.createObjectURL(profile)
            setPreview(URL.createObjectURL(profile))
        }

        setTimeout(() => {
            setshowspin(false)
        }, 2000);

    }, [profile])

    // from react-select for creating dropdown

    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },

    ];


    // define submit function

    const handleSubmit=async(e)=>{
        e.preventDefault()

        const { fname, lname, email, mobile, gender, location } = normalInput

        if(!fname || !lname || !email || !mobile || !gender || !status || !profile || !location) {
            alert("Please fill the form completly......")
        }
        else {
            // alert('form submitted successfully')

            const data = new FormData()

            //body/data

            data.append("fname", fname)
            data.append("lname", lname)
            data.append("email", email)
            data.append("mobile", mobile)
            data.append("gender", gender)
            data.append("status", status)
            data.append("profile", profile)
            data.append("location", location)

           // header

            const headers = {
                "content-type": "multipart/form-data"
            }

            // api call

            const response=await addUser(data,headers)
            console.log(response);

            if (response.status==200) {
                setNormalUserInput({ ...normalInput,
                
                    fname:"",
                    lname:"",
                    email:"",
                    mobile:"",
                    gender:"",
                    location:""
                })

                setStatus("")
                setProfile("")
                setregisterData(response.data)

                // navigate to homepage

                navigate('/')

            }
            else{
            alert('Request failed')
        }



    }
}


return (
    <>

        {
            showspin ?
                <LoadingSpinner /> :
                <div className='container mt-4'>

                    <h1 className='text-center fw-bolder'>Add New Employee Details</h1>

                    <div className='mt-3 shadow border rounded p-2'>

                        <div className='text-center'>

                            <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src={preview ? preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz8w3euWUoToinb-F01rHdbmA17oLxHBQseg&usqp=CAU"} alt="no image" />

                        </div>

                        <Form className='mt-4'>
                            <Row>

                                {/* first name */}

                                <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputfname" label="First Name">
                                    <Form.Control type="text" name='fname' placeholder="First Name" onChange={e => getandsetuserNormalInputs(e)} value={normalInput.value} />
                                </FloatingLabel>

                                {/* last name */}

                                <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputf
                            lname" label="Last Name">
                                    <Form.Control type="text" name='lname' placeholder="Last Name" onChange={e => getandsetuserNormalInputs(e)} value={normalInput.value} />
                                </FloatingLabel>

                                {/* email */}



                                <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputemail" label="Email">
                                    <Form.Control type="email" name='email' placeholder="Email" onChange={e => getandsetuserNormalInputs(e)} value={normalInput.value} />
                                </FloatingLabel>

                                {/* mobile */}



                                <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputmobile" label="Mobile">
                                    <Form.Control type="text" name='mobile' placeholder="Mobile" onChange={e => getandsetuserNormalInputs(e)} value={normalInput.value} />
                                </FloatingLabel>

                                {/* gender */}

                                <Form.Group className='mb-3 col-lg-6'>
                                    <Form.Label>Select Gender</Form.Label>
                                    <Form.Check type="radio" name='gender' value={"Male"} label={"Male"} onChange={e => getandsetuserNormalInputs(e)} />
                                    <Form.Check type="radio" name='gender' value={"Female"} label={"Female"} onChange={e => getandsetuserNormalInputs(e)} />
                                </Form.Group>

                                {/* status */}

                                <Form.Group className='mb-3 col-lg-6'>
                                    <Form.Label>Select Employee Status</Form.Label>

                                    <Select onChange={e => setStatus(e.value)} options={options} />

                                </Form.Group>

                                {/* file upload */}

                                <Form.Group className='mb-3 col-lg-6'>
                                    <Form.Label>Choose a Profile Picture</Form.Label>

                                    <Form.Control type="file" onChange={e => handlefile(e)} name='User Profile' />

                                </Form.Group>

                                {/* location */}

                                <FloatingLabel className='mb-3 col-lg-6 mt-4' controlId="floatingInputemail" label="Location">
                                    <Form.Control type="text" name='location' placeholder="Location" onChange={e => getandsetuserNormalInputs(e)} value={normalInput.value} />
                                </FloatingLabel>

                                <Button onClick={e => handleSubmit(e)} type='submit' variant='primary'>Submit</Button>

                            </Row>


                        </Form>

                    </div>

                </div>

        }
    </>
)
}

export default Add
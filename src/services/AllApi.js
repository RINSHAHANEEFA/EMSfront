import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";

// add employee
export const addUser=async(body,header)=>{
    return await commonApi("POST",`${BASE_URL}/add`,body,header)
    //this add is from backend router.js
}

// get employee

export const allUsers=async(search)=>{
    return await commonApi("GET",`${BASE_URL}/get-all-users?search=${search}`,"") 
    // ?:query parameter:to pass data to backend
}

// delete employee

export const deleteUser=async(id)=>{
    return await commonApi("DELETE",`${BASE_URL}/delete-user/${id}`,{})
}

// edit employee

export const editUser=async(id,body,header)=>{
    return await commonApi("PUT",`${BASE_URL}/edit-user/${id}`,body,header)
}

import React, { createContext, useState } from 'react'

// create a context and store it in a variable

export const registerContext=createContext()

// share context to children

function Contextshare({children}) {

  // create a state for sharing values
    const[registerData,setregisterData]=useState("")


  return (
    <>

    {/* we can get both state and state value updation function in every component that use registeContext,must be set as object by using value property*/}
    {/* by using usecontext hook we can use the state */}
    {/* to provide register conext to other components use .provider */}
    
        <registerContext.Provider value={{registerData,setregisterData}}>
            {children}
        </registerContext.Provider>
    </>
  )
}

export default Contextshare
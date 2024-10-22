import React from 'react'
 
import AppContext from "../AppContext"

export default function SessionIcon() {

    const { user, setuser } = React.useContext(AppContext);
 
    const sessionreset = ()=> {
        setuser(null)
    }

    const { isSigninOpen, setIsSigninOpen } = React.useContext(AppContext);
 
    const showSignin = ()=>{
        setIsSigninOpen(!isSigninOpen)
    }

    const showSignup = ()=>{
        setIsSigninOpen(!isSigninOpen)
    }

    if(user)
        return (
            <div className='absolute bg-fifth bg-opacity-80 p-2 top-4 right-16'>{user.username} | <button className="text-secondary" onClick={sessionreset} >Logout</button> 
            </div>
        )

    return(
        <div className='absolute bg-fifth bg-opacity-80 p-2 top-4 right-16'>
            <button className="hover:text-secondary" onClick={showSignin}>Login</button> | <button className="hover:text-secondary" onClick={showSignup}>Sign up</button>
              
        </div>
    )

}
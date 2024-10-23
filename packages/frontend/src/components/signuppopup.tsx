import React from 'react' 
import AppContext from '../AppContext'
 
import SignupForm from './signupForm'

export default function signinpopup(){
    
    const { setIsSignupOpen } = React.useContext(AppContext);
 
    const quit = ()=>{
        setIsSignupOpen(false)
    }

    return (
        <div className='bg-[#111621eb] top-0 right-0 left-0  bottom-0 fixed z-30'>
            <div className='flex flex-row justify-center items-center align-middle content-center h-screen'>
                <div className='bg-fifth rounded-md w-2/4 p-8 border-2'>
                    <div className='flex justify-end'>
                        <button onClick={quit} className='size-5 bg-fourth text-primary flex align-middle justify-center items-center'>X</button>
                    </div>
                    <h1 className="text-xl font-semibold text-secondary">Create user</h1>

            <div className="w-full max-w-xs">
                <SignupForm></SignupForm>

                <p className="text-center text-gray-500 text-xs">
                Halloween photo contest
                </p>
            </div>
                </div> 
            </div> 
        </div>
    )
}
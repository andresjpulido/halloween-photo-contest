import  { useState } from 'react'
import AppContext from './AppContext' 

export default function AppProvider(props:any) {

    const [loading, setLoading] = useState(false)
    const [user, setuser] = useState({ username: 'Anonymous',userid:1 }) 
    const [images, setImages] = useState([])
    const [image, setImage] = useState({url_original:null, title:null, description:null, user:{username:'Anonymous', userid:1}})
    const [isSigninOpen, setIsSigninOpen] = useState(false)
    const [isSignupOpen, setIsSignupOpen] = useState(false)
	 
	
    const value = {loading, setLoading, user, setuser,  images, setImages, image, setImage, isSigninOpen, setIsSigninOpen,isSignupOpen, setIsSignupOpen}
 
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

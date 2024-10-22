import React from 'react' 
import Header from "./components/Header"
import Footer from "./components/Footer"
import Signinpopup from './components/signinpopup'
import Signuppopup from './components/signuppopup'

 import AppContext from './AppContext'
 
 import { Outlet } from 'react-router-dom'

function App() {

  const { isSigninOpen } = React.useContext(AppContext);
  const { isSignupOpen } = React.useContext(AppContext);
  
 
    return (
        <section className='relative'>
          <Header /> 
          <Outlet /> 
          <Footer />
          {(isSigninOpen && <Signinpopup />)}
          {(isSignupOpen && <Signuppopup />)}
        </section>
    )
}
  
export default App 
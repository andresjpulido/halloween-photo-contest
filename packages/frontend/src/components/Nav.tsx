import { Link } from 'react-router-dom'
  
export default function Nav() {
    return (  
        <nav className="mt-8">
            <ul className="flex flex-row gap-4 p-4 justify-center text-xs">
                <li><Link to={'photoeditor'} className='btn-primary'>Try it!</Link></li> 
            </ul> 
        </nav>   
    )
}
 
import { Link } from 'react-router-dom' 
import AppContext from '../AppContext'
import React, {useEffect } from 'react' 
import { useParams } from 'react-router'
import './photo-detail.css'

export default function PhotoDetail( ) {

    const { image, setImage } = React.useContext(AppContext)

    const { imageId } = useParams()
    
    useEffect( ()=> { 

        const isauth = async () => {
            
            const url = '/api/image/' + imageId 
          
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`)
                }
                const result  = await response.json()
                setImage(result)  

            } catch (error) {
                console.error(error )
            } 
        }
        
        isauth() 
         
    }, [ ])


    if(!image)
        return (<div>No image</div>)

    const style={ 
        backgroundImage: 'url(' + image.url_modified + ')'
    } 

    return (
        <article>  
            <section className='flex flex-col gap-4 flex-wrap mx-4 md:mx-8 mb-8'>
                <div className=' '>
                    <div style={style} className="c-glitch hover:cursor-not-allowed">
                        <div style={style} className="c-glitch__img">  </div>
                        <div style={style} className="c-glitch__img">  </div>
                        <div style={style} className="c-glitch__img">  </div>
                        <div style={style} className="c-glitch__img">  </div>
                        <div style={style} className="c-glitch__img">  </div>
                    </div> 
                </div>
                
                <div className=' '>
                    <h2 className='text-xl mb-2'>{image.title}</h2>
                    <h3 className='font-CreepsterRegular text-secondary text-lg '>Description</h3>
                    <p className=''>{image.description}</p>
                    <h3 className='mt-4 font-CreepsterRegular text-secondary  text-lg'>Creator</h3>
                    <p>{image?.user?.username}</p>
                </div> 
            </section> 
            <section className='text-center'>
                <Link to={'/'} className="btn-primary ">Back</Link>
            </section>
            
        </article>
    )
}
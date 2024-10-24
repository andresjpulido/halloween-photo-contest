import React, {useEffect, useState } from 'react' 
import BestPhotos from '../components/Bestphotos'
import Gallery from '../components/Gallery' 
import Nav from '../components/Nav'

export default function Dashboard() {
    const [ topImages, setTopImages ] = useState ([])  

    const updateGallery = ( )=>{ 
        getTopImages() 
    }
    
    const getTopImages = async () => { 
  
        try {
            const url = '/api/topimages'
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            const imagelist = await response.json()
            setTopImages(imagelist) 

        } catch (error) {
            console.error(error )
        }
    }

    useEffect( ()=> {   
        getTopImages() 
    }, [])

    return (
        <section> 
            <Nav></Nav> 
            <BestPhotos top={topImages}   />
            <Gallery action={updateGallery} /> 
        </section>
    )


}

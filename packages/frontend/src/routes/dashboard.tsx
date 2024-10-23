import BestPhotos from "../components/Bestphotos"
import Gallery from "../components/Gallery"
import React, {useEffect, useState } from 'react' 
import AppContext from "../AppContext"
import Nav from "../components/Nav"

export default function Dashboard() {
  const [ topImages, setTopImages ] = useState ([]) 

  const vvvv = ( )=>{ 
    isauth() 
  }
   

  const isauth = async () => {
        
    const url = "/api/image";  
      try {
        let url = "/api/topimages";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        let imagelist
        imagelist = await response.json();
        setTopImages(imagelist)
        
      } catch (error) {
        console.error(error );
      }
  }

  useEffect( ()=> {   
    isauth() 
}, [])

return (
    <section> 
      <Nav></Nav> 
      <BestPhotos top={topImages} />
      <Gallery action={vvvv} /> 
    </section>
)


}

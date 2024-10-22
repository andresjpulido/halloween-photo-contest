import BestPhotos from "../components/Bestphotos"
import Gallery from "../components/Gallery"
import React, {useEffect, useState } from 'react' 
import AppContext from "../AppContext"
import Nav from "../components/Nav"

export default function Dashboard() {
  const [ topImages, setTopImages ] = useState ([]) 
  const { images, setImages } = React.useContext(AppContext);

  useEffect( ()=> { 

    const isauth = async () => {
        
      const url = "/api/image"; 
      
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          const imagelist  = await response.json();
          setImages(imagelist) 
        } catch (error) {
          console.error(error );
        }

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
    
    isauth()

     
}, [])

return (
    <section> 
      <Nav></Nav> 
      <BestPhotos top={topImages} />
      <Gallery participants={images} /> 
    </section>
)


}

/* eslint-disable @typescript-eslint/no-namespace */ 
import React from 'react'
import 'two-up-element';
import { useState } from "react"; 
import spinner from "../assets/spinner.gif"
import AppContext from "../AppContext"
import { Link } from 'react-router-dom';

declare global {
    namespace JSX {
      interface IntrinsicElements {
        'two-up': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>,HTMLElement>;
      }
    }
  }

export default function photoeditor(){ 

  const { image, setImage } = React.useContext(AppContext);
  const { user, setuser } = React.useContext(AppContext);

  const [public_id, setPublicId] = useState("");
  const [asset_id, setasset_id] = useState() 
  const [width, setwidth] = useState() 
  const [loading, setloading] = useState(false)
   
  const [state, setState] = useState({
    from: "",
    to: "a dangerous vampire",
    toColor: "",
    fromColor: ""
  })

  

  // Replace with your own cloud name
  const [cloudName] = useState("hzxyensd5");
  // Replace with your own upload preset
  const [uploadPreset] = useState("aoh4fpwm"); 

  const [urloriginal, seturloriginal] = useState("");
  const [urlmodified, seturlmodified] = useState(""); 
   
  const TOPICS: Record<string, string> = {
    ghost: "Add%20scary%20ghosts%20to%20the%20background",
    zombies: "Add%20zombies%20to%20the%20background",
    devil: "Add%20some%20devils%20to%20the%20background",
    monsters: "Add%20monsters%20to%20the%20background",
    custom: "Minimalist%20background%20with%20a%20soft%20pastel%20gradient%20even%20lighting",
  } as const;

  async function fetchBlob(url:string) {
    const response = await fetch(url);
    const blob = await response.blob(); 
    return blob;
}

const { isSigninOpen, setIsSigninOpen } = React.useContext(AppContext);
 
const goback = ()=>{

}

const showSignin = ()=>{
    setIsSigninOpen(!isSigninOpen)
}

const showSignup = ()=>{
    setIsSigninOpen(!isSigninOpen)
}

const saveImage = async (e: any)=>{
  e.preventDefault();
 
  setImage({
    ...image,
    "userid": user.userid 
  });

  try {
    const response = await fetch("/api/image", {
        headers: {
            "Content-Type": "application/json",
          },
          method: "POST", 
        body: JSON.stringify(image)})

    if (!response.ok) {
        //throw new Error(`Response status: ${response.status}`);
        console.log(response.status)
    }  
  
    const json = await response.json();

    setuser(json)
 

} catch(err) { 
    console.log('catch error ', err)

} finally {
     
} 

}

const applyTopic = async (e: any)=>{ 
  setloading(true)
  let topic = e.target.dataset.topic

  topic = TOPICS[topic]
  
    let tmp = "https://res.cloudinary.com/"+ cloudName +"/image/upload/e_gen_background_replace:prompt_"+topic+"/"+public_id+"?"+asset_id

    setImage({
      ...image,
      "url_modified": tmp 
    });

    const blob = fetchBlob(tmp)
    const url = URL.createObjectURL(await blob)
    seturlmodified(url)
   
    console.log(urloriginal, urlmodified)
    setloading(false)
}

const applyReplace = async (e: any)=>{ 
  setloading(true)
  let topic = e.target.dataset.topic

  topic = TOPICS[topic]
  
    let tmp = "https://res.cloudinary.com/"+ cloudName +"/image/upload/e_gen_replace:from_"+state.from+";to_"+state.to + "/"+public_id

    console.log(tmp)
    setImage({
      ...image,
      "url_modified": tmp 
    });
     
    const blob = fetchBlob(tmp)
    const url = URL.createObjectURL(await blob)
    seturlmodified(url)
   
    console.log(urloriginal, urlmodified)
    setloading(false)
}

//https://res.cloudinary.com/prod/image/upload/e_gen_recolor:prompt_armchair;to-color_FF00FF;multiple_true/me/gr-chair-1.jpg

const applyReplaceColor = async ( )=>{ 
  setloading(true) 
    let tmp = "https://res.cloudinary.com/"+ cloudName +"/image/upload/e_gen_recolor:prompt_"+state.fromColor+";to-color_"+state.toColor + ";multiple_true/"+public_id
    console.log(tmp) 

    setImage({
      ...image,
      "url_modified": tmp 
    });

    const blob = fetchBlob(tmp)
    const url = URL.createObjectURL(await blob)

    seturlmodified(url) 
    setloading(false)
}





//content extraction
// https://res.cloudinary.com/prod/image/upload/e_extract:prompt_(camera;glasses;plant)/me/flatlay.jpg

//AI Image Enhancer
//https://res.cloudinary.com/prod/image/upload/e_enhance/me/underexposed-1.jpg

//Sharpen
//https://res.cloudinary.com/prod/image/upload/e_sharpen:150/me/sharpen-portrait.jpg
 
//Content-Aware Cropping
//https://res.cloudinary.com/prod/image/upload/c_auto,g_auto,h_940,w_880/me/smart-crop-2.jpg

//Generative Fill
//https://res.cloudinary.com/prod/image/upload/c_pad,ar_1:1,g_center,b_gen_fill/me/genfill-nature-1

//Generative Replace
//https://res.cloudinary.com/prod/image/upload/e_gen_replace:from_sweater;to_leather jacket with pockets/me/replace-apparel-1

//Background Removal
//https://res.cloudinary.com/prod/image/upload/e_background_removal/me/bgr-apparel-1.jpg.png

//Generative Remove
//https://res.cloudinary.com/prod/image/upload/e_gen_remove:prompt_text/me/rm-signs-1.jpg

//Generative Recolor
//https://res.cloudinary.com/prod/image/upload/e_gen_recolor:prompt_armchair;to-color_FF00FF;multiple_true/me/gr-chair-1.jpg

//Generative Restore
//https://res.cloudinary.com/prod/image/upload/e_gen_restore/me/restore-1.png

//Layers
//https://res.cloudinary.com/prod/image/upload/c_fill,g_auto,h_1920,w_1080/l_me:layers-logo/c_scale,w_3.0/fl_layer_apply,g_north_east,y_40,x_40/l_text:Arial_110:NEW%20COLLECTION,co_white/fl_layer_apply,g_center/me/layers-fashion-1.jpeg

//Drop-Shadow
//https://res.cloudinary.com/prod/image/upload/e_dropshadow:azimuth_135;elevation_20;spread_20/me/jeans.png

//Blur
//https://res.cloudinary.com/prod/image/upload/e_blur_faces:1000/me/smart-crop-1

const uploadImage = (files:any) => {
  const formData = new FormData();

  setloading(true)

  formData.append("file", files[0]);
  formData.append("upload_preset", uploadPreset);
 
  fetch(
    "https://api.cloudinary.com/v1_1/"+ cloudName +"/image/upload",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.json())
    .then(async (data) => { 


      setImage({
        ...image,
        "url_original": data.secure_url 
      });


      let blob = fetchBlob(data.secure_url)
      let url = URL.createObjectURL(await blob) 
      seturloriginal(url);

      blob = fetchBlob(data.secure_url)
      url = URL.createObjectURL(await blob) 
      seturlmodified(url);
      setPublicId(data.public_id)
      setasset_id(data.asset_id)
      setwidth(data.width)
      console.log(data)
      setloading(false)
    });
};

 const handleChange = (evt: { target: { value: any; name: any; }; })=>{
  const value = evt.target.value;
  setState({
    ...state,
    [evt.target.name]: value
  });
 }

 const handleChangeImage = (evt: any)=>{
  const value = evt.target.value;
  setImage({
    ...image,
    [evt.target.name]: value
  });
 }

    return (
        <section className="pb-16">
             
        <h2 className='mt-12 md:mx-8'>Upload an image and participate!</h2>
          
        {
            (  urloriginal && 
          <nav className='my-4 md:mx-8'>
            <h3 color="brand" className="">Change the background:</h3>
            
            <ul className='flex flex-row my-2'>
              <li><button className="btn-primary" data-topic="ghost" onClick={applyTopic}>
              Add ghosts!
            </button></li>
              <li><button className="btn-primary" data-topic="zombies" onClick={applyTopic}>
              Add zombies!
            </button></li>
              <li><button className="btn-primary" data-topic="devil" onClick={applyTopic}>
              Add creatures!
            </button></li>
              <li><button className="btn-primary" data-topic="monsters" onClick={applyTopic}>
              Add monsters!
            </button></li>
             
            </ul>

       <h3 color="brand" className="">Replace elements:</h3>      
        <ul>
          <li>From <input type="text" value={state.from} name="from" onChange={handleChange}/> To 
            <select name="to" id="to" value={state.to} onChange={handleChange}>
              <option value="spooky%20haunted%20house">Haunted house</option>
              <option value="killer%20monster">Monster</option>
              <option value="dark%20and%20angry%20beast">Angry monster</option>
              <option value="to_angry%20elderly%20military%20monsters">Angry guy</option>
            </select><button className="btn-primary" data-topic="monsters" onClick={applyReplace}>
              Change characters!
            </button>
            </li>
          <li>From <input type="text" value={state.fromColor} name="fromColor" onChange={handleChange}/> To 
          <input type="text" value={state.toColor} name="toColor" onChange={handleChange}/><button className="btn-primary" data-topic="monsters" onClick={applyReplaceColor}>
              Change color!
            </button></li>
          <li></li>
        </ul>
             
          </nav>
            )
          }

{
          ( loading &&
              <div>loading ...</div>
              )
          }

          {
            ( urloriginal && 
              <two-up style={{width}}>
                  <img id="original" src={urloriginal} />
                  <img id="urlmodified" src={urlmodified} />
                  {(loading && 
                    <img id="spinner" src={spinner} width="100px" height="100px" className='absolute top-5 right-5' />
                  )}
              </two-up> 
            ) 
          } 

          {
            urlmodified && 
              <button className="btn-primary">
                  Download
              </button>
          }
          

          <p className='my-6 md:mx-8 text-sm'>Create a user account to upload files and vote for the image you like the most. However, if you’re in a hurry, don’t worry! You can upload files anonymously, although you won’t be able to vote.</p>

          <section className='flex flex-row justify-center align-middle'> 
            <div>
            <label htmlFor="file" className='btn-primary'>Upload file</label>
            <input type="file" id="file" className="hidden" onChange={(e) => uploadImage(e.target.files)}  />
            </div>
            <Link to={'/'}  > 
              <label className='btn-primary '>back</label> 
            </Link>
          </section>
            

<section>
  {
    //validar si el usuario existe o usar el anonimo
    (
      urloriginal && 
    
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
     
    <h2 className='mt-12 md:mx-8'>3: save image!</h2> 

{
  (user.username === "Anonymous" &&
    <div>
 <button className="text-secondary" onClick={showSignin}>Login</button> or <button className="text-secondary" onClick={showSignup}>Sign up</button>  or publish anonymously
    </div>
  )
}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Title
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="title"  
        placeholder="Title" autoComplete="Title" onChange={handleChangeImage} /> 
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Description
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="description" onChange={handleChangeImage}
        placeholder="Description" autoComplete="Description" />
 
      </div>

      <button className="btn-primary" onClick={saveImage}>
                  Save
              </button>
    </form>
)
}
</section>



      </section>
    )
}
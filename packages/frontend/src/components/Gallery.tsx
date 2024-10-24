 
import React, {useEffect, useState } from 'react' 
import AppContext from '../AppContext'
import './Gallery.css' 
import Heart from './heart'
 
 
import { useNavigate } from 'react-router-dom'

export default function Gallery (props) {
 
    const { images, setImages } = React.useContext(AppContext)
    const navigate = useNavigate() 
 
    const isauth = async () => {
        
   
        const url = '/api/image' 
    
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            const imagelist  = await response.json()
            setImages(imagelist) 
        } catch (error) {
            console.error(error )
        } 
    } 

    useEffect( ()=> {   
        isauth() 
    }, []) 

    const vote = async (votes: any, imageId: any) => { 
      
        votes = votes + 1

        try {
            const response = await fetch('/api/image/' + imageId, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'PUT', 
                body: JSON.stringify({votes})})
  
            if (!response.ok) {
                //throw new Error(`Response status: ${response.status}`);
                console.log(response.status)
            }  
    
            const json = await response.json()
      
            isauth()
            props.action()
  
        } catch(err) { 
            console.log('catch error ', err)
  
        } finally {
       
        } 




    }
  
    const seeDetail = (imageId:any) =>{ 
        navigate('/photodetail/' + imageId) 
    }

    return (

        <>
            <ul className=" flex flex-row items-center gap-4 md:mx-16 text-sm py-2 text-fourth  ">
                <li className="flex items-center p-2 rounded-md bg-fifth">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                        ></path>
                    </svg>
      All Topics
                </li>
                <li className="bg-secondary p-2 rounded-md text-fourth">All</li>
                <li></li>
                <li></li>
                <li></li>
            </ul>

            <h2
                className="font-CreepsterRegular text-secondary md:mx-16 mt-4 text-xl tracking-widest"
            >
    Participants
            </h2>

            <ul className="md:mx-16 projectlist">
                {
                    images?.map((data:any, index:any) => (
                        <li className="project"   key={index}> 
                            <img src={data.url_modified} alt="" className="project-img rounded-md" />
                            <div className="overlay">

                                <div className="flex justify-between">
                                    <div className="flex items-center pl-4 pt-4 gap-2  hover:cursor-pointer">
                                        <div className="rounded-full bg-primary px-2">{data.user.username.charAt(0)}</div>
                                        <div className="text-xs">{data.user.username}</div>
                                    </div>
                                    <div className="flex rounded-xl bg-fifth items-center mr-4 mt-4 p-2  hover:cursor-pointer"> 
                                        <Heart className="stroke-fourth size-6 hover:stroke-primary" votes={data.votes} 
                                            action={()=>vote(data.votes, data.id)} />
                                    </div>
                                </div> 

                                <div className='text-xs px-4 bottom-4 absolute w-full'>
                                    <h3 className='font-semibold'>{data.title}</h3>
                                    <p className='line-clamp-3 mb-2'>{data.description}</p>
                                    <p className='text-right hover:cursor-pointer'><button onClick={() => seeDetail( data.id)} className='text-secondary'>See more</button> </p>
                                </div> 

                            </div>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}
 
 
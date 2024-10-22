/* eslint-disable @typescript-eslint/no-unused-vars */ 
import React from 'react'
import { useForm as useFormImport } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import AppContext from "../AppContext"

export default function SignupForm(){
 
    const {   setuser } = React.useContext(AppContext);

    const useForm = useFormImport
    type FormValues = {
        username: string
        password: string
        name: string
        email:string
      }
 
      
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>( )
  
    


    const onSubmit = handleSubmit( async (data:FormValues) => { 

        try {
            const response = await fetch("/api/user", {
                headers: {
                    "Content-Type": "application/json",
                  },
                  method: "POST", 
                body: JSON.stringify(data)})

            if (!response.ok) {
                //throw new Error(`Response status: ${response.status}`);
                console.log(response.status)
            }  
          
            const json = await response.json();
 
            setuser(json)
 
            navigate('/')
        
        } catch(err) { 
            console.log('catch error ', err)

        } finally {
            reset()
        } 
         
    })

    const navigate = useNavigate() 

    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit} >
    
            <div className="mb-4">
                <label className="block text-fourth text-sm mb-2" htmlFor="username">
        Username*
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-tertiary leading-tight focus:outline-none focus:shadow-outline" type="text" {...register('username',{
                    required: {
                        value: true,
                        message: 'Username is required',
                    },
                    maxLength: 20,
                    minLength: 5,
                })} 
                placeholder="Username" autoComplete="username" />
        
                {errors.username?.type === 'maxLength' && (
                    <span className="text-primary text-xs italic">Less than 20 characters</span>
                )}
                {errors.username?.type === 'minLength' && (
                    <span className="text-primary text-xs italic">More than 5 characters</span>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-fourth text-sm mb-2" htmlFor="password">
        Password*
                </label>
                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-tertiary  leading-tight focus:outline-none focus:shadow-outline" type="password" 
                    {...register('password', {
                        required: {
                            value: true,
                            message: 'Password is required',
                        },
                        minLength: {
                            value: 6,
                            message: 'Contraseña debe ser mayor a 6 caracteres',
                        },
                    })} placeholder="******************" autoComplete="current-password" /> 
                {errors.password && <span className="text-primary text-xs italic">{errors.password.message}</span>}
            </div>
            <div className="mb-4">
                <label className="block text-fourth text-sm mb-2" htmlFor="password">
        Repeat Password*
                </label>
                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-tertiary  leading-tight focus:outline-none focus:shadow-outline" type="password" 
                    {...register('password', {
                        required: {
                            value: true,
                            message: 'Password is required',
                        },
                        minLength: {
                            value: 6,
                            message: 'Contraseña debe ser mayor a 6 caracteres',
                        },
                    })} placeholder="******************" autoComplete="current-password" /> 
                {errors.password && <span className="text-primary text-xs italic">{errors.password.message}</span>}
            </div>
             
            <div className="flex items-center justify-center"> 
                <input type="submit" value="Sign Up" className="btn-primary"/> 
            </div>
        </form>
    )
}
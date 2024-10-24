  
import React from 'react'
import { useForm as useFormImport, Resolver } from 'react-hook-form'
 
import AppContext from '../AppContext'

export default function LoginForm(){
 
    const {  setIsSigninOpen } = React.useContext(AppContext)
    const {  setuser } = React.useContext(AppContext)
    const useForm = useFormImport
    type FormValues = {
        username: string
        password: string
      }

    const resolver: Resolver<FormValues> = async (values:FormValues) => {
        return {
            values: values.username ? values : {},
            errors: !values.username
                ? {
                    username: {
                        type: 'required',
                        message: 'This is required.',
                    },
                }
                : {},
        }
    } 
      
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({resolver})

    const onSubmit = handleSubmit( async (data:FormValues) => {

        try {
            const response = await fetch('/api/signin', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST', 
                body: JSON.stringify(data)})

            if (!response.ok) {
                //throw new Error(`Response status: ${response.status}`);
                console.log(response.status)
            }  
          
            const json = await response.json() 
           
            setuser(json)
            console.log('user:: ', json)
            //navigate('/')
            setIsSigninOpen(false)

        
        } catch(err) { 
            console.log('catch error ', err)

        } finally {
            reset()
        } 
        
    })
 

    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit} >
    
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Username
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-fifth leading-tight focus:outline-none focus:shadow-outline" type="text" {...register('username',{
                    required: {
                        value: true,
                        message: 'Username is required',
                    },
                    maxLength: 20,
                    minLength: 5,
                })} 
                placeholder="Username" autoComplete="username" />
        
                {errors.username?.type === 'maxLength' && (
                    <span className="text-red-500 text-xs italic">more than 20 characters</span>
                )}
                {errors.username?.type === 'minLength' && (
                    <span className="text-red-500 text-xs italic"></span>
                )}
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
                </label>
                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-fifth mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" 
                    {...register('password', {
                        required: {
                            value: true,
                            message: 'Contraseña es requerida',
                        },
                        minLength: {
                            value: 6,
                            message: 'Contraseña debe ser mayor a 6 caracteres',
                        },
                    })} placeholder="******************" autoComplete="current-password" /> 
                {errors.password && <span className="text-red-500 text-xs italic">{errors.password.message}</span>}
            </div>
            <div className="flex items-center justify-between"> 
                <input type="submit" value="Sign In" className="btn-primary"/>
       
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 hidden" href="#">
        Forgot Password?
                </a>
            </div>
        </form>
    )
}
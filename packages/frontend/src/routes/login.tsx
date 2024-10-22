import LoginForm from '../components/loginForm'
 
export default function Landing() {
   
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-xl font-semibold text-secondary">Login</h1>

            <div className="w-full max-w-xs">
                <LoginForm></LoginForm>

                <p className="text-center text-gray-500 text-xs">
                Halloween photo contest
                </p>
            </div>
        </div>
    )
}

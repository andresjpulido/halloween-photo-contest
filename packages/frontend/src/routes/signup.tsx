import SingUpForm from '../components/signupForm'
export default function signup(){
    return(
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-xl font-semibold text-secondary">Create user</h1>

            <div className="w-full max-w-xs">
                <SingUpForm />

                <p className="text-center text-gray-500 text-xs">
                Halloween photo contest
                </p>
            </div>
        </div>
    )
}
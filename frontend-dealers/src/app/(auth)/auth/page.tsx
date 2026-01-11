import AuthForm from "./_components/AuthForm";
import AuthHead from "./_components/AuthHead";

const AuthPage = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
                    <AuthHead />
                    <AuthForm />    
        </div>
    )
}

export default AuthPage;
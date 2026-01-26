import AuthForm from "./_components/AuthForm";
import AuthHead from "./_components/AuthHead";

const AuthPage = () => {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 py-12">
                    <AuthHead />
                    <AuthForm />
        </div>
    )
}

export default AuthPage;
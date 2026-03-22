import { auth } from "@/src/auth";
import AuthForm from "./_components/AuthForm";
import AuthHead from "./_components/AuthHead";
import { redirect } from "next/navigation";

const AuthPage = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 py-12">
      <AuthHead />
      <AuthForm />
    </div>
  );
};

export default AuthPage;

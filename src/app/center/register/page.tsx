import RegisterForm from "@/components/registerForm";
import { Toaster } from "react-hot-toast";

const Register = () => {
    return (
        <main className="m-0 min-h-screen min-w-screen flex flex-col items-center">
            <Toaster/>
            <div className="md:w-full max-w-md min-h-screen flex items-center w-full">
                <RegisterForm />
            </div>
        </main>
    );
}

export default Register;
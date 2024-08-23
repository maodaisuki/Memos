import RegisterForm from "@/components/registerForm";

const Register = () => {
    return (
        <main className="m-0 min-h-screen min-w-screen flex flex-col items-center">
            <div className="md:w-full max-w-md min-h-screen flex items-center w-full">
                <RegisterForm />
            </div>
        </main>
    );
}

export default Register;
'use client'
import Auth from "@/interfaces/auth";
import { useState } from "react";
import { login } from "@/api/login";
import { useRouter } from 'next/navigation';


const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [isLoginError, setLoginError] = useState(false);
    const router = useRouter();

    const updateUsername = (event: any) => {
        setUsername(event.target.value);
    }

    const updatePassword = (event: any) => {
        setPassword(event.target.value);
    }

    const inputFocus = () => {
        setLoginError(false);
    }

    const loginAccount = async () => {
        setIsRedirecting(true);
        const auth: Auth = {
            username: username,
            password: password
        }

        if (await login(auth)) {
            setIsRedirecting(false);
            router.push("/mine");
        }
        else {
            setIsRedirecting(false);
            setLoginError(true);
        }
    }

    return (
        <div className="w-full h-fit px-[10px] mb-[50px]">
            <div className="rounded-[4px] shadow-md border-base-200 border-[2px] p-[20px] flex flex-col">
                <div className="text-[20px] font-bold mb-[20px]">
                    {/* TODO 添加 LOGO */}
                    账号登录 | MAOJI
                </div>
                <div className="flex flex-col mb-[15px]">
                    <label className="w-full focus:outline-none mr-[1px] flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input value={username} onFocus={inputFocus} onChange={updateUsername} className="input input-bordered h-[40px] rounded-[4px] w-full focus:outline-none mr-[1px]" type="text" placeholder="用户名" />
                    </label>
                </div>
                <div className="flex flex-col mb-[15px]">
                    <label className="w-full focus:outline-none mr-[1px] flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        <input value={password} onFocus={inputFocus} onChange={updatePassword} className="input input-bordered  h-[40px] rounded-[4px] w-full focus:outline-none mr-[1px]" type="password" placeholder="密码" />
                    </label>
                </div>
                <div className="flex flex-row justify-between mb-[15px] text-[12px]">
                    <div className="w-full text-start">
                        <a className="link link-hover text-success" href="/forget/username">忘记用户名</a>
                    </div>
                    <div className="w-full text-center">
                        <span>我是新用户&nbsp;<a className="link link-hover text-success" href="/center/register">去注册</a></span>
                    </div>
                    <div className="w-full text-end">
                        <a className="link link-hover text-success" href="/forget/password">忘记密码？</a>
                    </div>
                </div>
                <div className="w-full">
                    <button disabled={isRedirecting} onClick={loginAccount} className="btn disabled:bg-stone-400 w-full no-animation text-white bg-success active:bg-[#2ac090] rounded-[5px]">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
                </div>
                {
                    isLoginError &&
                    <span className="w-full label-text-alt flex flex-row mt-[10px] justify-start text-error">
                        用户名或密码错误
                    </span>
                }
            </div>
        </div>
    )
}

export default LoginForm;
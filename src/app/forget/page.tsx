'use client'
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Forget = () => {
    const searchParams = useSearchParams();
    const [hash, setHash] = useState(searchParams?.get('hash') || '');
    const [userId, setUserId] = useState(searchParams?.get('userId') || '');
    const [email, setEmail] = useState(searchParams?.get('email') || '');
    const [password, setPassword] = useState('');
    const [isPasswordError, setIsPasswordError] = useState(false);
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#@_])[a-zA-Z0-9#@_]{10,20}$/;
    if(hash == '' || userId == '' || email == '') {
        return (
            <></>
        )
    }

    const updatePassword = (event: any) => {
        setPassword(password);
    }

    const sendPassword = () => {
        if(!passwordRegex.test(password)) {
            setIsPasswordError(true);
            return;
        }
        // TODO 修改密码
    }

    return (
        <main className="m-0 min-h-screen min-w-screen flex flex-col items-center">
            <div className="md:w-full max-w-md min-h-screen flex items-center w-full">
                <div className="w-full h-fit px-[10px] mb-[50px]">
                    <div className="rounded-[4px] shadow-md border-base-200 border-[2px] p-[20px] flex flex-col">
                        <div className="text-[20px] font-bold mb-[20px]">
                            {/* TODO 添加 LOGO */}
                            修改密码 | MAOJI
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
                                <input value={password} onChange={updatePassword} className="input input-bordered h-[40px] rounded-[4px] w-full focus:outline-none mr-[1px]" type="text" placeholder="新的密码" />
                            </label>
                            {
                                isPasswordError && 
                                <span className="w-full label-text-alt flex flex-row mt-[10px] justify-end text-error">
                                    密码为包含大小写字母和#@_至少其中一个的10-20位字符串
                                </span>
                            }
                        </div>
                        <div className="w-full">
                            <button className="btn w-full no-animation text-white bg-success active:bg-[#2ac090] rounded-[5px]">确认修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Forget;
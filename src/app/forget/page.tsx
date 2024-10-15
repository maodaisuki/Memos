'use client'
import { ResetPassword } from "@/api/email";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const Forget = () => {
    const searchParams = useSearchParams();
    const [hash, setHash] = useState(searchParams?.get('hash') || '');
    const [userId, setUserId] = useState(searchParams?.get('userId') || '');
    const [email, setEmail] = useState(searchParams?.get('email') || '');
    const [password, setPassword] = useState('');
    const [isPasswordError1, setIsPasswordError1] = useState(false);
    const [isPasswordError2, setIsPasswordError2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#@_])[a-zA-Z0-9#@_]{10,20}$/;
    if (hash == '' || userId == '' || email == '') {
        return (
            <></>
        )
    }

    const updatePassword = (event: any) => {
        setPassword(event.target.value);
    }

    const sendPassword = async () => {
        setIsLoading(true);
        if (!passwordRegex.test(password)) {
            setIsPasswordError1(true);
            setIsLoading(false);
            return;
        }
        const { data, error } = await ResetPassword(hash, userId, email, password);
        if (data !== null) {
            if (data.statusCode == 200) {
                setIsSuccessful(true);
            }
            else {
                setIsPasswordError2(true);
            }
        }
        else {
            // setIsPasswordError(true);
        }
        setIsLoading(false);
    }

    const inputFocus = () => {
        setIsPasswordError1(false);
        setIsPasswordError2(false);
    }

    return (
        <main className="m-0 min-h-screen min-w-screen flex flex-col items-center">
            <div className="md:w-full max-w-md min-h-screen flex items-center w-full">
                <div className="w-full h-fit px-[10px] mb-[50px]">
                    {
                        !isSuccessful ? <div className="rounded-[4px] shadow-md border-base-200 border-[2px] p-[20px] flex flex-col">
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
                                    <input value={password} onChange={updatePassword} onFocus={inputFocus} className="input input-bordered h-[40px] rounded-[4px] w-full focus:outline-none mr-[1px]" type="password" placeholder="新的密码" />
                                </label>
                                {
                                    isPasswordError1 &&
                                    <span className="w-full label-text-alt flex flex-row mt-[10px] justify-end text-error">
                                        密码为包含大小写字母和#@_至少其中一个的10-20位字符串
                                    </span>
                                }
                                {
                                    isPasswordError2 &&
                                    <span className="w-full label-text-alt flex flex-row mt-[10px] justify-end text-error">
                                        非法链接，请使用邮箱里收到的链接
                                    </span>
                                }
                            </div>
                            <div className="w-full">
                                <button onClick={sendPassword} disabled={isLoading} className="disabled:bg-stone-400 btn w-full no-animation text-white bg-success active:bg-[#2ac090] rounded-[5px]">确认修改</button>
                            </div>
                        </div>
                            : <div className="rounded-[4px] shadow-md border-base-200 border-[2px] p-[20px] flex flex-col">
                                <div className="text-[20px] text-center font-bold mb-[15px]">
                                    {/* TODO 添加 LOGO */}
                                    MAOJI
                                </div>
                                <div className="mb-[20px]  text-center">
                                    重置密码成功
                                </div>
                                <div className="w-full">
                                    <a href="/center" className="btn w-full no-animation text-white bg-success active:bg-[#2ac090] rounded-[5px]">前往登录页</a>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </main>
    );
}

const ForgetPage = () => {
    return <Suspense fallback={<></>}>
        <Forget />
    </Suspense>
}

export default ForgetPage;
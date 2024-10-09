'use client'
import { ForgetPassword } from "@/api/email";
import { useState } from "react";

const ForgetPasswordCard = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const updateEmail = (event: any) => {
        setEmail(event.target.value)
    }

    const inputFocus = () => {
        setIsEmailError(false);
    }

    const sendEmail = async () => {
        setIsLoading(true);
        if (!emailRegex.test(email)) {
            setIsEmailError(true);
            setIsLoading(false);
            return;
        }
        const { data, error } = await ForgetPassword(email);
        if (data == null) {
            setIsEmailError(true);
            setIsLoading(false);
            console.log(error);
            return;
        }
        else if (data.statusCode == 400) {
            setIsEmailError(true);
            setIsLoading(false);
            console.log(error);
            return;
        }
        else {
            setIsLoading(false);
            setIsSent(true);
            return;
        }
    }

    return (
        <div className="w-full h-fit px-[10px] mb-[50px]">
            {
                !isSent ? <div className="rounded-[4px] shadow-md border-base-200 border-[2px] p-[20px] flex flex-col">
                    <div className="text-[20px] font-bold mb-[20px]">
                        {/* TODO 添加 LOGO */}
                        忘记密码 | MAOJI
                    </div>
                    <div className="flex flex-col mb-[15px]">
                        <label className="w-full focus:outline-none mr-[1px] flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            <input value={email} onChange={updateEmail} onFocus={inputFocus} className="input input-bordered  h-[40px] rounded-[4px] w-full focus:outline-none mr-[1px]" type="email" placeholder="请输入绑定的邮箱" />
                        </label>
                        {
                            isEmailError &&
                            <span className="w-full label-text-alt flex flex-row mt-[10px] justify-end text-error">
                                邮箱格式错误或者邮箱未绑定用户
                            </span>
                        }
                    </div>
                    <div className="w-full">
                        <button disabled={isLoading} onClick={sendEmail} className="disabled:bg-stone-400 btn w-full no-animation text-white bg-success active:bg-[#2ac090] rounded-[5px]">确&nbsp;&nbsp;&nbsp;&nbsp;认</button>
                    </div>
                </div>
                    : <div className="rounded-[4px] shadow-md border-base-200 border-[2px] p-[20px] flex flex-col">
                        <div className="text-[20px] text-center font-bold mb-[15px]">
                            {/* TODO 添加 LOGO */}
                            MAOJI
                        </div>
                        <div className="mb-[20px]  text-center">
                            已将密码充值链接发送到邮箱<br />请前往邮箱查看
                        </div>
                        <div className="w-full">
                            <a href="/center" className="btn w-full no-animation text-white bg-success active:bg-[#2ac090] rounded-[5px]">前往登录页</a>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ForgetPasswordCard;
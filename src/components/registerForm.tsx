'use client'
import { register } from "@/api/register";
import Auth from "@/interfaces/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"

const RegisterForm = () => {
    const [isUsernameError, setUsernameError] = useState(false);
    const [isPasswordError, setPasswordError] = useState(false);
    const [isPasswordEqual, setPasswordEqual] = useState(true);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [isReadError, setIsReadError] = useState(false);
    const [isRead, setIsRead] = useState(false);
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const usernameRegex = /^[a-zA-Z0-9]{2,15}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#@_])[a-zA-Z0-9#@_]{10,20}$/;
    const router = useRouter();
    const updateUsername = (event: any) => {
        setUsername(event.target.value);
    }

    const updatePassword1 = (event: any) => {
        setPassword1(event.target.value);
    }

    const updatePassword2 = (event: any) => {
        setPassword2(event.target.value);
    }

    const inputFocus = () => {
        setPasswordError(false);
        setUsernameError(false);
        setPasswordEqual(true);
    }

    const registerAccount = async () => {
        setIsRedirecting(true);
        if (password1 !== password2) {
            setPasswordEqual(false);
            setIsRedirecting(false);
            return;
        }
        if (!passwordRegex.test(password1)) {
            setPasswordError(true);
            setIsRedirecting(false);
            return;
        }
        if (!usernameRegex.test(username)) {
            setUsernameError(true);
            setIsRedirecting(false);
            return;
        }
        if (!isRead) {
            setIsReadError(true);
            setIsRedirecting(false);
            return;
        }
        const auth: Auth = {
            username: username,
            password: password1
        }
        if (await register(auth)) {
            toast.success("注册成功，3秒后跳转至登录页", {
                duration: 2500
            });
            setTimeout(() => {
                setIsRedirecting(false);
                router.push('/center');
            }, 3000);
        }
        else {
            setIsRedirecting(false);
            toast.error("注册失败，请稍后再试");
        }
    }

    return (
        <div className="w-full h-fit px-[10px] mb-[50px]">
            <div className="rounded-[4px] shadow-md border-base-200 border-[2px] p-[20px] flex flex-col">
                <div className="text-[20px] font-bold mb-[20px] text-center">
                    {/* TODO 添加 LOGO */}
                    欢迎注册 MAOJI
                </div>
                <div className={isUsernameError ? "flex flex-col" : "flex flex-col mb-[15px]"}>
                    <label className="w-full focus:outline-none mr-[1px] flex items-center space-x-2">
                        <span className="w-[120px] text-end">用户名：</span>
                        <input onChange={updateUsername} onFocus={inputFocus} className={isUsernameError ? "outline outline-1 outline-error input input-bordered h-[40px] rounded-[4px] w-full focus:outline-none mr-[1px]" : "input input-bordered h-[40px] rounded-[4px] w-full focus:outline-none mr-[1px]"} type="text" placeholder="请输入用户名" />
                    </label>
                </div>
                {
                    isUsernameError &&
                    <span className="w-full label-text-alt flex flex-row my-[5px] justify-end text-error">
                        用户名位只包含大小写字母和数字的2-15位字符串
                    </span>
                }
                {/* <div className="flex flex-col mb-[15px]">
                    <label className="w-full focus:outline-none mr-[1px] flex items-center space-x-2">
                        <span className="w-[120px] text-end">邮箱：</span>
                        <input className="input input-bordered  h-[40px] rounded-[4px] w-full focus:outline-none mr-[1px]" type="password" placeholder="请输入邮箱（选填）" />
                    </label>
                </div> */}
                <div className="flex flex-col mb-[15px]">
                    <label className="w-full focus:outline-none mr-[1px] flex items-center space-x-2">
                        <span className="w-[120px] text-end">密码：</span>
                        <input onFocus={inputFocus} onChange={updatePassword1} className={(!isPasswordEqual || isPasswordError) ? "outline outline-1 outline-error input input-bordered h-[40px] rounded-[4px] w-full focus:outline-none mr-[1px]" : "input input-bordered h-[40px] rounded-[4px] w-full focus:outline-none mr-[1px]"} type="password" placeholder="设置密码" />
                    </label>
                </div>
                <div className="flex flex-col mb-[5px]">
                    <label className="w-full focus:outline-none mr-[1px] flex items-center space-x-2">
                        <span className="w-[120px] text-end">确认密码：</span>
                        <input onFocus={inputFocus} onChange={updatePassword2} className={(!isPasswordEqual || isPasswordError) ? "outline outline-1 outline-error input input-bordered h-[40px] rounded-[4px] w-full focus:outline-none mr-[1px]" : "input input-bordered h-[40px] rounded-[4px] w-full focus:outline-none mr-[1px]"} type="password" placeholder="请再次输入密码" />
                    </label>
                </div>
                {
                    !isPasswordEqual &&
                    <span className="w-full label-text-alt flex flex-row mt-[5px] justify-end text-error">
                        密码不一致
                    </span>
                }
                {
                    isPasswordError &&
                    <span className="w-full label-text-alt flex flex-row mt-[5px] justify-end text-error">
                        密码为包含大小写字母和#@_至少其中一个的10-20位字符串
                    </span>
                }
                <div className="flex flex-col justify-between mb-[15px] text-[12px]">
                    <div className="w-full text-start mb-[5px]">
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input type="checkbox" className="checkbox-success checkbox [--chkfg:white] checkbox-xs" onChange={() => { setIsReadError(false); setIsRead(!isRead); }} checked={isRead} />
                                &nbsp;&nbsp;
                                <span className="w-full text-start label-text">我已经阅读并同意<a className="link link-hover text-success" href="#"> MAOJI 用户协议</a></span>
                            </label>
                        </div>
                        {
                            isReadError &&
                            <span className="w-full label-text-alt flex flex-row mb-[5px] justify-start text-error">
                                勾选此项
                            </span>
                        }
                    </div>
                    <div className="w-full mb-[15px]">
                        <button disabled={isRedirecting} onClick={registerAccount} className="btn disabled:bg-stone-400 w-full no-animation text-white bg-success active:bg-[#2ac090] rounded-[5px]">注&nbsp;&nbsp;&nbsp;&nbsp;册</button>
                    </div>
                    <div className="w-full text-start">
                        <span>已有账号？&nbsp;<a className="link link-hover text-success" href="/center">去登录</a></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;
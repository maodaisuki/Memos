import Link from "next/link";

const RegisterForm = () => {
    return (
        <div className="w-full h-fit px-[10px] mb-[50px]">
            <div className="rounded-[4px] shadow-md border-base-200 border-[2px] p-[20px] flex flex-col">
                <div className="text-[20px] font-bold mb-[20px] text-center">
                    {/* TODO 添加 LOGO */}
                    欢迎注册 MAOJI
                </div>
                <div className="flex flex-col mb-[15px]">
                    <label className="w-full focus:outline-none mr-[1px] flex items-center space-x-2">
                        <span className="w-[120px] text-end">用户名：</span>
                        <input className="input input-bordered h-[40px] rounded-[4px] w-full focus:outline-none mr-[1px]" type="text" placeholder="请输入用户名" />
                    </label>
                </div>
                {/* <div className="flex flex-col mb-[15px]">
                    <label className="w-full focus:outline-none mr-[1px] flex items-center space-x-2">
                        <span className="w-[120px] text-end">邮箱：</span>
                        <input className="input input-bordered  h-[40px] rounded-[4px] w-full focus:outline-none mr-[1px]" type="password" placeholder="请输入邮箱（选填）" />
                    </label>
                </div> */}
                <div className="flex flex-col mb-[15px]">
                    <label className="w-full focus:outline-none mr-[1px] flex items-center space-x-2">
                        <span className="w-[120px] text-end">密码：</span>
                        <input className="input input-bordered  h-[40px] rounded-[4px] w-full focus:outline-none mr-[1px]" type="password" placeholder="设置密码" />
                    </label>
                </div>
                <div className="flex flex-col mb-[15px]">
                    <label className="w-full focus:outline-none mr-[1px] flex items-center space-x-2">
                        <span className="w-[120px] text-end">确认密码：</span>
                        <input className="input input-bordered  h-[40px] rounded-[4px] w-full focus:outline-none mr-[1px]" type="password" placeholder="请再次输入密码" />
                    </label>
                </div>
                <div className="flex flex-col justify-between mb-[15px] text-[12px]">
                    <div className="w-full text-start mb-[5px]">
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input type="checkbox" className="checkbox checkbox-xs" />
                                &nbsp;&nbsp;
                                <span className="w-full text-start label-text">我已经阅读并同意<Link className="link link-hover text-info" href="#"> MAOJI 用户协议</Link></span>
                            </label>
                        </div>
                    </div>
                    <div className="w-full mb-[15px]">
                        <button className="btn w-full no-animation text-white bg-sky-500 active:bg-sky-600 rounded-[5px]">注册</button>
                    </div>
                    <div className="w-full text-start">
                        <span>已有账号？&nbsp;<Link className="link link-hover text-info" href="/center">去登录</Link></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;
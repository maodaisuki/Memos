const AccountSetting = () => {
    return (
        <div className="w-full mt-[5px] p-[10px] flex flex-col">
            <div className="w-full flex flex-col bg-base-200 rounded-[4px] p-[15px] text-sm">
                <div className="space-y-[10px]">
                    <div className="pb-[5px] mb-[5px] text-lg">
                        账号设置
                    </div>
                    <div className="flex flex-row justify-between space-x-[50px]">
                        <div className="flex flex-col w-full">
                            <div className="mb-[5px]">
                                <span className="label-text p-[0px]">电子邮件</span>
                            </div>
                            <input id="email" type="text" placeholder="example@example.com" className="w-full focus:outline-none focus:ring focus:ring-success focus:ring-[1px] bg-base-100 rounded-[4px] px-[10px] h-[30px] text-[14px]"/>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="mb-[5px]">
                                <span className="label-text p-[0px]">当前密码&nbsp;<span className="text-error">*</span></span>
                            </div>
                            <input id="password" type="text" placeholder="" className="w-full focus:outline-none focus:ring focus:ring-success focus:ring-[1px] bg-base-100 rounded-[4px] px-[10px] h-[30px] text-[14px]"/>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between space-x-[50px]">
                        <div className="flex flex-col w-full">
                            <div className="mb-[5px]">
                                <span className="label-text p-[0px]">新密码<span className="text-error"></span></span>
                            </div>
                            <input id="password1" type="text" placeholder="" className="w-full focus:outline-none focus:ring focus:ring-success focus:ring-[1px] bg-base-100 rounded-[4px] px-[10px] h-[30px] text-[14px]"/>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="mb-[5px]">
                                <span className="label-text p-[0px]">确认新密码<span className="text-error"></span></span>
                            </div>
                            <input id="password2" type="text" placeholder="" className="w-full focus:outline-none focus:ring focus:ring-success focus:ring-[1px] bg-base-100 rounded-[4px] px-[10px] h-[30px] text-[14px]"/>
                        </div>
                    </div>
                    <div className="w-full">
                        <button className="w-full text-white text-[14px] mt-[5px] h-[35px] rounded-[4px] bg-success hover:bg-[#2ac090]">
                            保存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSetting
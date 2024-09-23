
const CustomSetting = () => {
    
    const changeTheme = () => {
        localStorage.setItem('theme', localStorage.getItem('theme') == 'light' ? 'dark' : 'light')
        document.getElementById("rootHtml")?.setAttribute('data-theme', localStorage.getItem('theme') || 'light');        
    }

    const changeOnlyUser = () => {
        localStorage.setItem('isOnlyUser', localStorage.getItem('isOnlyUser') == 'true' ? 'false' : 'true')
    }

    return (
        <div className="w-full p-[10px] flex flex-col">
            <div className="w-full flex flex-col bg-base-200 rounded-[4px] p-[15px] text-sm">
                <div className="space-y-[10px]">
                    <div className="pb-[5px] mb-[5px] text-lg">
                        个性化
                    </div>
                    <div className="flex flex-row justify-between space-x-[50px]">
                        <div>
                            夜间模式
                        </div>
                        <div>
                            <label className="swap">
                                <input type="checkbox" onClick={changeTheme} defaultChecked={localStorage.getItem('theme') == 'dark' ? true : false}/>
                                <div className="swap-on">ON</div>
                                <div className="swap-off">OFF</div>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between space-x-[50px]">
                        <div>
                            只看自己
                        </div>
                        <div>
                            <label className="swap">
                                <input type="checkbox" onClick={changeOnlyUser} defaultChecked={localStorage.getItem('isOnlyUser') == 'true' ? true : false} />
                                <div className="swap-on">ON</div>
                                <div className="swap-off">OFF</div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomSetting;
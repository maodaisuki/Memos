'use client'
import Link from "next/link";
import Image from "next/image";
import AccountCard from "./account";
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { getUserAnalysisData, getUserById, getUserHeatmapData, updateUser } from "@/api/user";
import ActivityCalendar, { ThemeInput } from "react-activity-calendar";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import Account from "@/interfaces/account";
import toast, { Toaster } from "react-hot-toast"

type Props = {
    userId: number,
    username: string,
    isCurrentUser: boolean
}

const AccountInfo = ({ userId, username, isCurrentUser }: Props) => {
    const currentYear = new Date().getFullYear();
    const [currentUser, setCurrentUser] = useState<any>();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [isLoading, setIsLoading] = useState(true);
    const [graphOption, setGraphOption] = useState<any>();
    const [heatmapData, setHeatmapData] = useState<any>();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [openId, setOpenId] = useState("");
    const [isCurrentPasswordError, setIsCurrentPasswordError] = useState(false);
    const [isCurrentPasswordDataError, setIsCurrentPasswordDataError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [isPasswordFormatError, setIsPasswordFormatError] = useState(false);
    const yearArray = [];
    const firstYear = 2020;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#@_])[a-zA-Z0-9#@_]{10,20}$/;
    let year = firstYear;
    const explicitTheme: ThemeInput = {
        light: ['#d7d9db', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        dark: ['#323942', '#39d353', '#26a641', '#006d32', '#0e4429'],
    };
    for (; year <= currentYear; year++) {
        yearArray.unshift(year);
    }
    useEffect(() => {
        const fetchData = async () => {
            const memosAnalysisData = await getUserAnalysisData(userId, selectedYear);
            const memosHeatmapData = await getUserHeatmapData(userId, selectedYear);
            const analysisData = memosAnalysisData.data.memosData;
            if (memosAnalysisData.data.memosData !== null && memosHeatmapData.data.heatmapData !== null) {
                const analysisOptionTemp = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                          type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            },
                            show: true
                        }
                    },
                    series: [
                        {
                            name: 'Memos',
                            type: 'bar',
                            barWidth: '60%',
                            data: [analysisData[0], analysisData[1], analysisData[2], analysisData[3], analysisData[4], analysisData[5], analysisData[6], analysisData[7], analysisData[8], analysisData[9], analysisData[10], analysisData[11]],
                            itemStyle: {
                                normal: {
                                    color: '#00a96e'
                                }
                            }
                        }
                    ]
                };
                setHeatmapData(memosHeatmapData.data.heatmapData);
                // console.log(heatmapData);
                setGraphOption(analysisOptionTemp);
                if(isCurrentUser) {
                    const currentUserTemp = await getUserById(userId);
                    setCurrentUser(currentUserTemp.data.account);
                    setEmail(currentUserTemp.data.account?.email ?? "");
                    setOpenId(currentUserTemp.data.account?.open_id ?? "");
                }
                setIsLoading(false);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedYear, userId, isLoading]);

    const changeTheme = () => {
        localStorage.setItem('theme', localStorage.getItem('theme') == 'light' ? 'dark' : 'light');
        document.getElementById("rootHtml")?.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
        setTheme(localStorage.getItem('theme') || 'light');   
    }

    const inputFocus = () => {
        setIsCurrentPasswordError(false);
        setIsEmailError(false);
        setIsPasswordError(false);
        setIsPasswordFormatError(false);
        setIsCurrentPasswordDataError(false);
    }

    const saveAccount = async () => {
        if(currentPassword == "") {
            setIsCurrentPasswordError(true);
            return;
        }
        if(!emailRegex.test(email) && email !== "") {
            setIsEmailError(true);
            return;
        }
        if(password1 !== password2) {
            setIsPasswordError(true);
            return;
        }
        if(!passwordRegex.test(password1) && password1 !== "" && password2 !== "") {
            setIsPasswordFormatError(true);
            return;
        }
        const account: Account = {
            userId: userId,
            currentPassword: currentPassword,
            password: password1,
            email: email,
            open_id: openId
        }
        const { data, error } = await updateUser(account);
        if(data.statusCode == 200) {
            toast.success("修改成功");
        }
        else if(data.statusCode == 401) {
            setIsCurrentPasswordDataError(true);
            return;
        }
        else {
            toast.error("远端服务器错误");
        }
    }
    return (
        <div className="w-full mt-[5px] p-[10px] flex flex-col">
            <Toaster />
            {
                isLoading ? <>
                    <div className="w-full">
                        <div className="w-full flex flex-row justify-between items-center space-x-2 w-full">
                            <div className="text-sm truncate">
                                <button className="flex flex-row hover:text-success">
                                <span className="leading-[20px]">@{username} 的活动记录&nbsp;</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                </button>
                            </div>
                            <div className="text-sm">
                                <select name="year" value={selectedYear} id="year-select" className="hover:cursor-pointer w-[60px] h-[20px] bg-transparent border-0 outline-none" onChange={(e) => { setIsLoading(true); setSelectedYear(parseInt(e.target.value, 10)) }}>
                                    {
                                        yearArray.map((value, index) => (
                                            <option key={`${index}:${value}`} value={value}>{value}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="w-full">
                            <ReactECharts
                                option={{
                                    tooltip: {
                                        trigger: 'axis',
                                        axisPointer: {
                                          type: 'shadow'
                                        }
                                    },
                                    grid: {
                                        left: '3%',
                                        right: '4%',
                                        bottom: '3%',
                                        containLabel: true
                                    },
                                    xAxis: {
                                        type: 'category',
                                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                                        axisTick: {
                                            alignWithLabel: true
                                        }
                                    },
                                    yAxis: {
                                        type: 'value',
                                        splitLine: {
                                            lineStyle: {
                                                type: 'dashed'
                                            },
                                            show: true
                                        }
                                    },
                                    series: [
                                        {
                                            name: 'Memos',
                                            type: 'bar',
                                            barWidth: '60%',
                                            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            itemStyle: {
                                                normal: {
                                                    color: '#00a96e'
                                                }
                                            }
                                        }
                                    ]
                                }}
                                notMerge={true}
                                lazyUpdate={true}
                                theme={"light"}
                            />
                        </div>
                        <div className="w-full p-[15px] bg-base-200 rounded-[4px] mt-[25px]">
                            <ActivityCalendar
                                loading
                                data={[]}
                                maxLevel={4}
                                // hideTotalCount
                                // hideColorLegend
                                weekStart={0}
                                theme={explicitTheme}
                                // @ts-ignore
                                colorScheme={theme}
                                renderBlock={(block, activity) =>
                                    React.cloneElement(block, {
                                      'data-tooltip-id': 'react-tooltip',
                                      'data-tooltip-html': `${activity.count} Memos on ${activity.date}`
                                    })
                                  }
                            />
                            <ReactTooltip id="react-tooltip" />
                        </div>
                        {/* <div className="h-[30px]">
                            <div className="w-full flex flex-row justify-center text-sm mt-[10px]">
                                <button className="flex flex-row hover:text-success">
                                    <span className="align-middle leading-[20px]">{selectedYear} 年共 {memosCount} 条 Memos!&nbsp;</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                </button>
                            </div>
                        </div> */}
                    </div>
                    </>
                    : <div className="w-full">
                        <div className="w-full flex flex-row justify-between items-center space-x-2 w-full">
                            <div className="text-sm truncate">
                                <button className="flex flex-row hover:text-success">
                                    <span className="leading-[20px]">@{username} 的活动记录&nbsp;</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                </button>
                            </div>
                            <div className="text-sm">
                                <select name="year" value={selectedYear} id="year-select" className="hover:cursor-pointer w-[60px] h-[20px] bg-transparent border-0 outline-none" onChange={(e) => { setIsLoading(true); setSelectedYear(parseInt(e.target.value, 10)) }}>
                                    {
                                        yearArray.map((value, index) => (
                                            <option key={`${index}:${value}`} value={value}>{value}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="w-full">
                            <ReactECharts
                                option={graphOption}
                                notMerge={true}
                                lazyUpdate={true}
                                theme={"light"}
                            />
                        </div>
                        <div className="w-full p-[15px] bg-base-200 rounded-[4px] mt-[25px]">
                            <ActivityCalendar
                                data={heatmapData}
                                maxLevel={4}
                                // hideTotalCount
                                // hideColorLegend
                                weekStart={0}
                                theme={explicitTheme}
                                // @ts-ignore
                                colorScheme={theme}
                                renderBlock={(block, activity) =>
                                    React.cloneElement(block, {
                                      'data-tooltip-id': 'react-tooltip',
                                      'data-tooltip-html': `${activity.count} Memos on ${activity.date}`
                                    })
                                  }
                            />
                            <ReactTooltip id="react-tooltip" />
                        </div>
                        {/* <div className="h-[30px]">
                            <div className="w-full flex flex-row justify-center text-sm mt-[10px]">
                                <button className="flex flex-row hover:text-success">
                                    <span className="align-middle leading-[20px]">{selectedYear} 年共 {memosCount} 条 Memos!&nbsp;</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                </button>
                            </div>
                        </div> */}
                    </div>
            }
            {
                isCurrentUser ? 
                    <>
                    <div className="w-full mt-[20px] flex flex-col">
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
                                        <input value={email} onFocus={inputFocus}  onChange={(event: any) => { setEmail(event.target.value) }} type="email" placeholder="example@example.com" className="w-full focus:outline-none focus:ring focus:ring-success focus:ring-[1px] bg-base-100 rounded-[4px] px-[10px] h-[30px] text-[14px]"/>
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="mb-[5px]">
                                            <span className="label-text p-[0px]">当前密码&nbsp;<span className="text-error">*</span></span>
                                        </div>
                                        <input onFocus={inputFocus} value={currentPassword} onChange={(event: any) => { setCurrentPassword(event.target.value) }} type="password" placeholder="" className="w-full focus:outline-none focus:ring focus:ring-success focus:ring-[1px] bg-base-100 rounded-[4px] px-[10px] h-[30px] text-[14px]"/>
                                    </div>
                                </div>
                                {
                                    isEmailError &&         
                                    <span className="w-full label-text-alt flex flex-row mt-[10px] justify-start text-error">
                                        请输入正确的邮箱地址
                                    </span>
                                }
                                {
                                    isCurrentPasswordError &&         
                                    <span className="w-full label-text-alt flex flex-row mt-[10px] justify-end text-error">
                                        请输入当前密码
                                    </span>
                                }
                                {
                                    isCurrentPasswordDataError &&         
                                    <span className="w-full label-text-alt flex flex-row mt-[10px] justify-end text-error">
                                        当前密码错误
                                    </span>
                                }
                                <div className="flex flex-row justify-between space-x-[50px]">
                                    <div className="flex flex-col w-full">
                                        <div className="mb-[5px]">
                                            <span className="label-text p-[0px]">新密码<span className="text-error"></span></span>
                                        </div>
                                        <input value={password1} onFocus={inputFocus} onChange={(event: any) => { setPassword1(event.target.value) }} type="password" placeholder="" className="w-full focus:outline-none focus:ring focus:ring-success focus:ring-[1px] bg-base-100 rounded-[4px] px-[10px] h-[30px] text-[14px]"/>
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="mb-[5px]">
                                            <span className="label-text p-[0px]">确认新密码<span className="text-error"></span></span>
                                        </div>
                                        <input value={password2} onFocus={inputFocus} onChange={(event: any) => { setPassword2(event.target.value) }} type="password" placeholder="" className="w-full focus:outline-none focus:ring focus:ring-success focus:ring-[1px] bg-base-100 rounded-[4px] px-[10px] h-[30px] text-[14px]"/>
                                    </div>
                                </div>
                                {
                                    isPasswordError &&         
                                    <span className="w-full label-text-alt flex flex-row mt-[10px] justify-start text-error">
                                        两次密码不一致
                                    </span>
                                }
                                {
                                    isPasswordFormatError &&         
                                    <span className="w-full label-text-alt flex flex-row mt-[10px] justify-start text-error">
                                        新密码格式错误，新密码为包含大小写字母和#@_至少其中一个的10-20位字符串
                                    </span>
                                }
                                <div className="flex flex-row justify-between space-x-[50px]">
                                    <div className="flex flex-col w-full">
                                        <div className="mb-[5px]">
                                            <span className="label-text p-[0px]">open_id<span className="text-error"></span></span>
                                        </div>
                                        <input value={openId} onFocus={inputFocus} onChange={(event: any) => { setOpenId(event.target.value) }} type="text" placeholder="" className="w-full focus:outline-none focus:ring focus:ring-success focus:ring-[1px] bg-base-100 rounded-[4px] px-[10px] h-[30px] text-[14px]"/>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <button onClick={saveAccount} className="w-full text-white text-[14px] mt-[5px] h-[35px] rounded-[4px] bg-success hover:bg-[#2ac090]">
                                        保存
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-[20px] flex flex-col">
                        <div className="w-full flex flex-col bg-base-200 rounded-[4px] p-[15px] text-sm">
                            <div className="space-y-[10px]">
                                <div className="pb-[5px] mb-[5px] text-lg flex flex-row">
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
                                <div className="text-xs border-t-[1px] pt-[10px] text-end">
                                 <span className="text-error">*</span>&nbsp;个性化设置仅对当前设备有效
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                    : <></>
            }
        </div>
    )
}

export default AccountInfo;
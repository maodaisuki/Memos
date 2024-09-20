'use client'
import Link from "next/link";
import Image from "next/image";
import AccountCard from "./account";
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { getUserAnalysisData } from "@/api/user";

type Props = {
    userId: number,
    username: string,
    currentUsername: string
}

const AccountInfo = ({ userId, username, currentUsername }: Props) => {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [isLoading, setIsLoading] = useState(true);
    const [option, setOption] = useState<any>();
    const [memosCount, setMemosCount] = useState(0);
    const yearArray = [];
    const firstYear = 2020;
    let year = firstYear;
    for (; year <= currentYear; year++) {
        yearArray.unshift(year);
    }
    useEffect(() => {
        const fetchData = async () => {
            const memosAnalysisData = await getUserAnalysisData(userId, selectedYear);
            const data = memosAnalysisData.data.memosData;
            let count = 0;
            for(var d in data) {
                count =  count + data[d];
            }
            setMemosCount(count);
            if(memosAnalysisData.data.memosData !== null) {
                const optTemp = {
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
                            data: [data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10], data[11]],
                            itemStyle: {
                                normal: {
                                    color: '#00a96e'
                                }
                            }
                        }
                    ]
                };
                setOption(optTemp);
                setIsLoading(false);
            }
        }
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedYear, userId, isLoading]);
    return (
        <div className="w-full mt-[5px] p-[10px] flex flex-col">
            <div className="w-full flex flex-row justify-between items-center space-x-2 w-full">
                <div className="text-sm truncate">
                    @{username} 的活动记录
                </div>
                <div className="text-sm">
                    <select name="year" value={selectedYear} id="year-select" className="hover:cursor-pointer w-[60px] h-[20px] bg-transparent border-0 outline-none" onChange={(e) => {setIsLoading(true); setSelectedYear(parseInt(e.target.value, 10))}}>
                        {
                            yearArray.map((value, index) => (
                                <option key={`${index}:${value}`} value={value}>{value}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            {
                isLoading ?
                <div className="w-full flex flex-col">
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
                    <div className="h-[30px]">
                    </div>
                </div>
                : <div className="w-full flex flex-col">
                    <ReactECharts
                        option={option}
                        notMerge={true}
                        lazyUpdate={true}
                        theme={"light"}
                    />
                    {/* TODO 这里插入热力图 */}
                    <div className="h-[30px]">
                        <div className="w-full flex flex-row justify-center text-sm mt-[10px]">
                            <button className="flex flex-row hover:text-success">
                                <span className="align-middle leading-[20px]">{selectedYear} 年共 {memosCount} 条 Memos!&nbsp;</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AccountInfo;
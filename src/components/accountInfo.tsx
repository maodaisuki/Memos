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
}

const AccountInfo = ({ userId, username }: Props) => {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [isLoading, setIsLoading] = useState(true);
    const [option, setOption] = useState<any>();
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
                    <select name="year" value={selectedYear} id="year-select" className="w-[60px] h-[20px] bg-transparent border-0 outline-none" onChange={(e) => {setIsLoading(true); setSelectedYear(parseInt(e.target.value, 10))}}>
                        {
                            yearArray.map((value, index) => (
                                <option key={`${index}:${value}`} value={value}>{value}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="w-full flex flex-col">
                {
                    isLoading ? <ReactECharts
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
                    : <ReactECharts
                        option={option}
                        notMerge={true}
                        lazyUpdate={true}
                        theme={"light"}
                    />
                }
                <div className="w-full mt-[10px]">
                    test
                </div>
            </div>
        </div>
    )
}

export default AccountInfo;
'use server'
import instance from "./instance";
import { cookies } from "next/headers";

const header = {
    'Authorization': `Bearer ${cookies().get('MAOJI-Token')?.value || ''}`
}

async function getUserById(id: number) {
    const { data, error } = await instance.get(
        `/User/${id}`,
        {
            headers: header
        }
    )
    .then((res) => {
        const data = res.data;
        const error = null;
        return { data, error }
    })
    .catch((e) => {
        console.log(`[获取用户信息错误]: ${e.message}`);
        const data = null;
        const error = e.message;
        return { data, error }
    });
    return { data, error };
}

async function getUserByUsername(username: string) {
    const { data, error } = await instance.get(
        `/User?username=${username}`,
        {
            headers: header
        }
    )
    .then((res) => {
        const data = res.data;
        const error = null;
        return { data, error }
    })
    .catch((e) => {
        console.log(`[获取用户信息错误]: ${e.message}`);
        const data = null;
        const error = e.message;
        return { data, error }
    });
    return { data, error };
}

async function getUserAnalysisData(userId: number, year: number) {
    const { data, error } = await instance.get(
        `/User/analysis?userId=${userId}&year=${year}`,
        {
            headers: header
        }
    )
    .then((res) => {
        const data = res.data;
        const error = null;
        return { data, error };
    })
    .catch((e) => {
        console.log(`[获取用户信息错误]: ${e.message}`);
        const data = null;
        const error = e.message;
        return { data, error };
    });
    return { data, error };
}

async function getUserHeatmapData(userId: number, year: number) {
    const { data, error } = await instance.get(
        `/User/heatmap?userId=${userId}&year=${year}`,
        {
            headers: header
        }
    )
    .then((res) => {
        const data = res.data;
        const error = null;
        return { data, error };
    })
    .catch((e) => {
        console.log(`[获取用户信息错误]: ${e.message}`);
        const data = null;
        const error = e.message;
        return { data, error };
    });
    return { data, error };
}

export {
    getUserById,
    getUserByUsername,
    getUserAnalysisData,
    getUserHeatmapData
}
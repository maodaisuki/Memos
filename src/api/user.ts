'use server'
import Account from "@/interfaces/account";
import instance from "./instance";
import { cookies } from "next/headers";

async function getUserById(id: number) {
    const header = {
        'Authorization': `Bearer ${cookies().get('MAOJI-Token')?.value || ''}`
    };
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
    const header = {
        'Authorization': `Bearer ${cookies().get('MAOJI-Token')?.value || ''}`
    };
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
    const header = {
        'Authorization': `Bearer ${cookies().get('MAOJI-Token')?.value || ''}`
    };
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
    const header = {
        'Authorization': `Bearer ${cookies().get('MAOJI-Token')?.value || ''}`
    };
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

async function updateUser(account: Account) {
    const header = {
        'Authorization': `Bearer ${cookies().get('MAOJI-Token')?.value || ''}`
    };
    const { data, error } = await instance.put(
        `/User`,
        {
            userId: account.userId,
            password: (account.password == "" || account.password == undefined) ? null : account.password,
            email: (account.email == "" || account.email == undefined) ? null : account.email,
            open_id: (account.open_id == "" || account.open_id == undefined) ? null : account.open_id,
            currentPassword: account.currentPassword
        },
        {
            headers: header
        },
    )
        .then((res) => {
            const data = res.data;
            const error = null;
            return { data, error };
        })
        .catch((e) => {
            console.log(`[更新用户信息错误]: ${e.message}`);
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
    getUserHeatmapData,
    updateUser
}
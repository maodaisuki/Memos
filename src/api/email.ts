'use server'
import instance from "./instance"
import { cookies } from "next/headers";

const header = {
    'Authorization': `Bearer ${cookies().get('MAOJI-Token')?.value || ''}`
}

async function ForgetUsername(email: string) {
    const { data, error } = await instance.get(
        `/User/username?email=${email}`,
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
        console.log(`[请求错误]: ${e.message}`);
        const data = null;
        const error = e.message;
        return { data, error }
    });
    return { data, error };
}

async function ForgetPassword(email: string) {
    const { data, error } = await instance.get(
        `/User/password?email=${email}`,
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
        console.log(`[请求错误]: ${e.message}`);
        const data = null;
        const error = e.message;
        return { data, error }
    });
    return { data, error };
}

export {
    ForgetPassword,
    ForgetUsername
}
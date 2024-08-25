'use server'
import Auth from "@/interfaces/auth";
import instance from "./instance";
import { cookies } from "next/headers";

async function login(auth: Auth) {
    return await instance.post(
        '/User/login',
        {
            username: auth.username,
            password: auth.password
        },
    )
    .then((res: any) => {
        if(res.data.token !== null) {
            cookies().set('MAOJI-Token', res.data.token, {
                secure: true,
                sameSite: 'none',
                maxAge: 60 * 60 * 24 * 360,
                // httpOnly: true
            });
            return true;
        }
        return false;
    })
    .catch((e) => {
        console.log(`[登录错误]: ${e.message}`);
        return false;
    })
}

export default login;
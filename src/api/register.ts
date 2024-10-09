'use server'
import Auth from "@/interfaces/auth";
import instance from "./instance";

async function register(auth: Auth) {
    return await instance.post(
        '/User/register',
        {
            username: auth.username,
            password: auth.password
        },
    )
        .then((res: any) => {
            if (res.data.account !== null) {
                return true;
            }
            else {
                return false;
            }
        })
        .catch((e) => {
            console.log(`[注册错误]: ${e}`);
            return false;
        })
}

export {
    register
}
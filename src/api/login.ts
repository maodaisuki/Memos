import Auth from "@/interfaces/auth";
import instance from "./instance";
async function login(auth: Auth) {
    return await instance.post(
        '/User/login',
        {
            username: auth.username,
            password: auth.password
        },
    )
    .then((res: any) => {
        return res.data;
    })
    .catch((e) => {
        console.log(`[登录错误]: ${e.message}`);
        return null;
    })
}

export default login;
'use server'
import instance from "./instance"

async function ForgetUsername(email: string) {
    const { data, error } = await instance.get(
        `/User/username?email=${email}`,
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

async function ResetPassword(hash: string, userId: string, email: string, password: string) {
    const { data, error } = await instance.post(
        `/User/password?hash=${hash}&userId=${userId}&email=${email}`,
        password
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
    ForgetUsername,
    ResetPassword
}
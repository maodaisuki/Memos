'use server'
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

async function parseToken(value: string) {
    const token = cookies().get('MAOJI-Token')!.value;
    const decodedToken = jwtDecode(token);
    // console.log(decodedToken);
    return decodedToken;
}

export {
    parseToken
}
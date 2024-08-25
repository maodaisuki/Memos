'use server'
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

async function parseToken() {
    const token = cookies().get('MAOJI-Token')!.value;
    const decodedToken = jwtDecode(token);
    // console.log(decoded);
    return decodedToken;
}

export {
    parseToken
}
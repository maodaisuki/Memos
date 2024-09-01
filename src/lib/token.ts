'use server'
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

async function parseToken(value: string = cookies().get('MAOJI-Token')!.value) {
    const decodedToken = jwtDecode(value);
    // console.log(decodedToken);
    return decodedToken;
}

export {
    parseToken
}
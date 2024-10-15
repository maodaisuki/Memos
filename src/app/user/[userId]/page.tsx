'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserById, getUserByUsername } from "@/api/user";
import { parseToken } from "@/lib/token";
import HeaderMenu from "@/components/header";
import AccountInfo from "@/components/accountInfo";

export default function UserPage() {
    async function getUsername() {
        const pToken = await parseToken();
        return pToken.sub;
    }
    const { userId } = useParams();
    const [username, setUsername] = useState("");
    const [currentUsername, setCurrentUsername] = useState("");
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const fetchData = async () => {
            const currentUsernameTemp = await getUsername() || '';
            const currentUserTemp = await (await getUserByUsername(currentUsernameTemp)).data?.account || null;
            const userTemp = await (await getUserById(parseInt(userId.toString(), 10))).data?.account || null;
            setUser(userTemp);
            setUsername(userTemp?.username || '');
            setCurrentUser(currentUserTemp);
        }
        fetchData();
    }, [userId]);

    if (currentUser == null || user == null) {
        return (
            <></>
        )
    }
    else {
        if (currentUser.userId == userId) {
            return (
                <main className="m-0 min-h-screen min-w-screen flex flex-col items-center">
                    <div className="md:w-full max-w-xl flex flex-col items-center w-full justify-between">
                        <HeaderMenu />
                        <AccountInfo userId={parseInt(userId.toString(), 10)} username={username} isCurrentUser={true} />
                    </div>
                </main>
            )
        }
        else {
            return (
                <main className="m-0 min-h-screen min-w-screen flex flex-col items-center">
                    <div className="md:w-full max-w-xl flex flex-col items-center w-full">
                        <HeaderMenu />
                        <AccountInfo userId={parseInt(userId.toString(), 10)} username={username} isCurrentUser={false} />
                    </div>
                </main>
            )
        }
    }
}
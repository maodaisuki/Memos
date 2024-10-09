'use client'
import { getMemoList } from "@/api/memo";
import { getUserByUsername } from "@/api/user";
import HeaderMenu from "@/components/header";
import MemosContainer from "@/components/memosContainer";
import { parseToken } from "@/lib/token";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const getUsername = async () => {
    const pToken = await parseToken();
    return pToken.sub;
}

export default function TagPage() {
    const { tag } = useParams();
    const [currentUsername, setCurrentUsername] = useState("");
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [initialList, setInitialList] = useState<any>(null)
    useEffect(() => {
        const fetchData = async () => {
            const currentUsernameTemp = await getUsername() || '';
            const currentUserTemp = await (await getUserByUsername(currentUsernameTemp)).data?.account || null;
            const initialListTemp = await getMemoList(1, undefined, `#${decodeURI(tag.toString())}#`);
            setCurrentUsername(currentUsernameTemp);
            setCurrentUser(currentUserTemp);
            setInitialList(initialListTemp);
        }
        fetchData();
    }, [tag]);
    if (currentUser == null) {
        return (
            <></>
        )
    }
    if (initialList.data == null) {
        return (
            <main className="m-0 min-h-screen min-w-screen flex flex-col items-center">
                {/* <div className="md:w-full max-w-xl flex flex-col items-center w-full">
          <HeaderMenu />
          <MemosContainer query="" initialList={initialList.data.memoList} username={username} userId={currentUser.userId} />
          <div className="w-full text-center text-sm px-[10px]">
            - 已加载完所有笔记 -
          </div>
        </div> */}
            </main>
        )
    }
    return (
        <main className="m-0 min-h-screen min-w-screen flex flex-col items-center">
            <div className="md:w-full max-w-xl flex flex-col items-center w-full">
                <HeaderMenu />
                <MemosContainer query={`#${decodeURI(tag.toString())}#`} initialList={initialList.data.memoList} username={currentUsername} userId={currentUser.userId} />
            </div>
        </main>
    );
}
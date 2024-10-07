'use client'

import { getMemoById, postMemo } from "@/api/memo";
import { getUserByUsername } from "@/api/user";
import AccountCard from "@/components/account";
import HeaderMenu from "@/components/header";
import MemosContainer from "@/components/memosContainer";
import { Memo } from "@/interfaces/memo";
import { parseToken } from "@/lib/token";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
async function getUsername() {
  const pToken = await parseToken();
  return pToken.sub;
}
export default function MemoIdPage() {
    const { memoId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [initialList, setInitialList] = useState<any>();
    const [username, setUsername] = useState("");
    const [currentUser, setCurrentUser] = useState<any>();
    
    useEffect(() => {
        const fetchData = async () => {
            const initialMemo = await getMemoById(parseInt(memoId.toString(), 10));
            const initialListTemp = [];
            if(initialMemo.data !== null) {
                initialListTemp.push(initialMemo.data.memo);
            }
            const usernameTemp = await getUsername() || '';
            const currentUserTemp = await (await getUserByUsername(usernameTemp)).data?.account || null;
            setInitialList(initialListTemp);
            setUsername(usernameTemp);
            setCurrentUser(currentUserTemp);
            setIsLoading(false);
        }
        fetchData();
    }, [memoId])

	if(currentUser == null || isLoading) {
        return (
            <></>
        )
    }
    if(initialList == null || initialList.length == 0) {
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
    else {
        return (
            <main className="m-0 min-h-screen min-w-screen flex flex-col items-center">
                <div className="md:w-full max-w-xl flex flex-col items-center w-full">
                <HeaderMenu />
                <MemosContainer query={`memoId:${memoId}`} initialList={initialList} username={username} userId={currentUser.userId} />
                </div>
            </main>
        )
    }
}

'use client'
import { getMemoList } from "@/api/memo";
import { getUserByUsername } from "@/api/user";
import HeaderMenu from "@/components/header";
import MemosContainer from "@/components/memosContainer";
import { parseToken } from "@/lib/token";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

const SearchPage = () => {
    const getUsername = async () => {
        const pToken = await parseToken();
        return pToken.sub;
    }
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams?.get('query') || '');
    const [initialList, setInitialList] = useState<any>(null)
    const [username, setUsername] = useState("");
    const [currentUser, setCurrentUser] = useState<any>(null)

    useEffect(() => {
        setQuery(searchParams?.get('query') || '');
    }, [searchParams]);

    useEffect(() => {
        const fetchData = async () => {
            const initialListTemp = await getMemoList(1, undefined, query);
            const usernameTemp = await getUsername() || '';
            const currentUserTemp = await (await getUserByUsername(usernameTemp)).data?.account || null;
            setInitialList(initialListTemp.data);
            setUsername(usernameTemp);
            setCurrentUser(currentUserTemp);
        }
        fetchData();
    }, [query, searchParams]);

    if (currentUser == null) {
        return (
            // <h1 className="text-lg">502 Bad Gateway</h1>
            <></>
        )
    }

    if (initialList == null) {
        return (
            <main className="m-0 min-h-screen min-w-screen flex flex-col items-center">
                {/* <div className="md:w-full max-w-xl flex flex-col items-center w-full">
            <HeaderMenu />
            <MemosContainer initialList={initialList.memoList} username={username} userId={currentUser.userId}/>
            <div className="w-full text-center text-sm px-[10px]">
              - 已加载完所有笔记 -
            </div>
          </div> */}
            </main>
        );
    }
    return (
        <main className="m-0 min-h-screen min-w-screen flex flex-col items-center">
            <div className="md:w-full max-w-xl flex flex-col items-center w-full">
                <HeaderMenu />
                <MemosContainer query={decodeURI(query)} initialList={initialList.memoList} username={username} userId={currentUser.userId} />
            </div>
        </main>
    );
}

export default SearchPage;
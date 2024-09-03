'use client'
import HeaderMenu from "@/components/header";
import MemosContainer from "@/components/memosContainer";
import { useSearchParams } from "next/navigation"

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams?.get('query') || '';
    // TODO 搜索页面
    // TODO 高亮搜索
    return (
      <main className="m-0 min-h-screen min-w-screen flex flex-col items-center">
        <div className="md:w-full max-w-xl flex flex-col items-center w-full">
          <HeaderMenu />
          {/* <MemosContainer initialList={initialList.data.memoList} username={username} userId={currentUser.userId}/> */}
          <div className="w-full text-center text-sm px-[10px]">
            - 已加载完所有笔记 -
          </div>
        </div>
      </main>
    );
}

export default SearchPage;
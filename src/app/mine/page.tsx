import { getMemoList } from "@/api/memo";
import { getUserByUsername } from "@/api/user";
import HeaderMenu from "@/components/header";
import MemosContainer from "@/components/memosContainer";
import { parseToken } from "@/lib/token";

async function getUsername() {
  const pToken = await parseToken();
  return pToken.sub;
}

export default async function Mine() {
  const initialList = await getMemoList(1);
  const username = await getUsername() || '';
  const currentUser = await (await getUserByUsername(username)).data?.account || null;
  if (currentUser == null) {
    return (
      <h1 className="text-lg">502 Bad Gateway</h1>
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
    );
  }
  return (
    <main className="m-0 min-h-screen min-w-screen flex flex-col items-center">
      <div className="md:w-full max-w-xl flex flex-col items-center w-full">
        <HeaderMenu />
        <MemosContainer query="" initialList={initialList.data.memoList} username={username} userId={currentUser.userId} />
      </div>
    </main>
  );
}

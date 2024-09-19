'use client'
import { useParams } from "next/navigation";
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from "react";
import { getUserByUsername } from "@/api/user";
import { parseToken } from "@/lib/token";
import HeaderMenu from "@/components/header";
import AccountInfo from "@/components/accountInfo";
async function getUsername() {
  const pToken = await parseToken();
  return pToken.sub;
}
export default function UserPage() {
  const { userId } = useParams();
  const [username, setUsername] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const usernameTemp = await getUsername() || '';
      const currentUserTemp = await (await getUserByUsername(usernameTemp)).data?.account || null;
      setUsername(usernameTemp);
      setCurrentUser(currentUserTemp);
    }
    fetchData();
  }, [userId]);

  if(currentUser == null) {
    return (
      <></>
    )
  }
  else {
    if(currentUser.userId == userId) {
      return (
        <main className="m-0 min-h-screen min-w-screen flex flex-col items-center">
        <div className="md:w-full max-w-xl flex flex-col items-center w-full">
          <HeaderMenu />
          <AccountInfo userId={parseInt(userId.toString(), 10)} username={username}/>
        </div>
      </main>
      )
    }
    else {
      return (
        <main className="m-0 min-h-screen min-w-screen flex flex-col items-center">
        <div className="md:w-full max-w-xl flex flex-col items-center w-full">
          <HeaderMenu />
          <AccountInfo userId={parseInt(userId.toString(), 10)} username={username}/>
        </div>
      </main>
      )
    }
  }
}
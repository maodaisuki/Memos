'use client'
import Link from "next/link";
import Image from "next/image";
import AccountCard from "./account";
import { useState } from "react";
import { postMemo } from "@/api/memo";
import { Memo } from "@/interfaces/memo";
import React from "react";
import MemosCard from "./memos";
import { renderToStaticMarkup } from "react-dom/server";
import { createRoot, hydrateRoot } from "react-dom/client";
import { useRouter } from "next/navigation";

type Props = {
    userId: number,
    username: string
}

const MemosEditor = ({ userId, username }: Props) => {
    const [memo, setMemo] = useState("");
    const [isMemoabled, setIsMemoabled] = useState(false);

    function textAreaHandle(event: any) {
        setMemo(event.target.value);
        if(event.target.value !== "") {
            setIsMemoabled(true);
        }
        else {
            setIsMemoabled(false);
        }
    }
    async function sendMemo() {
        const memoBody = {
            content: memo,
            tags: [""],
            userId: userId
        };
        const { data } = await postMemo(memoBody as Memo);
        if(data !== null) {
            setMemo("");
            setIsMemoabled(false);
            const memoContainer = document.getElementById('memoContainer');
            const newMemoComponent = <MemosCard key={ data.memo.memoId } memo={ data.memo } />;
            console.log("发送成功");
        }
        else {
            console.log("发送失败");
        }
    }

    return (
        <div className="w-full mt-[10px] flex flex-col">
            <div className="w-full px-[10px]">
                <textarea 
                    value={memo}
                    onChange={textAreaHandle}
                    className="w-full bg-base-200 rounded-[4px] p-[15px] min-h-[100px] leading-relaxed focus:outline-none focus:ring focus:ring-success focus:ring-[1px] ring-[1px] ring-base-300 text-[14px]"
                    placeholder="现在的想法是..."
                />
            </div>
            <div className="w-full flex flex-row justify-between items-center mt-[5px] space-x-2 px-[10px]">
                <div className="grow">
                    <AccountCard userId={userId} username={username} />
                </div>
                <div className="flex-none">
                    <button disabled={!isMemoabled} onClick={async () => {await sendMemo()}} className="btn btn-sm no-animation rounded-[4px] text-sm">
                        Memos!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MemosEditor;
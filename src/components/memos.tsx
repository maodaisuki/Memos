'use client'
import MemosHeader from "./memosHeader";
import MemosBody from "./memosBody";
import MemosFooter from "./memosFooter";
import { Memo } from "@/interfaces/memo";
import useSWR from "swr";
import { getUserById } from "@/api/user";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateMemo } from "@/api/memo";

type Props = {
    memo: Memo,
    currentUserId: number,
}

function convertDate(utc: string) {
    const date = new Date(utc);
    return date.toLocaleString();
}

const MemosCard = ({ memo, currentUserId }: Props) => {
    const [isOnEdit, setIsOnEdit] = useState(false);
    const [eidtedMemo, setEditedMemo] = useState(memo.content.slice());
    const onEdit = () => {
        document.getElementById("memoDropdownMenu")!.blur();
        setIsOnEdit(true);
    }
    const { data, error } = useSWR(`/api/user/${memo.userId}`, async () => {return await getUserById(memo.userId)});
    const [isMemoabled, setIsMemoabled] = useState(true);

	function textAreaHandle(event: any) {
        setEditedMemo(event.target.value);
		if (event.target.value !== "") {
			setIsMemoabled(true);
		}
		else {
			setIsMemoabled(false);
		}
	}

    useEffect(() => {
        setIsOnEdit(false);
    }, [memo]);

    useEffect(() => {
        setEditedMemo(memo.content);
        if (eidtedMemo !== "") {
			setIsMemoabled(true);
		}
		else {
			setIsMemoabled(false);
		}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOnEdit, memo.content])
    
	async function editMemo() {
        // console.log(memo.createdDate);
        const tagRegex = /#([^#]+)#/g;
		const matchTags = eidtedMemo.match(tagRegex);
		if(matchTags !== null) {
			matchTags.forEach((tag, index) => {
				matchTags[index] = tag.slice(1, -1);
			});
		}
		const memoBody = {
            memoId: memo.memoId,
			content: eidtedMemo,
			tags: matchTags as Array<string>,
			userId: memo.userId,
            createdDate: memo.createdDate,
            lastModifiedDate: new Date(),
		};
        const { data } = await updateMemo(memoBody);
		if (data !== null) {
            setIsOnEdit(false);
            memo.content = eidtedMemo;
            toast.success("更新 Memo 成功");
		}
		else {
			// console.log("发送失败");
			toast.error("网络错误，请连接网络后再试");
		}
	}

    if(!data || error) {
        return (
            <></>
        );
    }
    if(!isOnEdit) {
        return (
            <div className="w-full flex flex-col bg-base-200 rounded-[4px] p-[15px]">
                <MemosHeader createdTime={convertDate(memo.createdDate!.toString())} memoId={memo.memoId!} onEdit={onEdit} userId={memo.userId} currentUserId={currentUserId}/>
                <MemosBody content={memo.content} />
                <MemosFooter username={data?.data.account.username} userId={memo.userId}/>
            </div>
        )
    }
    else {
        return (
            <div className="w-full mt-[10px] flex flex-col">
                <div className="w-full">
                    <textarea
                        value={eidtedMemo}
                        onChange={textAreaHandle}
                        className="w-full bg-base-200 rounded-[4px] p-[15px] min-h-[100px] leading-relaxed focus:outline-none focus:ring focus:ring-success focus:ring-[1px] ring-[1px] ring-base-300 text-[14px]"
                        placeholder="现在的想法是..."
                    />
                </div>
                <div className="w-full flex flex-row justify-between items-center mt-[5px] space-x-2">
                    <div className="text-end w-full">
                        <button disabled={!isMemoabled} onClick={async () => { await editMemo() }} className="btn btn-sm no-animation text-white disabled:bg-stone-400 bg-success hover:bg-[#2ac090] rounded-[4px] text-sm">
                            Memos!
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MemosCard;